/* 使用mockjs提供接口数据 */

import Mock from "mockjs";
import data from "./data.json"  // 得到的是js对象（内部已经将json解析为js对象）
import shops from "./shops.json" 

// 定义mock接口
Mock.mock( '/api/info', {code: 0,data: data.info} )
Mock.mock( '/api/goods', {code: 0,data: data.goods} )
Mock.mock( '/api/ratings', {code: 0,data: data.ratings} )

Mock.mock( /^\/api\/shop\/\d+$/, function(options) {  //option是一个对象：{url: "/api/shop/1", type: "GET", body: null}
  // 得到请求params参数 id
  const id = options.url.substring(10)
  // 找到对应的shop
  const shop = shops.find((shop) => shop.id == id)
  //console.log('/api/shop', options, shop || shops[0])  
  // 返回一个动态数据
  return Mock.mock({code: 0, data: shop || shops[0]})
  console.log('option:',options)
})


// test export result
console.log('MockServe....')
