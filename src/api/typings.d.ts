declare namespace API {
  type BaseResponseBoolean = {
    /** 响应代码 */
    code?: number
    /** 响应内容 */
    data?: boolean
    /** 响应消息 */
    message?: string
  }

  type BaseResponseLoginUserVO = {
    /** 响应代码 */
    code?: number
    data?: LoginUserVO
    /** 响应消息 */
    message?: string
  }

  type BaseResponseLong = {
    /** 响应代码 */
    code?: number
    /** 响应内容 */
    data?: number
    /** 响应消息 */
    message?: string
  }

  type BaseResponsePageUser = {
    /** 响应代码 */
    code?: number
    data?: PageUser
    /** 响应消息 */
    message?: string
  }

  type BaseResponsePageUserVO = {
    /** 响应代码 */
    code?: number
    data?: PageUserVO
    /** 响应消息 */
    message?: string
  }

  type BaseResponseUser = {
    /** 响应代码 */
    code?: number
    data?: User
    /** 响应消息 */
    message?: string
  }

  type BaseResponseUserVO = {
    /** 响应代码 */
    code?: number
    data?: UserVO
    /** 响应消息 */
    message?: string
  }

  type DeleteRequest = {
    /** id */
    id?: number
  }

  type getUserByIdParams = {
    id: number
  }

  type getUserVOByIdParams = {
    id: number
  }

  type LoginUserVO = {
    /** id */
    id?: number
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色 */
    userRole?: string
    /** 会员编号 */
    vipNumber?: number
    /** 编辑时间 */
    editTime?: string
    /** 创建时间 */
    createTime?: string
    /** 更新时间 */
    updateTime?: string
  }

  type OrderItem = {
    column?: string
    asc?: boolean
  }

  type PageUser = {
    records?: User[]
    total?: number
    size?: number
    current?: number
    orders?: OrderItem[]
    optimizeCountSql?: PageUser
    searchCount?: PageUser
    optimizeJoinOfCountSql?: boolean
    maxLimit?: number
    countId?: string
    pages?: number
  }

  type PageUserVO = {
    records?: UserVO[]
    total?: number
    size?: number
    current?: number
    orders?: OrderItem[]
    optimizeCountSql?: PageUserVO
    searchCount?: PageUserVO
    optimizeJoinOfCountSql?: boolean
    maxLimit?: number
    countId?: string
    pages?: number
  }

  type User = {
    id?: number
    userAccount?: string
    userPassword?: string
    unionId?: string
    mpOpenId?: string
    userName?: string
    userAvatar?: string
    userProfile?: string
    userRole?: string
    vipNumber?: number
    vipCode?: string
    vipExpireTime?: string
    shareCode?: string
    inviteUser?: number
    editTime?: string
    createTime?: string
    updateTime?: string
    isDelete?: number
  }

  type UserAddRequest = {
    /** 用户昵称 */
    userName?: string
    /** 账号 */
    userAccount?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户角色 */
    userRole?: string
  }

  type UserLoginRequest = {
    /** 账号 */
    userAccount?: string
    /** 密码 */
    userPassword?: string
  }

  type UserQueryRequest = {
    /** 当前页号 */
    current?: number
    /** 页面大小 */
    pageSize?: number
    /** 排序字段 */
    sortField?: string
    /** 默认升序 ascend/descend */
    sortOrder?: string
    /** id */
    id?: number
    /** 用户昵称 */
    userName?: string
    /** 用户账号 */
    userAccount?: string
    /** 简介 */
    userProfile?: string
    /** 用户角色 */
    userRole?: string
  }

  type UserRegisterRequest = {
    /** 账号 */
    userAccount?: string
    /** 首次输入密码 */
    userPassword?: string
    /** 二次输入密码 */
    checkPassword?: string
  }

  type UserUpdateMyRequest = {
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 简介 */
    userProfile?: string
  }

  type UserUpdateRequest = {
    /** id */
    id?: number
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 简介 */
    userProfile?: string
    /** 用户角色 */
    userRole?: string
  }

  type UserVO = {
    /** id */
    id?: number
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色 */
    userRole?: string
    /** 创建时间 */
    createTime?: string
  }
}
