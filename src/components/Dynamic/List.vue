<script setup>

import { ref, inject, computed } from 'vue'
import { get } from 'lodash'
import { useCompositeStore } from '@/store/composite'
import {
  SearchOutlined
} from '@ant-design/icons-vue'

const props = defineProps({
  loading: Boolean(false),
  config: Object({})
})
const compositeStore = useCompositeStore()
const $filters = inject('$filters')

const query = ref({
  _search: ''
})

const selectOptions = select => {
  if (select) {
    const data = select.source ? compositeStore.getPageData(select.source) : select.options
    if (!data) {
      return []
    }
    const parent = select.parentField || select.parent

    return data.filter(item => {
      return !query.value[select.parent] || (item[parent] && item[parent].includes(query[select.parent]))
    })
  }

  return []
}

</script>

<template>
  <div class="dynamic-list-component">
    <div class="nav-bar">
      <a-space>
        <!-- Search -->
        <a-input
          v-model:value="query._search"
          allow-clear
          class="filter-search"
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
        <!-- End Search -->

        <!-- Filters -->
        <template
          v-for="item in config.filters"
          :key="item.itemKey || item.name"
        >
          <a-select
            v-model:value="query[item.name]"
            :style="item.style"
            :placeholder="item.placeholder"
            class="filter-item"
          >
            <a-select-option
              v-for="opt in selectOptions(item)"
              :key="get(opt, item.value || 'value')"
              :value="get(opt, item.value || 'value')"
            >
              {{ item.displayFn ? item.displayFn(opt)  :get(opt, item.label || 'label') }}
            </a-select-option>
          </a-select>
        </template>
        <!-- End Filters -->
      </a-space>
    </div>
  </div>
</template>

<style lang="scss">
.dynamic-list-component {
  .filter-search {
    width: 200px;
  }

  .filter-item {
    width: 150px;
  }
}
</style>