<template>
  <a-layout h-100vh overflow-hidden>
    <a-layout-sider breakpoint="lg" @collapse="onCollapse" @breakpoint="onBreakpoint">
      <menu-bar></menu-bar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <basic-header></basic-header>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '1px 16px 0',
          padding: '10px',
          background: '#fff',
          height: '100%',
        }"
      >
        <tabs></tabs>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import BasicHeader from '@/layouts/header/BasicHeader.vue'
import MenuBar from '@/layouts/menu/MenuBar.vue'
import Tabs from '@/layouts/tabs/Tabs.vue'

// collapsed: boolean, type: string
const onCollapse = () => {}
// broken: boolean
const onBreakpoint = () => {}
</script>
<style scoped lang="scss">
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}

[data-theme='light'] .site-layout-sub-header-background {
  background: #fff;
}

.ant-layout-sider {
  background: #fff;
}

:deep(.ant-layout-sider-zero-width-trigger) {
  background: #fa543c;
}
</style>
