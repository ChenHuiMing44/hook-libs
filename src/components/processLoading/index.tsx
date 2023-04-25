import React from 'react'
import {mergeNew} from '@/utils/shared'
import styled from './style.module.less'

type Props = {
  value: number, //上限 100
  title: string,
  description: string
  status: 'normal' | 'loading' | 'success' | 'failed',
  size?: 'large' | 'middle' | 'small',
  visible: boolean,
  onSuccess?: () => void,
  onFail?: () => void
}

const defaultProps = {
  size: 'middle'
}

const getStatusText = (status: string) => {
  if (status === 'loading') {
    return '上传中...'
  }
  if(status === 'success') {
    return '上传完成'
  }
  return ''
}

const ProcessLoading = (props: Props) => {
  const { value, title, description, status, visible } = mergeNew(defaultProps, props)

  if(!visible) {
    return null
  }
  return (
    <div className={styled.processBack}>
      <div className={ styled.processLoading }>
        <div className="process-content">
          <div className="left">
            <div className="title-line">{title}</div>
            <div className="description-line">{description}</div>
          </div>
          <div className="right">{getStatusText(status)}</div>
        </div>
        <div className="percent" style={{transform: `scaleX(calc(${value} / 100))`}}>
          <div className="process"/>
        </div>
      </div>
    </div>
  )
}

export default ProcessLoading
