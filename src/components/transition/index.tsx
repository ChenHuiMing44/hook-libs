import React, { RefObject, useEffect, useState} from 'react'
import { mergeNew} from '@/utils/shared'
import './style.less'
import {addClassName, nextFrame, removeClassName} from '@/utils/dom'

const NilFunc = () =>({})

export type TransitionProps = {
  active: boolean, //这个地方用in关键字 会报错
  noneRef: RefObject<Element>,
  name?: string,
  enterCls?: string,
  leaveCls?: string,
  duration?: number,
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out',
  onEnd?: (isFinish: boolean) => void,
  children: JSX.Element | null,
}
const DefaultProps = {
  onEnd: NilFunc,
  duration: 0.3,
  easing: 'ease-in-out'
}
const Transition = (props: TransitionProps) => {
  // merge(props.children.props, { className: 'abcd' })

  const { active, name, noneRef, enterCls, leaveCls, duration, easing, onEnd } = mergeNew(DefaultProps, props)

  const [realVisible, setRealVisible] = useState(active)

  const getPrefix = () => {
    return (active ? enterCls : leaveCls) || name || 'h-transition'
  }

  const getClsKey = () => {
    const prefix = getPrefix()
    return `${prefix}-${active ? 'enter': 'leave'}`
  }


  useEffect(() => {
    if(active) {
      setRealVisible(true)
    }
  }, [active])

  useEffect(() => {
    if(!realVisible) {
      return
    }
    const finished = () => {
      if(dom) {
        (dom as HTMLElement).style.transitionDuration = '';
        (dom as HTMLElement).style.transformStyle = ''
        const clsKey = getClsKey()
        removeClassName(dom, `${clsKey}-active`)
        onEnd(!active)
        !active && setRealVisible(false)
      }
    }
    const dom = noneRef.current
    if(dom) {
      const clsKey = getClsKey()
      removeClassName(dom, `${getPrefix()}-enter-to`)
      removeClassName(dom, `${getPrefix()}-leave-to`)
      addClassName(dom, `${clsKey}-from`)
      addClassName(dom, `${clsKey}-active`)
      if(duration) {
        (dom as HTMLElement).style.transitionDuration = `${duration}s`
      }
    if(easing) {
      (dom as HTMLElement).style.transformStyle = easing
    }
      //为啥写两个  vue 源码说的
      // nextFrame(() => {
      //
      // })
      setTimeout(() => {
        removeClassName(dom, `${clsKey}-from`)
        addClassName(dom, `${clsKey}-to`)
      }, 100)
      dom?.addEventListener('transitionend', finished)
    }
    return () => {
      dom && dom.removeEventListener('transitionend', finished)
    }
  }, [active, realVisible, noneRef])

  if(!props.children) {
    return null
  }
  // return realVisible ? props.children : null
  return props.children
}

export default Transition
