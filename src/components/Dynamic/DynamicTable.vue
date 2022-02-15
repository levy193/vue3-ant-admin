<script setup>
import { ref } from 'vue'
import {
  SearchOutlined
} from '@ant-design/icons-vue'

// const $filters = inject('$filters')

// const loading = ref(false)
const query = ref({
  _search: ''
})
</script>

<template>
  <div class="dynamic-table-component">
    <div class="nav-bar">
      <a-space>
        <a-input
          v-model:value="query._search"
          class="filter-search"
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
      </a-space>
    </div>
  </div>
</template>

<style lang="scss">
.dynamic-table-component {
  .filter-search {
    width: 250px;
  }
}
</style>