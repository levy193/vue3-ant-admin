<script setup>
import _ from 'lodash'
import { ref, onMounted } from 'vue'
import moment from 'moment'
import { useRoute, useRouter } from 'vue-router'
import { useAccountStore } from '@/store/account'
import { useCompositeStore } from '@/store/composite'
import DynamicList from '@/components/Dynamic/List.vue'
import DynamicForm from '@/components/Dynamic/Form.vue'

const accountStore = useAccountStore()
const compositeStore = useCompositeStore()
const route = useRoute()
const router = useRouter()

const loadData = async () => {
  loading.value = true
  await _getCompositeData({
    type: config.value.query._type,
    model: config.value.model,
    state: dataState,
    query: config.value.query,
    api: config.value.api ? config.value.api.get : null
  })
  loading.value = false
}

const _getCompositeData = async ({
  type,
  model,
  state,
  query,
  api
}) => {
  const _query = Object.assign({
    _type: type,
    _model: model
  }, query)

  // Date time filter
  if (
    config.value.functions.dateFilter &&
    config.value.query._datetime &&
    config.value.query._datetime.length === 2
  ) {
    Object.assign(_query, {
      _dateFilter: config.value.functions.dateFilter,
      _datetime: config.value.query._datetime.map(date => moment(date).format('DD-MM-YYYY'))
    })
  }

  const payload = {
    message: false,
    api,
    data: {
      appId: accountStore.appId,
      query: _query,
      body: {}
    },
    store: {
      method: 'GET',
      state,
      paginate: query._type === 'paginate'
    }
  }

  await compositeStore.process(payload)
}

const changePage = (page, pageSize) => {
  Object.assign(config.value.query, {
    _page: page,
    _limit: pageSize
  })

  loadData()
}

const initFormData = () => {
  const data = {}
  return data
}

const closeFormDialog = () => {
  formDialog.value.visible = false
}

const handleAction = (_action, _data) => {
  // easy-arena:question
  if (_action.name === 'easy-arena:question') {
    router.push({
      name: 'EasyArena:ContestQuestion',
      query: {
        contestId: _data._id
      }
    })
    return
  }

  action.value = _action

  // Open form dialog
  formDialog.value = {
    visible: !['popConfirm', 'none'].includes(action.value.open),
    title: action.value.formTitle,
    type: action.value.name,
    width: action.value.width
  }

  const body = action.value.name === 'create' ? initFormData() : _.cloneDeep(_data)
  const query = Object.assign({}, config.value.query, {
    _model: config.value.model
  })

  if (_data && _data._id) {
    Object.assign(query, {
      _id: _data._id
    })
  }

  formData.value = {
    message: true,
    data: {
      appId: accountStore.appId,
      query,
      body
    },
    store: {
      state: dataState,
      method: action.value.name,
      matchField: '_id'
    }
  }
}

const processForm = async () => {
  await compositeStore.process(formData.value)
  closeFormDialog()
}

const updateFormData = (key, value) => {
  formData.value.data.body[key] = value
}

// Define variables
const dynamicComponents = {
  DynamicList
}

const config = ref({
  component: 'DynamicList',
  models: [],
  model: '',
  state: '',
  query: {},
  api: {},
  functions: {},
  filters: [],
  listProps: [],
  formProps: {}
})
const loading = ref(false)
let action = ref(null)
let formData = ref(null)
const formDialog = ref({
  visible: false,
  type: null
})

const pageConfig = await import(`../${accountStore.appId}/dynamic/${route.path}.js`)
const viewConfig = pageConfig.default.view
Object.keys(viewConfig).forEach(k => {
  config.value[k] = viewConfig[k]
})
const dataState = config.value.state || config.value.model
const dataPaginationState = dataState + '_pagination'

onMounted(async () => {
  await loadData()

  if (config.value.models && config.value.models.length > 0) {
    config.value.models.forEach(model => {
      _getCompositeData({
        type: 'find',
        model: model.name,
        state: model.state,
        query: {
          _sort: model.sort
        }
      })
    })
  }
})
</script>

<template>
  <div class="dynamic-list-template" style="padding: 14px;">
    <component
      :is="dynamicComponents[config.component]"
      :loading="loading"
      :config="config"
      :dataState="dataState"
      @handle="handleAction"
      @progress="processForm"
      @reload="loadData"
    />

    <a-pagination
      style="margin-top: 16px"
      show-size-changer
      v-if="compositeStore.pageData[dataPaginationState]"
      :current="compositeStore.pageData[dataPaginationState].page"
      :pageSize="compositeStore.pageData[dataPaginationState].limit"
      :total="compositeStore.pageData[dataPaginationState].total"
      @change="changePage"
      @showSizeChange="changePage"
    />

    <dynamic-form
      v-if="formData && formData.data"
      :dialog="formDialog"
      :config="config"
      :data="formData.data.body"
      @update:data="updateFormData"
      @process="processForm"
      @cancel="closeFormDialog"
    />
  </div>
</template>
