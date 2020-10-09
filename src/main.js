import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

Vue.config.productionTip = false

//在Vue的原型中添加bus（Vue实例对象），目的是将bus作为一个时间总线，用来跨组件来监听事件
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
