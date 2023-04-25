/**
 * @author: hm, 2023-3-23
 * des: 做全局数据更新的订阅发布模式基类
 *      之前一直写的是 class 继承方式  现在吧 觉得稍微有点麻烦  就写成函数了，
 *      完全抛开了class类，但是麻烦点是写了一些全局变量 取舍吧
 */

/**
 * This function provides a handleUpdate, subscribe,
 * and unsubscribe methods that can be used to manage a set of subscribers.
 * handleUpdate allows you to send data to all the subscribers,
 * while subscribe and unsubscribe allow you to add and remove subscribers from the set.
 */
type Subscriber = (...args: any[]) => void

export const getSubscribe = () => {

  const subscribers: Set<Subscriber> = new Set()

  function handleUpdate(...args: any[]) {
    subscribers.forEach(subscriber => subscriber(...args))
  }

  const subscribe = (cb: Subscriber) => {
    subscribers.add(cb)
  }

  const unsubscribe = (cb: Subscriber) => {
    subscribers.delete(cb)
  }
  return {
    handleUpdate,
    subscribe,
    unsubscribe,
  }
}
