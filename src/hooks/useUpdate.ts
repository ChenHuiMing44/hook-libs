/**
 * @author: hm, 2022/10/19
 * des: 这个不是触发更新的回调， 这个单纯是外部手动触发更新的方法
 */
import {useCallback, useState} from 'react'


export default function useUpdate() {
  const [_, setState] = useState({})

  return useCallback(() => {
    setState({})
  }, [])
}

