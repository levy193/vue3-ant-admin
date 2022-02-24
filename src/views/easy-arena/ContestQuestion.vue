<script setup>
import _ from 'lodash'
import { ref, inject, onMounted } from 'vue'
import { getData } from '@/api/composite'
import { useAccountStore } from '@/store/account'
import { useRoute } from 'vue-router'
import { question as questionAPI } from '@/api/easy-arena/question'
import { notification } from 'ant-design-vue'
import Tinymce from '@/components/Tinymce/index.vue'
import QuestionAnswer from '@/components/Question/QuestionAnswer.vue'
import config from '@/config/index.js'

const $filters = inject('$filters')
const accountStore = useAccountStore()
const route = useRoute()

const contestId = route.query.contestId
const currentQuestion = ref(null)
const questions = ref([])
const contest = ref(null)
const questionTemp = ref({})
const questionLoading = ref(true)
const formKey = ref('')
const uploadDialog = ref(false)
const currentUploadKey = ref('')
const questionDialog = ref({
  visible: false,
  action: 'create',
  title: '',
  loading: false
})
const notificationMap = {
  'create': 'Thêm mới',
  'update': 'Cập nhật',
  'delete': 'Xoá'
}
const questionTypes = config.apps[0].questionTypes

const getContest = async () => {
  try {
    const response = await getData({
      appId: accountStore.appId,
      query: {
        _model: 'Contest',
        _type: 'findOne',
        _id: contestId,
        _populate: 'event',
        _populate_event: 'name'
      }
    })

    contest.value = response.data
  } catch (err) {
    // console.log(err)
  }
}

const getQuestions = async () => {
  questionLoading.value = true
  try {
    const response = await questionAPI({
      _action: 'list',
      contestId
    })

    questions.value = response.data.data
  } catch (error) {
    // console.log(error)
  }
  questionLoading.value = false
}

const handleSelectQuestion = (question) => {
  currentQuestion.value = question
}

const handleUpdateQuestion = (action, question) => {
  formKey.value = 'form-id-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
  if (action === 'create') {
    questionTemp.value = {}
  } else {
    questionTemp.value = _.cloneDeep(question)
  }

  questionDialog.value = {
    visible: true,
    action,
    title: `${notificationMap[action]} câu hỏi`,
    loading: false
  }
}

const commitCreateQuestion = (data) => {
  questions.value.push(data)
}

const commitUpdateQuestion = (data) => {
  const index = _.findIndex(questions.value, q => {
    return q._id.toString() === data._id.toString()
  })

  if (index > -1) {
    questions.value.splice(index, 1, data)
  }
}

const commitDeleteQuestion = (data) => {
  const index = _.findIndex(questions.value, q => {
    return q._id.toString() === data._id.toString()
  })

  if (index > -1) {
    questions.value.splice(index, 1)
  }
}

const handleShowUploadDialog = (key) => {
  currentUploadKey.value = key
  uploadDialog.value = true
}

const setMediaURL = (url) => {
  uploadDialog.value = false
  questionTemp.value[currentUploadKey.value] = url
}

const updateTextEditor = (prop) => {
  return value => {
    questionTemp.value[prop] = value
  }
}

const handleUpdateAnswer = (type, answers) => {
  questionTemp.value.answers = answers
}

const handleUpdateRightAnswer = (type, right) => {
  questionTemp.value.right = right
}

const updateQuestion = async () => {
  questionDialog.value.loading = true
  try {
    const body = Object.assign(questionTemp.value, {
      _action: questionDialog.value.action,
      eventId: contest.value.eventId,
      contestId: contest.value._id
    })
    const response = await questionAPI(body)
    const data = response.data.data
    switch (questionDialog.value.action) {
      case 'create':
        commitCreateQuestion(data)
        currentQuestion.value = _.cloneDeep(data)
        break
      case 'update':
        commitUpdateQuestion(data)
        currentQuestion.value = _.cloneDeep(data)
        break
      case 'delete':
        commitDeleteQuestion(data)
        currentQuestion.value = null
        break
    }

    questionDialog.value.visible = false

    notification.success({
      message: 'Thành công',
      description: `${notificationMap[questionDialog.value.action]} câu hỏi thành công.`
    })
  } catch (error) {
    // console.log(error)
  }
  questionDialog.value.loading = false
}

const handleChangeQuestionType = () => {
  switch (questionTemp.value.type) {
    case 'MultiChoice':
      questionTemp.value.answers = []
      delete questionTemp.value.right
      break
    case 'ShortAnswer':
      questionTemp.value.right = []
      delete questionTemp.value.answers
      break
    case 'StringSorting':
      questionTemp.value.right = ''
      delete questionTemp.value.answers
      break
    case 'Speaking':
      questionTemp.value.right = ''
      delete questionTemp.value.answers
      break
    case 'Classification':
      questionTemp.value.right = []
      questionTemp.value.answers = {
        list: [],
        classificationFields: []
      }
      break
    case 'UnderlineWord':
      questionTemp.value.right = []
      questionTemp.value.answers = {
        type: '',
        phrase: ''
      }
      break
  }
}

onMounted(() => {
  getQuestions()
})

// Init data
await getContest()
</script>

<template>
  <a-empty v-if="!contest" />
  <div v-else class="question-component">
    <div class="contest-card">
      <div>
        <span style="font-weight: bold; padding-right: 10px">Cuộc thi: {{ contest.name }}</span>
        <a-tag color="#f50">{{ $filters.easyArenaContestGroup(contest.group) }}</a-tag>
        <a-tag color="#108ee9">Vòng {{ contest.round  }}</a-tag>
      </div>
      <a-space>
        <a-typography-text type="secondary">Sự kiện: {{ contest.event.name }}</a-typography-text>
      </a-space>
    </div>

    <div class="main-question-section">
      <a-row style="height: 100%">
        <a-col :span="6">
          <div class="questions" v-loading="questionLoading">
            <div
              v-for="(q, index) in questions"
              :key="q._id"
              class="q-item"
              :class="currentQuestion && q._id === currentQuestion._id ? 'q-item-selected' : ''"
              @click="handleSelectQuestion(q)"
            >
              <span class="title">Câu hỏi số {{ index + 1 }}</span>
              <div class="settings">
                <span @click="handleUpdateQuestion('update', q)">
                  <svg-icon name="edit" />
                </span>
                <span @click="handleUpdateQuestion('delete', q)">
                  <svg-icon name="trash" />
                </span>
              </div>
            </div>
            <div class="add-question-btn"  @click="handleUpdateQuestion('create')">
              <span class="add-icon"><svg-icon name="plus-circle" /></span>
              <div class="label">Thêm câu hỏi</div>
            </div>
          </div>
        </a-col>
        <a-col :span="18" class="preview-section">
          <div v-if="currentQuestion" class="question-preview">
            <div style="padding-bottom: 12px">
              <a-tag color="purple">{{ $filters.easyArenaQuestionTypeFilter(currentQuestion.type) }}</a-tag>
            </div>
            <div class="content" v-html="currentQuestion.content" />
            <a-row :gutter="20">
              <a-col v-if="currentQuestion.audioUrl" :span="12" class="audio-preview">
                <audio controls>
                  <source :src="$filters.mediaURL(null, currentQuestion.audioUrl)">
                </audio>
              </a-col>
              <a-col v-if="currentQuestion.imgUrl" :span="12" class="image-preview">
                <img :src="$filters.mediaURL(null, currentQuestion.imgUrl)" />
              </a-col>
            </a-row>

            <div class="answers-section" style="margin-top: 24px">
              <QuestionAnswer
                :key="$filters.randomKey('preview')"
                :answers="currentQuestion.answers"
                :rightAnswer="currentQuestion.right"
                :questionType="currentQuestion.type"
                :preview="true"
              />
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>

  <a-modal
    :visible="questionDialog.visible"
    :title="questionDialog.title"
    width="75%"
    class="question-form"
    @cancel="questionDialog.visible = false"
    @ok="updateQuestion"
  >
    <a-form v-model="questionTemp" style="padding: 24px">
      <a-row :gutter="20">
        <a-col :span="24">
          <a-form-item
            label="Nội dung câu hỏi"
            :labelCol="{ span: 3 }"
          >
            <tinymce
              v-model:value="questionTemp.content"
              :id="`content-${formKey}`"
              :key="`content-${formKey}`"
              menubar=""
              v-on="{ input: updateTextEditor('content') }"
            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            label="Hình ảnh"
            :labelCol="{ span: 6 }"
          >
            <a-input
              v-model:value="questionTemp.imgUrl"
              class="upload-input"
            >
              <template #addonAfter>
                <a-button type="text" @click="handleShowUploadDialog('imgUrl')">
                  <svg-icon name="image" color="rgba(0, 0, 0, 0.6)" style="vertical-align: -0.125em;" />
                </a-button>
              </template>
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            label="Âm thanh"
            :labelCol="{ span: 6 }"
          >
            <a-input
              v-model:value="questionTemp.audioUrl"
              class="upload-input"
            >
              <template #addonAfter>
                <a-button type="text" @click="handleShowUploadDialog('audioUrl')">
                  <svg-icon name="audio" color="rgba(0, 0, 0, 0.6)" style="vertical-align: -0.125em;" />
                </a-button>
              </template>
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            label="Loại câu hỏi"
            :labelCol="{ span: 3 }"
          >
            <a-select
              v-model:value="questionTemp.type"
              @change="handleChangeQuestionType"
            >
              <a-select-option
                v-for="type in questionTypes"
                :key="type._id"
                :value="type._id"
              >
                {{ type.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            :labelCol="{ span: 3 }"
            label="Đáp án"
          >
            <question-answer
              :answers="questionTemp.answers"
              :right-answer="questionTemp.right"
              :question-type="questionTemp.type"
              @updateAnswer="handleUpdateAnswer"
              @updateRightAnswer="handleUpdateRightAnswer"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>

  <a-modal
    :visible="uploadDialog"
    title="Quản lý tài nguyên"
    width="80%"
    :bodyStyle="{ height: '70vh' }"
    :footer="null"
    @cancel="uploadDialog = false"
  >
    <media-manager
      v-if="currentUploadKey"
      :visible="uploadDialog"
      :focusFile="questionTemp[currentUploadKey]"
      @select-file="setMediaURL"
    />
  </a-modal>
</template>

<style lang="scss">
.question-component {
  min-height: calc(100vh - 64px);
  height: calc(100vh - 64px);
  padding: 14px;
  position: relative;

  .contest-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 32px;
    align-items: center;
    margin-bottom: 14px;
  }

  .main-question-section {
    height: calc(100% - 32px - 14px);
    max-height: calc(100% - 32px - 14px);
    border: 1px solid rgba(0, 0, 0, .1);
    position: relative;

    .preview-section {
      height: 100%;
      max-height: 100%;
      position: relative;
      overflow-y: auto;
      padding: 12px;
      .question-preview, .question-group-preview {
        text-align: left;
        .title {
          font-size: 16px;
          font-weight: bold;
          color: #1CAB36;
        }
        .content {
          padding-top: 12px;
          padding-bottom: 24px;
        }

        .image-preview {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 80%;
            max-width: 250px;
          }
        }

        .audio-preview {
          display: flex;
          justify-content: center;
          align-items: center;

          audio {
            width: 100%;
            height: 50px;
          }
        }
      }
    }

    .questions {
      height: 100%;
      width: 100%;
      border-right: 1px solid rgba(0, 0, 0, .1);
      position: relative;
      // display: flex;
      flex-wrap: wrap;
      overflow-y: auto;

      .q-item:hover {
        background-color: rgba(24, 144, 255, 0.2);
      }

      .q-item-selected {
        background-color: rgba(24, 144, 255, 0.2);
      }

      .q-item {
        width: 100%;
        font-size: 14px;
        height: 50px;
        padding: 4px 8px;
        display: flex;
        cursor: pointer;

        .title {
          width: calc(100% - 80px);
          display: flex;
          align-items: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .settings {
          padding-left: 10px;
          width: 70px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          .svg-icon {
            font-size: 12px;
            fill: rgba(0, 0, 0, 0.4) !important;
            cursor: pointer;
            width: 1rem;
            height: 1rem;
          }
        }
      }

      .add-question-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 36px;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        border-top: 1px solid rgba(0, 0, 0, .1);
        cursor: pointer;
        background: #1890ff;
        color: #fff;
        font-weight: bold;

        .svg-icon {
          vertical-align: -0.125em;
          margin-right: 4px;
        }
      }
    }
  }
}

.question-form {
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
