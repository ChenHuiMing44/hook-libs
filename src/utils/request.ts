import axios from 'axios'
import { CONTENT_TYPE } from '@/config/constant'
import { RequestParams } from '@/config/types'

const setParamsData = (params: RequestParams, queryParams: any) => {
  if (params.contentType === CONTENT_TYPE.form && params.method === 'POST') {
    const formData = new FormData()
    Object.keys(params.data).forEach((key) => {
      if (Array.isArray(params.data[key])) {
        params.data[key].forEach((item: any) => {
          formData.append(key, item)
        })
      } else {
        formData.append(key, params.data[key])
      }
    })
    queryParams.data = formData
  } else if(params.isBody) {
    queryParams.data = params.data
  } else {
    queryParams.params = params.data
  }
}

const baseRequest = (params: RequestParams) => new Promise((resolve, reject) => {
  const timeout = params.timeout || 8 * 1000
  const queryParams: any = {
    url: params.url,
    method: params.method || 'GET',
    headers: {
      'key': '111',
      'Content-Type': params.contentType || CONTENT_TYPE.json,
      ...params.extraHeader,
    },
  }

  setParamsData(params, queryParams)

  queryParams.baseURL = params.ext ? params.ext : '/api'
  // Reflect.set(queryParams, baseURL, params.ext ? params.ext : '/api')
  const timeoutPromise = new Promise((resolve1) => {
    const t = 'timeout'
    setTimeout(() => resolve1(Promise.reject(t)), timeout)
  })
  Promise.race([axios(queryParams), timeoutPromise]).then((res: any) => {
    resolve(!res || !res.data ? {} : res.data)
    // 逻辑简单无需处理任何异常
    // if (+res.data.code === 200) {
    //
    // } else {
    //   const errData = {
    //     errMsg: res.data.message || res.data.msg || '呀，系统开了点小差',
    //     errCode: res.data.code,
    //     errData: res.data.data,
    //     err: res,
    //   };
    //   reject(errData);
    // }
  })
    .catch((err) => {
      console.error(err)
      const errMsg = err === 'timeout' ? '请求超时' : '呀，系统开了点小差'
      const errData = { err, errMsg }
      reject(errData)
    })
})

export const apiRequest = (url: string, method?: string, params?: object, isBody?: boolean) => baseRequest({
  url,
  method: method || 'get',
  data: params,
  isBody,
})

/**
 * @author: hm, 4/16/21
 * des: 建议所有接口调取下面两个
 */
export const requestGet = (url: string, params?: any) => apiRequest(url, 'GET', params)

export const requestPost = (url: string, params?: any, isBody = true) => apiRequest(url, 'POST', params, isBody)

export const uploadFile = (url: string, params?: any) => baseRequest({
  url,
  method: 'POST',
  data: params,
  ext: '/api_file',
  isBody: true,
  contentType: CONTENT_TYPE.form,
})

export const queryCode = (url: string, params?: any) => baseRequest({
  url,
  method: 'GET',
  data: params,
  ext: '/query_code'
})


export default {
  baseRequest,
  upload: uploadFile,
  post: requestPost,
  get: requestGet,
  queryCode
}
