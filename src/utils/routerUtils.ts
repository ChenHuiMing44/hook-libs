
/**
 * @author: hm, 2022/10/14
 * des: /aaa/bbb --->  aaaBbb
 */
export const replaceUnderLine = (val: string) => {
  const arr = val.split('')
  let index = arr.indexOf('/')
  while (index !== -1) {
    arr.splice(index, 2, arr[index + 1].toUpperCase())
    index = arr.indexOf('/')
  }
  val = arr.join('')
  return val
}


export const getPathLast = (path: string): string => {
  const arr = path.split('/')
  return arr.length ? arr[arr.length -1] : ''
}
