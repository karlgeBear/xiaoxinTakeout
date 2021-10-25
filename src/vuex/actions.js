/* 
一个包含n个用于间接更新状态数据的方法的对象
mutation方法可以包含异步操作和逻辑处理代码
*/


import {  //导入异步请求
  reqAddress,
  reqCategorys,
  reqShops,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings,
  reqAutoLogin
} from '../api'

import {  
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_TOKEN,
  RECEIVE_USER,
  RESET_TOKEN,
  RESET_USER
} from './mutations-type.js'

export default {
  // 获取地址的name
  async getAddress({commit,state}) {
    const {longitude,latitude} = state
    //发异步请求
    const result = await reqAddress(longitude,latitude)
    //console.log(result)
    // 请求成功，则提交给mutations
    if (result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },
  
  // 获取食品类别
  async getCategorys({commit}) {
    //发异步请求
    const result = await reqCategorys()
    // 请求成功，则提交给mutations
    //console.log(result)
    if (result.code === 0){
      const cateGorys = result.data
      commit(RECEIVE_CATEGORYS,cateGorys)
    }
  },

  // 获取商家店铺
  async getShops({commit,state}) {
    const {longitude,latitude} = state
    //发异步请求
    const result = await reqShops(longitude,latitude)
    // 请求成功，则提交给mutations
    if (result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },

  // 获取商家店铺信息
  async getShopInfo({commit}){
    // 发送异步请求
    const result = await reqShopInfo()
    if (result.code === 0){
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO,shopInfo)
    }
  },
  // 获取商家食品信息
  async getShopGoods({commit}){
    // 发送异步请求
    const result = await reqShopGoods()
    if (result.code === 0){
      const shopGoods = result.data
      commit(RECEIVE_SHOP_GOODS,shopGoods)
    }
  },
  // 获取用户对该商家食品的评价信息
  async getShopRatings({commit}){
    // 发送异步请求
    const result = await reqShopRatings()
    if (result.code === 0){
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATINGS,shopRatings)
    }
  },

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