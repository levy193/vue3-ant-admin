import request from '@/utils/request'
import serialize from '@/utils/serialize'

export function getData(data) {
  return request({
    baseURL: import.meta.env.VITE_BASE_API,
    url: `/composite/${data.appId}${serialize(data.query)}`,
    method: 'get'
  })
}

export function postData(data) {
  return request({
    baseURL: import.meta.env.VITE_BASE_API,
    url: `/composite/${data.appId}${serialize(data.query)}`,
    data: data.body,
    method: 'post'
  })
}

export function putData(data) {
  return request({
    baseURL: import.meta.env.VITE_BASE_API,
    url: `/composite/${data.appId}${serialize(data.query)}`,
    data: data.body,
    method: 'put'
  })
}

export function deleteData(data) {
  return request({
    baseURL: import.meta.env.VITE_BASE_API,
    url: `/composite/${data.appId}${serialize(data.query)}`,
    method: 'delete'
  })
}
