/* 
最核心的管理对象store
*/

import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations, //总mutations，局部的在modules中
  actions,  // 总actions
  getters,
  modules:{
    msite,
    shop,
    user
  }
})

/* 
总state的结构:
{
  msite: {},
  user: {},
  shop: {},
}
*/