import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserManageView from '@/pages/console/UserManagerView.vue'
// 路由菜单
const ProLayout = () => import('@/layouts/index.vue')
const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      label: '主页',
      icon: 'ant-design:home-outlined',
    },
  },
  {
    path: '/console',
    name: 'Console',
    component: ProLayout,
    redirect: '/console/usermanage',
    meta: {
      label: '后台管理',
      icon: 'ant-design:crown-outlined',
      roles: ['admin'],
    },
    children: [
      {
        path: '/console/usermanage',
        name: 'userManage',
        component: UserManageView,
        meta: {
          label: '用户管理',
          icon: 'ant-design:crown-outlined',
          roles: ['admin'],
        },
      },
    ],
  },
]

export default dynamicRoutes
