/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import { h, watch } from 'vue'
import type { App } from 'vue'
import MyLayout from "./MyLayout.vue"
import '../theme/style/index.scss'
import DefaultTheme from 'vitepress/theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 导入您的按钮组件
import FeiButton from "../../../src/components/Button/Button.vue"
import FeiCode from '../../../src/components/Code/Code.vue'
import FeiCard from '../../../src/components/Card/Card.vue'
import FeiIcon from '../../../src/components/Icon/Icon.vue'
// 导入演示组件
import ButtonDemoBasic from "../../components/demos/ButtonDemoBasic.vue"
import ButtonDemoType from "../../components/demos/ButtonDemoType.vue"
import ButtonDemoSize from "../../components/demos/ButtonDemoSize.vue"
import ButtonDemoDisabled from "../../components/demos/ButtonDemoDisabled.vue"
import ButtonDemoLoading from "../../components/demos/ButtonDemoLoading.vue"
import ButtonDemoOther from "../../components/demos/ButtonDemoOther.vue"
import CodeDemoBasic from '../../components/demos/CodeDemoBasic.vue'
import CodeDemoType from '../../components/demos/CodeDemoType.vue'
import CodeDemoTheme from '../../components/demos/CodeDemoTheme.vue'
import CodeDemoCopyable from '../../components/demos/CodeDemoCopyable.vue'
import CodeDemoEditable from '../../components/demos/CodeDemoEditable.vue'
import CodeDemoWidth from '../../components/demos/CodeDemoWidth.vue'
import CardDemoBasic from '../../components/demos/CardDemoBasic.vue'
import CardDemoImage from '../../components/demos/CardDemoImage.vue'
import CardDemoType from '../../components/demos/CardDemoType.vue'
import CardDemoBorderless from '../../components/demos/CardDemoBorderless.vue'
import CardDemoShadow from '../../components/demos/CardDemoShadow.vue'
import CardDemoFooter from '../../components/demos/CardDemoFooter.vue'
import IconDemoBasic from '../../components/demos/IconDemoBasic.vue'
import IconDemoColor from '../../components/demos/IconDemoColor.vue'
import IconDemoSize from '../../components/demos/IconDemoSize.vue'
import IconDemoFlip from '../../components/demos/IconDemoFlip.vue'
import IconDemoAnimation from '../../components/demos/IconDemoAnimation.vue'
import IconDemoState from '../../components/demos/IconDemoState.vue'
import IconDemoType from '../../components/demos/IconDemoType.vue'


// 声明 homePageStyle 变量
let homePageStyle: HTMLStyleElement | undefined
library.add(fas)
export default {
  Layout: () => h(MyLayout),

  enhanceApp({ app, router }: { app: App; router: any }) {
    // 注册按钮组件
    app.component('FeiButton', FeiButton)

    // 注册演示组件
    app.component('ButtonDemoBasic', ButtonDemoBasic)
    app.component('ButtonDemoType', ButtonDemoType)
    app.component('ButtonDemoSize', ButtonDemoSize)
    app.component('ButtonDemoDisabled', ButtonDemoDisabled)
    app.component('ButtonDemoLoading', ButtonDemoLoading)
    app.component('ButtonDemoOther', ButtonDemoOther)


    app.component('FeiCode', FeiCode)
    app.component('CodeDemoBasic', CodeDemoBasic)
    app.component('CodeDemoType', CodeDemoType)
    app.component('CodeDemoTheme', CodeDemoTheme)
    app.component('CodeDemoCopyable', CodeDemoCopyable)
    app.component('CodeDemoEditable', CodeDemoEditable)
    app.component('CodeDemoWidth', CodeDemoWidth)

    app.component('FeiCard', FeiCard)
    app.component('CardDemoBasic', CardDemoBasic)
    app.component('CardDemoType', CardDemoType)
    app.component('CardDemoImage', CardDemoImage)
    app.component('CardDemoShadow', CardDemoShadow)
    app.component('CardDemoBorderless', CardDemoBorderless)
    app.component('CardDemoFooter', CardDemoFooter)

     app.component('FeiIcon', FeiIcon)
     app.component('IconDemoBasic', IconDemoBasic)
     app.component('IconDemoSize', IconDemoSize)
     app.component('IconDemoSize', IconDemoSize)
     app.component('IconDemoFlip', IconDemoFlip)
     app.component('IconDemoAnimation', IconDemoAnimation)
     app.component('IconDemoState', IconDemoState)
     app.component('IconDemoType', IconDemoType)



    // 彩虹背景动画样式 - 只在客户端执行
    if (typeof window !== 'undefined') {
      const updateHomePageStyle = (isHome: boolean) => {
        if (isHome) {
          if (homePageStyle) return

          homePageStyle = document.createElement('style')
          homePageStyle.innerHTML = `
            :root {
              --vp-home-hero-name-color: transparent;
              --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }

            .VPHome {
              animation: rainbow 12s linear infinite;
            }

            @keyframes rainbow {
              0% {
                --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              25% {
                --vp-home-hero-name-background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              }
              50% {
                --vp-home-hero-name-background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
              }
              75% {
                --vp-home-hero-name-background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
              }
              100% {
                --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
            }
          `
          document.head.appendChild(homePageStyle)
        } else {
          if (!homePageStyle) return
          homePageStyle.remove()
          homePageStyle = undefined
        }
      }

      // 监听路由变化
      watch(
        () => router.route.path,
        (newPath) => {
          updateHomePageStyle(newPath === '/')
        },
        { immediate: true }
      )

      // 添加卸载清理
      const originalUnmount = app.unmount
      app.unmount = function () {
        if (homePageStyle) {
          homePageStyle.remove()
        }
        originalUnmount()
      }
    }
  },
}
