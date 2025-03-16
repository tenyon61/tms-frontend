import router from '@/router'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'

const whiteList = ['/login', '/'] // 静态白名单路由

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  // 从 localStorage 同步状态（确保 Pinia 和 localStorage 一致）
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  // 获取token
  const token = userStore.loginUser.token || user.token
  // 未登录用户处理逻辑
  if (!token) {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
    return // 必须 return 终止后续逻辑
  }

  // ------ 已登录用户逻辑 ------

  // 1. 已登录时访问登录/注册页，重定向到首页
  if (['/login'].includes(to.path)) {
    next({ path: '/' })
    return
  }

  // 2. 处理动态菜单加载
  try {
    // 如果菜单未加载（首次进入）
    if (menuStore.menuList.length <= 1) {
      // 先获取用户信息
      await userStore.fetchLoginUser()

      // 动态添加路由（需确保 getMenuList 内部调用了 router.addRoute）
      await menuStore.getMenuList(router, userStore.loginUser.id ?? -1)

      // 重新触发导航（解决动态路由未注册的问题）
      next({ ...to, replace: true })
    } else {
      // 如果请求的路由不存在（如 404）
      if (!to.matched.length) {
        next('/404')
      } else {
        next()
      }
    }
  } catch (error) {
    // 错误处理：清除所有登录状态
    userStore.$reset()
    menuStore.$reset()
    localStorage.removeItem('user')
    next(`/login?redirect=${encodeURIComponent(to.path)}`)
  }
})
