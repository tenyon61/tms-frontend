<template>
  <a-button type="primary" size="large" @click="goConsle">前往控制台</a-button>
  <sys-select-checked :width="200" :options="options"></sys-select-checked>
</template>

<script setup lang="ts">
const router = useRouter()
const goConsle = () => {
  router.push('/dashboard')
}

const options = reactive([
  { label: '超级管理员', value: 0 },
  { label: '管理员', value: 1 },
  {
    label: '用户',
    value: 2,
  },
])
</script>

<style scoped lang="scss"></style>
