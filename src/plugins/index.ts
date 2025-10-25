import type { App } from 'vue'
import * as components from '../components/index'

// 移除动态导入，使用显式导出
const install = (app: App): void => {
  if ((install as any).installed) return
  ;(install as any).installed = true

  // 使用显式导出的组件
  Object.entries(components).forEach(([name, component]) => {
    if (name.startsWith('Fei')) {
      app.component(name, (component as any))
    }
  })
}

export default {
  install
}

// 导出所有组件
export * from '../components/index'
export * from '../D3/index'
export * from '../page/index'

// 如果需要，可以导出 getComponentNames 函数
export const getComponentNames = () => {
  return Object.keys(components).filter(key => key.startsWith('Fei'))
}
