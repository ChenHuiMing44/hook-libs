import request from '@/utils/request'

export default {
  /**
   * @author: hm, 2023/3/20
   * des: 获取代码 接口
   */
  queryCode: (path: string) => request.queryCode(path)
}
