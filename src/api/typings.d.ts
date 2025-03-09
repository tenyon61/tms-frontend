declare namespace API {
  type BaseResponseBoolean = {
    /** 响应代码 */
    code?: number
    /** 响应内容 */
    data?: boolean
    /** 响应消息 */
    message?: string
  }

  type BaseResponseListLong = {
    /** 响应代码 */
    code?: number
    /** 响应内容 */
    data?: number[]
    /** 响应消息 */
    message?: string
  }

  type BaseResponseListRoleSelectItem = {
    /** 响应代码 */
    code?: number
    /** 响应内容 */
    data?: RoleSelectItem[]
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

  type BaseResponsePageSysRole = {
    /** 响应代码 */
    code?: number
    data?: PageSysRole
    /** 响应消息 */
    message?: string
  }

  type BaseResponsePageSysUser = {
    /** 响应代码 */
    code?: number
    data?: PageSysUser
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

  type BaseResponseSysUser = {
    /** 响应代码 */
    code?: number
    data?: SysUser
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

  type getUserRoleListParams = {
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

  type PageSysRole = {
    records?: SysRole[]
    total?: number
    size?: number
    current?: number
    orders?: OrderItem[]
    optimizeCountSql?: PageSysRole
    searchCount?: PageSysRole
    optimizeJoinOfCountSql?: boolean
    maxLimit?: number
    countId?: string
    pages?: number
  }

  type PageSysUser = {
    records?: SysUser[]
    total?: number
    size?: number
    current?: number
    orders?: OrderItem[]
    optimizeCountSql?: PageSysUser
    searchCount?: PageSysUser
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

  type RoleAddRequest = {
    /** 角色名称 */
    roleName: string
    /** 扩展字段 */
    type?: string
    /** 备注 */
    remark?: string
  }

  type RoleQueryRequest = {
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
    /** 角色名称 */
    roleName?: string
    /** 扩展字段 */
    type?: string
    /** 备注 */
    remark?: string
  }

  type RoleSelectItem = {
    /** 角色id */
    value?: number
    /** 角色名称 */
    label?: string
    /** 是否选中 */
    checked?: boolean
  }

  type RoleUpdateRequest = {
    /** id */
    id?: number
    /** 角色名称 */
    roleName?: string
    /** 扩展字段 */
    type?: string
    /** 备注 */
    remark?: string
  }

  type SysRole = {
    id?: number
    roleName?: string
    type?: string
    remark?: string
    createTime?: string
    updateTime?: string
  }

  type SysUser = {
    id?: number
    userAccount?: string
    userPassword?: string
    userName?: string
    userAvatar?: string
    userProfile?: string
    unionId?: string
    mpOpenId?: string
    phone?: string
    email?: string
    sex?: number
    userRole?: string
    status?: number
    createTime?: string
    updateTime?: string
    isDelete?: number
    roleIds?: string
  }

  type UserAddRequest = {
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 性别 */
    sex?: number
    /** 邮箱 */
    email?: string
    /** 手机号 */
    phone?: string
    /** 角色 */
    roleIds?: string
  }

  type UserLoginRequest = {
    /** 账号 */
    userAccount?: string
    /** 密码 */
    userPassword?: string
    /** 角色 */
    roleIds?: string
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
    /** 邮箱 */
    email?: string
    /** 手机号 */
    phone?: string
    /** 简介 */
    userProfile?: string
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
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 用户头像 */
    userAvatar?: string
    /** 简介 */
    userProfile?: string
    /** 性别 */
    sex?: number
    /** 邮箱 */
    email?: string
    /** 手机号 */
    phone?: string
  }

  type UserUpdateRequest = {
    /** id */
    id?: number
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 性别 */
    sex?: number
    /** 邮箱 */
    email?: string
    /** 手机号 */
    phone?: string
    /** 角色 */
    roleIds?: string
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
    /** 性别 */
    sex?: number
    /** 用户简介 */
    userProfile?: string
    /** 用户角色 */
    userRole?: string
    /** 用户邮箱 */
    email?: string
    /** 手机号码 */
    phone?: string
    /** 创建时间 */
    createTime?: string
  }
}
