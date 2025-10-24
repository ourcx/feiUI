// src/plugins/index.ts
import type { App } from 'vue'
import * as components from '../components/index'
import * as D3 from '../D3/index'
import * as page from '../page/index'

const modules = import.meta.glob('./**/*.vue', { eager: true })

const install = (app: App): void => {
  if ((install as any).installed) return
  ;(install as any).installed = true

  // 两种方式任选其一：
  // 方式A：使用动态导入（保持自动化）
  Object.keys(modules).forEach((key: string) => {
    const component = (modules[key] as any).default
    if (component && component.name) {
      app.component(component.name, component)
    }
  })

  // 方式B：使用显式导出（更好的类型支持）
  // Object.entries(components).forEach(([name, component]) => {
  //   app.component(name, component)
  // })
}

export default {
  install
}

// 关键：导出所有组件用于按需引入
export * from '../components/index'
export * from '../D3/index'
export * from '../page/index'
// 保留这个函数用于其他用途（调试、文档等）
export const getComponentNames = () => {
  return Object.keys(modules)
    .map(key => {
      const component = (modules[key] as any).default
      return component?.name
    })
    .filter(Boolean)
}
