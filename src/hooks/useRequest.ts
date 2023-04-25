import { useState, useCallback } from 'react'
import axios, { AxiosResponse } from 'axios'

interface RequestOptions {
  url: string;
  method: string;
  data?: any;
}

//useRequest hook helps us to make requests, store the data, error or loading status,
// that we got in response.
//It takes a RequestOptions as a parameter and returns an object with data,
// error, loading and a makeRequest function.
const useRequest = () => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const makeRequest = useCallback(async (options: RequestOptions) => {
    try {
      setLoading(true)
      const response: AxiosResponse = await axios(options)
      setData(response.data)
    } catch (err: any) {
      setError(err.response?.data ?? err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, error, loading, makeRequest }
}

export default useRequest
