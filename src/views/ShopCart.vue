<!-- 购物车 -->
<template>
  <section class="mi-shop">
    <header class="mi-shop--head">
      <h3 class="mi-shop--title">购物车</h3>
    </header>
    <div class="mi-shop--body">
      <table class="mi-shop--table">
        <thead>
          <tr>
            <th>商品</th>
            <th>价格</th>
            <th>数量</th>
            <th>合计</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(goods, index) in boughtGoodsList" :key="index">
            <td>
              <img class="mi-shop--img" :src="goods.img" @click="$router.push('/goods-item/' + goods.id)"> {{ goods.name }}
            </td>
            <td>￥{{ goods.amount }}</td>
            <td>
              <el-input-number size="small" v-model="goods.num" :min="1" @change="changeGoodsNum(index)"></el-input-number>
            </td>
            <td>
              <b>￥{{ goods.amount * goods.num }}</b>
            </td>
            <td>
              <a class="fa fa-trash" href="javascript:void(0);" @click="deleteGoods(index)"></a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <span>总合计：</span>
              <b>￥{{ boughtGoodsTotal }}</b>
              <el-button size="medium" class="el-button el-button--primary mi-button" :disabled="!boughtGoodsList.length" @click="buyGoodsList">立即购买</el-button>
            </td>
          </tr>
        </tfoot>
      </table>
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
      return {}
    },
    computed: {
      // Vuex状态整合到计算属性
      ...mapState([
        // 已购商品列表
        'boughtGoodsList'
      ]),
      // 已购商品的总合计
      boughtGoodsTotal() {
        let total = 0
        this.boughtGoodsList.forEach(goods => {
          total += goods.amount * goods.num
        })
        return total
      }
    },
    methods: {
      // Vuex事件整合到方法中
      ...mapActions([
        // 添加到购物车
        'addShopCart',
        // 移除出购物车
        'removeShopCart',
        // 清空购物车
        'emptyShopCart'
      ]),
      // 商品购买数量的处理方法
      changeGoodsNum(index) {
        let currentGoods = this.boughtGoodsList[index]
        this.$nextTick(() => {
          if (!currentGoods.num) {
            currentGoods.num = 1
          }
          this.addShopCart(currentGoods)
        })
      },
      // 删除已购商品
      deleteGoods(index) {
        let currentGoods = this.boughtGoodsList[index]
        this.$confirm('是否删除 <b class="orange">“' + currentGoods.name + '”</b>', '是否删除', {
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.removeShopCart(currentGoods)
        })
      },
      // 购买所有的已购商品
      buyGoodsList() {
        // 购买事件(后台交互)！
        this.$alert('购买成功！', '提示信息', {
          showClose: false,
          showCancelButton: false
        }).then(() => {
          this.emptyShopCart()
          this.$router.push('/home')
        })
      }
    }
  }

</script>

<style lang='scss'>


</style>
