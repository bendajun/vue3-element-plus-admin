import { markRaw } from 'vue'
import Layout from '@/Layout/index.vue'

export default [
  {
    path: '/home',
    redirect: '/home-one',
    meta: {
      roles: ['admin', 'manager', 'visitor'],
      name: '首页',
      icon: 'shouye'
    },
    component: markRaw(Layout),
    children: [
      {
        path: '/home-one',
        meta: {
          roles: ['admin', 'manager', 'visitor'],
          name: '首页列表',
          icon: 'liebiao',
          affix: true, // 有这个属性的会被app-tag-view一直显示且不可删除
        },
        component: () => markRaw(import('@/views/home/index.vue')),
      },
      {
        path: '/home-two',
        meta: {
          keepAlive: true,
          roles: ['admin', 'manager', 'visitor'],
          name: '首页列表2',
          icon: 'yewubaobiao',
        },
        component: () => markRaw(import('@/views/home/homeTwo/index.vue')),
      },
    ]
  },
]
