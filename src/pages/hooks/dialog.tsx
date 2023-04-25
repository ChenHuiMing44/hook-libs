import React from 'react'
import useToggle from '@/hooks/useToggle'
import { Button } from 'antd'
import Dialog from '@/components/dialog'
import TestApi1 from '@/pages/hooks/components/testApi1'
import TestApi2 from '@/pages/hooks/components/testApi2'

const DialogPage = () => {
  const [showDialog, actions] = useToggle<boolean>()
  const handleDialog = () => {
    Dialog.show(TestApi1, { name: 'this is name', age: 31 }, { title: '这个是标题' }).then(res => {
      console.log('response: ', res)
    }).catch(err => {
      console.error(err)
    })
  }
  const handleDialog2 = () => {
    Dialog.show(TestApi2, null, { title: '这个是标题222222' }).then(res => {
      console.log('response: ', res)
    }).catch(err => {
      console.error(err)
    })
  }
  return (
    <div className={'app-container'}>
      <Button type={'primary'} onClick={() => actions.setRight()}>打开dialog</Button>
      <Button type={'primary'} onClick={handleDialog}>点击Api弹窗1</Button>
      <Button type={'primary'} onClick={handleDialog2}>点击Api弹窗2</Button>
      <Dialog title={'这是测试弹窗'} visible={showDialog} onClose={() => actions.setLeft()}>
        这个是弹窗内容
      </Dialog>
    </div>
  )
}

export default DialogPage

