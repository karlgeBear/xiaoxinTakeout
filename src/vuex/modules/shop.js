/* 
  对应shop功能模块的配置对象
*/
import Vue from 'vue'

import {  //导入异步请求
  // reqShopInfo,
  // reqShopGoods,
  // reqShopRatings
  reqShop
} from '../../api'

import {
  // RECEIVE_SHOP_INFO,
  // RECEIVE_SHOP_GOODS,
  // RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from '../mutations-type.js'

const state = {
  // shopInfo:{}, //商家信息对象
  // shopGoods:[], //商家菜品列表
  // shopRatings: [], //用户对该菜品的评价信息
  shop:{},
  shopCart:[]
}
const mutations = {
  // [RECEIVE_SHOP_INFO] (state,shopInfo) {
  //   state.shopInfo = shopInfo
  // },
  // [RECEIVE_SHOP_GOODS] (state,shopGoods) {
  //   state.shopGoods = shopGoods
  // },
  // [RECEIVE_SHOP_RATINGS] (state,shopRatings) {
  //   state.shopRatings = shopRatings
  // },
  [RECEIVE_SHOP] (state,{shop={}}){
    /* 
    1. 接收一个新的数据
    2. 重置数据: 利用形参默认值
    */
    state.shop = shop
    //state.shopCart = shopCart
  },
  [INCREMENT_FOOD_COUNT] (state,{food}) {
    if(!food.count){  // 第一次增加时，没有food对象中没有count这个属性
      // food.count = 1  // 给food添加属性count，值为1（
      //更新了数据但界面不变 ?,
      // 此时这个新增 property 不是响应式的，
      //Vue 无法探测普通的新增 property)
      Vue.set( food, 'count', 1 )  //给有数据绑定的对象  添加指定属性名 和 值 的属性(有绑定)
      state.shopCart.push(food)
    } else{
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state,{food}) {
    if (food.count) {
      food.count--
      if (food.count === 0){
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART] (state){
    // 将所有food的count置为0
    state.shopCart.forEach(food => food.count = 0)
    // 将购物车重置为空数组
    state.shopCart = []
    
  }

}
const actions = {
  // // 获取商家店铺信息
  // async getShopInfo({commit}){
  //   // 发送异步请求
  //   const result = await reqShopInfo()
  //   console.log('getshopinshop:',result)
  //   if (result.code === 0){
  //     const shopInfo = result.data
  //     commit(RECEIVE_SHOP_INFO,shopInfo)
  //   }
  // },
  // // 获取商家食品信息
  // async getShopGoods({commit}){
  //   // 发送异步请求
  //   const result = await reqShopGoods()
  //   if (result.code === 0){
  //     const shopGoods = result.data
  //     commit(RECEIVE_SHOP_GOODS,shopGoods)
  //   }
  // },
  // // 获取用户对该商家食品的评价信息
  // async getShopRatings({commit}){
  //   // 发送异步请求
  //   const result = await reqShopRatings()
  //   if (result.code === 0){
  //     const shopRatings = result.data
  //     commit(RECEIVE_SHOP_RATINGS,shopRatings)
  //   }
  // },
  async getShop({commit,state},id){
    // 如果指定id与原有商家的id不同，则不需要发请求
    if (id === state.shop.id) { 
      return
     }

    // 如果显示的是另一个商家，则清空原有数据
    if (state.shop.id){
      commit(RECEIVE_SHOP,{})
    }

    console.log('开始发请求getShop')
    // 发请求获取对应的商家数据
    const result = await reqShop(id)
    if (result.code === 0){
      const shop = result.data
      console.log('shop:',shop)
      commit(RECEIVE_SHOP,{shop})
    }

  },

  // 更新FoodCount的值
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd) { // 增加
      commit(INCREMENT_FOOD_COUNT, {food})
    } else { // 减少
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 清空购物车列表
  clearCart({commit}){
    commit(CLEAR_CART)
  }
}
const getters = {
  totalCount(state){
    return state.shopCart.reduce((preTotal,curFood) => {
      return preTotal + curFood.count
    },0)
  },
  totalPrice(state){
    return state.shopCart.reduce((preTotal,curFood) => {
      return preTotal + curFood.count*curFood.price
    },0)
  }
}

export default  {
  state,
  mutations,
  actions,
  getters
}