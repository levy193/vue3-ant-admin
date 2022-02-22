import FormData from 'form-data'
import axios from 'axios'

import request from '@/utils/request'

const CancelToken = axios.CancelToken
const baseURL = import.meta.env.VITE_BASE_API

export function getObjects(data) {
  return request({
    baseURL,
    url: `/media/${data.appId}/objects?${data.query}`,
    method: 'get',
  })
}

export function newFolder(data) {
  return request({
    baseURL,
    url: `/media/${data.appId}/folder?${data.query}`,
    method: 'post'
  })
}

export function getObject(data) {
  return request({
    baseURL,
    url: `/media/${data.appId}/object?${data.query}`,
    method: 'get'
  })
}

export function uploadObject(data, handleProgress, cancel) {
  const upload = new FormData()
  upload.append('file', data.file)

  return request({
    baseURL,
    url: `/media/${data.appId}/upload-multipart?${data.query}`,
    method: 'post',
    timeout: false,
    data: upload,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: handleProgress,
    cancelToken: new CancelToken(function executor(c) {
      cancel(c)
    })
  })
}

export function deleteObject(data) {
  return request({
    baseURL,
    url: `/media/${data.appId}?${data.query}`,
    method: 'delete'
  })
}
