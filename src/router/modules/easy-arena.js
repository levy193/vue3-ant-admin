import Layout from '@/layout/index.vue'

export default [{
  path: '/',
  name: 'EasyArena:HomeMenu',
  redirect: '/home',
  component: Layout,
  meta: {},
  children: [{
    path: 'home',
    name: 'EasyArena:Home',
    meta: {
      icon: 'home',
      title: 'Home',
      pageTitle: 'Trang chủ'
    },
    component: () => import('@/views/easy-arena/HomePage.vue')
  }, {
    path: 'question',
    name: 'EasyArena:ContestQuestion',
    hidden: true,
    meta: {
      title: 'Câu hỏi',
      pageTitle: 'Câu hỏi',
      activeMenu: '/event/contest'
    },
    component: () => import('@/views/easy-arena/ContestQuestion.vue')
  }]
}]
