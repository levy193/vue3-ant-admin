import * as Vue from 'vue'
import { createPinia } from 'pinia'

// Devtool

// Styles
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import * as filters from './filters'
import Antd from 'ant-design-vue'

const app = Vue.createApp(App)
app.use(createPinia())
app.use(router)
app.use(Antd)

app.provide('$filters', filters)

import './permission'

// Mount app
app.mount('#app')
