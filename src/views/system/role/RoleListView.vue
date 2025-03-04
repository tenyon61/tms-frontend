<template>
  <div class="roleList">
    <!-- ~searchForm -->
    <a-form layout="inline" :model="searchParams">
      <a-form-item label="角色名称">
        <a-input placeholder="请输入角色名称"></a-input>
      </a-form-item>
      <a-form-item label="扩展字段">
        <a-input placeholder="请输入扩展字段"></a-input>
      </a-form-item>
      <a-space>
        <a-button class="flex-center" @click="doSearch">
          <div class="i-ri:search-line m-r0.5"></div>
          搜索
        </a-button>
        <a-button class="flex-center" danger @click="doRest">
          <div class="i-ri:reset-right-line m-r0.5"></div>
          重置
        </a-button>
        <a-button class="flex-center" type="primary" danger @click="doAdd">
          <div class="i-ri:add-large-line m-r0.5"></div>
          新增
        </a-button>
      </a-space>
    </a-form>
    <!-- ~addMoadl -->
    <sys-modal
      :open="modal.open"
      :title="modal.title"
      :width="modal.width"
      :height="modal.height"
      @handleOk="confirm"
      @handleCancel="handleCancel"
    >
      <template #content>
        <a-form ref="formRef" label-align="right" :model="formState" :rules="rules">
          <a-form-item name="roleName" label="角色名称" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.roleName" placeholder="请填写角色"></a-input>
          </a-form-item>
          <a-form-item name="remark" label="备注" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.remark" placeholder="请填写备注"></a-input>
          </a-form-item>
        </a-form>
      </template>
    </sys-modal>
  </div>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal.ts'
import { Rule } from 'ant-design-vue/es/form'
import { addRole } from '@/api/roleController.ts'
import { message } from 'ant-design-vue'

const { modal, showModal, handleOk, handleCancel } = useModal()
const formRef = ref()
const searchParams = ref([])
// ~searchForm
const doSearch = () => {}
const doRest = () => {}
const doAdd = () => {
  modal.title = '新增'
  modal.width = 460
  modal.height = 160
  showModal()
}
// ~addModal
const formState = reactive(<API.RoleAddRequest>{
  roleName: '',
  remark: '',
})
const rules: Record<string, Rule[]> = {
  roleName: [{ required: true, message: '角色名称不能为空' }],
  remark: [{ required: true, message: '扩展字段不能为空' }],
}
const confirm = () => {
  formRef.value
    .validate()
    .then(async (data: API.RoleAddRequest) => {
      await addRole(data).then((res) => {
        if (res.data.code === 0) {
          message.success('保存成功！')
        }
      })
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss"></style>
