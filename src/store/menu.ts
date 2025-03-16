import { defineStore } from 'pinia'
import { getAuthMenuList } from '@/api/authController.ts'
import { generateRoutes } from '@/router/generate-routes.ts'

export const useMenuStore = defineStore('menuStore', () => {
  const menuList = ref([])
  const getMenuList = async (router: any, userId: number) => {
    await getAuthMenuList({ userId })
      .then((res) => {
        let accessRoute
        if (res.data.code === 0) {
          accessRoute = generateRoutes(res.data?.data as any, router) as any
          menuList.value = menuList.value.concat(accessRoute)
          console.log('menuList.value', menuList.value)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return { menuList, getMenuList }
})
