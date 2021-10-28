/* 
包含n个直接更新状态数据的方法的对象
方法不可以包含异步和逻辑处理的代码
*/
import Vue from 'vue'
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
  RESET_USER,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
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
  },

  [INCREMENT_FOOD_COUNT] (state,{food}) {
    if(!food.count){  // 第一次增加时，没有food对象中没有count这个属性
      // food.count = 1  // 给food添加属性count，值为1（
      //更新了数据但界面不变 ?,
      // 此时这个新增 property 不是响应式的，
      //Vue 无法探测普通的新增 property)
      Vue.set( food, 'count', 1 )  //给有数据绑定的对象  添加指定属性名 和 值 的属性(有绑定)
    } else{
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state,{food}) {
    if (food.count) {
      food.count--
    }
  }

}