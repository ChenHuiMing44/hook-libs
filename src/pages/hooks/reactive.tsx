import React from 'react'
import useReactive from '@/hooks/useReactive'
import {InputNumber} from 'antd'

const Reactive = () => {
  const state = useReactive({
    age: 14,
    count: 0
  })
  return (
    <div className={'app-container'}>
      <div>age: <InputNumber defaultValue={state.age} onChange={(age) => (state.age = age || 0)}/></div>
      <div>count: <InputNumber defaultValue={state.count} onChange={(count) => (state.count = count || 0)}/></div>
      <div>lastUpdate: {Date.now()}</div>
    </div>
  )
}

export default Reactive
