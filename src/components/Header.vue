<!-- 头部 -->
<template>
  <header id="header">
    <router-link class="header-logo" to="/home">小米商城</router-link>
    <nav class="header-nav">
      <router-link class="nav-item" to="/home">首页</router-link>
      <router-link class="nav-item" to="/goods-list">商品</router-link>
    </nav>
    <div class="header-options">
      <template v-if="!userId">
        <router-link class="options-item" to="/regist">注册</router-link>
        <router-link class="options-item" to="/login">登录</router-link>
      </template>
      <template v-else>
        <router-link class="options-item" :to="'/shop-cart/' + userId">
          <i class="fa fa-shopping-cart"></i>
          <span>购物车</span>
          <span class="options-point" v-show="boughtGoodsNum">{{ boughtGoodsNum }}</span>
        </router-link>
        <router-link class="options-item" :to="'/user/' + userId">
          <i class="fa fa-user"></i>
          <span>{{ userName }}</span>
        </router-link>
        <a class="options-item" href="javascript:void(0);" @click="loginOut">注销</a>
      </template>
    </div>
    <div class="header-input">
      <el-input v-model="searchKeyword" placeholder="请输入搜索关键词" @keyup.enter.native="searchGoods">
        <el-button size="medium" slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
      </el-input>
    </div>
  </header>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        // 搜索关键词
        searchKeyword: ''
      };
    },
    computed: {
      // Vuex状态整合到计算属性
      ...mapState([
        // 用户ID
        'userId',
        // 用户名
        'userName',
        // 已购商品列表
        'boughtGoodsList'
      ]),
      // 已购商品数量
      boughtGoodsNum() {
        return this.boughtGoodsList.length;
      }
    },
    methods: {
      // Vuex事件整合到方法中
      ...mapActions([
        // 设置用户ID
        'setUserId',
        // 设置用户名
        'setUserName'
      ]),
      // 搜索商品的方法
      searchGoods() {
        let keyword = this.searchKeyword
        if (keyword) {
          this.searchKeyword = ''
          this.$router.push('/search/' + keyword)
          this.$nextTick(() => {
            location.reload()
          })
        }
      },
      // 注销事件
      loginOut() {
        this.$axios.post('/user/exit')
        this.setUserId('')
        this.setUserName('')
        this.$router.push('/home')
      }
    }
  }

</script>

<style lang='scss'>

</style>
