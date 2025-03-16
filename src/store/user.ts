import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUser } from '@/api/authController.ts'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const loginUser = ref<API.LoginUserVO>({
      token: '',
      id: -1,
      userName: '未登录',
      permissions: [],
    })

    /**
     * 远程获取登录用户信息
     */
    const fetchLoginUser = async () => {
      await getLoginUser().then((res) => {
        if (res.data.code === 0 && res.data.data) {
          loginUser.value = res.data.data
          console.log(loginUser.value)
        }
      })
    }

    /**
     * 单独设置用户信息
     *
     * @param newLoginUser
     */
    const setLoginUser = (newLoginUser: any) => {
      loginUser.value = newLoginUser
    }

    return { loginUser, fetchLoginUser, setLoginUser }
  },
  {
    persist: {
      key: 'user',
      pick: ['loginUser'],
    },
  },
)
