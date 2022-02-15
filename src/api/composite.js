import request from '@/utils/request'
import serialize from '@/utils/serialize'

export function compositeGetApi(data) {
  return request({
    baseURL: import.meta.env.VITE_BASE_API,
    url: `/composite/${data.appId}${serialize(data.query)}`,
    method: 'get'
  })
}