/* 
所有路由配置的数组
*/

import MSite from '@/pages/MSite/MSite.vue'
import Search from '@/pages/Search/Search.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Login from '@/pages/Login/Login.vue'

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
    path:'/',
    redirect: '/msite'
  }
]