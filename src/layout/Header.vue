<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()
const router = useRouter()
const avatarHost = import.meta.env.VITE_MEDIA_HOST
const $filters = inject('$filters')

const logout = () => {
  accountStore.resetToken()
  router.push('/login')
}
</script>

<template>
  <a-layout-header>
    <a-breadcrumb>
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>

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