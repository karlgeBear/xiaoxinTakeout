/* 使用mockjs提供接口数据 */

import Mock from "mockjs";
import data from "./data.json"  // 得到的是js对象（内部已经将json解析为js对象）

// 定义mock接口
Mock.mock( '/api/info', {code: 0,data: data.info} )
Mock.mock( '/api/goods', {code: 0,data: data.goods} )
Mock.mock( '/api/ratings', {code: 0,data: data.ratings} )

// test export result
console.log('MockServe....')
