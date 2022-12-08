import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 混入的全局注册
import mixins from "@/common/mixins/index.js"
Vue.mixin(mixins)

// 消息提示框全局注册
import utils from "@/common/js/utils.js"
Vue.prototype.$utils = utils

// 引入vuex
import store from "@/store/index.js"

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif