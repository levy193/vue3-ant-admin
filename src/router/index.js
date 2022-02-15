import { createRouter, createWebHistory } from 'vue-router'

// const modules = import.meta.globEager('./modules/*.js')
// const appRoutes = []
// Object.keys(modules).forEach(key => {
//   appRoutes.push(modules[key].default)
// })

const routes = [
  {
    path: '/',
    component: () => import('@/views/apps/App.vue'),
    meta: { title: 'Apps' }
  },
  {
    path: '/login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/error',
    component: () => import('@/layout/index.vue'),
    redirect: 'noRedirect',
    name: 'error-page',
    meta: { title: 'Error Pages' },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        name: '401-page',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: '404-page',
        meta: { title: '404', noCache: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router


