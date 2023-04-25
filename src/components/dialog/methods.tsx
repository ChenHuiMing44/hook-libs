
import DialogBase, { Props } from './dialog'
import React, {useRef} from 'react'
import { createRoot } from 'react-dom/client'
import { resolveContainer } from '@/utils/dom'
import { useEffect, useState } from 'react'
import { isEqual } from '@/utils/obj'

const noop: () => void = () => ({})
interface Container extends HTMLDivElement {
  lastTemplate?: {
    options?: any,
    params?: any,
    ChildSlot?:any,
    once?: boolean,
    methods: {
      toggleVisible: (visible: boolean) => void,
      destroy:() => void
    }
  }
}

/**
 * @author: hm, 2022/10/19
 * des: 写个奇奇怪怪的名字 应该不至于重复了吧
 */
const rootId = 'HOOKS_MARK_DIALOG_ROOT'

type ChildComponent = React.ElementType
  // React.Component<any, any> | React.FC<any> | ((props: any) => JSX.Element) | React.FunctionComponent | null

export interface DialogInstance {
  (props: Props): React.ReactElement,
  mount: (ChildSlot: ChildComponent, params: any, options: any, once?: boolean) => Promise<any>,
  once: (ChildSlot: ChildComponent, params: any, options: any) => Promise<any>
  show:  (ChildSlot: ChildComponent, params: any, options: any) => Promise<any>
}

const Dialog = DialogBase as DialogInstance

Dialog.mount = (ChildSlot: ChildComponent, params: any, options: any, once?: boolean) => new Promise((resolve) => {
  const defaultOptions = {
    title: '请操作',
    width: '600px',
    modal: true,
    showClose: true,
    center: false,
    appendToBody: false,
  }
  const {
    onFinal,
    ...restOptions
  } = options

  const userContainer = resolveContainer(options.target)

  const container : Container = document.createElement('div')
  container.setAttribute('id', rootId)
  const oldDom = document.querySelector(`#${rootId}`) as (Container | null)
  if(!once && oldDom) {
    if(
      oldDom?.lastTemplate?.ChildSlot === ChildSlot &&
      oldDom?.lastTemplate?.once === once &&
      isEqual(oldDom?.lastTemplate?.options, options) &&
      isEqual(oldDom?.lastTemplate?.params, params)
    ) {
      oldDom?.lastTemplate?.methods.toggleVisible(true)
      return
    } else {
      oldDom?.lastTemplate?.methods.destroy()
    }
  }
  const root = createRoot(container)
  userContainer.appendChild(container)
  const methods = {
    destroy: noop,
    toggleVisible: noop
  }

  const handlerOps = (type: string, arg?: any) => {
    type === 'resolve' ? resolve(arg) : resolve(Promise.reject())
  }

  const Wrapper = (wrapperProps: { handler: (type: string, arg?: any) => void }) => {
    const { handler } = wrapperProps
    const [visible, setVisible] = useState(false)
    const lastHandler = useRef<string>('')
    methods.toggleVisible = (visible?:boolean) => {
      setVisible(!!visible)
    }
    useEffect(() => {
      setVisible(true)
    }, [])

    methods.destroy = () => {
      setVisible(false)
      root?.unmount()
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
    }
    const _afterClose = () => {
      if (onFinal) {
        onFinal(true)
      }
      //if success
      if(once || lastHandler.current === 'resolve') {
        methods.destroy()
      }
    }
    const hand = (type:string, arg?: any) => {
      setVisible(false)
      lastHandler.current = type
      handler(type, arg)
    }
    return (
      <DialogBase
        {...defaultOptions}
        {...restOptions}
        visible={visible}
        target={() => container}
        onClose={() => hand('reject')}
        onFinal={(final) => final && _afterClose()}
      >
        { ChildSlot ? (<ChildSlot {...params} onSuccess={(arg?:any) => hand('resolve', arg)} onCancel={() => hand('reject')}/>) : undefined}
      </DialogBase>
    )
  }

  root.render(<Wrapper handler={handlerOps}/>)
  container.lastTemplate = {
    options,
    methods,
    params,
    ChildSlot,
    once
  }

  return methods
})


Dialog.show = (ChildSlot: ChildComponent, params: any, props: any) => Dialog.mount(ChildSlot, params, props)

Dialog.once = (ChildSlot: ChildComponent, params: any, props: any) => Dialog.mount(ChildSlot, params, props, true)

export default Dialog

