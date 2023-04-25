import { isObj } from '@/utils/obj'
import useUpdate from '@/hooks/useUpdate'
import {useRef} from 'react'
import useCreation from '@/hooks/useCreation'

/**
 * @author: hm, 2022/10/19
 * des: 类似于 vue中的reactive
 */

// k:v 原对象:代理过的对象
const proxyMap = new WeakMap()
// k:v 代理过的对象:原对象
const rawMap = new WeakMap()

export function observer<T extends Record<string, any>>(initialVal: T, cb: () => void ) :T {

  const existingProxy = proxyMap.get(initialVal)

  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy
  }

  // 防止代理已经代理过的对象 vue3的reactive 源码就是这样的
  if (rawMap.has(initialVal)) {
    return initialVal
  }
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      //is deep
      return isObj(res) ? observer(res, cb) : Reflect.get(target, key)
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val)
      cb()
      return ret
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key)
      cb()
      return ret
    },
  })

  proxyMap.set(initialVal, proxy)
  rawMap.set(proxy, initialVal)

  return proxy
}


export default function useReactive<T extends Record<string, any>>(initialState: T): T {
  const update = useUpdate()
  const stateRef = useRef<T>(initialState)
  const state = useCreation<T>(() => observer(stateRef.current, () => update()), [])
  return state
}
