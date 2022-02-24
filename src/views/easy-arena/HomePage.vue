<script setup>
import { useAccountStore } from '@/store/account'
const accountStore = useAccountStore()
</script>

<style lang="scss">
.easyarena-home-main {
  padding: 14px;
  .fullname {
    font-weight: bold
  }
}
</style>

<template>
<div class="easyarena-home-main">
  <a-row v-if="accountStore.account" type="flex" justify="space-between">
    <span>Xin chào <span class="fullname">{{ accountStore.account.fullname }}</span></span>
  </a-row>
</div>
</template>
