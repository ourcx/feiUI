// 在项目根目录创建 resolvers.ts
import { resolve } from 'path'
import { ComponentResolver } from 'unplugin-vue-components'

export function Fei(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Base')) {
        return {
          name,
          from: resolve(__dirname, `./components/${name.substring(4)}/${name.substring(4)}.vue`)
        }
      }
    },
  }
}
