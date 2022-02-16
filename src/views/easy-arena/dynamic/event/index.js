export default {
  router: {
    path: '/event',
    component: () => import('@/layout/index.vue'),
    name: 'EasyArena-Event-Menu',
    meta: {
      title: 'Sự kiện',
      icon: 'event',
      noCache: true,
      type: 'layout'
    }
  }
}