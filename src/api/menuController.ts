// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 添加菜单 POST /api/menu/add */
export async function addMenu(body: API.MenuAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/api/menu/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除菜单 DELETE /api/menu/delete/${param0} */
export async function deleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenuParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/api/menu/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 获取菜单树 GET /api/menu/getMenuList */
export async function getMenuList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSysMenuVO>('/api/menu/getMenuList', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 获取上级菜单树 GET /api/menu/getParentMenuList */
export async function getParentMenuList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSysMenuVO>('/api/menu/getParentMenuList', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 分页获取菜单 POST /api/menu/listPageVO */
export async function listMenuVoByPage(
  body: API.MenuQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageSysMenuVO>('/api/menu/listPageVO', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新菜单 PUT /api/menu/update */
export async function updateMenu(body: API.MenuUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/api/menu/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
