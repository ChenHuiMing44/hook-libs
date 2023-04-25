import { observer } from '@/hooks/useReactive'
import {useCallback, useEffect, useRef} from 'react'
import useUpdate from '@/hooks/useUpdate'
import useCreation from '@/hooks/useCreation'

export default function useRafReactive<T extends Record<string, any>>(initialState: T): T {
  const ref = useRef(0)
  const update = useUpdate()
  const stateRef = useRef<T>(initialState)

  const updateReactive = useCallback((cb: () => void) => {
    cancelAnimationFrame(ref.current)
    ref.current = requestAnimationFrame(() => {
      cb()
    })
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(ref.current)
  }, [])

  const state = useCreation(() => observer(stateRef.current, () => updateReactive(update)), [])

  return state
}
