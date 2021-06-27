import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style/element-variables.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import registerDirectives from './directives' // 全局指令注册
import { SvgIcon } from './icons' // 全局注册SvgIcon组件，生成svg-sprite

const app = createApp(App)

registerDirectives(app)
  .component('g-svg-icon', SvgIcon)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
