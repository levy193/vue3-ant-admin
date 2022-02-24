import _ from 'lodash'
import moment from 'moment'
import { useAccountStore } from '@/store/account'

export function mediaURL(host, url) {
  if (!url) {
    return ''
  }

  const accountStore = useAccountStore()
  host = host || accountStore.app.mediaHost
  if (!url.startsWith('http')) {
    url = _.trimEnd(host, '/') + '/' + _.trimStart(url, '/')
  }

  return url
}

export function parseTime(time, format) {
  return moment(time).format(format || 'dd/mm/yyyy')
}

export function fileIconFilter(filename) {
  if (!filename.includes('.')) {
    return 'folder'
  }

  const ext = filename.substr(filename.lastIndexOf('.') + 1)

  if (['png', 'jpg', 'gif'].includes(ext)) {
    return 'image'
  }

  if (['mp3', 'wav'].includes(ext)) {
    return 'file-audio'
  }

  if (['doc', 'docx'].includes(ext)) {
    return 'file-word'
  }

  if (['xls', 'xlsx'].includes(ext)) {
    return 'file-excel'
  }

  if (['mp4'].includes(ext)) {
    return 'file-video'
  }

  return 'file'
}

export function memorySize(a) {
  if (a === 0) return '0 Bytes'
  const b = 2
  const c = 1024
  const d = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const e = Math.floor(Math.log(a) / Math.log(c))
  return parseFloat((a / Math.pow(c, e)).toFixed(b)) + ' ' + d[e]
}

export function randomKey(prefix) {
  return `${prefix}-` + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
}

export function easyArenaQuestionTypeFilter(t) {
  const map = {
    MultiChoice: 'Trắc nghiệm',
    ShortAnswer: 'Điền đáp án đúng',
    StringSorting: 'Sắp xếp chữ cái, từ',
    Classification: 'Phân loại',
    Speaking: 'Phát âm',
    UnderlineWord: 'Gạch chân',
    Matching: 'Nối đáp án đúng',
    WordSearch: 'Tìm ô chữ'
  }

  return map[t]
}

export function easyArenaContestGroup(v) {
  const map = [
    'TH',
    'THCS',
    'THPT'
  ]

  return map[v]
}
