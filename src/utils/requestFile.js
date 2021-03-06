import axios from 'axios'
// import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { baseURL } from '@/utils/index'
// 创建axios实例
const service = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  // transformRequest: [function(data) {
  //   // Do whatever you want to transform the data
  //   const request = qs.stringify(Object.assign({
  //     accessToken: getToken()
  //   }, data))
  //   return request
  // }],
  baseURL: baseURL, // api的base_url
  responseType: 'json'
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['accessToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
    res.code = Number(res.code)
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message || '系统忙，请稍后再试～',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
