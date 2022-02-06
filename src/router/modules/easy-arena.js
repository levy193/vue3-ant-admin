import Layout from '@/layout/index.vue'

export default {
    path: '/easy-arena',
    name: 'easy-arena-page',
    redirect: 'noRedirect',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'login',
        component: () => import('@/views/auth/Login.vue')
      }
    ]
}
