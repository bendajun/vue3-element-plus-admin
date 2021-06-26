import request from '@/utils/request'

/**
 * 测试接口状态码返回508的接口
 */
export const test = (params) => {
  return request({
    url: '/api/test',
    method: 'get',
    params,
  })
}
