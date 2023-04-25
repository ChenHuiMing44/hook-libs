import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import path from "path";
import fs from "fs";
import { __root, defaultExtensions } from './config.js'

//下划线转驼峰
function toHump(str) {
  return str.replace(/\_(\w)/g,function(match,letter) {
    return letter.toUpperCase()
  })
}

const getPathList = (p) => {
  return [
    p,
    ...defaultExtensions.map(extension => `${p}.${extension}`),
    ...defaultExtensions.map(extension => `${path.join(p, 'index')}.${extension}`),
  ]
}

// 如果存在 返回全路径
// 不存在 返回 false
export function existFile(filePath) {
  //下划线转驼峰
  const originPath = path.join(__root, toHump(filePath))
  const originPagePath = path.join(__root, 'pages', toHump(filePath))

  const pathList = [ ...getPathList(originPagePath), ...getPathList(originPath) ]

  for (let i = 0; i < pathList.length; i++) {
    const testPath = pathList[i]
    const state = fs.lstatSync(testPath, { throwIfNoEntry: false })
    if(state && state.isFile()) {
      return testPath
    }
  }
  return false
}
