import * as Vue from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'

// Styles
import '@/styles/index.scss';

import App from './App.vue'
import router from './router'

const app = Vue.createApp(App)
app.use(router)
app.use(createPinia())
app.use(Antd)

// Mount app
app.mount('#app')
