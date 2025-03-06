<template>
  <a-config-provider :theme="appStore.theme" :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/appStore.ts'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
const appStore = useAppStore()
const locale = zhCN
</script>

<style scoped lang="scss"></style>
