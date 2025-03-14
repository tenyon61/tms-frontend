import router from '@/router'
import { useUserStore } from '@/store/user.ts'
import ACCESS_ENUM from '@/type/baseEnum.ts'
import checkAccess from '@/composables/access/checkAccess.ts'

// 进入页面前，进行权限校验
router.beforeEach(async (to, _, next) => {
  // 获取当前登录用户
  const userStore = useUserStore()
  let loginUser = userStore.loginUser
  // 如果之前没有尝试获取过登录用户信息，才自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等待用户登录成功并获取到值后，再执行后续操作
    await userStore.fetchLoginUser()
    loginUser = userStore.loginUser
  }

  // 当前页面需要的权限
  const needAccess = JSON.stringify(to.meta?.roles) ?? ACCESS_ENUM.NOT_LOGIN
  // 要跳转的页面必须登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登录，跳转到登录页面
    if (!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next(`/login?redirect=${to.fullPath}`)
    }
    // 如果已经登录了，判断权限是否足够，如果不足，跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next('/noAuth')
      return
    }
  }
  next()
})
