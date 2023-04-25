/**
 * @author: hm, 2023/1/27
 * des: 虚拟list  就是动态表格
 */
import {useRef, useState} from 'react'
import useMemoizedFn from '@/hooks/useMemoizedFn'

type ItemHeight<T> = (index: number, data: T) => number;

export interface Options<T> {

  itemHeight: number | ItemHeight<T>
  //视野区上下额外显示的数量
  overscan: number
}

export default function useVirtualList<T = any>(list: Array<T>, options: any) {
  console.error(list, options)

  const [target, setTarget] = useState<Array<T>>([])

  const scrollByFn = useRef(false)

  const scrollTo = (index: number) => {
    console.log('scroll to: ', index)
  }




  return [target, useMemoizedFn(scrollTo)] as const // 属性标记只读
}
