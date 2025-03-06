<template>
  <div>工作台</div>
  <a-button type="primary" @click="addButton">弹框</a-button>
  <SysModal
    :open="modal.open"
    :title="modal.title"
    @handleOk="handleOk"
    @handleCancel="handleCancel"
  >
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
import useModal from '@/composables/modal/useModal.ts'

const { modal, showModal, handleOk, handleCancel } = useModal()

const addButton = () => {
  modal.title = 'ces '
  showModal()
}
</script>

<style scoped lang="scss"></style>
