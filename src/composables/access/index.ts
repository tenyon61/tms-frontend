import router from '@/router'
import { useUserStore } from '@/store/user.ts'
import { useMenuStore } from '@/store/menu.ts'

const whiteList = ['/', '/login']

// 进入页面前，进行权限校验
router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  const token = userStore.loginUser?.token
  await menuStore.getMenuList(router, 1)
  console.log('全部路由', router.getRoutes())
  next()
  // if (token) {
  //   if (to.path === '/login' || to.path === '/') {
  //     next()
  //   } else {
  //     // 鉴权
  //     console.log(userStore.codeList)
  //     const hasRole = userStore.codeList.length > 0
  //     if (hasRole) {
  //       next()
  //     } else {
  //       try {
  //         console.log(to.path)
  //         await userStore.getUserInfo()
  //         await menuStore.getMenuList(router, userStore.loginUser?.id ?? -1)
  //         next({ ...to, replace: true })
  //       } catch (e) {
  //         localStorage.clear()
  //         next({ path: '/login' })
  //       }
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next({ path: `/login?redirect=${to.fullPath}` })
  //   }
  // }
})
