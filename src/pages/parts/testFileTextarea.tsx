import React, {useEffect, useRef, useState} from 'react'
import FileTextarea from '@/pages/parts/components/fileTextarea'
import FileTextarea1 from '@/pages/parts/components/fileTextarea1'

const v =  [
    {
      'type': 'paragraph',
      'children': [
        {
          'text': '日常工作常用的APP，主要包括以下：1.三一飞书，主要用于即时沟通、日程管理、文档协作、音视频会议，是三一全体员工工作交流必须的APP。'
        }
      ]
    },
    {
      'type': 'paragraph',
      'children': [
        {
          'text': ''
        },
        {
          'type': 'image',
          'src': 'http://x.x.x.x:8050/robot_manager/file/downloadPicture/17b7aa49-71e5-4509-8404-30de06791e4e.png',
          'children': [
            {
              'text': 'dabingww.png'
            }
          ]
        },
        {
          'text': ''
        }
      ]
    },
    {
      'type': 'paragraph',
      'children': [
        {
          'text': ''
        },
        {
          'type': 'vedio',
          'src': 'http://x.x.x.x:8050/robot_manager/file/downloadPicture/17b7aa49-71e5-4509-8404-30de06791e4e.mp4',
          'children': [
            {
              'text': '查看OA流程.mp4'
            }
          ]
        },
        {
          'text': ''
        }
      ]
    },
    {
      'type': 'paragraph',
      'children': [
        {
          'text': ''
        },
        {
          'type': 'link',
          'src': 'https://rs2flu7c17.work.sany.com.cn/drive/folder/fldk5zpdzenqrUWdz0Tl4s3dkc',
          'children': [
            {
              'text': '详细资料链接'
            }
          ]
        },
        {
          'text': ''
        }
      ]
    }
  ]

const TestFileTextarea = () => {
  // const targetV = useRef('[{"type":"paragraph","children":[{"text":"你好啊这个是有问题的拉"}]}]')
  const [defaultV, setDefaultV] = useState('')
  // useEffect(() => {
  //   setTimeout(() => {
  //     setDefaultV?.('[{"type":"paragraph","children":[{"text":"你好啊这个是有问题的拉"}]}]')
  //   },3000)
  // }, [])
  const [target, setTarget] = useState('')
  return (
    <div>
      <FileTextarea defaultValue={defaultV} changeJson={(v) => setTarget(v)}/>
      <hr/>
      <div>
        {target}
      </div>
    </div>
  )
}

export default TestFileTextarea
