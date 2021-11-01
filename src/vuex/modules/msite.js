/* 
 对应msite功能模块的配置对象
*/
import {  //导入异步请求
  reqAddress,
  reqCategorys,
  reqShops
} from '../../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from '../mutations-type.js'

const state = {  //29.680861,115.992358
  latitude: 29.680861, // 纬度
  longitude: 115.992358, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops:[]
}
const mutations = {
  [RECEIVE_ADDRESS] (state,address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state,shops) {
    state.shops = shops
  }
}

const actions = {
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
    }
}
const getters = {}

export default  {
  state,
  mutations,
  actions,
  getters
}