import { defineStore, acceptHMRUpdate } from 'pinia'
import * as compositeAPI from '@/api/composite'
import { getPagination } from '@/utils/response'
import { notification } from 'ant-design-vue'
import _ from 'lodash'

const getTitleOfMethod = (method) => {
  const map = {
    'post': 'Tạo mới',
    'put': 'Cập nhật',
    'delete': 'Xóa',
    'confirm': 'Xác nhận',
    'get': 'Tải dữ liệu'
  }

  return method ? map[method.toLowerCase()] : ''
}

export const useCompositeStore = defineStore({
  id: 'composite',

  state: () => ({
    pageData: {}
  }),

  getters: {
    getPageData: (state) => {
      return key => state.pageData[key]
    }
  },

  actions: {
    commit(store, response) {
      const matchField = store.matchField || '_id'
      let index

      switch (store.method.toLowerCase()) {
        case 'get':
          this.pageData[store.state] = response.data
          if (store.paginate) {
            this.pageData[`${store.state}_pagination`] = getPagination(response.headers)
          }
          break
        case 'post':
          this.pageData[store.state].unshift(response.data)
          break
        case 'put':
          if (!_.isArray(this.pageData[store.state])) {
            if (this.pageData[store.state][matchField] === response.data[matchField]) {
              this.pageData[store.state] = response.data
            }
          } else {
            index = this.pageData[store.state].findIndex(d => {
              return d[matchField] === response.data[matchField]
            })

            if (index > -1) {
              if (response.data) {
                this.pageData[store.state][index] = response.data
              } else {
                this.pageData[store.state].splice(index, 1)
              }
            }
          }
          break
        case 'delete':
          index = this.pageData[store.state].findIndex(d => {
            return d[matchField] === response.data[matchField]
          })

          if (index > -1) {
            this.pageData[store.state].splice(index, 1)
          }
          break
      }
    },

    async process(payload) {
      const method = payload.store.method.toLowerCase()
      const api = payload.api || `${method}Data`

      let response = await compositeAPI[api](payload.data)

      if (payload.message) {
        notification.success({
          message: 'Thành công',
          description: _.isString(payload.message) ? payload.message : `${getTitleOfMethod(method)} thành công`
        })
      }

      if (!payload.noCommit) {
        if (['post', 'delete', 'put'].includes(method)) {
          response = await compositeAPI.getData({
            appId: payload.data.appId,
            query: Object.assign({}, payload.data.query, {
              _type: 'findOne',
              _id: response.data._id || payload.data.query._id || payload.data.body._id
            })
          })
        }

        this.commit(payload.store, response)
      }

      return response.data
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCompositeStore, import.meta.hot))
}