import { defineStore } from 'pinia'
import { getAuthMenuList } from '@/api/authController.ts'
import { generateRoutes } from '@/router/generate-routes.ts'

export const useMenuStore = defineStore('menuStore', () => {
  const menuList = ref([])
  const isLoaded = ref(false)
  const getMenuList = (router: any, userId: number) => {
    return new Promise((resolve, reject) => {
      getAuthMenuList({ userId })
        .then((res) => {
          let accessRoute
          if (res.data.code === 0) {
            accessRoute = generateRoutes(res.data?.data as any, router) as any
            menuList.value = menuList.value.concat(accessRoute)
            isLoaded.value = true
          }
          resolve(menuList.value)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  return { menuList, isLoaded, getMenuList }
})
