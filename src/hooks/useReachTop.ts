
import useScroll, { Target } from '@/hooks/useScroll'
import {useCallback, useEffect, useState} from 'react'

export default function useReachTop(target: Target, onReachTop?: () => void) {

  const [loading, setLoading] = useState<boolean>(false)

  const [finish, setFinish] = useState<boolean>(false)

  const [position, rect, scrollTarget] = useScroll(target,
    (p) => p.direction === 'up' && p.top < 10
  )

  const reachBottom = useCallback((animate?: boolean) => {
    setTimeout(() => {
      scrollTarget(0, Math.max(rect.current.height - rect.current.innerHeight, 0), animate)
    })
  }, [scrollTarget, rect])

  useEffect(() => {
    reachBottom()
  }, [reachBottom])

  const clearLoading = useCallback((isFinish?: boolean) => {
    setLoading(false)
    setFinish(!!isFinish)
  }, [])

  const reactTop = () => {
    if(position.direction === 'up' && position.top < 10 && !loading && !finish) {
      setLoading(true)
      onReachTop?.()
    }
  }

  useEffect(() => {
    reactTop()
  }, [position])

  return {
    loading,
    setLoading,
    finish,
    setFinish,
    clearLoading,
    reachBottom
  }

}
