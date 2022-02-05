<template>
<div class="main-home">
  <a-space>
    <a-date-picker v-model:value="value1" />
    <a-month-picker v-model:value="value2" placeholder="Select month" />
    <a-range-picker v-model:value="value3" />
    <a-week-picker v-model:value="value4" placeholder="Select week" />
  </a-space>
</div>
</template>

<script>
import { ref } from 'vue'
import { accountStore } from '@/store/account'

export default ({
  name: 'home-page',
  setup() {
    const account = accountStore()
    return {
      account,
      value1: ref(),
      value2: ref(),
      value3: ref([]),
      value4: ref(),
    };
  },
})
</script>

<style lang="scss">
.main-home {}
</style>

