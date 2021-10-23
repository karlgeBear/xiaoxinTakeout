/* 
请求n个接口请求函数的模块
*/

import ajax from './ajax'
//console.log(ajax)

// 1、根据经纬度获取位置详情
export const reqAddress = (longitude,latitude) => ajax(`/position/${latitude},${longitude}`)

// 2、获取食品分类列表
export const reqCategorys = () => ajax('/index_category')

// 3、根据经纬度获取商铺列表
export const reqShops = ({longitude,latitude}) => ajax('/shops',{params: {longitude,latitude}})

// 4、根据经纬度和关键字搜索商铺列表

// 5、获取图形验证码

// 6、用户名密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax({
  method: 'POST',
  url: '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})

// 7、发送短信验证码
export const reSendCode = (phone) => ajax({
  method: 'GET',
  url: '/sendcode',
  params: { phone }
})

// 8、手机号验证码登陆(登入成功则把手机号存入数据库，把验证码删除)
export const reqSmsLogin = (phone, code) => ajax({
  method: 'POST',
  url: '/login_sms',
  data: {
    phone,
    code
  }
})

// 9、根据会话获取用户信息（）
/* 
自动登陆的请求
*/
export const reqAutoLogin = (token) => ajax({
  url: '/auto_login',
  headers: { authorization: token }
})

// 10. 获取mock提供的数据
    //获取商家信息
export const reqShopInfo = () => ajax('/info')
    //获取商家菜单列表
export const reqShopGoods = () => ajax('/goods')
    //获取用户评价信息
export const reqShopRatings = () => ajax('/ratings')

// ajax('/info').then((response) => {
//   console.log(response)
// })