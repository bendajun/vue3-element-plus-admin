import {
  TOKEN_KEY,
} from '@/constant/app'

// 可以根据业务换成localStorage
/**
 * 获取token
 */
export function getLocalToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

/**
 * 设置token
 * @param {string} token token
 */
export function setLocalToken(token) {
  return sessionStorage.setItem(TOKEN_KEY, token)
}

/**
 * 移除token
 */
export function removeLocalToken() {
  return sessionStorage.removeItem(TOKEN_KEY)
}
