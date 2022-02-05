<template>
<div class="main-home">
    <a-date-picker v-model:value="value1" />
    <a-month-picker v-model:value="value2" placeholder="Select month" />
    <a-range-picker v-model:value="value3" />
    <a-week-picker v-model:value="value4" placeholder="Select week" />
</div>
</template>

<script>
import { ref } from 'vue'

export default ({
  name: 'home-page',
  setup() {
    return {
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

