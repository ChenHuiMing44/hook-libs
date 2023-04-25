
// Checks if the provided value is an object and is not
export const isObj = (obj: unknown) => obj!== null && typeof obj === 'object'

/**
 * Get the keys of an object.
 * @param obj The record of the object.
 * @returns The keys of the object.
 */
export const getObjKeys = (obj: Record<string, any>) => Object.keys(obj)

/**
 * Get the values from an object and return them as an array
 * @param obj An object containing values
 * @returns An array of values from the object
 */
export const getObjValues = (obj: Record<string, any>) => Object.values(obj)


/**
 * @author: hm, 2022/10/19
 * des: 判断两个对象是否相等
 */
export const isEqual = (obj1: unknown, obj2: unknown) => {

  if(!isObj(obj1) || !isObj(obj2)) {
    return false
  }
  if(obj1 === obj2) {
    return true
  }
  const keys1 = getObjKeys(obj1 as object)
  const keys2 = getObjKeys(obj2 as object)

  if (keys1.length !== keys2.length) {
    return false
  }
  for (let i = 0, len = keys1.length; i < len; i++) {
    if(Reflect.get(obj1 as object, keys1[i]) !== Reflect.get(obj2 as object, keys1[i])) {
      return false
    }
  }
  return true
}
