<script setup>
import { ref } from 'vue'

defineProps({
  dialog: Object({
    visible: false
  }),
  config: Object({}),
})

const formData = ref({})

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
</script>

<template>
  <div class="dynamic-form-component">
    <a-modal
      :visible="dialog.visible"
      :title="dialog.title"
      :width="dialog.width || '80%'"
      @cancel="$emit('cancel')"
      @ok="$emit('process')"
    >
      <a-form
        :model="formData"
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
                :type="prop.type"
                :placeholder="prop.placeholder"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>