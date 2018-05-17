<!-- 商品详情 -->
<template>
  <section class="mi-goods">
    <div class="mi-goods--preview">
      <img :src="goodsDetails.img">
    </div>
    <div class="mi-goods--details">
      <h4 class="mi-goods--name">{{ goodsDetails.name }}</h4>
      <p class="mi-goods--info">{{ goodsDetails.info }}</p>
      <span class="mi-goods--amount">{{ goodsDetails.amount }}元</span>
      <div class="mi-goods--area">
        <el-input-number size="medium" v-model="goodsBoughtNum" :min="1" @change="changeBoughtNum"></el-input-number>
        <span>合计：
          <em>{{ goodsBoughtTotal }}</em> 元</span>
        <div>
          <button type="button" class="el-button el-button--primary mi-button" @click="$router.push('/login')" v-if="!userId">去登录</button>
          <button type="button" class="el-button el-button--primary mi-button" @click="buyGoods" v-else>立即购买</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        // 商品详情(模拟数据)！
        goodsDetails: {},
        // 商品购买的数量
        goodsBoughtNum: 1
      }
    },
    computed: {
      // Vuex状态整合到计算属性
      ...mapState([
        // 用户ID
        'userId'
      ]),
      // 商品购买的合计金额
      goodsBoughtTotal() {
        return this.goodsDetails.amount * this.goodsBoughtNum
      }
    },
    methods: {
      // Vuex事件整合到方法中
      ...mapActions([
        // 添加到购物车
        'addShopCart'
      ]),
      // 商品购买数量的处理方法
      changeBoughtNum() {
        this.$nextTick(() => {
          if (!this.goodsBoughtNum) {
            this.goodsBoughtNum = 1
          }
        })
      },
      // "立即购买"事件
      buyGoods() {
        this.addShopCart(Object.assign({}, this.goodsDetails, {
          num: this.goodsBoughtNum
        }))
        this.$alert('购买成功！', '立即购买', {
          showClose: false,
          showCancelButton: false
        })
      }
    },
    created() {
      // 获取"商品详情"！
      let loadingInstance = this.$loading.service({
        lock: true
      })
      this.$axios.get('/goods/goodsDetails', {
        params: {
          goodsId: this.$route.params.goodsId
        }
      }).then(res => {
        this.goodsDetails = res.data
        this.goodsDetails.id = this.$route.params.goodsId // !!!
        loadingInstance.close()
      }).catch(err => {
        this.$alert('商品详情获取失败！', '获取失败', {
          showClose: false,
          showCancelButton: false
        }).then(() => {
          this.$router.back()
        })
      })
    }
  }

</script>

<style lang='scss'>


</style>
