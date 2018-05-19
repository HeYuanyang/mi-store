<template>
  <div id="app">
    <!-- 路由测试 -->
    <!-- <router-link to="/">首页</router-link>
    <router-link to="/login">登录</router-link>
    <router-link to="/regist">注册</router-link>
    <router-link to="/goods-list">商品列表</router-link>
    <router-link to="/goods-item/10000">商品详情</router-link>
    <router-link to="/search/关键字">搜索</router-link>
    <router-link to="/shop-cart/00001">购物车</router-link>
    <router-link to="/user/00001">用户详情</router-link> -->

    <!-- 容器 -->
    <el-container id="container">
      <!-- 头部 -->
      <!-- 默认值：height="60px" -->
      <el-header height="auto">
        <v-header></v-header>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view/>
      </el-main>
      <!-- 底部 -->
      <!-- 默认值：height="60px" -->
      <el-footer height="auto">
        <v-footer></v-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex'

  import vHeader from '@/components/Header' // 引入头部组件
  import vFooter from '@/components/Footer' // 引入底部组件

  export default {
    name: 'App',
    methods: {
      // Vuex事件整合到方法中
      ...mapActions([
        // 设置用户ID
        'setUserId',
        // 设置用户名
        'setUserName',
        // 设置广告图列表
        'setAdItems',
        // 设置全部商品列表
        'setTotalGoodsList',
        // 初始化购物车
        'initShopCart'
      ])
    },
    components: {
      vHeader,
      vFooter
    },
    created() {
      // 获取用户信息
      this.$axios.get('/user/info')
        .then((res) => {
          let result = res.data
          if (result.code > 0) {
            this.setUserId(result.data.userId)
            this.setUserName(result.data.username)

            // 获取购物车信息
            let goodsList = this.$cookies.get('__mi_store_shopcart_' + result.data.userId + '__')
            goodsList && this.initShopCart(JSON.parse(goodsList))
          }
          else {
            this.setUserId('')
            this.setUserName('')
          }
        })

      let loadingInstance = this.$loading.service({
        lock: true
      })
      this.$axios.all([getAdItems.call(this), getTotalGoodsList.call(this)])
        .then(this.$axios.spread((res1, res2) => {
          if (res1.data.code > 0) {
            this.setAdItems(res1.data.data)
          }
          if (res2.data.code > 0) {
            this.setTotalGoodsList(res2.data.data)
          }
          loadingInstance.close()
        })).catch(err => {
          loadingInstance.close()
        })

      // 获取"广告图列表"！
      function getAdItems() {
        return this.$axios.get('/goods/adItems')
      }
      // 获取"全部商品列表"！
      function getTotalGoodsList() {
        return this.$axios.get('/goods/totalGoodsList')
      }
    }
  }

</script>

<style lang="scss">
  // 全局样式
  @import "./assets/scss/base.scss";

</style>
