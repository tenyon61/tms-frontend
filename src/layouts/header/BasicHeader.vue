<template>
  <div class="basic-header">
    <a-row :wrap="false" class="items-center">
      <a-col flex="180" class="ws-nowrap">
        <bread-crumb></bread-crumb>
      </a-col>
      <a-col flex="auto">
        <a-space :size="16">
          <a
            class="color-black"
            href="https://github.com/tenyon61/tms-frontend/issues"
            target="_blank"
          >
            <Icon icon="ri:question-line" width="2.0em"></Icon>
          </a>
          <a class="color-black" href="https://github.com/tenyon61/tms-frontend" target="_blank">
            <Icon icon="ri:github-fill" width="2.0em"></Icon>
          </a>
          <SysScreen></SysScreen>
        </a-space>
      </a-col>
      <a-col flex="80px" class="m-l4">
        <div v-if="userStore.loginUser.id">
          <a-dropdown placement="bottom">
            <a-avatar
              :src="userStore.loginUser?.userAvatar ?? notLoginUser"
              size="large"
            ></a-avatar>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="doDropItemClick('profile')">
                  <span>用户中心 </span>
                </a-menu-item>
                <a-menu-item @click="doDropItemClick('logout')">
                  <span>退出登录 </span></a-menu-item
                >
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div v-else>
          <a-button type="primary" href="/login">登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user.ts'
import notLoginUser from '@/assets/notLogin.png'
import router from '@/router'
import { logout } from '@/api/authController.ts'
import { message } from 'ant-design-vue'
import BreadCrumb from '@/layouts/header/BreadCrumb.vue'
import { Icon } from '@iconify/vue'
import sysConfirm from '@/utils/confirmUtil.ts'

const userStore = useUserStore()
onMounted(() => {
  userStore.fetchLoginUser()
})
const doDropItemClick = async (key: string) => {
  if (key === 'logout') {
    const confirm = await sysConfirm('确认退出？')
    if (confirm) {
      await logout().then(async (res) => {
        if (res.data.code === 0) {
          userStore.setLoginUser({
            userName: '未登录',
          })
          localStorage.clear()
          message.success('退出登录成功')
          await router.push('/login')
        } else {
          message.error('退出登录失败，' + res.data.message)
        }
      })
    }
  }
  if (key === 'profile') {
    router.push('/user/profile')
  }
}
</script>
<style scoped lang="scss">
.basic-header {
  :deep(.ant-space-item) {
    svg {
      vertical-align: middle;
    }
  }
}
</style>
