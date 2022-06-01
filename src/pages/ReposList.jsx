import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { githubAPI } from '../config'

function getRepositories () {
  return githubAPI.get('/users/laurabeatris/repos')
    .then(res => res.data)
}

export function ReposList () {
  const { data, error, isFetching } = useQuery('repos', getRepositories)

  return (
    <ul className='App'>
      {error && <p>Something went wrong, try to refresh the page</p>}

      {isFetching && <p>Loading</p>}

      {data?.map((item) => (
        <li key={item.id}>
          <Link to={`/repo/${item.full_name}`}>
            <strong>{item.full_name}</strong>
          </Link>
          <br />
          <small>{item.description}</small>
        </li>
      ))}
    </ul>
  )
}
