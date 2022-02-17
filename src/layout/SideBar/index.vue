<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountStore } from '@/store/account'
import Item from './Item.vue'
import { trimStart, trimEnd } from 'lodash'

const accountStore = useAccountStore()
const route = useRoute()

const selectedKeys = computed(() => {
  let routePath = route.meta.activeMenu || route.path
  routePath = trimStart(routePath, '/')
  routePath = trimEnd(routePath, '/')
  const routeComponents = routePath.split('/')

  let keys = []
  let basePath = ''
  routeComponents.forEach(route => {
    basePath = basePath + '/' + route
    keys.push(basePath)
  })

  return keys
})

const collapsed = ref(false)
</script>

<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu
      theme="dark"
      :selectedKeys="selectedKeys"
      :openKeys="selectedKeys"
      mode="inline"
    >
      <item
        v-for="item in accountStore.routes"
        :key="item.id"
        :item="item"
        :base="item.path"
      />
    </a-menu>
  </a-layout-sider>
</template>
