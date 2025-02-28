import type { RouteRecordRaw } from 'vue-router'
// 路由菜单
export default [
  {
    path: '/login',
    component: () => import('@/pages/common/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:pathMatch(.*)',
    meta: {
      title: '找不到页面',
    },
    component: () => import('@/pages/exception/error.vue'),
  },
] as Array<RouteRecordRaw>
