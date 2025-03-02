import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// 路由菜单
export default [
  {
    path: '/',
    component: HomeView,
    meta: {
      label: '主页',
      icon: 'ant-design:home-outlined',
    },
  },
  {
    path: '/login',
    component: () => import('@/views/common/UserLogin.vue'),
    meta: {
      title: '登录',
    },
  },
] as Array<RouteRecordRaw>
