import React, {useMemo} from 'react'

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void
}

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>]

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?:R) {
  const [state, setState] = React.useState<D | R>(defaultValue)

  const actions = useMemo(() => {
    const reversValue = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R
    const set = (value: D | R) => setState(value)
    const toggle = () => setState((pre)=> pre === defaultValue ? reversValue : defaultValue)
    const setLeft = () => setState(defaultValue)
    const setRight = () => setState(reversValue)

    return {
      toggle,
      set,
      setLeft,
      setRight
    }
  },[])
  return [state, actions]
}

export default useToggle
