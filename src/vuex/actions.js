/* 
一个包含n个用于间接更新状态数据的方法的对象
mutation方法可以包含异步操作和逻辑处理代码
*/

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reSendCode
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutations-type.js'

export default {
  // 获取地址的name
  async getAddress({commit,state}) {
    const {longitude,latitude} = state
    //发异步请求
    const result = await reqAddress(longitude,latitude)
    //console.log(result)
    // 请求成功，则提交给mutations
    if (result.code == 0){
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
    if (result.code == 0){
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
    if (result.code == 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },

  //获取图形验证码
  //reSendCode()
}