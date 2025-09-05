import { fileURLToPath, URL } from 'node:url'
import { Fei } from './resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vueJsx({
      // 添加 JSX 插件配置
      babelPlugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator'
      ]
    }),
    vue({
     template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      },
      include: [/\.vue$/, /\.md$/] // 明确包含的文件类型
    }),
    Components({
      resolvers: [Fei()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
