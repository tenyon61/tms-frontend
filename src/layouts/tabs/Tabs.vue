<template>
  <template v-if="panes && panes.length > 0">
    <a-tabs
      v-model:activeKey="activeKey"
      hide-add
      type="editable-card"
      @tabClick="tabClick"
      @edit="onEdit"
    >
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.path"
        :tab="pane.title"
        :closable="pane.closable"
      ></a-tab-pane>
    </a-tabs>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tab, useLayoutStore } from '@/store/layoutStore.ts'

const layoutStore = useLayoutStore()
const panes = computed(() => {
  return layoutStore.tabList
})

const route = useRoute()
const router = useRouter()

const activeKey = ref('')

const onEdit = (targetKey: any) => {
  remove(targetKey)
}
const remove = (targetKey: string) => {
  // 首页不能关闭
  if (targetKey === '/dashboard/workplace') return
  let lastIndex = 0
  layoutStore.tabList.forEach((pane, i) => {
    if (pane.path === targetKey) {
      lastIndex = i - 1
    }
  })
  layoutStore.tabList = layoutStore.tabList.filter((pane) => pane.path !== targetKey)
  if (layoutStore.tabList.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = layoutStore.tabList[lastIndex].path
    } else {
      activeKey.value = layoutStore.tabList[0].path
    }
  }
  // 跳转到新路由
  router.push({ path: activeKey.value })
}

const tabClick = (key: any) => {
  router.push(key)
}
const addTab = () => {
  const { path, meta } = route
  if (path === '/dashboard/workplace') return
  const tab: Tab = {
    path: path,
    title: meta.title as string,
    closable: true,
  }
  layoutStore.addTab(tab)
}
const setActiveKey = () => {
  activeKey.value = route.path
}
watch(
  () => route.path,
  () => {
    setActiveKey()
    addTab()
  },
)
onMounted(() => {
  setActiveKey()
  addTab()
})
</script>

<style scoped lang="scss"></style>
