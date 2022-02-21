<script setup>
defineProps({
  data: Object(null)
})

const color = {
  'easy-class': 'green',
  'easy-school': 'orange'
}
</script>

<template>
  <div v-if="data" class="app-tags-template">
    <a-tag
      v-for="app in data"
      :key="app"
      :color="color[app]"
      style="margin: 4px"
    >
      {{ app }}
    </a-tag>
  </div>
</template>