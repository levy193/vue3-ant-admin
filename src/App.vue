<template>
  <div>
    <a-config-provider :locale="vi_VN">
      <router-view/>
    </a-config-provider>

    <VueQueryDevTools />
  </div>
</template>

<script setup>
import vi_VN from 'ant-design-vue/es/locale/vi_VN'
import moment from 'moment'
import 'moment/dist/locale/vi'
import { VueQueryDevTools } from 'vue-query/devtools'

moment.locale('vi')
</script>
