<script setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#fff'
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
  >
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped>
.ant-btn {
  .svg-icon {
    vertical-align: -0.125em;
  }
}
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
}
</style>