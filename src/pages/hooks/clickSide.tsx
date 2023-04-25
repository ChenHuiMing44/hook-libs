import React, {useRef} from 'react'
import useToggle from '@/hooks/useToggle'
import useClickSide  from '@/hooks/useClickSide'
import { Button, Tag as AntTag } from 'antd'
import useMount from '@/hooks/useMount'

const ClickSide = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [status, actions] = useToggle('open', 'close')

  useMount(() => {
    actions.setRight()
  })

  useClickSide(() => {
    actions.setRight()
  }, buttonRef)



  return (
    <div className={'app-container'}>
      <Button type={'primary'} ref={buttonRef} onClick={() => actions.setLeft()}>点我置为 open</Button>
      <div>当前状态: <AntTag color={status === 'open' ? '#2db7f5': '#f50'}>{status}</AntTag></div>
      <div className={'tip-color'}>点击空白处 置为 close</div>
    </div>
  )
}

export default ClickSide
