import { useFetch } from './hooks/useFetch'

function App () {
  const { data, isFetching, error } = useFetch('https://api.github.com/users/laurabeatris/repos')

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
