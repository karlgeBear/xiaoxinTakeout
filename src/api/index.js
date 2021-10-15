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

// 5、获取一次性验证码
export const reSendCode = (phone) => ajax({
  method: 'GET',
  url: BASE + '/sendcode',
  params: { phone }
})

// 6、用户名密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax({
  method: 'POST',
  url: BASE + '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})

// 7、发送短信验证码
export const reqSmsLogin = (phone, code) => ajax({
  method: 'POST',
  url: BASE + '/login_sms',
  data: {
    phone,
    code
  }
})

// 8、手机号验证码登陆
// 9、根据会话获取用户信息