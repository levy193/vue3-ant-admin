<template>
  <div>
    <a-config-provider :locale="vi_VN">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import vi_VN from 'ant-design-vue/lib/locale-provider/vi_VN'
import moment from 'moment'
import 'moment/dist/locale/vi'

moment.locale('vi')

export default {
  name: 'App',
  setup() {
    return {
      vi_VN
    }
  }
}
</script>
