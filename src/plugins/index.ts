// const requireComponent = (require as any).context('./', true, /\.vue$/)
// const install = (Vue: any) => {
//   if (install.installed) return
//   install.installed
//   requireComponent.keys().forEach((element:any) => {
//     const config = requireComponent(element)
//     if (config && config.default.name) {
//       const componentName = config.default.name
//       Vue.component(componentName, config.default || config)
//     }
//   })
// }

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

// export default {
//   install
// }

//Vue组件自动注册插件
import type { App } from 'vue'

const requireComponent = (require as any).context('./', true, /\.vue$/)
const install = (app: App): void => {
  if ((install as any).installed) return
  ;(install as any).installed = true
  requireComponent.keys().forEach((element: any) => {
    const config = requireComponent(element)
    if (config && config.default.name) {
      const componentName = config.default.name
      app.component(componentName, config.default || config)
    }
  })
}

export default {
  install
}
