import React, {useCallback, useEffect, useRef} from 'react'
import useReachTop from '@/hooks/useReachTop'
import useReactive from '@/hooks/useReactive'
import * as Utils from '@/utils/utils'
import styled from './style/reachTop.module.scss'
import {Button} from 'antd'

const getRandomColor = function(){
  let v = Math.floor(Math.random()*16777214).toString(16)
  for (let i = v.length; i < 6; i++) {
    v = `0${v}`
  }
  return `#${v}`
}

const reachList = (start: number) => new Promise((resolve) => {
  const r = Utils.getRandomCode()
  const c = getRandomColor()
  console.log(c)
  setTimeout(() => {
    resolve([
      { key: start + 7, code: Utils.getRandomCode(), r, c },
      { key: start + 6, code: Utils.getRandomCode(), r, c },
      { key: start + 5, code: Utils.getRandomCode(), r, c },
      { key: start + 4, code: Utils.getRandomCode(), r, c },
      { key: start + 3, code: Utils.getRandomCode(), r, c },
      { key: start + 2, code: Utils.getRandomCode(), r, c },
      { key: start + 1, code: Utils.getRandomCode(), r, c }
    ])
  }, 2000)
})

const ReachTop = () => {
  const state = useReactive<{list: any[], total: number}>({
    list: [],
    total: 89
  })
  const scrollDom = useRef<HTMLDivElement>(null)
  const queryList = useCallback(() => {
    reachList(state.list.length).then((list) => {
      clearLoading()
      state.list = [...(list as Array<any>), ...state.list] // (list as Array<any>).concat(state.list)
      state.list.length >= state.total && setFinish(true)
    }).catch(err => {
      clearLoading()
      console.error(err)
    })
  }, [])
  const { loading, finish, setFinish, clearLoading } = useReachTop(scrollDom, () => {
    console.log('reach top...')
    queryList()
  })
  useEffect(() => {
    console.log('effect......')
    queryList()
  }, [])

  const tapAddCount = () => {
    const r = Utils.getRandomCode()
    const c = getRandomColor()
    console.log(c)
    state.list.push({ key: 0, code: Utils.getRandomCode(), r, c })
  }

  return (
    <div className={'app-container'}>
      页面为reach top
      <div ref={scrollDom} className={styled.scrollDom}>
        { !finish &&  <div className={styled.loadingBox}>{loading ? 'loading...' : ''}</div> }
        <div className={styled.scrollList}>
          {
            state.list.map(item => (
              <div className={styled.scrollItem} style={{background: item.c}} key={item.code}>{item.key}-{item.r}</div>
            ))
          }
        </div>
      </div>
      <Button type={'primary'} onClick={() => tapAddCount()}>+1</Button>
    </div>
  )
}

export default ReachTop
