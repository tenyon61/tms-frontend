// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 创建用户 POST /api/user/add */
export async function addUser(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除用户 DELETE /api/user/delete/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/api/user/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 根据 id 获取用户（仅管理员） GET /api/user/get */
export async function getUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseSysUser>('/api/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取分配菜单树 POST /api/user/getAssignTree */
export async function getAssignTreeVo(
  body: API.AssignTreeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAssignTreeVO>('/api/user/getAssignTree', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取单用户信息 GET /api/user/getUserInfo */
export async function getSingleUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSingleUserParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseSingleUserVO>('/api/user/getUserInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取用户角色列表 GET /api/user/getUserRoleList */
export async function getUserRoleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserRoleListParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListLong>('/api/user/getUserRoleList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 根据 id 获取包装类 GET /api/user/getVO */
export async function getUserVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseSysUserVO>('/api/user/getVO', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 分页获取用户列表（仅管理员） POST /api/user/listPage */
export async function listUserByPage(body: API.UserQueryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageSysUser>('/api/user/listPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页获取用户封装列表（仅管理员） POST /api/user/listPageVO */
export async function listUserVoByPage(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageSysUserVO>('/api/user/listPageVO', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 重置密码 PUT /api/user/resetPwd/${param0} */
export async function resetPwd(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPwdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/api/user/resetPwd/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 更新用户 PUT /api/user/update */
export async function updateUser(body: API.UserUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新个人信息 PUT /api/user/updateMy */
export async function updateMyUser(
  body: API.UserUpdateMyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/api/user/updateMy', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
