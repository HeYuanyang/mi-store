<!-- 首页 -->
<template>
  <div>
    <!-- 走马灯 -->
    <el-carousel class="mi-carousel" height="400px">
      <el-carousel-item class="mi-carousel--item" v-for="(ad, index) in adItems" :key="index">
        <a class="mi-carousel--img" :href="ad.url" target="_blank" :style="{ backgroundImage: 'url(' + ad.img + ')' }"></a>
      </el-carousel-item>
    </el-carousel>
    <!-- 手机 -->
    <!-- 家电 -->
    <!-- 智能 -->
    <!-- 搭配 -->
    <!-- 配件 -->
    <!-- 周边 -->
    <section class="mi-module" v-for="(item, index) in recommendGoodsList" :key="index">
      <header class="mi-module--head">
        <h3 class="mi-module--title">{{ item.type }}</h3>
      </header>
      <div class="mi-module--body">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(goods, index) in item.goodsList" :key="index">
            <el-card class="mi-module--item" shadow="hover">
              <img class="mi-item--img" :src="goods.img" @click="$router.push('/goods-item/' + goods.id)">
              <div class="mi-item--content">
                <h4>{{ goods.name }}</h4>
                <p class="mi-item--info" v-if="goods.info">{{ goods.info }}</p>
                <em class="pull-right">{{ goods.amount }}元</em>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    computed: {
      // Vuex状态整合到计算属性
      ...mapState([
        // 广告图列表
        'adItems',
        // 全部商品列表
        'totalGoodsList'
      ]),
      // 推荐商品列表
      recommendGoodsList() {
        let goodsList = this.totalGoodsList.filter(item => {
          return item.isRecommend === 1
        })
        return this.typeGoodsList(goodsList)
      }
    },
    methods: {
      // 以商品类型为主的商品列表
      typeGoodsList(goodsList) {
        let typeGoodsList = []
        for (let i = 0; i < goodsList.length; i++) {
          let flag = false
          for (let j = 0; j < typeGoodsList.length; j++) {
            if (goodsList[i].type === typeGoodsList[j].type) {
              flag = true
              typeGoodsList[j].goodsList.push(goodsList[i])
              break
            }
          }

          if (!flag) {
            typeGoodsList.push({
              type: goodsList[i].type,
              goodsList: [goodsList[i]]
            })
          }
        }

        return typeGoodsList
      }
    }
  }

</script>

<style lang='scss'>


</style>
