<script setup>
import SideBar from './SideBar/index.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="main-layout">
    <a-layout style="min-height: 100vh">
      <SideBar />
      <a-layout>
        <Header />
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
