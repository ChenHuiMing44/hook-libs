
/**
 * @author: hm, 2022/11/21
 * des: 返回
 */
import {useEffect, useRef, useState} from 'react'
import {addClassName, nextFrame, removeClassName} from '@/utils/dom'
import {mergeNew} from '@/utils/shared'
import '@/components/transition/style.less'

const NilFunc = () => ({})

type TransitionProps = {
  active: boolean, //这个地方用in关键字 会报错
  name?: string,
  enterCls?: string,
  leaveCls?: string,
  duration?: number,
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out',
  onEnd?: (isFinish: boolean) => void
}

const DefaultProps = {
  onEnd: NilFunc,
  duration: 0.3,
  easing: 'ease-in-out'
}

export default function useTransition<T extends HTMLElement>(props: TransitionProps) {
  const nodeRef = useRef<T>(null)

  const { active, name, enterCls, leaveCls, duration, easing, onEnd } = mergeNew(DefaultProps, props)

  const [visible, setVisible] = useState(() => active)

  const getPrefix = () => {
    return (active ? enterCls : leaveCls) || name || 'h-transition'
  }

  const getClsKey = () => {
    const prefix = getPrefix()
    return `${prefix}-${active ? 'enter': 'leave'}`
  }


  useEffect(() => {
    if(active) {
      setVisible(true)
    }
  }, [active])

  useEffect(() => {
    if(!visible) {
      return
    }
    const finished = () => {
      if(dom) {
        (dom as HTMLElement).style.transitionDuration = '';
        (dom as HTMLElement).style.transformStyle = ''
        const clsKey = getClsKey()
        removeClassName(dom, `${clsKey}-active`)
        onEnd(!active)
        !active && setVisible(false)
      }
    }
    const dom = nodeRef?.current

    if(dom) {
      const clsKey = getClsKey()
      removeClassName(dom, `${getPrefix()}-enter-to`)
      removeClassName(dom, `${getPrefix()}-leave-to`)
      nextFrame(() => {
        addClassName(dom, `${clsKey}-from`)
        addClassName(dom, `${clsKey}-active`)
        console.log(`${clsKey}-from`)
        if(duration) {
          (dom as HTMLElement).style.transitionDuration = `${duration}s`
        }
        if(easing) {
          (dom as HTMLElement).style.transformStyle = easing
        }
        //为啥写两个  vue 源码说的
        nextFrame(() => {
          removeClassName(dom, `${clsKey}-from`)
          addClassName(dom, `${clsKey}-to`)
        })
        dom.addEventListener('transitionend', finished)
      })

    }
    return () => {
      dom && dom.removeEventListener('transitionend', finished)
    }
  }, [active, visible, nodeRef])

  return { nodeRef, visible }
}
