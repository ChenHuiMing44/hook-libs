import React, {useRef, useState} from 'react'
import {mergeNew} from '@/utils/shared'
import Transition from '@/components/transition'
import { Button } from 'antd'

const NilFunc = () => ({})
type Props = {
  urlList: Array<string>,
  zIndex?: number,
  initialIndex?: number,
  hideOnClickModal?: boolean,
  onClose?: () => void,
  onSwitch?: (index: number) => void
}

const DefaultProps = {
  zIndex: 2000,
  initialIndex: 0,
  hideOnClickModel: false,
  onClose: NilFunc,
  onSwitch: NilFunc,
}

const ImageViewer = (props: Props) => {
  const { urlList, zIndex, initialIndex, hideOnClickModal, onSwitch, onClose } = mergeNew(DefaultProps, props)

  const [visible,setVisible] = useState(true)

  const onEnd = (isFinish: boolean) => {
    console.log('onEnd...', isFinish)
  }

  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ margin: '40px auto', textAlign: 'center' }}>
      <Transition active={visible} noneRef={nodeRef} duration={5} easing={'linear'} onEnd={onEnd}>
        <div
          ref={nodeRef}
          style={{
            height: '100px',
            margin: '30px auto',
            width: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'pink'
          }}
        >
          你好啊
        </div>
      </Transition>
      <Button type={'primary'} onClick={() => setVisible(!visible)}>点击显示隐藏</Button>

    </div>
  )
}

export default ImageViewer
