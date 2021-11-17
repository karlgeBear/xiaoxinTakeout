/* 
向外暴露路由器模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex/store'
import routes from './router'

Vue.use(VueRouter)  //声明使用vue插件

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router =  new VueRouter({
  mode:'history',  //路由路径没有#

  // 配置项目中所有的路由
  routes: routes
})

// 进入shop路由必须先登陆，没有登陆自动跳转到登陆页面
const paths = ['shop']   // 所有需要进行登陆检查的路由路径数组

// 定义前置守卫
router.beforeEach((to,from,next) => {
  console.log('global beforeEach')
  console.log(to.path,from.path)
  // 对请求路径进行检查
  const path = to.path.split('/')[1]
  if (paths.indexOf(path) !== -1){
    // 如果没有登陆强制跳转到登陆页面
    if(!store.state.user.token){
      return next('/login')
    }
  }

  //放行
  next()
})

export default router