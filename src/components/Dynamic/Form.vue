<script setup>
import { ref, watch } from 'vue'
import _ from 'lodash'
import { useCompositeStore } from '@/store/composite'
import MediaManager from '@/components/MediaManager/index.vue'
import moment from 'moment'
import Tinymce from '@/components/Tinymce/index.vue'

const props = defineProps({
  dialog: Object({
    visible: false
  }),
  config: Object({}),
  data: Object({})
})

let formData = ref({})
let mediaDialog = ref(false)
let selectedProp = ref({})
const formKey = ref(null)

watch(
  () => props.dialog.visible,
  (visible) => {
    if (visible) {
      formData.value = _.cloneDeep(props.data)
      formKey.value = 'form-id-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      props.config.formProps.forEach(prop => {
        if (['datetime', 'date'].includes(prop.type)) {
          if (formData.value[prop.name]) {
            formData.value[prop.name] = moment(formData.value[prop.name])
          }
        }
      })
    }
  },
  {
    immediate: true
  }
)

const emits = defineEmits([
  'update:data',
  'process',
  'cancel'
])

const compositeStore = useCompositeStore()

const setMediaURL = (url) => {
  mediaDialog.value = false
  const key = selectedProp.value.name
  formData.value[key] = url
  emits('update:data', key, url)
}

const handleShowUploadDialog = (prop) => {
  selectedProp.value = prop
  mediaDialog.value = true
}

const selectOptions = (prop) => {
  if (prop) {
    const data = prop.source
      ? compositeStore.getPageData(prop.source)
      : prop.options

    if (!data) {
      return []
    }

    if (prop.parentField) {
      return data.filter(d => !props.data.value[prop.parent] || (d[prop.parentField] && props.data.value[prop.parent].includes(d[prop.parentField])))
    }

    return data.filter(d => !prop.parent || (d[prop.parent] && d[prop.parent].includes(props.data.value[prop.parent])))
  }

  return []
}

const validItem = (conditions, obj) => {
  let result = true
  if (conditions) {
    conditions.forEach(condition => {
      if (obj[condition.key] !== condition.value) {
        result = false
      }
    })
  }
  return result
}

const resetChildWhenSelectParentSelect = (prop) => {
  if (_.isNil(prop.child)) {
    return
  }

  // // reset child value
  // props.data[prop.child] = ''
  emits('update:data', prop.child, '')

  const index = _.findIndex(props.config.formProps, v => {
    return v.name === prop.child
  })

  resetChildWhenSelectParentSelect(props.config.formProps[index])
}

const emitTextEditorData = (prop) => {
  return value => {
    emits('update:data', prop, value)
  }
}

const emitData = (prop, $event) => {
  if (['text', 'number', 'password', 'textarea', 'image', 'video', 'audio', 'file'].includes(prop.type)) {
    emits('update:data', prop.name, $event.target.value)
    return
  }

  switch (prop.type) {
    case 'select':
      emits('update:data', prop.name, $event)
      break
    case 'boolean':
      emits('update:data', prop.name, $event.target.checked)
      break
    case 'date':
      emits('update:data', prop.name, $event.format('DD-MM-YYYY'))
      break
    case 'datetime':
      emits('update:data', prop.name, $event.format('DD-MM-YYYY'))
      break
  }
}
</script>

<template>
  <a-modal
    :visible="dialog.visible"
    :title="dialog.title"
    :width="dialog.width || '80%'"
    @cancel="$emit('cancel')"
    @ok="$emit('process')"
    class="dynamic-form-component"
  >
    <a-form
      :model="formData"
      @submit="$emit('process')"
    >
      <a-row>
        <a-col
          v-for="prop in config.formProps"
          :key="prop.name"
          :span="prop.span || 24"
        >
          <a-form-item
            v-if="!prop.hidden && validItem(prop.conditions, formData)"
            :label="prop.label"
            :required="prop.required"
            :labelCol="{ offset: 0, span: (24 / (prop.span || 24)) * 3 }"
          >
            <a-input
              v-if="['text', 'number', 'password'].includes(prop.type)"
              v-model:value="formData[prop.name]"
              @input="emitData(prop, $event)"
              :type="prop.type"
              :placeholder="prop.placeholder"
            />

            <a-textarea
              v-if="['textarea'].includes(prop.type)"
              v-model:value="formData[prop.name]"
              @input="emitData(prop, $event)"
              :placeholder="prop.placeholder"
              :rows="prop.rows"
            />

            <tinymce
              v-if="['text-editor'].includes(prop.type)"
              v-model:value="formData[prop.name]"
              :id="`${prop.name}-${formKey}`"
              :key="`${prop.name}-${formKey}`"
              :menubar="prop.menubar"
              :toolbar="prop.toolbar"
              :height="prop.height || 300"
              v-on="{input: emitTextEditorData(prop.name)}"
            />

            <a-select
              v-if="['select'].includes(prop.type)"
              v-model:value="formData[prop.name]"
              :mode="prop.mode"
              :placeholder="prop.placeholder"
              @change="emitData(prop, $event); resetChildWhenSelectParentSelect(prop)"
            >
              <a-select-option
                v-for="opt in selectOptions(prop)"
                :key="opt[prop.key]"
                :value="opt[prop.value]"
              >
                {{ (prop.prefix && opt[prop.prefix.field] ? opt[prop.prefix.field][prop.prefix.display] + ' - ' : '') + opt[prop.display] }}
              </a-select-option>
            </a-select>

            <a-checkbox
              v-if="['boolean'].includes(prop.type)"
              v-model:checked="formData[prop.name]"
              @change="emitData(prop, $event)"
            />

            <a-date-picker
              v-if="['date', 'datetime'].includes(prop.type)"
              v-model:value="formData[prop.name]"
              :show-time="prop.type === 'datetime'"
              :placeholder="prop.placeholder || 'Chọn ngày'"
              @change="emitData(prop, $event)"
            />

            <a-input
              v-if="['image', 'video', 'file', 'audio'].includes(prop.type)"
              v-model:value="formData[prop.name]"
              @input="emitData(prop, $event)"
              class="upload-input"
            >
              <template #addonAfter>
                <a-button type="text" @click="handleShowUploadDialog(prop)">
                  <svg-icon :name="prop.type" color="rgba(0, 0, 0, 0.6)" style="vertical-align: -0.125em;" />
                </a-button>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>

  <a-modal
    :visible="mediaDialog"
    title="Quản lý tài nguyên"
    width="80%"
    :bodyStyle="{ height: '70vh' }"
    :footer="null"
    @cancel="mediaDialog = false"
  >
    <media-manager
      v-if="selectedProp"
      :prop="selectedProp"
      :visible="mediaDialog"
      :focusFile="formData[selectedProp.name]"
      @selectFile="setMediaURL"
    />
  </a-modal>
</template>

<style lang="scss">
.dynamic-form-component {
  .upload-input {
    .ant-input-group-addon {
      padding: 0;
      border: 0;
      .ant-btn {
        border: 1px solid #d9d9d9;
        border-left: none;
      }
    }
  }
}
</style>
