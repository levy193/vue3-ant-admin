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