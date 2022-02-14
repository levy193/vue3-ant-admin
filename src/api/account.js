import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function account() {
  return request({
    url: 'account',
    method: 'get'
  })
}
