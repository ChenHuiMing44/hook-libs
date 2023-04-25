import React, {useEffect, useRef, useState} from 'react'

const url = 'https://img01.jalannews.jp/img/2021/07/20210729_aki-kotoba_005-670x443.jpg'
const url1 = 'https://picd.zhimg.com/0aa67e6a4a1ac457853d13e2f6f3be8d_xl.jpg?source=32738c0c'

const TestOnload = () => {

  const domRef = useRef<HTMLDivElement>(null)

  const imgRef = useRef<HTMLImageElement>(null)

  const [cUrl, setCurl] = useState('')

  useEffect(() => {

    setTimeout(() => {
      setCurl(url)
    }, 3000)

    domRef.current?.addEventListener('load', (e) => {
      const paths = e.composedPath()
      if(paths && paths.length) {
        const dom = paths[0] as HTMLElement
        if(dom.tagName === 'IMG') {
          console.log('监听到onload')
        }
      }
      //这个时候尴尬点在于  target 没有值
    }, true)
  }, [])

  return (
    <>
      <img alt={''} style={{height: '100px', width: '120px'}} src={url1} />
      <div ref={domRef}>
        {cUrl && <img alt={''} style={{height: '100px', width: '120px'}} src={cUrl}/>}
      </div>
    </>
  )
}

export default TestOnload
