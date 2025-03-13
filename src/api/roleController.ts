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

/** 分配角色资源 POST /api/role/assignRoleMenu */
export async function assignRoleMenu(
  body: API.AssignRoleMenuRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/api/role/assignRoleMenu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除角色 DELETE /api/role/delete/${param0} */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/api/role/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 分页获取角色 POST /api/role/listPageVO */
export async function listRoleVoByPage(
  body: API.RoleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageSysRoleVO>('/api/role/listPageVO', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取下拉角色列表 GET /api/role/selectList */
export async function selectRoleList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListRoleSelectItem>('/api/role/selectList', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 更新角色 PUT /api/role/update */
export async function updateRole(body: API.RoleUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/api/role/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
