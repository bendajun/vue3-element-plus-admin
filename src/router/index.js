import { createRouter, createWebHistory } from 'vue-router'

import { getLocalToken } from '@/utils/auth'
import {
  importAll,
  setDocumentTitle
} from '@/utils'

import home from './modules/home'
import Login from '@/views/login/index.vue'

const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = importAll(modulesFiles)

// Route Module
let asyncRouteMap = []
for (const key in modules) {
  asyncRouteMap = asyncRouteMap.concat(modules[key])
}

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

// 捕获所有的路由，和错误路由，跟路由位置没有关系
export const errorRoutes = [
  {
    path: '/:notFoundPath(.*)*',
    hidden: true,
    name: 'notFound',
    component: () => import(/* webpackChunkName: 'error' */ '@/views/error/404.vue'),
  },
]

// 无须鉴权的白名单路由
const whiteListRoutes = [
  '/login',
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, left: 0 }),
  routes: [...defaultRoutes, ...home, ...errorRoutes],
})

export default router
