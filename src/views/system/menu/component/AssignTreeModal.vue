<template>
  <sys-modal
    :open="modal.open"
    :title="modal.title"
    :width="modal.width"
    :height="modal.height"
    @handleOk="doConfirm"
    @handleCancel="handleCancel"
  >
    <template #content>
      <a-tree
        ref="assignTree"
        v-if="treeData && treeData?.length > 0"
        :show-line="true"
        :tree-data="treeData"
        :field-names="fieldNames"
        v-model:checkedKeys="checkedKeys"
        default-expand-all
        checkable
      />
    </template>
  </sys-modal>
</template>

<script setup lang="ts">
import SysModal from '@/components/common/SysModal.vue'
import useModal from '@/composables/modal/useModal.ts'
import { getAssignTreeVo } from '@/api/userController.ts'
import { useUserStore } from '@/store/userStore.ts'
import { message, TreeProps } from 'ant-design-vue'
import { assignRoleMenu } from '@/api/roleController.ts'

const { modal, showModal, handleOk, handleCancel } = useModal()
const userStore = useUserStore()
// region 弹窗
const assignTree = ref()
const checkedKeys = ref<number[]>([])
const treeData = ref<TreeProps['treeData']>([])

const roleId = ref()
const fieldNames = reactive({
  children: 'children',
  title: 'title',
  key: 'id',
})

const doConfirm = async () => {
  const ids = assignTree.value.checkedKeys.concat(assignTree.value.halfCheckedKeys)
  const param = {
    roleId: roleId.value,
    menuIds: ids,
  }
  await assignRoleMenu(param).then((res) => {
    if (res.data.code === 0) {
      message.success('保存成功')
      handleOk()
    } else {
      message.error(res.data.message)
    }
  })
}

const doShow = async (record: API.SysRoleVO) => {
  roleId.value = record.id
  const params = {
    userId: userStore.loginUser?.id ?? 0,
    roleId: roleId.value,
  }
  modal.height = 460
  modal.width = 360
  modal.title = '为【' + record.roleName + '】分配菜单'
  await getAssignTreeVo(params).then((res) => {
    if (res.data.code === 0) {
      treeData.value = res.data.data?.menuList as any
      checkedKeys.value = res.data.data?.checkList as any
    }
  })
  showModal()
}
defineExpose({ doShow })
// endregion
</script>

<style scoped lang="scss">
:deep(.ant-tree-switcher-noop) {
  display: none !important;
}
</style>
