import request from '@/utils/request'

export function question(data) {
  return request({
    url: '/question',
    method: 'post',
    data
  })
}
