import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAccountStore = defineStore({
  id: 'account',

  state: () => ({
    accessToken: null
  }),

  getters: {},

  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
