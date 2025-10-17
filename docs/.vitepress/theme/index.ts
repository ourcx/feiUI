/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import { h, watch } from 'vue'
import MyLayout from "./MyLayout.vue"

// 声明 homePageStyle 变量
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  Layout() {
    return h(MyLayout, null, {
      // 这里是其他插槽组件
    })
  },

  enhanceApp({ app, router }) {
    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(router.route.path === '/'), // 使用 router.route.path 来获取当前路径
        { immediate: true }
      )
    }
  },
}

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
      :root {
        animation: rainbow 12s linear infinite;
      }

      @keyframes rainbow {
        0% { --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        25% { --vp-home-hero-name-background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        50% { --vp-home-hero-name-background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        75% { --vp-home-hero-name-background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
        100% { --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      }
    `
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
