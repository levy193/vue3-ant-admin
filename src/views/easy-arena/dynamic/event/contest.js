export default {
    router: {
      path: 'contest',
      component: () => import('@/views/templates/DynamicTemplate.vue'),
      name: 'EasyArena-Event-Contest',
      meta: {
        title: 'Cuộc thi',
        pageTitle: 'Danh sách cuộc thi',
        icon: 'trophy',
        noCache: true
      }
    },
    view: {
      models: [{
        name: 'Event',
        state: 'events',
        sort: '-createdAt'
      }],
      model: 'Contest',
      state: 'contests',
      api: {},
      query: {
        _type: 'paginate',
        _search: '',
        _sort: '-createdAt',
        _page: 1,
        _limit: 10,
        _searchFields: 'name',
        _populate: 'event'
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
        name: 'event',
        label: 'Sự kiện',
        key: 'name',
        type: 'text',
        align: 'left'
      },
      // {
      //   name: 'code',
      //   label: 'Mã',
      //   type: 'text',
      //   width: 120,
      //   align: 'left'
      // },
      {
        name: 'name',
        label: 'Tên',
        type: 'text',
        align: 'left'
      }, {
        name: 'group',
        label: 'Bảng',
        type: 'text',
        filter: {
          name: 'easyArenaContestGroup',
          vars: []
        },
        align: 'center'
      }, {
        name: 'round',
        label: 'Vòng thi',
        type: 'text',
        align: 'center',
        width: 100
      }, {
        name: 'nQuestions',
        label: 'Câu hỏi',
        type: 'text',
        align: 'center',
        width: 100
      }, {
        name: 'startAt',
        label: 'Bắt đầu',
        type: 'text',
        filter: {
          name: 'parseTime',
          vars: ['hh:mm:ss DD-MM-YYYY']
        },
        align: 'left'
      }, {
        name: 'endAt',
        label: 'Kết thúc',
        type: 'text',
        filter: {
          name: 'parseTime',
          vars: ['hh:mm:ss DD-MM-YYYY']
        },
        align: 'left'
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
            name: 'easy-arena:question',
            type: 'text',
            color: 'rgb(66, 185, 131)',
            icon: 'question-circle'
          },
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
        name: 'eventId',
        label: 'Sự kiện',
        type: 'select',
        key: '_id',
        value: '_id',
        display: 'name',
        source: 'events',
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
        name: 'isPrimary',
        label: 'Cuộc thi chính',
        type: 'boolean',
        span: 12
      },
      {
        name: 'thumbnailUrl',
        label: 'Ảnh thumbnail',
        type: 'image',
        span: 12
      },
      {
        name: 'group',
        label: 'Bảng thi',
        type: 'select',
        key: '_id',
        value: '_id',
        display: 'title',
        options: [{
          _id: 0,
          title: 'TH'
        }, {
          _id: 1,
          title: 'THCS'
        }, {
          _id: 2,
          title: 'THPT'
        }],
        span: 12
      },
      {
        name: 'round',
        label: 'Vòng thi',
        type: 'number',
        span: 12
      },
      {
        name: 'registerRequired',
        label: 'Đăng ký trước',
        type: 'boolean',
        span: 12
      },
      {
        name: 'logoUrl',
        label: 'Ảnh Logo',
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
        name: 'liveStreamUrl',
        label: 'Link livestream',
        type: 'text',
        span: 12
      },
      {
        name: 'time',
        label: 'Thời gian thi (phút)',
        type: 'number',
        span: 12
      },
      {
        name: 'startAt',
        label: 'Ngày bắt đầu',
        type: 'datetime',
        span: 12
      },
      {
        name: 'endAt',
        label: 'Ngày kết thúc',
        type: 'datetime',
        span: 12
      },
      {
        name: 'shortDescription',
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
      },
      {
        name: 'publish',
        label: 'Phát hành',
        type: 'boolean',
        span: 24
      }]
    }
  }
