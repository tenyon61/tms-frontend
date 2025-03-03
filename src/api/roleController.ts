// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 添加角色 POST /api/role/add */
export async function addRole(body: API.RoleAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/api/role/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除角色 POST /api/role/delete */
export async function deleteRole(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/api/role/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页获取角色 POST /api/role/listPage */
export async function listUserByPage(body: API.RoleQueryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageSysRole>('/api/role/listPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新角色 POST /api/role/update */
export async function updateRole(body: API.RoleUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/api/role/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
