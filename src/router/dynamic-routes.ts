import type { RouteRecordRaw } from 'vue-router'
// 路由菜单
const ProLayout = () => import('@/layouts/Index.vue')
const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ProLayout,
    redirect: '/dashboard/workplace',
    meta: {
      label: '控制台',
      icon: 'ri:dashboard-3-line',
      roles: ['sys:manage'],
    },
    children: [
      {
        path: '/dashboard/workplace',
        component: () => import('@/views/dashboard/workplace/WorkPlaceView.vue'),
        meta: {
          label: '工作台',
          icon: 'ri:dashboard-line',
          roles: ['sys:manage'],
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    component: ProLayout,
    redirect: '/system/user',
    meta: {
      label: '系统管理',
      icon: 'ri:settings-3-line',
      roles: ['sys:manage'],
    },
    children: [
      {
        path: '/system/userlist',
        name: 'userList',
        component: () => import('@/views/system/user/UserListView.vue'),
        meta: {
          label: '用户管理',
          icon: 'ri:user-line',
          roles: ['sys:user'],
        },
      },
      {
        path: '/system/rolelist',
        name: 'roleList',
        component: () => import('@/views/system/role/RoleListView.vue'),
        meta: {
          label: '角色管理',
          icon: 'ri:vip-crown-2-line',
          roles: ['sys:role'],
        },
      },
      {
        path: '/system/menulist',
        name: 'menuList',
        component: () => import('@/views/system/menu/MenuListView.vue'),
        meta: {
          label: '菜单管理',
          icon: 'ri:menu-line',
          roles: ['sys:menu'],
        },
      },
    ],
  },
]

export default dynamicRoutes
