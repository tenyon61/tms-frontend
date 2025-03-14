<template>
  <div class="roleList">
    <!-- 搜索表单 -->
    <a-form ref="searchRef" layout="inline" :model="searchParams" :style="{}">
      <a-form-item name="roleName" label="角色名称">
        <a-input
          v-model:value="searchParams.roleName"
          placeholder="请输入角色名称"
          allow-clear
        ></a-input>
      </a-form-item>
      <a-form-item name="type" label="扩展字段">
        <a-input
          v-model:value="searchParams.type"
          placeholder="请输入扩展字段"
          allow-clear
        ></a-input>
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
    <div style="margin-bottom: 15px" />
    <!-- 数据列表-->
    <a-table
      :data-source="dataGrid"
      :columns="columns"
      :table-layout="'fixed'"
      :pagination="pagination"
      :scroll="{ y: tableHeight }"
      @change="doTableChange"
      size="middle"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'type'">
          {{ record.type ?? '--' }}
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-if="column.dataIndex === 'updateTime'">
          {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space class="flex-center">
            <div class="i-ri:edit-box-line color-blue" @click="doEdit(record)"></div>
            <div class="i-ri:settings-2-line color-black" @click="doAssign(record)"></div>
            <div class="i-ri:delete-bin-6-line color-red" @click="doDelete(record.id)"></div>
          </a-space>
        </template>
      </template>
    </a-table>
    <!-- 弹窗 -->
    <sys-modal
      :open="modal.open"
      :title="modal.title"
      :width="modal.width"
      :height="modal.height"
      @handleOk="doConfirm"
      @handleCancel="doCancel"
    >
      <template #content>
        <a-form ref="formRef" label-align="right" :model="formState" :rules="rules">
          <a-form-item name="roleName" label="角色名称" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.roleName" placeholder="请填写角色名称"></a-input>
          </a-form-item>
          <a-form-item name="type" label="扩展字段" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.type" placeholder="请填写扩展字段"></a-input>
          </a-form-item>
          <a-form-item name="remark" label="备注" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.remark" placeholder="请填写备注"></a-input>
          </a-form-item>
        </a-form>
      </template>
    </sys-modal>
    <assign-tree-modal ref="assignRef"></assign-tree-modal>
  </div>
</template>

<script setup lang="ts">
import useModal from '@/composables/modal/useModal.ts'
import { Rule } from 'ant-design-vue/es/form'
import { addRole, deleteRole, listRoleVoByPage, updateRole } from '@/api/roleController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import SysModal from '@/components/common/SysModal.vue'
import { ref } from 'vue'
import sysConfirm from '@/utils/confirmUtil.ts'
import AssignTreeModal from '@/views/system/menu/component/AssignTreeModal.vue'

const { modal, showModal, handleOk, handleCancel } = useModal()

// region 搜索表单
const searchRef = ref()
const searchParams = reactive<API.RoleQueryRequest>({
  current: 1,
  pageSize: 10,
  sortField: 'createTime',
  sortOrder: 'ascend',
})
const doSearch = () => {
  searchParams.current = 1
  fetchData()
}
const doRest = () => {
  searchRef.value.resetFields()
  fetchData()
}
// endregion

// region 弹窗
const tags = ref('')
const formRef = ref()
const formState = reactive(<API.RoleAddRequest | API.RoleUpdateRequest>{
  id: '',
  roleName: '',
  type: '',
  remark: '',
})
const doAdd = () => {
  tags.value = '0'
  modal.title = '新增'
  modal.width = 460
  modal.height = 160
  showModal()
}
const doEdit = async (record: API.SysRoleVO) => {
  tags.value = '1'
  modal.title = '修改'
  modal.width = 460
  modal.height = 160
  showModal()
  Object.assign(formState, record)
}

const assignRef = ref()
const doAssign = async (record: API.SysRoleVO) => {
  assignRef.value.doShow(record)
}

const rules: Record<string, Rule[]> = {
  roleName: [{ required: true, message: '角色名称不能为空' }],
}
const doConfirm = () => {
  formRef.value
    .validate()
    .then(async () => {
      if (tags.value === '0') {
        await addRole(formState as any).then((res) => {
          if (res.data.code === 0) {
            message.success('保存成功！')
            formRef.value.resetFields()
            handleOk()
          } else {
            message.error(res.data.message)
          }
        })
      } else if (tags.value === '1') {
        await updateRole(formState).then((res) => {
          if (res.data.code === 0) {
            message.success('修改成功！')
            formRef.value.resetFields()
            handleOk()
          } else {
            message.error(res.data.message)
          }
        })
      }
    })
    .catch(() => {})
    .finally(() => fetchData())
}

const doCancel = () => {
  formRef.value.resetFields()
  handleCancel()
}
// endregion

// region 数据列表
const tableHeight = ref(0)
const dataGrid = ref<API.SysRoleVO[]>([])
const total = ref(0)
const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`,
  }
})
const fetchData = async () => {
  await listRoleVoByPage({ ...searchParams }).then((res) => {
    if (res.data.code === 0 && res.data.data) {
      dataGrid.value = res.data.data.records ?? []
      total.value = Number(res.data.data.total) ?? 0
    } else {
      message.error('获取数据失败，' + res.data.message)
    }
  })
}
const doTableChange = (page: any) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}
const doDelete = async (id: any) => {
  if (!id) {
    return
  }
  const confirm = await sysConfirm()
  if (confirm) {
    await deleteRole({ id }).then((res) => {
      if (res.data.code === 0) {
        message.success('删除成功！')
        fetchData()
      } else {
        message.error('删除失败')
      }
    })
  }
}
// endregion

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
    align: 'center',
    width: 180,
  },
  {
    title: '扩展字段',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    width: 160,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
    width: 160,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 160,
  },
] as any[]
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 300
  })
  fetchData()
})
</script>

<style scoped lang="scss"></style>
