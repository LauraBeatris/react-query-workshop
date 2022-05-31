import { useEffect, useState } from 'react'

function App () {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/users/LauraBeatris/repos')
      .then((response) => response.json())
      .then((data) => setRepositories(data))
  }, [])

  return (
    <ul className='App'>
      {repositories?.map((item) => (
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
