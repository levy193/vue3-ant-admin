import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'

Components({
  resolvers: [
    AntDesignVueResolver()
  ]
})

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/styles/variables.scss';
        `
      }
    }
  }
})
