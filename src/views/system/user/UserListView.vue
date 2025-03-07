<template>
  <div id="userManagePage">
    <!-- 搜索表单 -->
    <a-form ref="searchRef" layout="inline" :model="searchParams">
      <a-form-item name="userAccount" label="账号">
        <a-input v-model:value="searchParams.userAccount" placeholder="输入账号" allow-clear />
      </a-form-item>
      <a-form-item name="userName" label="用户名">
        <a-input v-model:value="searchParams.userName" placeholder="输入用户名" allow-clear />
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
    <div style="margin-bottom: 16px" />
    <!-- 数据列表 -->
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
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image
            :src="record.userAvatar ?? notLoginUser"
            :style="{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }"
            :width="38"
            :height="38"
          />
        </template>
        <template v-if="column.dataIndex === 'userProfile'">
          {{ record.userProfile ?? '--' }}
        </template>
        <template v-if="column.dataIndex === 'userRole'">
          <a-tag :color="roleColors[record?.userRole]">{{ roleLabels[record?.userRole] }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space class="flex-center">
            <div class="i-ri:edit-box-line color-blue" @click="doEdit(record)"></div>
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
      @handleOk="confirm"
      @handleCancel="handleCancel"
    >
      <template #content>
        <a-form ref="formRef" label-align="right" :model="formState" :rules="rules">
          <a-form-item name="roleName" label="用户账号" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.userAccount" placeholder="请填写用户账号"></a-input>
          </a-form-item>
          <a-form-item name="type" label="用户名称" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.userName" placeholder="请填写用户名称"></a-input>
          </a-form-item>
          <a-form-item name="remark" label="用户角色" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.userRole" placeholder="请选择用户角色"></a-input>
          </a-form-item>
        </a-form>
      </template>
    </sys-modal>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { addUser, deleteUser, listUserVoByPage, updateUser } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import notLoginUser from '@/assets/notLogin.png'
import ACCESS_ENUM from '@/type/baseEnum.ts'
import { Rule } from 'ant-design-vue/es/form'
import useModal from '@/composables/modal/useModal.ts'
import SysModal from '@/components/common/SysModal.vue'

const { modal, showModal, handleOk, handleCancel } = useModal()

// region 搜索表单
const searchRef = ref()
const searchParams = reactive<API.UserQueryRequest>({
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
}
// endregion

// region 弹窗
const tags = ref('')
const formRef = ref()
const formState = reactive(<API.UserAddRequest | API.UserUpdateRequest>{
  id: '',
  userName: '',
  userAccount: '',
  userRole: '',
})
const doAdd = () => {
  tags.value = '0'
  modal.title = '新增'
  modal.width = 460
  modal.height = 500
  showModal()
}
const doEdit = async (record: API.SysRole) => {
  tags.value = '1'
  modal.title = '修改'
  modal.width = 460
  modal.height = 500
  showModal()
  Object.assign(formState, record)
}
const rules: Record<string, Rule[]> = {
  userAccount: [{ required: true, message: '用户账号不能为空' }],
  userName: [{ required: true, message: '用户名称不能为空' }],
}
const confirm = () => {
  formRef.value
    .validate()
    .then(async () => {
      if (tags.value === '0') {
        await addUser(formState).then((res) => {
          if (res.data.code === 0) {
            message.success('保存成功！')
            formRef.value.resetFields()
            handleOk()
          } else {
            message.error(res.data.message)
          }
        })
      } else if (tags.value === '1') {
        await updateUser(formState).then((res) => {
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
// endregion

// region 数据列表
const tableHeight = ref(0)
const dataGrid = ref<API.UserVO[]>([])
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
  await listUserVoByPage({
    ...searchParams,
  }).then((res) => {
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
  await deleteUser({ id }).then((res) => {
    if (res.data.code === 0) {
      message.success('删除成功')
      fetchData()
    } else {
      message.error('删除失败')
    }
  })
}
// endregion
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 180,
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    align: 'center',
    width: 160,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
    align: 'center',
    width: 180,
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    key: 'userAvatar',
    align: 'center',
    width: 120,
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
    key: 'userProfile',
    align: 'left',
    ellipsis: true,
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    key: 'userRole',
    align: 'center',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    width: 180,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 180,
  },
] as any[]

const roleColors = reactive({
  [ACCESS_ENUM.ADMIN]: 'green',
  [ACCESS_ENUM.USER]: 'blue',
  [ACCESS_ENUM.VIP]: 'orange',
  [ACCESS_ENUM.SVIP]: 'red',
})

const roleLabels = reactive({
  [ACCESS_ENUM.ADMIN]: '管理员',
  [ACCESS_ENUM.USER]: '普通用户',
  [ACCESS_ENUM.VIP]: '会员',
  [ACCESS_ENUM.SVIP]: '超级会员',
})

onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 300
  })
  fetchData()
})
</script>
