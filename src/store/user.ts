import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUser } from '@/api/authController.ts'
import { getSingleUser } from '@/api/userController.ts'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const loginUser = ref<API.LoginUserVO>({
      token: '',
      id: -1,
      userName: '未登录',
    })

    const codeList = ref([])

    /**
     * 远程获取登录用户信息
     */
    const fetchLoginUser = async () => {
      await getLoginUser().then((res) => {
        if (res.data.code === 0 && res.data.data) {
          loginUser.value = res.data.data
        }
      })
    }

    const getUserInfo = () => {
      return new Promise((resolve, reject) => {
        getSingleUser({ id: loginUser.value.id ?? -1 })
          .then((res) => {
            if (res.data.code === 0 && res.data.data) {
              codeList.value = (res.data?.data as any) ?? []
            }
            resolve(codeList.value)
          })
          .catch((err) => {
            reject(err)
          })
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

    return { loginUser, codeList, fetchLoginUser, getUserInfo, setLoginUser }
  },
  {
    persist: {
      key: 'user',
      pick: ['loginUser'],
    },
  },
)
