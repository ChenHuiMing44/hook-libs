/**
 * @author: hm, 2022/10/19
 * des: 工厂化创建有个ref对象
 */
import {DependencyList, useRef} from 'react'
import {isEqual} from '@/utils/obj'

export default function useCreation<T>(factory: () => T, deps: DependencyList) {
  const { current } = useRef({
    obj: undefined as undefined | T,
    deps,
    init: false
  })

  if(!current.init || !isEqual(deps, current.deps)) {
    current.obj = factory()
    current.deps = deps
    current.init = true
  }

  return current.obj as T
}
