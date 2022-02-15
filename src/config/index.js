import easyArenaLogo from '@/assets/apps/easy-arena.png'

export default {
  title: 'Easy Admin',

  apps: [
    {
      id: 'easy-arena',
      name: 'Easy Arena',
      baseApi: import.meta.env.VITE_EASY_ARENA_BASE_API,
      mediaHost: import.meta.env.VITE_EASY_ARENA_BASE_MEDIA,
      logo: easyArenaLogo
    }
  ]
}
