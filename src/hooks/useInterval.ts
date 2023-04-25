/**
 * @author: hm, 2022/10/21
 * des: 做这个一个hook 主要是方便清理
 */
import {useCallback, useEffect, useRef} from 'react'
import useLatest from '@/hooks/useLatest'
import {isNumber} from '@/utils/shared'

export default function useInterval(
  fn: () => void,
  delay: number | undefined,
  immediate?: boolean
) {

  const fnRef = useLatest(fn)
  const timerRef = useRef<number>()


  useEffect(() => {
    if (!isNumber(delay) || (delay as number) < 0) return

    if(immediate) {
      fnRef.current()
    }
    timerRef.current = setInterval(() => {
      fnRef.current()
    }, delay)
    return () => {
      if(timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [delay])

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [])

  return clear
}
