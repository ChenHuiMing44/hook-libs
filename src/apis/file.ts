/**
 * @author: hm, 2022/11/7
 * des: 上传文件相关
 */
import request from '../utils/request'

export default {
  upload: (params: any) => request.upload('/file/upload', params)
}
