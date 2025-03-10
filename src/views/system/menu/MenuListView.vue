<template>
  <div class="menuList">
    <a-space>
      <a-button class="flex-center" type="primary" danger @click="doAdd">
        <div class="i-ri:add-large-line m-r0.5"></div>
        新增
      </a-button>
    </a-space>
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
                  tree-checkable
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
                <a-input v-model:value="formState.icon" placeholder="请填写路由名称"></a-input>
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
  getParentMenuList,
  listMenuVoByPage,
  updateMenu,
} from '@/api/menuController.ts'
import { message } from 'ant-design-vue'
import sysConfirm from '@/utils/confirmUtil.ts'
import SysMenuVO = API.SysMenuVO

const { modal, showModal, handleOk, handleCancel } = useModal()

// region 搜索表单
const searchParams = reactive<API.MenuQueryRequest>({
  current: 1,
  pageSize: 10,
  sortField: 'orderNum',
  sortOrder: 'descend',
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
  type: [{ required: true, message: '资源类型必填' }],
  title: [{ required: true, message: '菜单名称不能为空' }],
  parentId: [{ required: true, message: '父级菜单必填' }],
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
    .finally(() => fetchData())
}

const doCancel = () => {
  formRef.value.resetFields()
  handleCancel()
}
// endregion

// region 数据列表
const tableHeight = ref(0)
const dataGrid = ref<API.SysMenuVO[]>([])
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
  await listMenuVoByPage({ ...searchParams }).then((res) => {
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
    await deleteMenu({ id }).then((res) => {
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

onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 300
  })
  fetchData()
  getTreeData()
})
</script>
<style scoped lang="scss"></style>
