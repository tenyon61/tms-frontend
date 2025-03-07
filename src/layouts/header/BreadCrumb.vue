<template>
  <a-breadcrumb class="p-l">
    <a-breadcrumb-item v-for="item in tabs" :key="item.path"
      >{{ item.meta.label }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { RouteLocationMatched } from 'vue-router'

const tabs: Ref<RouteLocationMatched[]> = ref([])
const route = useRoute()
const getBreadCrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.label)
  matched = [{ path: '/dashboard', meta: { label: '首页' } } as any].concat(matched)
  tabs.value = matched
}
onMounted(() => {
  getBreadCrumb()
})
watch(
  () => route.path,
  () => getBreadCrumb(),
)
</script>

<style scoped lang="scss"></style>
