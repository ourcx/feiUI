import { fileURLToPath, URL } from 'node:url'
import { Fei } from './resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))
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
      resolvers: [Fei()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      // 库的入口文件，对应你的 src/plugins/index.js
      entry: resolve(__dirname, 'src/plugins/index.ts'),
      // 库名称，对应 --name zouComponent
      name: 'FeiUI',
      // 输出文件名
      fileName: format => `FeiUI.${format}.js`
    },
    // 输出目录，对应 --dest zouComponent/lib
    outDir: 'FeiUI/lib',
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  define: {
    // 注入版本信息
    __VERSION__: JSON.stringify(packageJson.version)
  }
})
