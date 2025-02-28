import { defineStore } from 'pinia'
import { theme as antdTheme } from 'ant-design-vue/es'

export const useAppStore = defineStore('appStore', () => {
  const themeConfig = reactive({
    algorithm: [antdTheme.defaultAlgorithm],
    token: {
      colorBgContainer: '#fff',
      colorPrimary: '#FA541C',
    },
    components: {},
  })
  return {
    theme: themeConfig,
  }
})
