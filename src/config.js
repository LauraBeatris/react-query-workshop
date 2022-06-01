import axios from 'axios'
import { QueryClient } from 'react-query'

export const githubAPI = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_TOKEN}`
  }
})

export const queryCLient = new QueryClient()
