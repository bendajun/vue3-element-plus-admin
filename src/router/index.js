import { createRouter, createWebHistory } from 'vue-router'

import { getLocalToken } from '@/utils/auth'

// Route Module
import home from './modules/home'
import menus from './modules/menus'
import user from './modules/user'

import Login from '@/views/login/index.vue'

export const defaultRoutes = [
  {
    path: '/',
    redirect: {
      name: 'home'
    },
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
  },
]

export const asyncRouteMap = [
  ...home,
  ...menus,
  ...user,
]

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
