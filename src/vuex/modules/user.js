/* 
对应user功能模块的配置对象
*/
import {  //导入异步请求
  reqAutoLogin
} from '../../api'

import {
  RECEIVE_TOKEN,
  RECEIVE_USER,
  RESET_TOKEN,
  RESET_USER
} from '../mutations-type.js'

const state = {
  token:localStorage.getItem('token_key'),
  user:{} //登录用户信息对象
}
const mutations = {
  [RECEIVE_TOKEN] (state,token) {
    state.token = token
  },
  [RECEIVE_USER] (state,user) {
    state.user = user
  },
  [RESET_TOKEN] (state) {
    state.user = {}
  },
  [RESET_USER] (state) {
    state.token = ''
  }
}
const actions = {
      /* 
  记录user: 
    持久化保存token
    在state中保存user
  */
    recordUser({commit}, user) {
      console.log(3)
      // 将user的token保存到localStorage中
      localStorage.setItem('token_key', user.token)
      // 将token保存到state中
      commit(RECEIVE_TOKEN, { token: user.token })
      // 将user保存到state中
      delete user.token
      commit(RECEIVE_USER,user)
    },
  
    // 退出登录
    logout({commit}){
      // 重置state中的token
      commit(RESET_TOKEN)
      // 重置登录用户信息
      commit(RESET_USER)
      // 清除存在localstorage中的token
      localStorage.removeItem('token_key')
    },
  
    // 自动登录
    async getUserInfo({commit,state}){
      // 如有token，就发自动登陆的请求获取user（没有则后台会返回一个对象，属性值有msg=‘请先登陆或者token过期，请重新登录’）
      const token = state.token
      if (token){
        // 没有token，异步获取user
        const result = await reqAutoLogin(token)
        if (result.code === 0){
          // 取得用户信息
          const user = result.data
          //console.log('autoLoginSucessful:',user)
          commit(RECEIVE_USER,user)
        }
      }
    }
}
const getters = {}

export default  {
  state,
  mutations,
  actions,
  getters
}