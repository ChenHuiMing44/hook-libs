import React, {useState} from 'react'
import {Button} from 'antd'

type Props = {
  onSuccess: (arg: string) => void,
  onCancel: () => void
}

const TestApi2 = (props: Props) => {
  const [inputValue, setInputValue] = useState('')
  const confirm = () => {
    props.onSuccess(inputValue)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      这个准备随便返回一个看看，反正很头大了
      <input defaultValue={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      <div style={{marginTop: '30px'}}>
        <Button type={'default'} onClick={() => props?.onCancel()}>取消</Button>
        <Button type={'primary'} onClick={() => confirm()}>确定</Button>
      </div>
    </div>
  )
}

export default TestApi2
