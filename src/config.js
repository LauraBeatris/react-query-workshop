import axios from 'axios'
import { QueryClient } from 'react-query'

export const githubAPI = axios.create({
  baseURL: 'https://api.github.com/'
})

export const queryCLient = new QueryClient()
