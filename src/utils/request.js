import axios from 'axios'
import router from '@/router'
import { ElMessageBox } from 'element-plus'

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
    if (res.code !== 0) { // 0代表请求成功
      // 508:非法的token; 512:其他客户端登录了;  514:Token 过期了; 自己根据业务定制即可
      if (res.code === 508 || res.code === 512 || res.code === 514) {
        removeLocalToken()
        await ElMessageBox.confirm('登录信息已过期，请重新登录！', '确定登出', {
          confirmButtonText: '重新登录',
          showCancelButton: false,
          type: 'warning',
        })
        router.push({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath,
          },
        })
        location.reload()
      }
    } else {
      return res
    }
  })

  // 4.发送网络请求
  return instance(conf)
}
