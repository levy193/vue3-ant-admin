<script setup>
import { ref, watch, inject } from 'vue'
import moment from 'moment'
import { useMediaStore } from '@/store/media'
import { useAccountStore } from '@/store/account'

const $filters = inject('$filters')
const mediaStore = useMediaStore()
const accountStore = useAccountStore()

const props = defineProps({
  filename: String('')
})

const file = ref({})
const filetype = ref('')
const preview = ref(false)
const previewTypes = ['image', 'audio', 'video']

const getFullUrl = (url) => {
  return $filters.mediaURL(null, `${url}?v=${moment().format('HHmmss')}`)
}

const getObject = async (key) => {
  try {
    const object = await mediaStore.getObject({
      appId: accountStore.appId,
      query: `path=${key}`
    })
    file.value = object
    filetype.value = object.ContentType.split('/')[0]
    preview.value = previewTypes.includes(filetype.value)   
  } catch (error) {
    // console.log(error)
  }
}

watch(
  () => props.filename,
  (filename) => {
    if (filename) {
      getObject(filename)
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div v-if="file && file.ContentLength" class="file-detail-box">
    <div>
      <div class="file-info">
        <span class="field-name">Đường dẫn</span>
        <span class="field-info"><a :href="getFullUrl(filename)" target="__blank">{{ filename }}</a></span>
      </div>
      <div class="file-info">
        <span class="field-name">Tên tệp tin</span>
        <span v-if="filename" class="field-info">{{ filename.split('/').pop() }}</span>
      </div>
      <div class="file-info">
        <span class="field-name">Kích thước</span>
        <span class="field-info">{{ $filters.memorySize(file.ContentLength) }}</span>
      </div>
      <div class="file-info">
        <span class="field-name">Loại</span>
        <span class="field-info">{{ file.ContentType }}</span>
      </div>
      <div v-if="preview" class="file-info">
        <span class="field-name">Xem trước</span>
        <img v-if="filetype === 'image'" :src="getFullUrl(filename)" alt="Preview" style="max-width: calc(100% - 150px);width: auto; height: 120px">
        <audio v-if="filetype === 'audio'" controls style="width: calc(100% - 150px)">
          <source :src="getFullUrl(filename)" :type="file.ContentType">
        </audio>
        <video v-if="filetype === 'video'" controls style="width: calc(100% - 150px)">
          <source :src="getFullUrl(filename)" :type="file.ContentType">
        </video>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.file-detail-box {
  border-left: 2px solid #eaeefb;
  padding-right: 24px;
  padding-left: 12px;
  .file-info {
    margin: 12px 0;
    font-weight: bold;
    display: flex;
  }
  .field-name {
    width: 150px;
    display: inline-block;
    font-weight: bold;
  }
  .field-info {
    width: calc(100% - 150px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a {
    color: #209CEE;
    text-decoration: underline;
  }
}
</style>
