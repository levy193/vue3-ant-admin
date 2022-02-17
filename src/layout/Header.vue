<script setup>
import { inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAccountStore } from '@/store/account'
import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { get } from 'lodash'

const accountStore = useAccountStore()
const router = useRouter()
const route = useRoute()
const $filters = inject('$filters')
const avatarHost = import.meta.env.VITE_MEDIA_HOST

const logout = () => {
  accountStore.resetToken()
  router.push('/login')
}
</script>

<template>
  <a-layout-header style="padding: 4px 12px">
    <a-typography>
      <a-typography-title
        v-if="get(route, 'meta.pageTitle')"
        mark
        :level="4"
        style="margin: 0"
      >
        {{ route.meta.pageTitle }}
      </a-typography-title>
    </a-typography>

    <a-space>
      <a-dropdown>
        <a @click.prevent style="color: #333">
          <img v-if="accountStore.account" :src="$filters.mediaURL(avatarHost, accountStore.account.avatar)" class="avatar" />
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <UserOutlined />
              Tài khoản
            </a-menu-item>
            <a-menu-item @click.prevent="logout">
              <LogoutOutlined />
              Đăng xuất
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-space>
  </a-layout-header>
</template>

<style lang="scss">
.avatar {
  height: 44px;
  border-radius: 50%;
  padding-right: 6px;
}
</style>