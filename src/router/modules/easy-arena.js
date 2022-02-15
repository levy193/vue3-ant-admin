import Layout from '@/layout/index.vue'

export default {
    path: '/easy-arena',
    name: 'easy-arena-page',
    redirect: '',
    component: Layout,
    meta: {},
    children: [{
      path: '',
      meta: { title: 'Easy Arena' },
      name: 'EasyArenaHome',
      component: () => import('@/views/easy-arena/HomePage.vue')
    }]
}
