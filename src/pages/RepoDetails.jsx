import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { githubAPI } from '../config'

function getRepositoryByName (name) {
  return githubAPI.get(`/repos/${name}`).then(res => res.data)
}

export function RepoDetails () {
  const fullName = useParams()['*']
  const queryClient = useQueryClient()

  const repositoriesListCache = queryClient.getQueryData('repos')
  const currentRepositoryCache = repositoriesListCache?.find((repo) => repo.full_name === fullName)
  const { data } = useQuery(`repo-${fullName}`, () => getRepositoryByName(fullName), {
    enabled: !currentRepositoryCache
  })

  const [description, setDescription] = useState('')

  const handleInputChange = (event) => {
    setDescription(event.target.value)
  }

  const handleDescriptionUpdate = (event) => {
    event.preventDefault()
    setDescription('')

    if (!repositoriesListCache) return

    const updatedCachedList = repositoriesListCache.map((repo) => {
      const isCurrentRepository = repo.full_name === fullName

      return isCurrentRepository ? { ...repo, description } : repo
    })
    queryClient.setQueryData('repos', updatedCachedList)
  }

  return (
    <div>
      <Link to='/'>Back to main page</Link>

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
    </div>
  )
}
