<script setup>
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/store/account'
import config from '@/config'

const accountStore = useAccountStore()
const router = useRouter()

const apps = config.apps

function selectApp(app) {
  accountStore.setApp(app.id)
  router.push({
    path: `/`,
    replace: true
  })
}
</script>

<template>
  <div class="app-select-main">
    <a-row style="padding-bottom: 48px">
      <a-typography-title :level="4">
        Chọn ứng dụng
      </a-typography-title>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-card
        v-for="app in apps"
        :key="app.id"
        hoverable
        @click.prevent="selectApp(app)"
        style="width: 200px"
      >
        <template #cover>
          <img :src="app.logo" />
        </template>

        <a-card-meta :title="app.name" />
      </a-card>
    </a-row>
  </div>
</template>

<style lang="scss">
.app-select-main {
  height: 100vh;
  width: 100%;
  background: $bg;
  padding: 10vh 10vw;
}
</style>