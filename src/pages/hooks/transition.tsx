import useTransition from '@/hooks/useTransition'
import { Button } from 'antd'
import React, {useRef, useState} from 'react'
import './style/style.less'
import Transition from '@/components/transition'


export default function TestTransition() {

  const [active, setActive] = useState(true)

  const { nodeRef } = useTransition<HTMLDivElement>({ active })

  const [show, setShow] = useState(true)

  const [show1, setShow1] = useState(true)

  const { nodeRef: nodeRef1, visible: visibleBox1 } = useTransition<HTMLDivElement>({ active: show, name: 'width-left', duration: 1 })

  const nodeRef2 = useRef<HTMLDivElement>(null)

  return (
    <>
      <div style={{ borderBottom: '1px solid #eee',height: '300px', margin: 'auto', padding: '30px', textAlign: 'center' }}>
        <div ref={nodeRef} className="transition-box">
          反正就是个盒子
        </div>
        <Button onClick={() => setActive(!active)}>点击{active ? '隐藏': '显示'}</Button>
      </div>
      <div style={{ borderBottom: '1px solid #eee',height: '300px', margin: 'auto', padding: '30px', textAlign: 'center', position: 'relative' }}>
        <div ref={nodeRef1} className="transition-box abslot">
          这个呢
        </div>
        <Button onClick={() => setShow(!show)}>点击{show ? '退出': '进入'}</Button>
      </div>
      <div style={{ borderBottom: '1px solid #eee',height: '300px', margin: 'auto', padding: '30px', textAlign: 'center', position: 'relative' }}>
        <Transition active={show1} noneRef={nodeRef2} duration={5} name={'fade-left'}>
          <div ref={nodeRef2} className="transition-box">
            这个是第三个盒子了
          </div>
        </Transition>
        <Button onClick={() => setShow1(!show1)}>点击{show1 ? '退出': '进入'}</Button>

      </div>

      </>
  )

}
