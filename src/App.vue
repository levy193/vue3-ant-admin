<template>
  <div>
    <a-config-provider :locale="vi_VN">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import vi_VN from 'ant-design-vue/es/locale/vi_VN'
import moment from 'moment'
import 'moment/dist/locale/vi'

moment.locale('vi')

export default defineComponent({
  name: 'App',
  setup() {
    return {
      vi_VN
    }
  }
})
</script>
