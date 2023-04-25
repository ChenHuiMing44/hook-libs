import resolveModule, {RouteItem} from './resolveModule'
import { ComponentType } from 'react'

type LazyComponent = () => Promise<{ default: ComponentType }>

type Records = Record<string,LazyComponent>
/**
 * @author: hm, 2022/10/29
 * des: part 模块
 */
const Parts = resolveModule(import.meta.glob('../pages/parts/*.tsx') as Records, '/parts')

/**
 * @author: hm, 2022/10/29
 * des: 测试模块
 */
const Hooks = resolveModule(import.meta.glob('../pages/hooks/*.tsx') as Records, '/hooks')

const route = [...Parts, ...Hooks]

export const routeModules: {[key: string]: Array<RouteItem>} = {
  Parts,
  Hooks
}

export default route
