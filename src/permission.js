import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { notification } from 'ant-design-vue'
import { getToken } from '@/utils/token'
import getPageTitle from '@/utils/get-page-title'
import { useAccountStore } from '@/store/account'
import config from '@/config'

NProgress.configure({ showSpinner: false })

const appIds = config.apps.map(app =>  app.id)
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // Start progress bar
  NProgress.start()

  // Set page title
  document.title = getPageTitle(to.meta.title)

  const token = getToken()
  const accountStore = useAccountStore()

  if (token) {
    accountStore.setAccessToken(token)

    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (accountStore.account) {
        if (to.path === '/apps' || (accountStore.appId && appIds.includes(appIds))) {
          next()
        } else {
          accountStore.setApp(null)
          next('/apps')
          NProgress.done()
        }
      } else {
        try {
          await accountStore.getProfile()
  
          if (accountStore.appId && appIds.includes(appIds)) {
            next({ ...to, replace: true })
          } else {
            accountStore.setApp(null)
            next({
              path: '/apps',
              replace: true
            })
          }
        } catch (error) {
          accountStore.resetToken()
          notification.error({
            message: 'Error',
            description: error.message || error
          })
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})