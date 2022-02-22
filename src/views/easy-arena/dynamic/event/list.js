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
    state: 'events',
    api: {},
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
      name: 'appCodes',
      placeholder: 'Ứng dụng',
      label: 'label',
      value: 'value',
      style: 'min-width: 200px',
      options: [{
        label: 'Easy Class',
        value: 'easy-class'
      }, {
        label: 'Easy School',
        value: 'easy-school'
      }]
    }],
    listProps: [{
      name: 'index',
      label: '#',
      type: 'index',
      width: 50
    }, {
      name: 'code',
      label: 'Mã',
      type: 'text',
      width: 120,
      align: 'left'
    }, {
      name: 'appCodes',
      label: 'Ứng dụng',
      type: 'template',
      template: 'AppTags'
    }, {
      name: 'name',
      label: 'Tên',
      type: 'text',
      align: 'left'
    }, {
      name: 'startAt',
      label: 'Bắt đầu',
      type: 'text',
      filter: {
        name: 'parseTime',
        vars: ['DD-MM-YYYY']
      }
    }, {
      name: 'endAt',
      label: 'Kết thúc',
      type: 'text',
      filter: {
        name: 'parseTime',
        vars: ['DD-MM-YYYY']
      }
    }, {
      name: 'publish',
      label: 'Phát hành',
      type: 'boolean',
      width: 100
    }, {
      name: 'buttons',
      label: 'Action',
      type: 'buttons',
      buttons: [
        {
          name: 'put',
          type: 'text',
          color: '#1890ff',
          icon: 'edit',
          formTitle: 'Cập nhật'
        },
        {
          name: 'delete',
          type: 'text',
          color: '#ff4949',
          icon: 'trash',
          open: 'popConfirm',
          popConfirmTitle: 'Bạn có muốn xóa bản ghi này không?',
          confirmText: 'Yes',
          cancelText: 'No'
        }
      ],
      width: 100
    }],
    formProps: [{
      name: 'appCodes',
      label: 'Ứng dụng',
      type: 'select',
      mode: 'multiple',
      key: '_id',
      value: '_id',
      display: 'title',
      options: [{
        _id: 'easy-class',
        title: 'Easy Class'
      }],
      span: 12
    }, {
      name: 'code',
      label: 'Mã',
      type: 'text',
      span: 12
    },
    {
      name: 'name',
      label: 'Tên sự kiện',
      type: 'text',
      span: 12
    },
    {
      name: 'thumbnailUrl',
      label: 'Ảnh thumbnail',
      type: 'image',
      span: 12
    },
    {
      name: 'backgroundUrl',
      label: 'Ảnh nền',
      type: 'image',
      span: 12
    },
    {
      name: 'scheduleIconUrl',
      label: 'Icon lịch',
      type: 'image',
      span: 12
    },
    {
      name: 'startAt',
      label: 'Ngày bắt đầu',
      type: 'date',
      span: 12
    },
    {
      name: 'endAt',
      label: 'Ngày kết thúc',
      type: 'date',
      span: 12
    },
    {
      name: 'description',
      label: 'Mô tả ngắn',
      type: 'textarea',
      rows: 3,
      span: 24
    },
    {
      name: 'rule',
      label: 'Thể lệ',
      type: 'text-editor',
      span: 24
    }, {
      name: 'publish',
      label: 'Phát hành',
      type: 'boolean',
      span: 24
    }]
  }
}
