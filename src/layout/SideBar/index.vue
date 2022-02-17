<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountStore } from '@/store/account'
import Item from './Item.vue'
import { trimStart, trimEnd } from 'lodash'

const accountStore = useAccountStore()
const route = useRoute()
const collapsed = ref(false)

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

const app = computed(() => {
  return accountStore.app || null
})
</script>

<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div v-if="app" class="logo">
      <img :src="app.logo">
      <span class="app-title">{{ app.name }}</span>
    </div>
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

<style lang="scss" scoped>
.logo {
  background: transparent !important;
  display: flex;
  align-items: bottom;

  img {
    max-height: 32px;
  }

  .app-title {
    padding-left: 6px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
