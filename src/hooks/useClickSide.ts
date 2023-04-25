import { BasicTarget } from '../utils/dom'
import { getTargetElement, getShadow } from '../utils/dom'
import useLatest from './useLatest'
import {useEffect} from 'react'

export default function useClickSide<T extends Event = Event>(
  onClickSide: (event: T) => void,
  target: BasicTarget | BasicTarget[] | null,
  eventName: string | string[] = 'click'
) {
  const onClickSideRef = useLatest(onClickSide)
  useEffect(() => {
    const handler = (event: any) => {
      if(target) {
        const targets = Array.isArray(target) ? target : [target]
        if(targets.some((item) => {
          const targetElement = getTargetElement(item)
          return !targetElement || targetElement instanceof Window || targetElement.contains(event.target)
        })) {
          return
        }
        onClickSideRef.current(event)
      }
    }
    const shadowDom = target && getShadow(target)

    const eventNames = Array.isArray(eventName) ? eventName : [eventName]

    eventNames.forEach((event) => shadowDom?.addEventListener(event, handler))

    return () => {
      eventNames.forEach((event) => shadowDom?.removeEventListener(event, handler))
    }

  }, [])


}
