import Vue from 'vue'
import Vuex from 'vuex'

// 引入Cookies插件
import cookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户ID
    userId: '',
    // 用户名
    userName: '',
    // 广告图列表
    adItems: [],
    // 全部商品列表
    totalGoodsList: [],
    // 已购商品列表
    boughtGoodsList: []
  },
  mutations: {
    // 设置用户ID
    setUserId(state, id) {
      state.userId = id
    },
    // 设置用户名
    setUserName(state, name) {
      state.userName = name
    },
    // 设置广告图列表
    setAdItems(state, adItems) {
      state.adItems = adItems
    },
    // 设置全部商品列表
    setTotalGoodsList(state, goodsList) {
      state.totalGoodsList = goodsList
    },
    // 添加已购商品
    addBoughtGoods(state, goods) {
      state.boughtGoodsList.push(goods)
    },
    // 替换已购商品
    replaceBoughtGoods(state, {
      goods,
      index
    }) {
      state.boughtGoodsList[index] = goods
    },
    // 移除已购商品
    removeBoughtGoods(state, index) {
      state.boughtGoodsList.splice(index, 1)
    },
    // 初始化已购商品列表
    initBoughtGoodsList(state, goodsList) {
      state.boughtGoodsList = goodsList
    },
    // 清空已购商品列表
    emptyBoughtGoodsList(state) {
      state.boughtGoodsList = []
    }
  },
  actions: {
    // 设置用户ID
    setUserId({
      commit
    }, id) {
      commit('setUserId', id)
    },
    // 设置用户名
    setUserName({
      commit
    }, name) {
      commit('setUserName', name)
    },
    // 设置广告图列表
    setAdItems({
      commit
    }, adItems) {
      commit('setAdItems', adItems)
    },
    // 设置全部商品列表
    setTotalGoodsList({
      commit
    }, goodsList) {
      commit('setTotalGoodsList', goodsList)
    },
    // 初始化购物车
    initShopCart({
      commit
    }, goodsList) {
      commit('initBoughtGoodsList', goodsList)
    },
    // 添加到购物车
    addShopCart({
      commit,
      state
    }, goods) {
      let index
      state.boughtGoodsList.forEach((boughtGoods, i) => {
        if (boughtGoods.id === goods.id) {
          index = i
        }
      })

      if (index === undefined) {
        commit('addBoughtGoods', goods)
      } else {
        commit('replaceBoughtGoods', {
          goods,
          index
        })
      }

      cookies.set('__mi_store_shopcart_' + state.userId + '__', JSON.stringify(state.boughtGoodsList))
    },
    // 移除出购物车
    removeShopCart({
      commit,
      state
    }, goods) {
      let index
      state.boughtGoodsList.forEach((boughtGoods, i) => {
        if (boughtGoods.id === goods.id) {
          index = i
        }
      })

      if (index !== undefined) {
        commit('removeBoughtGoods', index)
      }

      cookies.set('__mi_store_shopcart_' + state.userId + '__', JSON.stringify(state.boughtGoodsList))
    },
    // 清空购物车
    emptyShopCart({
      commit,
      state
    }) {
      commit('emptyBoughtGoodsList')

      cookies.set('__mi_store_shopcart_' + state.userId + '__', JSON.stringify(state.boughtGoodsList))
    }
  }
})
