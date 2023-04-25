import {MutableRefObject} from 'react'

type TargetValue<T> = T | undefined | null

export type TargetType = HTMLElement | Element | Window | Document

export type BasicTarget<T extends TargetType = Element> = (() => TargetValue<T>) | TargetValue<T> | MutableRefObject<TargetValue<T>>

export const getTargetElement = <T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) => {

  if(!target) {
    return defaultElement
  }

  let targetElement: TargetValue<TargetType>

  if(typeof target === 'function') {
    targetElement = target()
  } else if('current' in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }

  return targetElement
}



export const getShadow = (target: BasicTarget | BasicTarget[]) : Document | Node => {
  if(!target || !document.getRootNode) {
    return document
  }
  const targets = Array.isArray(target) ? target : [target]
  if(targets.length && (getTargetElement(targets[0]) as Element | HTMLElement).getRootNode) {
    return (getTargetElement(targets[0]) as Element | HTMLElement).getRootNode()
  }
  return document
}


export const resolveContainer = (getContainer: HTMLElement | (() => HTMLElement) | undefined): HTMLElement => {
  const container =
    typeof getContainer === 'function' ? getContainer() : getContainer
  return container || document.body
}


export const addClassName = (dom: Element | null, cls: string) => {
  if(dom && cls) {
    dom.classList.add(cls)
  }
}

export const removeClassName = (dom: Element | null, cls: string) => {
  if(dom && cls) {
    dom.classList.remove(cls)
  }
}

export const nextFrame = (cb: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb)
  })
}
