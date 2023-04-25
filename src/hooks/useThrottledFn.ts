import { useEffect, useRef, useCallback } from 'react'

type ThrottleFn = (...args: any[]) => void;

/**
 * useThrottledFn: Custom hook implementation for throttling a function
 * @param fn          Function to be throttled
 * @param interval    Throttle time in milliseconds. Default: 1000
 * @returns ThrottleFn Throttled function
 */
function useThrottledFn(fn: ThrottleFn, interval = 1000): ThrottleFn {
  const lastArgsRef = useRef<any[]>([])
  const timerRef = useRef<number | null>(null)

  /**
   * This is a useCallback hook that defines a throttledFn that,
   * when called, delays the invocation of the passed fn for a given interval.
   * The lastArgsRef and timerRef variables are used to store the last arguments and the timer for the delayed invocation.
   * */
  const throttledFn = useCallback<ThrottleFn>((...args: any[]) => {
    lastArgsRef.current = args
    if (!timerRef.current) {
      timerRef.current = window.setTimeout(() => {
        fn(...lastArgsRef.current)
        timerRef.current = null
      }, interval)
    }
  }, [fn, interval])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  return throttledFn
}

export default useThrottledFn
