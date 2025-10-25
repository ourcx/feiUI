import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/plugins/index.ts'),
      name: 'FeiUI',
      fileName: (format) => `feiui-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        // 确保 CSS 被提取为单独文件
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css'
          }
          return assetInfo.name!
        }
      }
    },
    // 确保 CSS 被提取
    cssCodeSplit: true,
    // 清空输出目录
    emptyOutDir: true,
  }
})
