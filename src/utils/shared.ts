type ObjectRecord = Record<string, any>


export function merge<T extends ObjectRecord, U>(target: T, source: U): T & U;
export function merge<T extends ObjectRecord, U, V>(target: T, source1: U, source2: V): T & U & V;
export function merge<T extends ObjectRecord, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function merge(target: ObjectRecord, ...sources: ObjectRecord[]): ObjectRecord;

export function merge(objFirst: ObjectRecord, ...args: Array<ObjectRecord>) {
  return Object.assign(objFirst, ...args)
}

export function mergeNew<T extends ObjectRecord>(target: T): T ;
export function mergeNew<T extends ObjectRecord, U>(target: T, source: U): T & U;
export function mergeNew<T extends ObjectRecord, U, V>(target: T, source1: U, source2: V): T & U & V;
export function mergeNew<T extends ObjectRecord, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function mergeNew(target: ObjectRecord, ...sources: ObjectRecord[]): ObjectRecord;

export function mergeNew(...args: Array<ObjectRecord>) {
  return merge({}, ...args)
}

export const isFunction = (cb: unknown): boolean => typeof cb === 'function'

export const isArray = (arg: unknown): boolean => Array.isArray(arg)

export const isNumber = (arg: unknown): boolean => typeof arg === 'number'

export const isString = (arg: unknown): boolean => typeof arg === 'string'
