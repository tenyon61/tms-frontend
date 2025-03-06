<template>
  <div id="userManagePage">
    <!-- 搜索表单 -->
    <a-form layout="inline" :model="searchParams">
      <a-form-item label="账号">
        <a-input v-model:value="searchParams.userAccount" placeholder="输入账号" allow-clear />
      </a-form-item>
      <a-form-item label="用户名">
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
      </a-space>
    </a-form>
    <div style="margin-bottom: 16px" />
    <!-- 数据列表 -->
    <a-table
      :data-source="dataGrid"
      :columns="columns"
      :table-layout="'fixed'"
      :pagination="pagination"
      :scroll="{ y: 600 }"
      @change="doTableChange"
      size="middle"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image
            :src="record.userAvatar"
            :style="{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }"
            :width="38"
            :height="38"
          />
        </template>
        <template v-if="column.dataIndex === 'userRole'">
          <a-tag :color="roleColors[record?.userRole]">{{ roleLabels[record?.userRole] }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space class="flex-center">
            <div class="i-ri:delete-bin-6-line color-red" @click="doDelete(record.id)"></div>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { deleteUser, listUserVoByPage } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import ACCESS_ENUM from '@/type/baseEnum.ts'

// ~搜索表单
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
const doRest = () => {}
// ~数据列表
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
  fetchData()
})
</script>
