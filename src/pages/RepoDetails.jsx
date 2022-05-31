import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
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
  const { data, isFetching } = useQuery(`repo-${fullName}`, () => getRepositoryByName(fullName), {
    enabled: !currentRepositoryCache
  })

  const updateCacheWithDescription = (description) => {
    if (!repositoriesListCache) return

    const updatedCachedList = repositoriesListCache.map((repo) => {
      const isCurrentRepository = repo.full_name === fullName

      return isCurrentRepository ? { ...repo, description } : repo
    })
    queryClient.setQueryData('repos', updatedCachedList)
  }

  return { data, isFetching, updateCacheWithDescription }
}

export function RepoDetails () {
  const { data, isFetching, updateCacheWithDescription } = useRepositoryQuery()
  const [description, setDescription] = useState('')

  const handleInputChange = (event) => {
    setDescription(event.target.value)
  }

  const handleDescriptionUpdate = (event) => {
    event.preventDefault()
    setDescription('')

    updateCacheWithDescription(description)
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
