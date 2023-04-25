/**
 * @author: hm, 2023/3/16
 * des:
 */
import {useCallback, useEffect, useRef, useState} from 'react'
// import type { Dispatch, SetStateAction } from 'react'

// // @ts-ignore
// function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
// // @ts-ignore
// function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

export default function useRafState<T>(initState: T | (() => T)) {
  const [state, setState] = useState<T>(initState)

  const ref = useRef(0)

  const setRafState = useCallback((value: T | ((pre: T) => T)) => {

    cancelAnimationFrame(ref.current)

    ref.current = requestAnimationFrame(() => {
      setState(value)
    })

  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(ref.current)
  }, [])


  return [state, setRafState] as const
}
