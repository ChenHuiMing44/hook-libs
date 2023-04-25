import {BasicTarget, getTargetElement} from '@/utils/dom'
import {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react'

export type Target = BasicTarget<Element | Document>

export type ShouldUpdate = (position: Position) => boolean

export type Direction = 'up' | 'down' | 'left' | 'right' | '' | undefined

export type Position = { left: number, top: number, direction?: Direction }

export const cubic = (value: number) => Math.pow(value, 3)

export const easeInOutCubic = (value: number): number =>
  value < 0.5 ? cubic(value * 2) / 2 : 1- cubic((1-value) * 2) / 2

export type TargetRect = {
  height: number,
  width: number,
  innerWidth: number,
  innerHeight: number,
  isSet: boolean
}

 const getDirection = (position: Position, newPosition: Position) => {
  let direction = ''
   const { left, top } = newPosition
   if(top > position.top || top < position.top) {
     direction = top > position.top ? 'down' : 'up'
   } else if(left > position.left || left < position.left) {
     direction = left > position.left ? 'right' : 'left'
   }
   return direction
 }

 const getRect = (el: Element | Document) => {
   const target = el === document ? document.documentElement : el as Element
   return {
     width: target.scrollWidth,
     height: target.scrollHeight,
     innerWidth: target.clientHeight,
     innerHeight: target.clientHeight
   }
 }

 type UseScroll = [
   Position,
   MutableRefObject<TargetRect>,
   (x: number, y: number, animate?: boolean) => void,
   () => void
]

export default function useScroll( target: Target, shouldUpdate: ShouldUpdate = () => true): UseScroll {

  // const position = useReactive({ left: 0, top: 0 })
  const [position, setPosition] = useState<Position>({ left: 0, top: 0 })

  const targetRect = useRef({
    height: 0,
    width: 0,
    innerWidth: 0,
    innerHeight: 0,
    isSet: false
  })

  const updateRect = useCallback(() => {
    // 进入房间未处理完成之前记得关门
    if(targetRect.current.isSet) {
      return
    }
    console.log('update react..')
    targetRect.current.isSet = true
    Promise.resolve().then(() => {
      const el = getTargetElement(target, document)
      if(!el) {
        return
      }
      const oldCurrent = targetRect.current
      targetRect.current = { ...getRect(el as Element | Document), isSet: false }

      setPosition((prev) => {
        const addTop = targetRect.current.height - oldCurrent.height
        const addLeft = targetRect.current.width - oldCurrent.width
        const currentLeft = Math.max(0, prev.left + addLeft)
        const currentTop = Math.max(0, prev.top + addTop)

        const ele = getTargetElement(target, document)

        if( ele === document ) {
          document.documentElement.scroll(currentLeft, currentTop)
        } else if(ele) {
          (ele as Element).scroll(currentLeft, currentTop)
        }
        if(shouldUpdate(Object.assign({}, prev, { top: currentTop, left: currentLeft }))) {
          return { ...prev, top: currentTop, left: currentLeft }
        }
        return Object.assign(prev, { top: currentTop, left: currentLeft })
      })

    })

  }, [])

  useEffect(() => {
    const el = getTargetElement(target, document)
    if(!el) {
      return
    }
    targetRect.current = { ...getRect(el as Document | Element), isSet: false }

    const updatePosition = () => {
      let newPosition: Position
      if(el === document) {
        if(document.scrollingElement) {
          const { scrollLeft: left, scrollTop: top } = document.scrollingElement
          newPosition = { left, top }
        } else {
          newPosition = {
            left: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
            top: Math.max(document.documentElement.scrollTop, document.body.scrollTop)
          }
        }
      } else {
        const left = (el as Element).scrollLeft
        const top = (el as Element).scrollTop
        newPosition = { left, top }
      }

      setPosition((prev) => {
        const direction = getDirection(prev, newPosition) as Direction
        if(shouldUpdate({...newPosition, direction })) {
          return { ...newPosition, direction }
        }

        return Object.assign(prev, { ...newPosition, direction })
      })
    }

    el.addEventListener('scroll', updatePosition)
    el.addEventListener('DOMNodeInserted', updateRect)
    return () => {
      el.removeEventListener('scroll', updatePosition)
      el.removeEventListener('DOMNodeInserted', updateRect)
    }

  }, [target])

  const scrollTarget = useCallback(
    (x: number, y: number, animate = false) => {
      updateRect()
      Promise.resolve().then(() => {
        const el = getTargetElement(target, document)
        if (!el) {
          return
        }
        const targetElement = document === el ? document.documentElement : (el as Element)
        const scrollToAnimate = (scrollX: number, scrollY: number) => {
          const beginTime = Date.now()
          const beginTop = targetElement.scrollTop
          const beginLeft = targetElement.scrollLeft
          const frameFunc = () => {
            if (!targetElement) return
            const progress = (Date.now() - beginTime) / 500
            if (progress < 1) {
              const rate = 1 - easeInOutCubic(progress)
              targetElement.scrollTop = scrollY + (beginTop - scrollY) * rate
              targetElement.scrollLeft = scrollX + (beginLeft - scrollX) * rate
              requestAnimationFrame(frameFunc)
            } else {
              targetElement.scrollTop = scrollY
              targetElement.scrollLeft = scrollX
            }
          }
          requestAnimationFrame(frameFunc)
        }
        animate ? scrollToAnimate(x, y) : targetElement.scroll(x, y)
      })
    },
    [updateRect]
  )

  return [position, targetRect, scrollTarget, updateRect]
}
