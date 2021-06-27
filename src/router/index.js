import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import { getLocalToken } from '@/utils/auth'
import {
  importAll,
  setDocumentTitle
} from '@/utils'

// Route Module
import Login from '@/views/login/index.vue'
export const asyncRouteMap = generateAsyncRouteMap()

export const defaultRoutes = [
  {
    path: '/',
    redirect: '/home',
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
  },
]

// 捕获所有的路由，和错误路由,放在最后添加
export const errorRoute = {
  path: '/:notFoundPath(.*)*',
  hidden: true,
  name: 'notFound',
  component: () => import(/* webpackChunkName: 'error' */ '@/views/error/404.vue'),
}

// 无须鉴权的白名单路由
const whiteListRoutes = [
  '/login',
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, left: 0 }),
  routes: [...defaultRoutes],
})

// next参数在Vue-roputer 4.x的版本中不再建议使用，使用return false 终止本次导航。 或者不使用return，return true， return 新的导航都可以
// 官方也弃用了addRoutes这个方法了
router.beforeEach(async(to) => {
  if (getLocalToken()) { // 存在token时，走这里
    if (!store.getters['app/roles']) { // 没有用户角色先获取角色，根据角色动态渲染路由
      const data = await store.dispatch('app/fetchRoles')
      const roles = data.roles
      store.dispatch('app/generateRoutes', roles)
      const addRoutes = store.getters['app/addRoutes']
      addRoutes.forEach(route => router.addRoute(route))
      router.addRoute(errorRoute)
      // return { ...to, replace: true } 这种写法的replace未生效，但是官方确说这样可以... 排查中
      // 解决方法: 将跳转由push改为replace即可，如login页面的跳转
      return { ...to }
    } else { // 有角色了就直接放行，这个else其实不用写，默认不return会直接导航
      return true
    }
  } else { // token不存在的时候就走这里
    if (whiteListRoutes.includes(to.path)) {
      return true
    } else { // 没token，又没在白名单路由里直接跳转到登录页
      return '/login'
    }
  }
})

router.afterEach((to) => {
  setDocumentTitle(to.meta.title)
})

// 创建动态路由
export function filterAsyncRoutes(asyncRouteMap, roles) {
  let addRoutes = []
  if (roles.includes('admin')) {
    addRoutes = asyncRouteMap
  } else { // 普通管理员
    asyncRouteMap.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp)) {
        if (Array.isArray(tmp.children)) {
          tmp.children = filterAsyncRoutes(tmp.children, roles) // 闭包查找所有该roles下的路由
        }
        addRoutes.push(tmp)
      }
    })
  }
  return addRoutes
}

export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(role => roles.includes(role))
  }
  return true // 没有meta字段直接加载
}

function generateAsyncRouteMap() {
  const modulesFiles = require.context('./modules', false, /\.js$/)
  const modules = importAll(modulesFiles)
  let asyncRouteMap = []
  for (const key in modules) {
    asyncRouteMap = asyncRouteMap.concat(modules[key])
  }
  return asyncRouteMap
}

export default router
