import * as Vue from 'vue'
import {
  Button,
  Icon,
  Typography,
  Divider,
  Layout,
  Space,
  Affix,
  Breadcrumb,
  Dropdown,
  Menu,
  PageHeader,
  Pagination,
  Steps,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  ConfigProvider
} from 'ant-design-vue'

import App from './App.vue'
import router from './router'
import store from './store'

const app = Vue.createApp(App)
app.use(router)
app.use(store)

// Ant design
app.use(Button)
app.use(Icon)
app.use(Typography)
app.use(Divider)
app.use(Layout)
app.use(Space)
app.use(Affix)
app.use(Breadcrumb)
app.use(Dropdown)
app.use(Menu)
app.use(PageHeader)
app.use(Pagination)
app.use(Steps)
app.use(Checkbox)
app.use(DatePicker)
app.use(Form)
app.use(Input)
app.use(InputNumber)
app.use(Radio)
app.use(Rate)
app.use(Select)
app.use(Slider)
app.use(Switch)
app.use(TimePicker)
app.use(ConfigProvider)

// Mount app
app.mount('#app')
