// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 获取当前登录用户 GET /auth/getLoginUser */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/auth/getLoginUser', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 用户登录 POST /auth/login */
export async function login(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户注销 POST /auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/auth/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

/** 用户注册 POST /auth/register */
export async function register(body: API.UserRegisterRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
