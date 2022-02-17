import { defineStore, acceptHMRUpdate } from 'pinia'

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

  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCompositeStore, import.meta.hot))
}