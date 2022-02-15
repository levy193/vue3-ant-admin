import { defineStore, acceptHMRUpdate } from 'pinia'
import * as userApi from '@/api/account'
import { setToken, removeToken, setAppId, removeAppId } from '@/utils/cookie'
import _ from 'lodash'
import config from '@/config'

export const useAccountStore = defineStore({
  id: 'account',

  state: () => ({
    accessToken: null,
    account: null,
    roles: [],
    appId: null,
    app: null
  }),

  getters: {},

  actions: {
    setApp(appId) {
      if (appId) {
        this.appId = appId
        const index = _.findIndex(config.apps, v => {
          return v.id === appId
        })

        if (index > -1) {
          this.app = config.apps[index]
        }

        setAppId(appId)
      }
    },

    setAccessToken(accessToken) {
      this.accessToken = accessToken
      setToken(accessToken)
    },

    setAccount(account) {
      this.account = account
      this.roles = account.roles || []
    },

    async login({ username, password }) {
      const response = await userApi.login({
        username: username.trim(),
        password: password
      })
      this.setAccessToken(response.data.accessToken)
    },

    async getProfile() {
      const response = await userApi.account()
      this.setAccount(response.data.account)
    },

    resetToken() {
      removeToken()
      removeAppId()
      this.accessToken = null
      this.account = null
      this.roles = []
      this.appId = null
      this.app = null
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
