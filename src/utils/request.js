import axios from 'axios'

import { getLocalToken, removeLocalToken } from '@/utils/auth'

export default function request(conf) {
  const instance = axios.create({
    timeout: 30000,
    baseURL: 'http://rap2api.taobao.org/app/mock/253844', // 如果是mock地址的话直接写，不是mock的话就是process.env.VUE_APP_BASE_API，根据接口前缀反向代理
  })
  // 2.设置请求拦截器
  instance.interceptors.request.use((config) => {
    const token = getLocalToken()
    config.headers.Authorization = token // 发送请求时在请求头带上token
    return config
  })

  // 3.设置响应拦截器
  instance.interceptors.response.use(async(response) => {
    const res = response.data
    return res
  })

  // 4.发送网络请求
  return instance(conf)
}
