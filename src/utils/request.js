import axios from 'axios'
import { notification } from 'ant-design-vue'
import { useAccountStore } from '@/store/account'
import { get } from 'lodash'


const service = axios.create()

service.interceptors.request.use(
  config => {
    const accountStore = useAccountStore()

    config.baseURL = accountStore.app ? accountStore.app.baseApi : import.meta.env.VITE_BASE_API,
    config.timeout = 10000

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
      return response
    }
  },
  error => {
    notification.error({
      message: 'Error',
      description: get(error, 'response.data.error.msg') || error.message || '???'
    })

    return Promise.reject(error)
  }
)

export default service
