export default {
  router: {
    path: 'list',
    component: () => import('@/views/templates/DynamicTemplate.vue'),
    name: 'EasyArena-Event-List',
    meta: {
      title: 'Danh sách',
      pageTitle: 'Danh sách sự kiện',
      icon: 'event',
      noCache: true
    }
  },
  view: {
    models: [],
    model: 'Event',
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
    filters: [{
      name: 'test',
      placeholder: 'Chọn test',
      label: 'key',
      value: 'value',
      style: 'min-width: 200px',
      options: [{
        key: 'Tình yêu',
        value: 'Love'
      }]
    }],
    listProps: [],
    formProps: []
  }
}