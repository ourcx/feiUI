import './assets/main.css'
import './styles/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// 引入 Button 和 Collapse 组件以及 FontAwesome 图标
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import lazyLoad from './directives/lazy'
import install from './plugins/index'
library.add(fas)
// 引入 FontAwesome 图标库并添加图标

createApp(App).use(install).directive('lazy', lazyLoad).mount('#app')

//注册全局组件
