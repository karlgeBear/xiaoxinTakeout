/* 
所有路由配置的数组
*/

import MSite from '@/pages/MSite/MSite.vue'
import Search from '@/pages/Search/Search.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Login from '@/pages/Login/Login.vue'
import Logout from '@/pages/Logout/logout.vue'
import Shop from '@/pages/Shop/Shop.vue'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '@/pages/Shop/ShopGoods/ShopInfo.vue'
import ShopRatings from '@/pages/Shop/ShopGoods/ShopRatings.vue'


export default [
  {
    path: '/msite',
    component:MSite,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    component:Search,
    meta: { requiresAuth: true }
  },
  {
    path: '/order',
    component:Order,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component:Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/logout',
    component:Logout
  },
  {
    path:'/shop/:id',
    component:Shop,
    props: true,  // 布尔模式 （将所有prams参数转化为标签属性传递给子路由组件）
    //props: route => ({id: route.params.id}), //函数模式 
    children: [
      {
        name:'goods',
        path: '/shop/goods',
        component:ShopGoods
      },
      {
        path: '/shop/ratings',
        component: ShopRatings
      },
      {
        path: '/shop/info',
        component:ShopInfo
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  },

  {
    path:'/',
    redirect: '/msite'
  }
]