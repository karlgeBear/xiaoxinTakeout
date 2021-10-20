/* 
包含n个数据属性的对象
*/

export default { //29.680861,115.992358
  latitude: 29.680861, // 纬度
  longitude: 115.992358, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
  token:localStorage.getItem('token_key'),
  user:{} //登录用户信息对象
}