import React from 'react'
import routes from '@/router/routes'
import {Navigate, Route, Routes} from 'react-router-dom'
import PageLoading from '@/components/pageLoading'

const Index = () => {
  return (
    <Routes>
      {routes.map((item,index) => item.redirect ?
        (<Route
          key={index}
          path={item.path}
          element={<Navigate to={item.redirect} replace />}
        />): (<Route
          key={index}
          path={item.path}
          element={
            <React.Suspense fallback={<PageLoading/>}>
              { item.element ? <item.element/> : null}
            </React.Suspense>
          }
        />)
      )}
    </Routes>
  )
}

export default Index
