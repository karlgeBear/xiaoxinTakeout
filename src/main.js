import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import store from './vuex/store'
import MockServe from './mock/mockServe'
import { Button } from 'mint-ui'
import CartControl from './components/CartControl/CartControl.vue'

//全局注册组件
Vue.component(Button.name, Button)
Vue.component('CartControl',CartControl)

import 'lib-flexible'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, // 所有组件都能看到 $router和$route  <router-link> 和 <router-view>
  store   // 所有组件都能看到： $store
}).$mount('#app')
