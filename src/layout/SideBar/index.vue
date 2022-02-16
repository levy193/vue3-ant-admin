<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountStore } from '@/store/account'
import Item from './Item.vue'

const accountStore = useAccountStore()
const route = useRoute()

const selectedKeys = computed(() => {
  if (route.meta.activeMenu) {
    return [route.meta.activeMenu]
  }

  return [route.path]
})

const collapsed = ref(false)
</script>

<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
      <item
        v-for="item in accountStore.routes"
        :key="item.id"
        :item="item"
      />
    </a-menu>
  </a-layout-sider>
</template>