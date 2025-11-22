import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import {viteSingleFile} from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), ui({
    ui: {
      colors: {
        primary: 'teal',
        neutral: 'gray'
      }
    }
  }), viteSingleFile({
    useRecommendedBuildConfig: false
  })],
  optimizeDeps: {
    exclude: ['@vueuse/core'],
  },
  build: {assetsInlineLimit: 0}
})
