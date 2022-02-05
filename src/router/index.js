import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/error',
    component: () => import('@/layout/index.vue'),
    redirect: 'noRedirect',
    name: 'ErrorPage',
    meta: { title: 'Error Pages' },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: 'Page404',
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


