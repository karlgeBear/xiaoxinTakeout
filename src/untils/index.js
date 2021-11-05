/* 
包含一些工具函数的模块
*/
import Vue from 'vue'

//保存指定商家的购物车数据到sessionStorage
//shopId_key: {foodId1: count1, foodId2: count2}
export default function saveShopCart(shopCartId,shopCart) {
  console.log('shopCart:',shopCart)
  const shopCartCount = shopCart.reduce((pre,food) => { // 累加生成一个对象
    pre[food.id] = food.count  
    return pre
  },{})
  console.log('shopCartCount:',shopCartCount)
  //保存到sessionStorage
  sessionStorage.setItem(shopCartId + '_key', JSON.stringify(shopCartCount))

}

/* 
读取sessionStorage中的cartCounts, 生成并返回一个cartFoods 
shopId_key: {foodId1: count1, foodId2: count2}
*/
export function getShopCart(shop) {
  const shopCarts = []
  // 读取sessionStorage中的shopCart中的count
  const shopCartCount = JSON.parse(sessionStorage.getItem(shop.id + '_key')) || {}
  console.log('shopCartCount:',shopCartCount)
  // 遍历查出所有需要指定count的food
  shop.goods.forEach(good => {
    good.foods.forEach((food) => {
      // 取出food中shopCartCount对应的count
      const count = shopCartCount[food.id]
      if (count > 0){
        Vue.set(food,'count',count)
        shopCarts.push(food)
      }
    })
  })
  console.log('shopCarts1:',shopCarts)
  return shopCarts
}