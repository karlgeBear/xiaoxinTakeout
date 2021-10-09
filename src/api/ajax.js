/* 
对axios进行2次封装一个能发ajax请的函数
一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  // baseURL: 'http://localhost:4000', //出现跨域问题
  baseURL: '/api',
  timeout: 4000   // 4. 配置 超时的时间
})

//添加请求拦截器
instance.interceptors.request.use((config) => {
  console.log('req interceptors')
// 3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
  const data = config.data
  if (data instanceof Object){
    config.data = qs.stringify(data) //将对象转为urlencoded格式
  }
  return config
})
//添加响应拦截器
instance.interceptors.response.use(
  response => {
    console.log('res interceptors')
    //return response
    //2. 异步请求成功的数据不是response, 而是response.data
    return response.data

  },
  error => {
    //return Promise.reject(error)
    //统一处理请求异常
    alert('请求出错')
    return new Promise(() => {}) // 返回一个空的promise => 中断promise链
  }
)

export default instance