import easyArenaLogo from '@/assets/apps/easy-arena.png'

export default {
  title: 'Easy Admin',

  apps: [
    {
      id: 'easy-arena',
      name: 'Easy Arena',
      baseApi: import.meta.env.VITE_EASY_ARENA_BASE_API,
      mediaHost: import.meta.env.VITE_EASY_ARENA_BASE_MEDIA,
      logo: easyArenaLogo,
      questionTypes: [{
        _id: 'MultiChoice',
        name: 'Trắc nghiệm'
      }, {
        _id: 'ShortAnswer',
        name: 'Điền đáp án đúng'
      }, {
        _id: 'StringSorting',
        name: 'Sắp xếp chữ cái, từ'
      }, {
        _id: 'Classification',
        name: 'Phân loại'
      }, {
        _id: 'Speaking',
        name: 'Phát âm'
      }, {
        _id: 'UnderlineWord',
        name: 'Gạch chân'
      }]
    }
  ]
}
