<script setup>
import { ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import plugins from './plugins'
import toolbar from './toolbar'

defineProps({
  id: {
    type: String,
    default: function() {
      return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
    }
  },
  value: {
    type: String,
    default: ''
  },
  toolbar: {
    type: Array,
    required: false,
    default() {
      return toolbar
    }
  },
  menubar: {
    type: String,
    default: 'file edit insert view format table'
  },
  height: {
    type: Number,
    required: false,
    default: 360
  },
  rootBlock: {
    type: Boolean,
    default: true
  },
  paste: {
    type: String,
    default: 'clean'
  }
})

const emits = defineEmits(['input'])

const fullscreen = ref(false)

const handlerChange = (event, editor) => {
  emits('input', editor.getContent())
}
</script>

<template>
  <div
    :class="{ fullscreen:fullscreen }"
    class="tinymce-container editor-container"
  >
    <Editor
      :id="id"
      :initial-value="value"
      :init="{
        plugins,
        toolbar,
        menubar,
        height,
        forced_root_block: false,
        rootBlock: false,
        end_container_on_empty_block: false,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        paste_data_images: false,
        paste_as_text: true,
        powerpaste_word_import: 'clean',
        powerpaste_html_import: 'clean',
        powerpaste_allow_local_images: false
      }"
      model-events="change"
      @change="handlerChange"
    />
  </div>
</template>

<style lang="scss">
.tinymce-container {
  position: relative;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 0px;
  z-index: 10000;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
.tox-silver-sink {
  z-index: 3000!important;
}
.tox-notification { display: none !important }
</style>
