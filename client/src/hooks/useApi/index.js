import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Error404Page from '../../pages/Error404Page'

const useApi = (url, autoFetch = true, options = { method: 'GET', credentials: 'include' }) => {
  const { clearUser } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  const fetchApi = async () => {
    setError()
    setLoading(true)

    try {
      const res = await fetch(url, options)

      const content = await res.json();

      // login redirect
      if (res.status === 401 || res.status === 403) {
        clearUser()
        navigate('/signin')
      }

      // 404 page
      if (res.status === 404) {
        setError(<Error404Page />)
      }

      // If the response is not 200 throw an error
      if (res.status !== 200) {
        setError(res.msg)
      }

      // set the content and leave loading state
      setData(content)
      setLoading(false)
      return { loading: false, error: '', data: content }
    }
    catch (err) {
      setLoading(false)
      let errText = err.message
      if (errText === 'Failed to fetch') {
        errText = 'Server could not be reached. Check your internet connection.'
      }
      setError(errText)
      return { error: err.message, data: {}, loading: false }
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchApi()
    }
  }, [])

  return { loading, error, data, fetchApi }
};


export default useApi;