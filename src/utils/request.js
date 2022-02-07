import axios from 'axios'
import { notification } from 'ant-design-vue'
import { useAccountStore } from '@/store/account'
import { get } from 'lodash'

const accountStore = useAccountStore()

const service = axios.create({
  baseURL: '',
  timeout: 30000
})

service.interceptors.request.use(
  config => {
    if (accountStore.accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accountStore.accessToken
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status < 200 || response.status > 299) {
      const message = get(response, 'data.error.message') || response.message || '???'
      notification.error({
        message: 'Lỗi !',
        description: message
      })

      return Promise.reject(new Error(message))
    } else {
      return res
    }
  },
  error => {
    notification.error({
      message: 'Lỗi !',
      description: get(error, 'response.data.error.message') || error.message || '???'
    })

    return Promise.reject(error)
  }
)

export default service
