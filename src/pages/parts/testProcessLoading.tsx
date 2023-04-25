import React, {useEffect, useMemo, useRef, useState} from 'react'
import ProcessLoading from '@/components/processLoading'
import {Button} from 'antd'

/**
 * @author: hm, 2023/4/23
 * des: 20以内的随机数
 */
const getRandomNu = (nu = 3, isInteger?: boolean) => {
  const target =  Math.random() * nu
  return isInteger ? Math.ceil(target) : Number(target.toFixed(2))
}

const TestProcessLoading = () => {

  const timeList = useRef<Array<number>>([])
  const [percent, setPercent] = useState({ total: 0, current: 0 })
  const [status, setStatus] = useState<'normal' | 'loading' | 'success' | 'failed'>('normal')
  const [visible, setVisible] = useState(false)

  const initStatus = () => {
    const list = []
    let total = 0
    for(let i = 0; i < 10; i++) {
      const num = getRandomNu()
      list.push(num)
      total += num
    }
    timeList.current = list
    setPercent({ current: 0, total: Number(total.toFixed(2)) })
  }

  const onStart = (i = 0) => {
    if(i < timeList.current.length ) {
      setTimeout(() => {
        setPercent((prev) => {
          const current = Number((prev.current + timeList.current[i]).toFixed(2))
          return { ...prev, current }
        })
        onStart(i + 1)
      }, timeList.current[i] * 1000)
    } else {
      setStatus('success')
      setTimeout(() => {
        setVisible(false)
      }, 2500)
    }
  }
  const handleClick = () => {
    initStatus()
    onStart()
    setStatus('loading')
    setVisible(true)
  }
  const currentValue = useMemo(() => {
    if(percent.current && percent.total) {
      const rate = percent.current/percent.total
      return Number((100 * rate).toFixed(2))
    }
    return 0
  }, [percent])

  return (
    <div style={{height: '100vh', background: '#CDD9ED'}}>
      测试一下 processLoading组件
      <div style={{textAlign: 'center', margin: '40px 60px', position: 'relative'}}>
        <ProcessLoading
          title={`${timeList.current.length}个文件上传中`}
          value={currentValue}
          description={`${currentValue}% 共${percent.total}M`}
          status={status}
          visible={visible}
        />
      </div>
      <Button onClick={handleClick}>点击开始</Button>
    </div>
  )
}

export default TestProcessLoading
