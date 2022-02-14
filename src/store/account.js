import { defineStore, acceptHMRUpdate } from 'pinia'
import * as userApi from '@/api/account'
import { setToken, removeToken } from '@/utils/token'

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
    setApp(app) {
      this.appId = app ? app.id : null
      this.app = app
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
