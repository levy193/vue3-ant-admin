export default {
  title: 'EasyAdmin',

  apps: [
    {
      id: 'easy-arena',
      name: 'Easy Arena',
      baseApi: import.meta.env.VITE_EASY_ARENA_BASE_API,
      logo: '@/assets/apps/easy-arena.png'
    }
  ]
}
