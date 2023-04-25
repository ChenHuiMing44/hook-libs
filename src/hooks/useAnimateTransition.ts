import useToggle from '@/hooks/useToggle'
import {useEffect, useState} from 'react'
import {BasicTarget, getTargetElement} from '@/utils/dom'

export interface AnimateCls {
  enter?: string,
  entering?: string,
  entered?:string,  //这两个理论上可以缺失
  leave?: string,
  leaving?: string,
  left?:string //这个是leave 过去式
}

const useAnimateTransition = (visible: boolean,target: BasicTarget | null, animateCls: AnimateCls, onAnimateFinish?: (isFinish: boolean) => void) => {

  const [active, activeActions] = useToggle()

  const [aniClassName, setAniClassName] = useState<string>('')

  useEffect(()=> {
    const handler = () => {
      setAniClassName((visible ? animateCls.entered : animateCls.left) || '')
      onAnimateFinish?.(!visible)
      if (!visible) {
        activeActions.setLeft()
      }
    }

    const targetDom = getTargetElement(target)

    targetDom?.addEventListener('transitionend', handler)

    return () => targetDom?.removeEventListener('transitionend', handler)

  }, [visible])

  useEffect(() => {
    if (visible) {
      activeActions.setRight()
      setAniClassName(animateCls.enter || '')
      setTimeout(() => {
        setAniClassName(animateCls.entering || '')
      })
    } else {
      setAniClassName(animateCls.leave || '')
      setTimeout(() => {
        setAniClassName(animateCls.leaving || '')
      })
    }
  }, [visible])


  return [active, aniClassName ]
}

export default useAnimateTransition
