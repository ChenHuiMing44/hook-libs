import React from 'react'
import {Button, Card} from 'antd'

const Preview = () => {

  const handleTap = () => {
    console.log(111)
  }

  return (
    <div className={'app-container'}>
      <Card title={'这个是title'}>
        <Button onClick={handleTap}>点击一下module框</Button>
      </Card>
    </div>
  )
}

export default Preview
