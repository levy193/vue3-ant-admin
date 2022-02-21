import { defineStore, acceptHMRUpdate } from 'pinia'
import * as userApi from '@/api/account'
import { setToken, removeToken, setAppId, removeAppId } from '@/utils/cookie'
import _ from 'lodash'
import config from '@/config'
import * as compositeAPI from '@/api/composite'
import generateDynamicRouter from '@/router/generate'
import { constantRoutes } from '@/router'
import { useCompositeStore } from './composite'
import router from '@/router'
import { asyncRoutes } from '@/router'

export const useAccountStore = defineStore({
  id: 'account',

  state: () => ({
    accessToken: null,
    account: null,
    roles: [],
    appId: null,
    app: null,
    routes: [],
    constantRoutes: [],
    isGeneratedRouter: false,
    appRoles: []
  }),

  getters: {},

  actions: {
    resetRouter() {
      this.routes.forEach(route => {
        router.removeRoute(route.name)
      })

      asyncRoutes.forEach(route => {
        if (router.hasRoute(route.name)) {
          router.removeRoute(route.name)
        }
      })
    },

    resetApp() {
      this.appId = null
      this.app = null
    },

    resetStore() {
      const compositeStore = useCompositeStore()

      this.$reset()
      compositeStore.$reset()
    },

    setApp(appId) {
      this.appId = appId
      const index = _.findIndex(config.apps, v => {
        return v.id === appId
      })

      if (index > -1) {
        this.app = config.apps[index]
      }

      this.isGeneratedRouter = false
      this.routes = []

      setAppId(appId)
      this.resetRouter()
    },

    setAccessToken(accessToken) {
      this.accessToken = accessToken
      setToken(accessToken)
    },

    setAccount(account) {
      this.account = account
      this.roles = account.roles || []
    },

    async generateRoutes() {
      this.constantRoutes = constantRoutes

      if (!this.appId) {
        return []
      }

      const appRolesRes = await compositeAPI.getData({
        appId: 'easy-admin',
        query: {
          _type: 'find',
          _model: 'Role'
        }
      })
      this.appRoles = appRolesRes.data || []

      const routes = await generateDynamicRouter(this.appId, this.roles, this.appRoles)

      this.routes = routes
      this.isGeneratedRouter = true

      return routes
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

    logout() {
      // Remove data in cookies, local storage
      removeToken()
      removeAppId()

      this.resetRouter()
      this.resetStore()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
