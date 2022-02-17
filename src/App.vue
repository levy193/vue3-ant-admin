<script setup>
import vi_VN from 'ant-design-vue/es/locale/vi_VN'
import moment from 'moment'
import 'moment/dist/locale/vi'

moment.locale('vi')
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <a-config-provider :locale="vi_VN">
          <router-view />
        </a-config-provider>
      </div>
    </template>

    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>
