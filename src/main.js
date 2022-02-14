import * as Vue from 'vue'
import { createPinia } from 'pinia'

// Devtool

// Styles
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'

const app = Vue.createApp(App)
app.use(createPinia())
app.use(router)
app.use(Antd)

import './permission'

// Mount app
app.mount('#app')
