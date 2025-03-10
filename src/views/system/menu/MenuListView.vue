<template>
  <div class="menuList">
    <!-- 搜索表单 -->
    <a-form ref="searchRef" layout="inline" :model="searchParams" :style="{}">
      <a-form-item name="title" label="菜单名称">
        <a-input
          v-model:value="searchParams.title"
          placeholder="请输入菜单名称"
          allow-clear
        ></a-input>
      </a-form-item>
      <a-form-item name="name" label="路由名称">
        <a-input
          v-model:value="searchParams.name"
          placeholder="请输入路由名称"
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
          <a-form-item name="title" label="菜单名称" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.title" placeholder="请填写菜单名称"></a-input>
          </a-form-item>
          <a-form-item name="name" label="路由名称" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.name" placeholder="请填写路由名称"></a-input>
          </a-form-item>
          <a-form-item name="orderNum" label="排序" :label-col="{ span: 6 }">
            <a-input v-model:value="formState.orderNum" placeholder="排序"></a-input>
          </a-form-item>
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
import { addMenu, deleteMenu, listMenuVoByPage, updateMenu } from '@/api/menuController.ts'
import { message } from 'ant-design-vue'
import sysConfirm from '@/utils/confirmUtil.ts'

const { modal, showModal, handleOk, handleCancel } = useModal()

const searchRef = ref()
const searchParams = reactive<API.MenuQueryRequest>({
  current: 1,
  pageSize: 10,
  sortField: 'orderNum',
  sortOrder: 'descend',
})
const doSearch = () => {
  searchParams.current = 1
  // fetchData()
}
const doRest = () => {
  searchRef.value.resetFields()
  // fetchData()
}
// endregion

// region 弹窗
const tags = ref('')
const formRef = ref()
const formState = reactive(<API.MenuAddRequest | API.MenuUpdateRequest>{
  parentId: 0,
  title: '',
  code: '',
  name: '',
  path: '',
  url: '',
  type: 0,
  icon: '',
  parentName: '',
  orderNum: 0,
  children: [],
  value: 0,
  label: '',
})
const doAdd = () => {
  tags.value = '0'
  modal.title = '新增'
  modal.width = 460
  modal.height = 160
  showModal()
}
const doEdit = async (record: API.SysMenuVO) => {
  tags.value = '1'
  modal.title = '修改'
  modal.width = 460
  modal.height = 160
  showModal()
  Object.assign(formState, record)
}
const rules: Record<string, Rule[]> = {
  roleName: [{ required: true, message: '角色名称不能为空' }],
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
})
</script>
<style scoped lang="scss"></style>
