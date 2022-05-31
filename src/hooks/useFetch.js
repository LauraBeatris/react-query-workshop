import { useEffect, useState } from 'react'

/**
 * Fetches data from a given URL and handles error and loading state
 * @param {String} url
 */
export function useFetch (url) {
  const [data, setData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [])

  return { data, isFetching, error }
}
