import request from '@/utils/request'

/**
 * 获取token
 */
export const getToken = (params) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: params,
  })
}

/**
 * 获取用户角色权限和用户信息
 */
export const getUserRoles = (params) => {
  return request({
    url: '/api/userRoles',
    method: 'get',
    params,
  })
}
