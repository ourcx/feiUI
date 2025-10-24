// vite.lib.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/plugins/index.ts'),
      name: 'FeiUI',
      fileName: format => `feiui.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    },
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
