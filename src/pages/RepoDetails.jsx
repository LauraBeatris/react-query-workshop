import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { githubAPI } from '../config'

function getRepositoryByName (name) {
  return githubAPI.get(`/repos/${name}`).then(res => res.data)
}

export function useRepositoryQuery () {
  const fullName = useParams()['*']
  const queryClient = useQueryClient()

  const repositoriesListCache = queryClient.getQueryData('repos')
  const currentRepositoryCache = repositoriesListCache?.find((repo) => repo.full_name === fullName)
  const { data, isFetching } = useQuery(['repos', fullName], () => getRepositoryByName(fullName), {
    enabled: !currentRepositoryCache,
    initialData: currentRepositoryCache
  })

  return { data, isFetching }
}

function updateRepository ({ repoName, description }) {
  return githubAPI.patch(`/repos/${repoName}`, { description })
}

export function useUpdateRepositoryMutation () {
  const queryClient = useQueryClient()
  const mutation = useMutation(
    ({ repoName, description }) => updateRepository({ repoName, description }),
    {
      onMutate: async ({ repoName, description }) => {
        await queryClient.cancelQueries('repos')

        const previousRepos = queryClient.getQueryData('repos')

        queryClient.setQueryData('repos', previousRepos.map(
          (repo) => repo.full_name === repoName
            ? { ...repo, description }
            : repo)
        )

        return { previousRepos }
      },
      onError: (_err, _updatedRepo, context) => {
        queryClient.setQueryData('repos', context.previousRepos)
      },
      onSettled: () => {
        queryClient.invalidateQueries('repos')
      }
    }
  )

  return mutation
}

export function RepoDetails () {
  const { data, isFetching } = useRepositoryQuery()
  const [description, setDescription] = useState('')
  const updateRepository = useUpdateRepositoryMutation()

  const handleInputChange = (event) => {
    setDescription(event.target.value)
  }

  const handleDescriptionUpdate = (event) => {
    event.preventDefault()
    setDescription('')

    updateRepository.mutate({ repoName: data.full_name, description })
  }

  return (
    <div>
      <Link to='/'>Back to main page</Link>

      {isFetching
        ? <p>Loading...</p>
        : (
          <section>
            <p>{data?.full_name}</p>

            <form onSubmit={handleDescriptionUpdate}>
              <input
                type='text'
                value={description}
                onChange={handleInputChange}
                placeholder='New repo description'
              />
              <button type='submit'>Update description</button>
            </form>
          </section>
          )}
    </div>
  )
}
