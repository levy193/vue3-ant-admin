<script setup>
import _ from 'lodash'
import { ref, computed, watch, inject } from 'vue'
import { useMediaStore } from '@/store/media'
import { useAccountStore } from '@/store/account'
import path from 'path-browserify'
import { notification } from 'ant-design-vue'
import FilePreview from './Preview.vue'
import {
  LoadingOutlined,
  PaperClipOutlined,
  DeleteTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from '@ant-design/icons-vue'

const $filters = inject('$filters')
const mediaStore = useMediaStore()
const accountStore = useAccountStore()

const props = defineProps({
  prop: Object({}),
  focusFile: String(''),
  visible: Boolean(false)
})

const emits = defineEmits([
  'selectFile'
])

const initialKey = ref('')
const loading = ref(false)
const selectedFile = ref('')
const newFolderName = ref('')
const newFolderVisible = ref(false)
const deleteFileVisible = ref(false)
const fileInputRef = ref(null)
const fileUpload = ref(null)
const uploadLoading = ref(false)
const uploadProgress = ref(0)

const handleUploadProgress = (progressEvent) => {
  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
  uploadProgress.value = percentCompleted
}

const removeFileUpload = () => {
  fileUpload.value = null
  uploadLoading.value = false
  uploadProgress.value = 0
}

const cancelUpload = () => {}

const uploadFile = async () => {
  try {
    await mediaStore.uploadObject({
      appId: accountStore.appId,
      file: fileUpload.value,
      query: `path=${initialKey.value}`
    }, handleUploadProgress, cancelUpload)

    await getObjects()

    removeFileUpload()

    notification.success({
      message: 'Thành công!',
      description: 'Tải tệp tin thành công.'
    })
  } catch (error) {
    uploadLoading.value = false
    uploadProgress.value = 0
  }
}

const handleSelectFile = () => {
  fileInputRef.value.click()
  removeFileUpload()
}

const handleFileUpload = (e) => {
  const fileList = e.target.files

  if (fileList.length > 0) {
    fileUpload.value = fileList[0]
  }
}

const getBaseName = (key) => {
  return path.basename(key)
}

const showFileDetail = (file) => {
  selectedFile.value = file
}

const getObjects = async () => {
  loading.value = true
  await mediaStore.getObjects({
    appId: accountStore.appId,
    query: `path=${initialKey.value}`
  })
  loading.value = false
}

const deleteFile = async () => {
  await mediaStore.deleteObject({
    appId: accountStore.appId,
    query: `path=${selectedFile.value}`
  })

  await getObjects()

  deleteFileVisible.value = false
  selectedFile.value = ''
  notification.info({
    description: 'Xoá tệp tin thành công'
  })
}

const emitSelectFile = () => {
  if (selectedFile.value) {
    emits('selectFile', selectedFile.value)
  } else {
    emits('selectFile', '')
  }
}

const newFolder = async () => {
  await mediaStore.newFolder({
    appId: accountStore.appId,
    query: `path=${path.join(initialKey.value, newFolderName.value)}`
  })
  newFolderVisible.value = false
}

const breadcrumb = computed(() => {
  const parts = initialKey.value.split('/')
  const result = []
  let key = ''

  for (let i = 0; i < parts.length; i++) {
    if (parts[i]) {
      key += parts[i] + '/'
      result.push({
        label: parts[i],
        key
      })
    }
  }

  return result
})

const openFolder = (key) => {
  if (key && key[key.length - 1] !== '/') {
    key += '/'
  }

  initialKey.value = key
  selectedFile.value = ''
  getObjects()
}

const goBack = () => {
  let currentBreadcrumb = breadcrumb.value
  const ta = currentBreadcrumb.length
  if (ta > 1) {
    openFolder(currentBreadcrumb[ta - 2].key)
  } else {
    openFolder('')
  }
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      if (props.focusFile) {
        const key = _.trimEnd(_.trimStart(props.focusFile, '/'), '/')
        initialKey.value = key.split('/')
        initialKey.value.pop()
        initialKey.value = initialKey.value.join('/')
        selectedFile.value = props.focusFile
      } else {
        selectedFile.value = ''
      }

      getObjects()
    }
  }, {
    immediate: true
  }
)
</script>

<template>
  <div class="media-component">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item @click="openFolder('')">
          <svg-icon name="home" color="#00000073"/>
        </a-breadcrumb-item>
        <a-breadcrumb-item
          v-for="(item, index) in breadcrumb"
          :key="index"
          @click="openFolder(item.key)"
        >
          {{ item.label }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="func-bar">
      <a-row>
        <a-col :span="14" style="display: flex; align-items: center;">
          <a-space>
            <a-button
              type="primary"
              @click="goBack"
              size="small"
            >
              <svg-icon name="chevron-left" />
            </a-button>

            <a-popover v-model:visible="newFolderVisible" title="Thư mục mới">
              <template #content>
                <a-input
                  v-model:value="newFolderName"
                  placeholder="Thư mục mới"
                />
                <a-button
                  type="primary"
                  size="mini"
                  @click="newFolder"
                  style="margin-top: 12px"
                >
                  Thêm
                </a-button>
              </template>
              <a-button
                size="small"
                style="background: #42b983"
              >
                <svg-icon name="folder-plus" />
              </a-button>
            </a-popover>

            <a-button
              type="primary"
              @click="openFolder(initialKey)"
              size="small"
            >
              <svg-icon name="sync-alt" />
            </a-button>

            <a-button
              size="small"
              style="background: #42b983"
              @click="handleSelectFile"
            >
              <svg-icon name="upload" />
            </a-button>

            <a-popconfirm
              title="Bạn có muốn xoá tệp tin"
              @confirm="deleteFile"
            >
              <a-button
                size="small"
                type="primary"
                danger
              >
                <svg-icon name="trash" />
              </a-button>
            </a-popconfirm>

            <a-button
              size="small"
              type="primary"
              @click="emitSelectFile"
            >
              <svg-icon name="check" />
            </a-button>

            <input ref="fileInputRef" type="file" hidden @input="handleFileUpload" />
          </a-space>
        </a-col>
        <a-col :span="10">
          <span class="upload-section" v-if="fileUpload">
            <span class="icon">
              <PaperClipOutlined v-if="!uploadLoading" />
              <LoadingOutlined v-else style="color: rgb(66, 185, 131)"/>
            </span>
            <span class="progress">
              <span class="file-name">{{ fileUpload.name }}</span>
              <a-progress :percent="uploadProgress" :show-info="false" size="small" />
            </span>
            <div class="upload-btn">
              <a-space>
                <a-button
                  v-if="!uploadLoading"
                  type="text"
                  style="padding: 0"
                  @click.prevent="uploadFile"
                >
                  <CheckCircleTwoTone twoToneColor="rgb(66, 185, 131)" />
                </a-button>
                <a-button v-else type="text" style="padding: 0">
                  <CloseCircleTwoTone twoToneColor="#ffba00" />
                </a-button>
                <a-button
                  type="text"
                  style="padding: 0"
                  :disabled="uploadLoading"
                  @click.prevent="removeFileUpload"
                >
                  <DeleteTwoTone twoToneColor="#ff7875" />
                </a-button>
              </a-space>
            </div>
          </span>
        </a-col>
      </a-row>
    </div>

    <div class="media-list-section">
      <a-row>
        <a-col :span="16">
          <a-list
            item-layout="horizontal"
            :data-source="mediaStore.resources"
            class="file-list"
          >
            <template #renderItem="{ item }">
              <a-list-item
                @click="$filters.fileIconFilter(item) === 'folder' ? openFolder(item) : showFileDetail(item)"
                :class="item === selectedFile ? 'selected-list-item' : ''"
              >
                <a-list-item-meta>
                  <template #title>
                    <svg-icon :name="$filters.fileIconFilter(item)" color="#606266" style="width: 1.5rem; height: 1.5rem"/>
                    <span style="margin-left: 8px">{{ getBaseName(item) }}</span>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-col>
        <a-col :span="8">
          <file-preview
            v-if="selectedFile"
            :filename="selectedFile"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang="scss">
.media-component {
  width: 100%;
  height: 100%;
  border: 1px solid #ebebeb;

  .breadcrumb {
    padding: 8px;
    background-color: #eaeefb;
    .folder-path {
      cursor: pointer;
    }
  }

  .func-bar {
    padding: 12px;

    .upload-section {
      width: 100%;
      display: inline-flex;
      align-items: center;

      .progress {
        width: 100%;
        padding: 0 8px;
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        .ant-progress-line {
          line-height: 0.5;
        }

        .ant-progress-bg {
          height: 3px !important;
        }
      }
    }
  }

  .media-list-section {
    padding: 12px;
    height: calc(100% - 38px - 48px);
    position: relative;

    .ant-list-item {
      cursor: pointer;
      padding: 6px 12px;
    }

    .ant-list-item:hover {
      background: #eaeefb;
    }

    .selected-list-item { 
      background: #eaeefb
    }

    .ant-list-item-meta-title {
      display: flex;
      align-items: center;
    }

    .ant-row, .ant-col {
      height: 100%;
    }

    .ant-list {
      overflow-y: auto;
      scrollbar-width: thin;
      height: 100%;
      padding-right: 16px;
    }
  }
}
</style>
