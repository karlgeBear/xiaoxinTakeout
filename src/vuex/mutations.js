/* 
包含n个直接更新状态数据的方法的对象
方法不可以包含异步和逻辑处理的代码
*/

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

export default {  //// 通过[]来设置对象中的属性名
  [RECEIVE_ADDRESS] (state,address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state,shops) {
    state.shops = shops
  },
  [RECEIVE_SHOP_INFO] (state,shopInfo) {
    state.shopInfo = shopInfo
  },
  [RECEIVE_SHOP_GOODS] (state,shopGoods) {
    state.shopGoods = shopGoods
  },
  [RECEIVE_SHOP_RATINGS] (state,shopRatings) {
    state.shopRatings = shopRatings
  },

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