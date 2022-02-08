import * as Vue from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from 'vue-query'
import Antd from 'ant-design-vue'

// Devtool

// Styles
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'

const app = Vue.createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueQueryPlugin)
app.use(Antd)

// Mount app
app.mount('#app')
