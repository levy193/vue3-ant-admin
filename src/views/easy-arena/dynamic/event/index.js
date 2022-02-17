export default {
  router: {
    path: '/event',
    component: () => import('@/layout/index.vue'),
    name: 'EasyArena-Event-Menu',
    redirect: '/event/list',
    meta: {
      title: 'Sự kiện',
      icon: 'event',
      noCache: true,
      type: 'layout'
    }
  }
}