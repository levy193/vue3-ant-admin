export default {
  router: {
    path: 'list',
    component: () => import('@/views/templates/ListTemplate.vue'),
    name: 'EasyArena-Event-List',
    meta: {
      title: 'Sự kiện',
      icon: 'event',
      noCache: true
    }
  },
  view: {
    models: [
      {
        model: 'Event',
        sort: '-createdAt'
      }
    ],
    query: {
      _type: 'paginate',
      _search: '',
      _sort: '-createdAt',
      _page: 1,
      _limit: 10,
      _searchFields: '',
      _populate: ''
    },
    functions: {
      search: true,
      createItem: true,
      reload: true,
      uploadExcel: false,
      uploadExcelData: {}
    },
    filters: [],
    listProps: [],
    formProps: []
  }
}