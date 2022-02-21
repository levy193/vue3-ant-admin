import * as Vue from 'vue'
import { createPinia } from 'pinia'

// Devtool

// Styles
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import * as filters from './filters'

import './permission'
import 'virtual:svg-icons-register'

const app = Vue.createApp(App)
app.use(createPinia())
app.use(router)

app.provide('$filters', filters)

// Mount app
app.mount('#app')
