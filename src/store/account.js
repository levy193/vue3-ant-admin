import { defineStore, acceptHMRUpdate } from "pinia"

export const accountStore = defineStore({
  id: 'account',
  state: () => ({
    user: 'user'
  }),

  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(accountStore, import.meta.hot))
}