import React, {useEffect, useState} from 'react'
import useRafState from '@/hooks/useRafState'
import { Button } from 'antd'
import useRafReactive from '@/hooks/useRafReactive'

/**
 * @author: hm, 2023/3/16
 * des: 简单实现延迟调度的effect
 */

const RafStateReactive = () => {
  const [count, setCount] = useRafState<number>(0)

  const personX = useRafReactive({
    age: 1,
    salary: 1000
  })

  const [age, setAge] = useState(1)
  const [salary, setSalary] = useState(1000)


  useEffect(() => {
    console.log(`小明现在的工资-${personX.salary}, 年纪-${personX.age}`)
  }, [personX.age, personX.salary])

  const handleAddDouble = () => {
    setCount((pre) => {
      return pre + 1
    })
    setCount((pre) => {
      return pre + 1
    })
  }


  useEffect(() => {
    console.log('change:', count)
  }, [count])

  console.log('update....')


  useEffect(() => {
    console.log(`小刚现在的工资-${salary}, 年纪-${age}`)
  }, [age, salary])

  const handleFn = () => {
    // Promise.resolve().then(() => {
    // })
    personX.age += 1

    personX.salary += 500
    personX.age += 1
  }

  const handleFn1 = () => {
    setAge(pre => pre + 1)
    setSalary(pre => pre + 500)
    setAge(pre => pre + 1)

  }

  return (
    <div>
      当前值： <span style={{color: 'red', fontSize: '20px'}}>{count}</span>
      <Button onClick={handleAddDouble}>两次增加</Button>
      <div >
        <div>age: {personX.age}</div>
        <div>salary: {personX.salary}</div>
      </div>
      <Button onClick={handleFn}>小明</Button>
      <hr/>
      <div >
        <div>age: {age}</div>
        <div>salary: {salary}</div>
      </div>
      <Button onClick={handleFn1}>小刚</Button>
    </div>
  )
}

export default RafStateReactive
