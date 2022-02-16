import { createRouter, createWebHistory } from 'vue-router'

// const modules = import.meta.globEager('./modules/*.js')
// const appRoutes = []
// Object.keys(modules).forEach(key => {
//   appRoutes.push(modules[key].default)
// })

const routes = [
  {
    path: '/apps',
    component: () => import('@/views/apps/App.vue'),
    meta: { title: 'Apps' }
  },
  {
    path: '/login',
    component: () => import('@/views/auth/Login.vue'),
    hidden: true,
    meta: { title: 'Login' }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    name: '401-page',
    hidden: true,
    meta: { title: '401', noCache: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    name: '404-page',
    hidden: true,
    meta: { title: '404', noCache: true }
  }
]

export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const createCustomRouter = () => createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ y: 0 })
})

const router = createCustomRouter()

export function resetRouter() {
  const newRouter = createCustomRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


