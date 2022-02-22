<script setup>
import { ref, inject } from 'vue'
import { get } from 'lodash'
import { useCompositeStore } from '@/store/composite'
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
import SvgIcon from '../Icon/SvgIcon.vue'
import AppTags from '@/components/Dynamic/templates/AppTags.vue'

const dynamicTemplate = {
  AppTags
}

defineProps({
  loading: Boolean(false),
  config: Object({}),
  dataState: String('')
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

      <a-space>
        <a-button
          type="primary"
          @click.prevent="$emit('handle', { name: 'create', formTitle: 'Tạo mới' })"
        >
          <PlusOutlined />
        </a-button>

        <a-button
          class="refresh-btn"
          :disabled="loading"
          @click.prevent="$emit('reload')"
        >
          <svg-icon name="sync-alt" />
        </a-button>
      </a-space>
    </div>

    <div class="table-main-section">
      <a-table
        :dataSource="compositeStore.pageData[dataState]"
        :loading="loading"
        :rowKey="(record, index) => record._id || index"
        :pagination="false"
      >
        <a-table-column
          v-for="prop in config.listProps"
          :key="prop.name"
          :title="prop.label"
          :data-index="prop.name"
          :width="prop.width"
          :align="prop.align || 'center'"
        >
          <template #default="{ record, index }">
            <template v-if="['index'].includes(prop.type)">
              {{ index + 1 }}
            </template>

            <template v-if="['text'].includes(prop.type)">
              {{ prop.filter ? $filters[prop.filter.name](record[prop.name], ...prop.filter.vars)  :record[prop.name] }}
            </template>

            <template v-if="['boolean'].includes(prop.type)">
              <a-checkbox :checked="record[prop.name]" />
            </template>

            <template v-if="['image'].includes(prop.type)">
              <img :src="$filters.mediaURL(null, record[prop.name])" :style="prop.style" />
            </template>

            <template v-if="['template'].includes(prop.type)">
              <component
                :is="dynamicTemplate[prop.template]"
                :data="record[prop.name]"
              />
            </template>

            <template v-if="['buttons'].includes(prop.type)">
              <a-space>
                <span
                  v-for="button in prop.buttons"
                  :key="button.name"
                >
                  <a-popconfirm
                    v-if="button.open === 'popConfirm'"
                    :title="button.popConfirmTitle"
                    :ok-text="button.confirmText"
                    :cancel-text="button.cancelText"
                    @confirm="$emit('process')"
                  >
                    <a-button
                      :type="button.type"
                      style="padding: 0"
                      @click.prevent="$emit('handle', button, record)"
                    >
                      <svg-icon :name="button.icon" :color="button.color" />
                    </a-button>
                  </a-popconfirm>

                  <a-button
                    v-else
                    :type="button.type"
                    style="padding: 0"
                    @click.prevent="$emit('handle', button, record)"
                  >
                    <svg-icon :name="button.icon" :color="button.color" />
                  </a-button>
                </span>
              </a-space>
            </template>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>

<style lang="scss">
.dynamic-list-component {
  .nav-bar {
    display: flex;
    justify-content: space-between;

    .filter-search {
      width: 200px;
    }

    .filter-item {
      width: 150px;
    }

    .refresh-btn {
      background-color: $danger-color;
      color: #fff;
    }
  }

  .table-main-section {
    margin: 12px 0;
  }
}
</style>
