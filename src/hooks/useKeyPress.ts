/**
 * @author: hm, 2022/10/21
 * des: 键盘事件
 */
import useLatest from '@/hooks/useLatest'

import {useEffect} from 'react'
import {BasicTarget, getTargetElement} from '@/utils/dom'
import {isArray, isFunction, isNumber, isString} from '@/utils/shared'

export type keyType = string | number
export type KeyFilter = keyType | keyType[] | ((event: KeyboardEvent) => boolean);
export type Target = BasicTarget<HTMLElement>
export type KeyEvent = 'keydown' | 'keyup'

type Options = {
  events?: KeyEvent[];
  target?: Target;
}

type EventHandler = (event: KeyboardEvent) => void

const aliasKeyCodeMap = {
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pausebreak: 19,
  capslock: 20,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  leftarrow: 37,
  uparrow: 38,
  rightarrow: 39,
  downarrow: 40,
  insert: 45,
  delete: 46,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftwindowkey: 91,
  rightwindowkey: 92,
  selectkey: 93,
  numpad0: 96,
  numpad1: 97,
  numpad2: 98,
  numpad3: 99,
  numpad4: 100,
  numpad5: 101,
  numpad6: 102,
  numpad7: 103,
  numpad8: 104,
  numpad9: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimalpoint: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numlock: 144,
  scrolllock: 145,
  semicolon: 186,
  equalsign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardslash: 191,
  graveaccent: 192,
  openbracket: 219,
  backslash: 220,
  closebracket: 221,
  singlequote: 222,
}

const defaultEvents: KeyEvent[] = ['keydown']

const modifierKey = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  // 这个是command键 或者windows键盘
  meta: (event: KeyboardEvent) => event.metaKey,
}

const getFilterKey = (event: KeyboardEvent, keyFilter: keyType): boolean => {
  if(!event.key) {
    return false
  }
  if(isNumber(keyFilter)) {
    return event.keyCode === keyFilter
  }

  // 字符串依次判断是否有组合键
  const genArr = (keyFilter as string).split('.')
  let genLen = 0

  for (const key of genArr) {
    const genModifier = Reflect.get(modifierKey, key)

    const aliasKeyCode = Reflect.get(aliasKeyCodeMap, key.toLowerCase())

    if((genModifier && genModifier(event)) || (aliasKeyCode && aliasKeyCode === event.keyCode)) {
      genLen++
    }
  }
  return genLen === genArr.length
}

type KeyFilterFunc = (e: KeyboardEvent) => boolean

const formatterKey = (keyFilter: KeyFilter): KeyFilterFunc => {
  if(isFunction(keyFilter)) {
    return keyFilter as KeyFilterFunc
  }
  if(isString(keyFilter) || isNumber(keyFilter)) {
    return (event: KeyboardEvent) => getFilterKey(event, keyFilter as number | string)
  }
  if(isArray(keyFilter)) {
    return (event: KeyboardEvent) => (keyFilter as Array<string | number>).some((item) => getFilterKey(event, item))
  }
  return  keyFilter ? () => true : () => false
}

export default function useKeyPress(eventFilter: KeyFilter, handler: EventHandler, options?: Options) {

  const { events = defaultEvents, target } = options || {}
  const eventHandlerRef = useLatest(handler)

  useEffect(() => {
    const el = getTargetElement(target, window)
    if(!el) {
      return
    }

    const callbackHandler = (event: KeyboardEvent | any) => {
      const formatter = formatterKey(eventFilter)
      if(formatter(event)) {
        eventHandlerRef.current?.(event)
      }
    }
    for (const eventName of events) {
      el.addEventListener?.(eventName, callbackHandler)
    }
    return () => {
      for (const eventName of events) {
        el.removeEventListener?.(eventName, callbackHandler)
      }
    }

  }, [events])
}
