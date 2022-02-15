import request from '@/utils/request'

export function login(data) {
  return request({
    baseURL: import.meta.env.VITE_BASE_API,
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function account() {
  return request({
    baseURL: import.meta.env.VITE_BASE_API,
    url: 'account',
    method: 'get'
  })
}
