import React from 'react'
import {Button} from 'antd'

type Props = {
  name?: string,
  age: number,
  onSuccess: (arg?: any) => void,
  onCancel: () => void
}

const TestApi1 = (props: Props) => {
  const confirm = () => {
    props.onSuccess('这个是返回参数')
  }

  return (
    <div>
      <div className="line">name: {props.name}</div>
      <div className="line">age: {props.age}</div>
      <div><input /></div>
      <Button type={'primary'} onClick={confirm}>确定</Button>
      <Button onClick={() => props.onCancel()}>取消</Button>
    </div>
  )
}

export default TestApi1
