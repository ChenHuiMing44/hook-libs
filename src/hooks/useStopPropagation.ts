
/**
 * @author: hm, 2022/10/16
 * des: 返回一个 ref 阻止 冒泡
 */
import {getTargetElement} from '@/utils/dom'
import {useEffect, useRef} from 'react'

/**
 * @author: hm, 2022/10/17
 * des: 因为react 的事件原理  这个hook没什么卵用
 */
function useStopPropagation<T extends Element | HTMLElement>(capture?: boolean, eventName = 'click') {
  const domRef = useRef<T >(null)

  useEffect(() => {
    const dom = getTargetElement(domRef)
    const handler = (e: Event) => {
      console.log('stop', e.target === dom)
      e.stopPropagation()
    }
    dom?.addEventListener(eventName, handler, capture)
    return () => dom?.removeEventListener(eventName, handler, capture)
  }, [])
  return domRef
}

export default useStopPropagation
