<template>
  <div class="menu-bar">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="logo" />
    </div>
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :open-keys="state.openKeys"
      :items="items"
      @openChange="onOpenChange"
      @click="handleMenuClick"
    ></a-menu>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ItemType } from 'ant-design-vue'
import { convertRoutesToItems } from '@/router/generate-routes.ts'
// 原始路由配置
const routeConfig = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/workplace',
    meta: {
      title: '控制台',
      icon: 'ri:dashboard-3-line',
      roles: ['sys:manage'],
    },
    children: [
      {
        path: '/dashboard/workplace',
        meta: {
          title: '工作台',
          icon: 'ri:dashboard-line',
          roles: ['sys:manage'],
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      icon: 'ri:settings-3-line',
      roles: ['sys:manage'],
    },
    children: [
      {
        path: '/system/userlist',
        name: 'userManage',
        meta: {
          title: '用户管理',
          icon: 'ri:user-line',
          roles: ['sys:user'],
        },
      },
      {
        path: '/system/rolelist',
        name: 'roleManage',
        meta: {
          title: '角色管理',
          icon: 'ri:vip-crown-2-line',
          roles: ['sys:role'],
        },
      },
      {
        path: '/system/menulist',
        name: 'menuManage',
        meta: {
          title: '菜单管理',
          icon: 'ri:menu-line',
          roles: ['sys:menu'],
        },
      },
    ],
  },
]
const items: ItemType[] = reactive(convertRoutesToItems(routeConfig))
const state = reactive({
  rootSubmenuKeys: items.filter((item: any) => item?.children).map((item: any) => item.key),
  openKeys: [] as string[],
  selectedKeys: [] as string[],
})
const route = useRoute()
const router = useRouter()
watchEffect(() => {
  state.selectedKeys = [route.path]
  state.openKeys = [route.matched[0]?.path] // 自动展开父菜单
})
const onOpenChange = (openKeys: any[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1) as string
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}

const handleMenuClick = ({ key }: any) => {
  router.push(key)
}
</script>

<style scoped lang="scss">
.menu-bar {
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    border-bottom: 1px solid #fafafa;

    img {
      height: 48px;
    }
  }
}
</style>
