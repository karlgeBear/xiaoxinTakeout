/* 
向外暴露路由器模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

import router from './router'

Vue.use(VueRouter)  //声明使用vue插件

export default new VueRouter({
  mode:'history',  //路由路径没有#

  // 配置项目中所有的路由
  routes: router
})