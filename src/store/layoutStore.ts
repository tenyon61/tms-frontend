import { defineStore } from 'pinia'

export type Tab = {
  label: string
  path: string
  closable: boolean
}

export type TabState = {
  tabList: Array<Tab>
}

export const useLayoutStore = defineStore(
  'layoutStore',
  () => {
    const tabList = ref<Tab[]>([{ path: '/dashboard/workplace', label: '工作台', closable: false }])
    const addTab = (tab: Tab) => {
      console.log('pinia中', tabList)
      if (tabList.value.some((item) => item.path === tab.path)) return
      tabList.value.push(tab)
    }

    return {
      tabList,
      addTab,
    }
  },
  {
    persist: {
      key: 'layoutStore',
    },
  },
)
