<template>
  <a-button type="primary" size="large" @click="goConsle">前往控制台</a-button>
</template>

<script setup lang="ts">
const router = useRouter()
const goConsle = () => {
  router.push('/dashboard')
}
</script>

<style scoped lang="scss"></style>
