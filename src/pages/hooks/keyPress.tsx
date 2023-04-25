import React, { useRef } from 'react'
import useKeyPress from '@/hooks/useKeyPress'

const KeyPress = () => {

  const inputRef = useRef<HTMLInputElement>(null)

  useKeyPress('shift.a', (event) => {
    console.log('shift.a', event)
  }, { target: inputRef })

  return (
    <div className={'app-container'}>
      <div>
        这个页面什么都没有，单纯的键盘事件
      </div>
      <input ref={inputRef} placeholder={'试试这个输入框的时间'}/>
    </div>
  )
}

export default KeyPress
