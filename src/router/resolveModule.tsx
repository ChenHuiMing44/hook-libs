import path from 'path-browserify'
import React, { ComponentType, LazyExoticComponent } from 'react'
import { replaceUnderLine } from '@/utils/routerUtils'

type LazyComponent = () => Promise<{ default: ComponentType }>

export interface RouteItem {
  path: string,
  routeName?: string,
  element?: LazyExoticComponent<ComponentType>,
  redirect?: string,
  filePath?: string
}

function doLowerLine(val: string, index: number) {
  if (/[A-Z]/.test(val)) {
    if (index === 0) {
      return val.toLowerCase()
    }
    return `_${val.toLowerCase()}`
  }
  return val
}

function toLowerLine(arr: string | Array<string>) {
  if (typeof arr === 'string') {
    return [].map.call(arr, doLowerLine).join('')
  }
  return arr.map(doLowerLine).join('')
}

const getTargetPath = (filePath:string): string => {
  const filePathArr = filePath.split('/')
  const routePathArr = filePathArr.slice(2,4)
  return `/${routePathArr.join('/')}`
}



export default (menuList: Record<string,LazyComponent>, modulePath: string) => {
  const list: Array<RouteItem> = []
  Object.keys(menuList).forEach((key: string) => {
    const filePath = getTargetPath(path.join(modulePath, key).replace('.tsx', ''))
    const routeName = replaceUnderLine(filePath)
    const routePath = toLowerLine(filePath)
    list.push({
        routeName,
        filePath,
        path: routePath, //  /staffMove/moveList  ---> /staff_move/move_list
        element: React.lazy(menuList[key])
      })
    if(routePath !== filePath) {
      list.push({ path: filePath, redirect: routePath })
    }

  })
  return list
}
