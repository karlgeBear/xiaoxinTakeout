/* 
所有路由配置的数组
*/

// 静态引入：打包时引入
// import MSite from '@/pages/MSite/MSite.vue'
// import Search from '@/pages/Search/Search.vue'
// import Order from '@/pages/Order/Order.vue'
// import Profile from '@/pages/Profile/Profile.vue'

/* 
  import动态引入：import(模块路径)
  结果：被引入的模块会被单独打包(代码分割：code split)
*/
// const MSite = () => import('@/pages/MSite/MSite.vue')
// const Search = () => import('@/pages/Search/Search.vue')
// const Order = () => import('@/pages/Order/Order.vue')
// const Profile = () => import('@/pages/Profile/Profile.vue')

import Login from '@/pages/Login/Login.vue'
import Logout from '@/pages/Logout/logout.vue'
import Shop from '@/pages/Shop/Shop.vue'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '@/pages/Shop/ShopGoods/ShopInfo.vue'
import ShopRatings from '@/pages/Shop/ShopGoods/ShopRatings.vue'


export default [
  {
    path: '/msite',
    component: () => import('@/pages/MSite/MSite.vue'),  //路由组件懒加载(减小首屏加载的js文件，显示更快)
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    component:() => import('@/pages/Search/Search.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/order',
    component:() => import('@/pages/Order/Order.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component:() => import('@/pages/Profile/Profile.vue'),
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
        path: 'goods',
        component:ShopGoods
      },
      {
        path: 'ratings',
        component: ShopRatings
      },
      {
        path: 'info',
        component:ShopInfo
      },
      {
        path: '',
        redirect: 'goods'
      }
    ]
  },

  {
    path:'/',
    redirect: '/msite'
  }
]