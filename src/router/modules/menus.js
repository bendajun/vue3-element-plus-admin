import { markRaw } from 'vue'
import Layout from '@/Layout/index.vue'

export default [
  {
    path: '/menus',
    redirect: '/menus1',
    meta: {
      roles: ['admin', 'manager', 'visitor'],
      name: '菜单',
      icon: 'caidan'
    },
    component: markRaw(Layout),
    children: [
      {
        path: '/menus1',
        meta: {
          roles: ['admin', 'manager', 'visitor'],
          name: '一级菜单1',
          icon: 'liebiao',
        },
        component: () => markRaw(import('@/views/menus/index.vue')),
      },
      {
        path: '/menus2',
        redirect: '/menus2/menus2-1',
        meta: {
          roles: ['admin', 'manager', 'visitor'],
          name: '一级菜单2',
          icon: 'liebiao',
        },
        component: () => markRaw(import('@/views/menus/subMenus/index.vue')),
        children: [
          {
            path: '/menus2/menus2-1',
            meta: {
              roles: ['admin', 'manager', 'visitor'],
              name: '二级菜单1',
              icon: 'liebiao',
            },
            component: () => markRaw(import('@/views/menus/subMenus/threeMenus/index.vue')),
          },
          {
            path: '/menus2/menus2-2',
            meta: {
              roles: ['admin', 'manager', 'visitor'],
              name: '二级菜单2',
              icon: 'liebiao',
            },
            component: () => markRaw(import('@/views/menus/subMenus/threeMenus/twoIndex.vue')),
          },
        ]
      },
    ]
  },
]
