<template>
  <div class="menuList">
    <!-- 搜索表单 -->
    <a-space>
      <a-button class="flex-center" type="primary" danger @click="doAdd">
        <div class="i-ri:add-large-line m-r0.5"></div>
        新增
      </a-button>
    </a-space>
    <!-- 列表 -->
    <a-table
      v-if="dataGrid && dataGrid.length > 0"
      :data-source="dataGrid"
      :columns="columns"
      :table-layout="'fixed'"
      :pagination="false"
      :defaultExpandAllRows="true"
      :scroll="{ y: tableHeight }"
      size="middle"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'icon'">
          <Icon :icon="record.icon"></Icon>
        </template>
        <template v-if="column.dataIndex === 'type'">
          <a-tag :color="Colors[record.type]">{{ Labels[record.type] }}</a-tag>
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
          <a-form-item name="type" label="资源类型" :label-col="{ span: 4 }">
            <a-radio-group v-model:value="formState.type" :options="plainOptions" />
          </a-form-item>
          <a-row>
            <a-col :span="12" :offset="0">
              <a-form-item name="parentId" label="上级菜单" :label-col="{ span: 8 }">
                <a-tree-select
                  v-model:value="formState.parentId"
                  placeholder="请选择"
                  tree-node-filter-prop="label"
                  :tree-data="treeData"
                  :tree-line="true"
                  @select="onNodeSelect"
                  allow-clear
                ></a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="0">
              <a-form-item name="title" label="菜单名称" :label-col="{ span: 8 }">
                <a-input v-model:value="formState.title" placeholder="请填写菜单名称"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="formState.type != 2">
            <a-col :span="12" :offset="0">
              <a-form-item name="icon" label="菜单图标" :label-col="{ span: 8 }">
                <a-input v-model:value="formState.icon" placeholder="请填写菜单图标"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="0">
              <a-form-item name="name" label="路由名称" :label-col="{ span: 8 }">
                <a-input v-model:value="formState.name" placeholder="请填写路由名称"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" :offset="0">
              <a-form-item name="orderNum" label="菜单序号" :label-col="{ span: 8 }">
                <a-input v-model:value="formState.orderNum" placeholder="请设置菜单序号"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12" :offset="0">
              <a-form-item name="code" label="权限字段" :label-col="{ span: 8 }">
                <a-input v-model:value="formState.code" placeholder="请填写权限字段"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col v-if="formState.type != 2" :span="12" :offset="0">
              <a-form-item name="path" label="路由地址" :label-col="{ span: 8 }">
                <a-input v-model:value="formState.path" placeholder="请填写路由地址"></a-input>
              </a-form-item>
            </a-col>
            <a-col v-if="formState.type == 1" :span="12" :offset="0">
              <a-form-item name="url" label="组件路径" :label-col="{ span: 8 }">
                <a-input v-model:value="formState.url" placeholder="请填写组件路径"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </sys-modal>
  </div>
</template>
<script setup lang="ts">
// region搜索表单
import SysModal from '@/components/common/SysModal.vue'
import useModal from '@/composables/modal/useModal.ts'
import { Rule } from 'ant-design-vue/es/form'
import {
  addMenu,
  deleteMenu,
  getMenuList,
  getParentMenuList,
  updateMenu,
} from '@/api/menuController.ts'
import { message } from 'ant-design-vue'
import sysConfirm from '@/utils/confirmUtil.ts'
import dayjs from 'dayjs'
import { Icon } from '@iconify/vue'
import { reactive } from 'vue'
import SysMenuVO = API.SysMenuVO

const { modal, showModal, handleOk, handleCancel } = useModal()

// region 搜索表单
const searchParams = reactive<API.MenuQueryRequest>({
  current: 1,
  pageSize: 10,
  sortField: 'orderNum',
  sortOrder: 'ascend',
})
// endregion

// region 弹窗
const tags = ref('')
const formRef = ref()
const formState = reactive(<API.MenuAddRequest | API.MenuUpdateRequest>{
  id: 0,
  parentId: undefined,
  title: '',
  code: '',
  name: '',
  path: '',
  url: '',
  type: 0,
  icon: '',
  parentName: '',
  orderNum: 0,
})
const plainOptions = [
  { label: '目录', value: 0 },
  { label: '菜单', value: 1 },
  { label: '按钮', value: 2 },
]
const treeData = ref<SysMenuVO[]>([])
const getTreeData = async () => {
  await getParentMenuList().then((res) => {
    if (res.data.code === 0) {
      treeData.value = res.data.data as any[]
    }
  })
}
const doAdd = () => {
  tags.value = '0'
  modal.title = '新增'
  modal.width = 550
  modal.height = 260
  showModal()
}
const doEdit = async (record: API.SysMenuVO) => {
  tags.value = '1'
  modal.title = '修改'
  modal.width = 550
  modal.height = 260
  showModal()
  Object.assign(formState, record)
}
const rules: Record<string, Rule[]> = {
  parentId: [{ required: true, message: '父级菜单必填' }],
  title: [{ required: true, message: '菜单名称必填' }],
  code: [{ required: true, message: '权限字段必填' }],
  name: [{ required: true, message: '路由名称必填' }],
  path: [{ required: true, message: '路由地址必填' }],
  url: [{ required: true, message: '组件路径必填' }],
  type: [{ required: true, message: '资源类型必填' }],
  icon: [{ required: true, message: '菜单图标必填' }],
  orderNum: [{ required: true, message: '菜单排序必填' }],
}
const doConfirm = () => {
  formRef.value
    .validate()
    .then(async () => {
      if (tags.value === '0') {
        await addMenu(formState as any).then((res) => {
          if (res.data.code === 0) {
            message.success('保存成功！')
            formRef.value.resetFields()
            handleOk()
          } else {
            message.error(res.data.message)
          }
        })
      } else if (tags.value === '1') {
        await updateMenu(formState).then((res) => {
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
    .finally(() => {
      getTreeData()
      fetchData()
    })
}

const doCancel = () => {
  formRef.value.resetFields()
  handleCancel()
}
const onNodeSelect = (value: any, node: any) => {
  formState.parentName = node.title
}
// endregion

// region 数据列表
const tableHeight = ref(0)
const dataGrid = ref<API.SysMenuVO[]>([])
const total = ref(0)
const fetchData = async () => {
  await getMenuList({ ...searchParams }).then((res) => {
    if (res.data.code === 0 && res.data.data) {
      dataGrid.value = res.data.data ?? []
      total.value = Number(res.data.data) ?? 0
    } else {
      message.error('获取数据失败，' + res.data.message)
    }
  })
}
const doDelete = async (id: any) => {
  if (!id) {
    return
  }
  const confirm = await sysConfirm()
  if (confirm) {
    await deleteMenu({ id }).then((res) => {
      if (res.data.code === 0) {
        message.success('删除成功！')
        fetchData()
        getTreeData()
      } else {
        message.error('删除失败')
      }
    })
  }
}
// endregion

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    width: 120,
  },
  {
    title: '资源类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: 80,
  },
  {
    title: '资源图标',
    dataIndex: 'icon',
    key: 'icon',
    align: 'center',
    width: 80,
  },
  {
    title: '路由名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 120,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    key: 'path',
    align: 'center',
    width: 160,
  },
  {
    title: '权限字段',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    width: 160,
  },
  {
    title: '组件路径',
    dataIndex: 'url',
    key: 'url',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    width: 150,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
    width: 150,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 120,
  },
] as any[]

const Colors = reactive({
  [0]: 'green',
  [1]: 'blue',
  [2]: 'orange',
}) as any

const Labels = reactive({
  [0]: '目录',
  [1]: '菜单',
  [2]: '按钮',
}) as any

onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 300
  })
  fetchData()
  getTreeData()
})
</script>
<style scoped lang="scss"></style>
