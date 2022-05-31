import { Route, Routes } from 'react-router-dom'

import { RepoDetails } from './pages/RepoDetails'
import { ReposList } from './pages/ReposList'

function App () {
  return (
    <Routes>
      <Route path='/' element={<ReposList />} />
      <Route path='/repo/:id' element={<RepoDetails />} />
    </Routes>
  )
}

export default App
