<template>
  <div>工作台</div>
  <a-button type="primary" @click="showModal">弹框</a-button>
  <SysModal :open="modal.open" @handleOk="handleOk" @handleCancel="handleCancel">
    <template #content>
      <div>ces ces</div>
      <div>ces ces</div>
      <div>ces ces</div>
      <div>ces ces</div>
      <div>ces ces</div>
      <div>ces ces</div>
      <div>ces ces</div>
    </template>
  </SysModal>
</template>

<script setup lang="ts">
const modal = reactive({
  open: false,
})
const showModal = () => {
  modal.open = true
}
const handleOk = (e: any) => {
  modal.open = false
}
const handleCancel = () => {
  modal.open = false
}
</script>

<style scoped lang="scss"></style>
