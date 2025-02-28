<template>
  <a-config-provider :theme="appStore.theme">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/appStore.ts'

const appStore = useAppStore()
</script>

<style scoped lang="scss"></style>
