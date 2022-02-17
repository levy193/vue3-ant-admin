<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountStore } from '@/store/account'
import { notification } from 'ant-design-vue'
import DynamicList from '@/components/Dynamic/List.vue'

const accountStore = useAccountStore()
const route = useRoute()

// Define variables
const dynamicComponents = {
  DynamicList
}

const config = ref({
  component: 'DynamicList',
  models: [],
  model: '',
  query: {},
  apis: {},
  functions: {},
  filters: [],
  listProps: [],
  formProps: {}
})
const loading = ref(false)

const pageConfig = await import(`../${accountStore.appId}/dynamic/${route.path}.js`)
const viewConfig = pageConfig.default.view
Object.keys(viewConfig).forEach(k => {
  config.value[k] = viewConfig[k]
})
</script>

<template>
  <div class="dynamic-list-template">
    <component
      :is="dynamicComponents[config.component]"
      :loading="loading"
      :config="config"
    />
  </div>
</template>

<style lang="scss">
.dynamic-list-template {
  
}
</style>