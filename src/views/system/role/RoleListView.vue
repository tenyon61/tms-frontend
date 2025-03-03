<template>
  <div class="roleList">
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
    <!--  新增  -->
    <sys-modal
      :open="modal.open"
      :title="modal.title"
      :width="modal.width"
      :height="modal.height"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
    >
      <template #content>
        <a-form label-align="right">
          <a-form-item :label-col="{ span: 4 }" label="角色名称">
            <a-input placeholder="请填写角色名称"></a-input>
          </a-form-item>
          <a-form-item :label-col="{ span: 4 }" label="备注">
            <a-input placeholder="请填写备注"></a-input>
          </a-form-item>
          <a-row>
            <a-col :span="12">
              <a-form-item :label-col="{ span: 8 }" label="角色">
                <a-input placeholder="请填写角色名称"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :label-col="{ span: 8 }" label="角色">
                <a-input placeholder="请填写角色名称"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </sys-modal>
  </div>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal.ts'

const { modal, showModal, handleOk, handleCancel } = useModal()
const searchParams = ref([])

const doSearch = () => {}

const doRest = () => {}
const doAdd = () => {
  modal.title = '新增'
  modal.width = 680
  modal.height = 180
  showModal()
}
const addForm = reactive({
  roleName: '',
  remark: '',
})
</script>

<style scoped lang="scss"></style>
