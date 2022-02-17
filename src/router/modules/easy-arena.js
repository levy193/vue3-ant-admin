import Layout from '@/layout/index.vue'

export default [{
    path: '/',
    name: 'easy-arena-homepage',
    redirect: '/home',
    component: Layout,
    meta: {},
    children: [{
      path: 'home',
      meta: {
        icon: 'home',
        title: 'Home',
        pageTitle: 'Trang chủ'
      },
      name: 'EasyArena-Home',
      component: () => import('@/views/easy-arena/HomePage.vue')
    }]
}]
