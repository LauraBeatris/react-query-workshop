import { useQuery } from 'react-query'
import { githubAPI } from './config'

function getRepositories () {
  return githubAPI.get('https://api.github.com/users/laurabeatris/repos')
    .then(res => res.data)
}

function App () {
  const { data, error, isFetching } = useQuery('repos', getRepositories)

  return (
    <ul className='App'>
      {error && <p>Something went wrong, try to refresh the page</p>}

      {isFetching && <p>Loading</p>}

      {data?.map((item) => (
        <li key={item.id}>
          <strong>{item.full_name}</strong>
          <br />
          <small>{item.description}</small>
        </li>
      ))}
    </ul>
  )
}

export default App
