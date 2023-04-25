import React, {useEffect, useRef, useState} from 'react'
import styled from './dialog.module.scss'
import { getSizeStr } from '@/utils/style'
import useAnimateTransition, {AnimateCls} from '@/hooks/useAnimateTransition'

export type Props = {
  visible: boolean,
  title?: string,
  width?: string | number,
  customClass?: string,
  showClose?: boolean,
  onClose?: () => void,
  onFinal?: (arg: boolean) => void,
  target?: HTMLElement | (() => HTMLElement),
  children?: JSX.Element | JSX.Element[] | string
}
const Dialog = (props: Props) => {
  const { visible, title = '操作', width = 600, customClass, showClose = true, children, onClose, onFinal } = props

  const [mount, setMount] = useState(false)

  useEffect(() => {
    if(visible) {
      setMount(true)
    }
  }, [visible])

  const dialogWrapper = useRef<HTMLDivElement>(null)

  const cls: AnimateCls = {
    enter: styled.enter,
    entering: styled.enterActive,
    entered: styled.enterDone,
    leave: styled.exit,
    leaving: styled.exitActive,
    left: styled.exitDone
  }
  const [active, aniClassName] = useAnimateTransition(visible, dialogWrapper, cls, (final) => onFinal?.(final))

  const handleClose = () => {
    onClose?.()
  }
  if(!mount) {
    return null
  }

  const displayNone = !visible && !active

  return (
    <div className={`${styled.dialogWrapper} ${aniClassName} ${customClass || ''} ${displayNone ? 'display-none': ''}`} ref={dialogWrapper} onClick={handleClose} >
      <div className={styled.dialogContent} onClick={(e) => e.stopPropagation()} style={{ width: getSizeStr(width) }}>
        <header className={styled.headerLine}>
          <span className={styled.title}>{title}</span>
          {
            showClose ? (
              <button className={styled.closeBtn} onClick={() => onClose?.()}>
                <i className={'iconfont icon-shanchu1'}/>
              </button>
            ) : null
          }
        </header>
        <div className={styled.dialogBody}>
          {children }
        </div>
      </div>
    </div>
  )
}

export default Dialog
