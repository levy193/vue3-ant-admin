import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { notification } from 'ant-design-vue'
import { getToken, getAppId } from '@/utils/cookie'
import getPageTitle from '@/utils/get-page-title'
import { useAccountStore } from '@/store/account'
import config from '@/config'

NProgress.configure({ showSpinner: false })

const appIds = config.apps.map(app => app.id)
const whiteList = ['/login']

router.beforeEach(async (to) => {
  // Start progress bar
  NProgress.start()

  // Set page title
  document.title = getPageTitle(to.meta.title)

  const token = getToken()
  const appId = getAppId()
  const accountStore = useAccountStore()

  if (token) {
    accountStore.setAccessToken(token)
    if (accountStore.appId !== appId) {
      accountStore.setApp(appId)
    }

    if (to.path === '/login') {
      return '/'
    }

    if (accountStore.account) {
      if (to.path === '/apps') {
        return true
      }

      if (accountStore.appId && appIds.includes(accountStore.appId)) {
        if (!accountStore.isGeneratedRouter) {
          await accountStore.generateRoutes()
          return to.fullPath
        }

        return true
      }
    }

    try {
      await accountStore.getProfile()
      if (accountStore.appId && accountStore.app) {
        if (!accountStore.isGeneratedRouter) {
          await accountStore.generateRoutes()
          return to.fullPath
        }

        return true
      }

      return '/apps'
    } catch (error) {
      accountStore.logout()
      notification.error({
        message: 'Error',
        description: error.message || error
      })

      return '/login'
    }
  }

  if (whiteList.includes(to.path)) {
    return true
  }

  return '/login'
})

router.afterEach(() => {
  NProgress.done()
})
