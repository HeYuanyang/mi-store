import Vue from 'vue'
import Router from 'vue-router'

// 引入页面组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Regist from '@/views/Regist'
import GoodsList from '@/views/GoodsList'
import GoodsItem from '@/views/GoodsItem'
import Search from '@/views/Search'
import ShopCart from '@/views/ShopCart'
import User from '@/views/User'
import NotFound from '@/views/404'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'router-link-active',
  routes: [
    // 首页
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    // 登录
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 注册
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    // 商品列表
    {
      path: '/goods-list',
      name: 'GoodsList',
      component: GoodsList
    },
    // 商品详情
    {
      path: '/goods-item/:goodsId',
      name: 'GoodsItem',
      component: GoodsItem
    },
    // 搜索
    {
      path: '/search/:keyword',
      name: 'Search',
      component: Search
    },
    // 购物车
    {
      path: '/shop-cart/:userId',
      name: 'ShopCart',
      component: ShopCart
    },
    // 用户详情
    {
      path: '/user/:userId',
      name: 'User',
      component: User
    },
    // 404页面
    {
      path: '/*',
      component: NotFound
    }
  ]
})
