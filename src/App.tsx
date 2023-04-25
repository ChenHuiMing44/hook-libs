import React, {useEffect} from 'react'
import Router from '@/router'
import styled from './app.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import {routeModules} from '@/router/routes'
import { getPathLast } from '@/utils/routerUtils'
import {useMonaco} from '@/hooks/useMonaco'
import ApiCode from '@/apis/code'

type AppBackContainerTypes = {
  children: React.ReactNode
}

const AppMenu = () => {
  const navigate = useNavigate()

  const linkPath = (path: string) => {
    navigate(path)
  }

  return (
    <div className={styled.appMenu}>
      {
        Object.keys(routeModules).map((key) => (<div key={key} className={styled.moduleItem}>
          {key}:
          {
            routeModules[key].map(item => item.filePath ? (
              <div key={item.path} onClick={() => linkPath(item.path)} className={styled.linkItem} >{getPathLast(item.filePath)}</div>
            ): null)
          }
        </div>))
      }
    </div>
  )
}

const AppBackContainer = (props: AppBackContainerTypes) => {
  const {init, monacoRef} = useMonaco()
  const { pathname } = useLocation()
  useEffect(() => {
    ApiCode.queryCode(location.pathname).then((res) => {
      init(res as string)
    })
  }, [pathname])
  return (
    <div className={styled.appBackContainer}>
      <div className={styled.leftMenu}>
        <AppMenu/>
      </div>
      <div className={styled.rightContent}>
        {props.children}
      </div>
      <div className={styled.rightCode}>
        <div className={styled.codeContent} ref={monacoRef}>
        </div>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <AppBackContainer>
      <Router/>
    </AppBackContainer>
  )
}

export default App
