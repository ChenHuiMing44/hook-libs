import useLatest  from './useLatest'
import {useEffect} from 'react'

const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn)
  useEffect(() => () => {
    fnRef.current?.()
  }, [])
}


export default useUnmount
