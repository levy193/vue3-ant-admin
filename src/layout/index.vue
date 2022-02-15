<template>
  <div class="main-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
          <a-menu-item key="1">
            <pie-chart-outlined />
            <span>Option 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <desktop-outlined />
            <span>Option 2</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>User</span>
              </span>
            </template>
            <a-menu-item key="3">Tom</a-menu-item>
            <a-menu-item key="4">Bill</a-menu-item>
            <a-menu-item key="5">Alex</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <team-outlined />
                <span>Team</span>
              </span>
            </template>
            <a-menu-item key="6">Team 1</a-menu-item>
            <a-menu-item key="8">Team 2</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="9">
            <file-outlined />
            <span>File</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <a-breadcrumb>
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>

          <a-space>
            <a-dropdown>
              <a @click.prevent style="color: #333">
                <img :src="accountStore.account.avatar" />
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <UserOutlined />
                    Tài khoản
                  </a-menu-item>
                  <a-menu-item>
                    <LogoutOutlined />
                    Đăng xuất
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <div :style="{ padding: '24px', minHeight: 'calc(100% - 54px)' }">
            <router-view />
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Easy Group ©2019 Created by Easy Group
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()

const selectedKeys = ref(['1'])
const collapsed = ref(false)
</script>

<script>
export default {
  name: 'layout-component'
}
</script>

<style lang="scss">
.main-layout {
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .ant-layout-header {
    display: flex;
    align-items: center;
    padding: 4px 24px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    justify-content: space-between;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
}
</style>
