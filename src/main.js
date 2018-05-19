// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' // 根组件
import router from './router' // 路由配置
import store from './store' // 状态管理

// ElementUI的相关配置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入Font Awesome图标库
import './assets/font-awesome/css/font-awesome.min.css'

// 引入axios插件
import axios from 'axios'
axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios

// 引入ElementUI的Loading插件
import {
  Loading
} from 'element-ui'
Vue.prototype.$loading = Loading

// 引入Cookies插件
import cookies from 'vue-cookies'
Vue.use(cookies)

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

// 路由跳转前的判断
router.beforeEach((to, from, next) => {
  // 是否登录
  let isLogin = vm.$store.state.userId
  if (isLogin) {
    if (to.name === 'Login' || to.name === 'Regist') {
      return next('/home')
    } else if (to.name === 'User' || to.name === 'ShopCart') {
      if (to.params.userId != vm.$store.state.userId) {
        return next('/home')
      }
    }
  } else {
    if (to.name === 'User' || to.name === 'ShopCart') {
      return next('/home')
    }
  }
  next()
})
