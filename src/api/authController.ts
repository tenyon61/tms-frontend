// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 获取权限路由菜单 GET /api/auth/getAuthMenuList */
export async function getAuthMenuList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuthMenuListParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListRouterVO>('/api/auth/getAuthMenuList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取当前登录用户 GET /api/auth/getLoginUser */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/api/auth/getLoginUser', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 用户登录 POST /api/auth/login */
export async function login(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户注销 POST /api/auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

/** 用户注册 POST /api/auth/register */
export async function register(body: API.UserRegisterRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
