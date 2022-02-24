<script setup>
import _ from 'lodash'
import { ref, watch } from 'vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  answers: {
    type: [Array, Object],
    default: () => []
  },
  rightAnswer: {
    type: [Number, String, Array],
    default: () => ''
  },
  questionType: {
    type: String,
    default: () => ''
  },
  preview: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([
  'updateAnswer',
  'updateRightAnswer'
])

const answersTemp = ref(null)
const rightTemp = ref(null)

const updateAnswersToParent = () => {
  emits('updateAnswer', props.questionType, answersTemp.value)
}

const updateRightAnswerToParent = () => {
  emits('updateRightAnswer', props.questionType, rightTemp.value)
}

const addAnswerItem = () => {
  answersTemp.value.push('')
  updateAnswersToParent()
}

const addRightAnswerItem = () => {
  rightTemp.value.push('')
  updateRightAnswerToParent()
}

const deleteAnswerItem = (index) => {
  if (index > -1 && index < answersTemp.value.length) {
    answersTemp.value.splice(index, 1)
  }
}

const deleteRightAnswerItem = (index) => {
  if (index > -1 && index < rightTemp.value.length) {
    rightTemp.value.splice(index, 1)
  }
}

const handleUpdateClassificationAnswer = (field) => {
  if (['classificationFields', 'classificationList'].includes(field)) {
    rightTemp.value = []
  }

  updateAnswersToParent()
  updateRightAnswerToParent()
}

const handleSelectUnderlineWordTag = (rightIndex) => {
  if (props.preview) {
    return
  }

  const index = _.findIndex(rightTemp.value, v => {
    return v === rightIndex
  })

  if (index !== -1) {
    rightTemp.value.splice(index, 1)
  } else {
    rightTemp.value.push(rightIndex)
    rightTemp.value = rightTemp.value.sort()
  }

  updateRightAnswerToParent()
}

const handleUpdateUnderlineWordAnswer = (field) => {
  if (['underlineType', 'underlinePhrase'].includes(field)) {
    rightTemp.value = []
  }

  updateAnswersToParent()
  updateRightAnswerToParent()
}

watch(
  () => props.rightAnswer,
  (val) => {
    rightTemp.value = _.cloneDeep(val)
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.answers,
  (val) => {
    answersTemp.value = _.cloneDeep(val)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <div class="question-answer">
    <div v-if="questionType === 'MultiChoice'" class="multiple-choice">
      <div v-if="!preview" class="add-btn" @click="addAnswerItem">
        <span class="add-circle">
          <PlusCircleOutlined />
        </span>
        <div class="label">Thêm câu trả lời</div>
      </div>

      <a-radio-group 
        v-model:value="rightTemp"
        style="width: 100%"
        @change="updateRightAnswerToParent"
      >
        <a-row :gutter="20" class="answers">
          <a-col
            :span="12"
            class="answer answer-item"
            v-for="(ans, index) in answersTemp"
            :key="index"
          >
            <a-radio
              :value="index"
              :disabled="preview"
            />
            <a-input
              v-model:value="answersTemp[index]"
              :disabled="preview"
              @input="updateAnswersToParent"
            >
              <template v-if="!preview" #suffix>
                <a-button
                  type="text"
                  style="padding: 0;"
                  @click="deleteAnswerItem(index)"
                >
                  <svg-icon name="trash" color="rgba(0, 0, 0, 0.5)" />
                </a-button>
              </template>
            </a-input>
          </a-col>
        </a-row>
      </a-radio-group>
    </div>

    <div v-if="this.questionType === 'ShortAnswer'" class="short-answer">
      <div v-if="!preview" class="add-btn" @click="addRightAnswerItem">
        <span class="add-circle">
          <PlusCircleOutlined />
        </span>
        <div class="label">Thêm câu trả lời</div>
      </div>

      <a-row class="answers" :gutter="20">
        <a-col
          v-for="(ans, index) in rightTemp"
          :key="index"
          :span="12"
          class="answer answer-item"
        >
          <a-input
            v-model:value="rightTemp[index]"
            :disabled="preview"
            @input="updateRightAnswerToParent"
          >
            <template v-if="!preview" #suffix>
              <a-button
                type="text"
                style="padding: 0;"
                @click="deleteRightAnswerItem(index)"
              >
                <svg-icon name="trash" color="rgba(0, 0, 0, 0.5)" />
              </a-button>
            </template>
          </a-input>
        </a-col>
      </a-row>
    </div>

    <div v-if="this.questionType === 'StringSorting'" class="string-sorting">
      <div class="answers">
        <div class="answer answer-item">
          <a-input
            v-model:value="rightTemp"
            :disabled="preview"
            @input="updateRightAnswerToParent"
          />
        </div>

        <div class="note" style="padding-top: 14px; font-size: 12px">
          <span style="font-weight: bold">Chú ý: </span> Nhập vào một từ(không chứa dấu cách) hoặc một câu đáp án, Hệ thống sẽ tự động trộn chữ cái(nếu là 1 từ) hoặc các từ (nếu là 1 câu). Học sinh sẽ phải sắp xếp các chữ cái, từ để tạo thành từ, câu đúng.
        </div>
      </div>
    </div>

    <div v-if="this.questionType === 'Speaking'" class="speaking">
      <div class="answers">
        <div class="answer answer-item">
          <a-input
            v-model:value="rightTemp"
            :disabled="preview"
            @input="updateRightAnswerToParent"
          />
        </div>

        <div class="note" style="padding-top: 14px; font-size: 12px">
          <span style="font-weight: bold">Chú ý: </span> Nhập vào một từ hoặc câu để học sinh nói phát âm từ hoặc câu đó.
        </div>
      </div>
    </div>

    <div v-if="this.questionType === 'Classification'" class="classification">
      <div class="add-btn">
        <span class="add-circle">
          <PlusCircleOutlined />
        </span>
        <div class="label">Trường phân loại</div>
      </div>

      <div class="answers">
        <div class="classification-fields answer-item">
          <a-select
            v-model:value="answersTemp.classificationFields"
            mode="tags"
            :disabled="preview"
            @change="handleUpdateClassificationAnswer('classificationFields')"
            style="width: 100%"
          />
        </div>
      </div>

      <div class="add-btn">
        <span class="add-circle">
          <PlusCircleOutlined />
        </span>
        <div class="label">Đáp án</div>
      </div>

      <div class="answers">
        <div class="classification-fields answer-item">
          <a-select
            v-model:value="answersTemp.list"
            mode="tags"
            :disabled="preview"
            @change="handleUpdateClassificationAnswer('classificationList')"
            style="width: 100%"
          />
        </div>
      </div>

      <div class="add-btn">
        <span class="add-circle">
          <PlusCircleOutlined />
        </span>
        <div class="label">Đáp án đúng</div>
      </div>

      <div class="answers">
        <div
          class="classification-fields answer-item"
          v-for="(item, index) in answersTemp.classificationFields"
          :key="`classification-item-${index}`"
        >
          <a-tag class="tag-list" color="orange">{{ item }}</a-tag>
          <a-select
            v-model:value="rightTemp[index]"
            mode="multiple"
            :disabled="preview"
            :options="answersTemp.list ? answersTemp.list.map((ans, index) => { return { key: index, value: ans, label: ans }}) : []"
            @change="handleUpdateClassificationAnswer('classificationRight')"
            style="width: 100%"
          />
        </div>
      </div>
    </div>

    <div v-if="this.questionType === 'UnderlineWord'" class="underline-word">
      <div class="answers">
        <div class="answer answer-item" style="display: flex; align-items: center">
          <a-select
            v-model:value="answersTemp.type"
            :disabled="preview"
            :options="[{
              key: 'word',
              value: 'word',
              label: 'Từ'
            }, {
              value: 'character',
              key: 'word',
              label: 'Chữ cái'
            }]"
            placeholder="Dạng gạch chân"
            @change="handleUpdateUnderlineWordAnswer('underlineType')"
            style="margin-right: 24px; max-width: 300px"
          />

          <a-input
            v-model:value="answersTemp.phrase"
            :disabled="preview"
            placeholder="Nhập vào từ hoặc cụm từ"
            @input="handleUpdateUnderlineWordAnswer('underlinePhrase')"
          />
        </div>

        <div
          v-if="answersTemp.type === 'word' && answersTemp.phrase"
          class="answer answer-item underline-right"
        >
          <span
            class="underline-tag"
            v-for="(item, index) in answersTemp.phrase.split(' ')"
            :key="`underline-tag-${index}`"
            :class="rightTemp.includes(index) ? 'selected' : ''"
            @click="handleSelectUnderlineWordTag(index)"
          >
            {{ item }}
          </span>
        </div>

        <div
          v-if="answersTemp.type === 'character' && answersTemp.phrase"
          class="answer answer-item underline-right"
        >
          <span
            class="underline-tag"
            v-for="(item, index) in answersTemp.phrase.split('')"
            :key="`underline-tag-${index}`"
            :class="rightTemp.includes(index) ? 'selected' : ''"
            @click="handleSelectUnderlineWordTag(index)"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.question-answer {
  // padding-top: 24px;
  margin-top: 6px;
  .ant-input[disabled] {
    color: #333 !important;
  }

  .ant-select-multiple.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none !important;
    background: transparent !important;
  }

  .ant-select-disabled.ant-select-multiple .ant-select-selection-item {
    color: #333 !important;
  }

  .add-btn {
    display: flex;
    align-items: center;
    color: #108ee9;
    cursor: pointer;
    padding-bottom: 24px;

    .label {
      font-weight: bold;
    }

    .add-circle {
      padding: 0px;
      color: #108ee9;
      margin-right: 8px;
    }
  }

  .classification {
    .add-btn {
      padding-bottom: 12px;
    }

    .answers {
      padding-bottom: 16px;
    }
  }

  .answer-item {
    display: flex;
    align-items: center;
    padding-bottom: 14px;
    .md-radio {
      height: 42px;
      display: flex;
      align-items: center;
    }

    .tag-list {
      margin-right: 20px;
    }

    .classification-tag {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      background: #fff;
      padding: 0 12px;
      height: 42px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      white-space: nowrap;
    }

    .underline-tag {
      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: #fff;
      padding: 0 12px;
      height: 32px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      margin-right: 8px;
    }

    .underline-tag.selected {
      background: #108ee9;
      color: #fff;
    }
  }

  .matching {
    .col-header {
      padding-top: 12px;
      font-weight: bold;
    }
  }

  .word-search {
    .crossword-row {
      display: flex;
      justify-content: center;
      .crossword-unit {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>