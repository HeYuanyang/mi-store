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
  export default {
    data() {
      return {
        // 广告图列表(模拟数据)！
        adItems: [],
        // 推荐商品列表(模拟数据)！
        recommendGoodsList: []
      }
    },
    created() {
      let loadingInstance = this.$loading.service({
        lock: true
      })
      this.$axios.all([getAdItems.call(this), getRecommendGoodsList.call(this)])
        .then(this.$axios.spread((res1, res2) => {
          this.adItems = res1.data
          this.recommendGoodsList = res2.data
          loadingInstance.close()
        })).catch(err => {
          loadingInstance.close()
        })

      // 获取"广告图列表"！
      function getAdItems() {
        return this.$axios.get('/goods/adItems')
      }
      // 获取"推荐商品列表"！
      function getRecommendGoodsList() {
        return this.$axios.get('/goods/recommendGoodsList')
      }
    }
  }

</script>

<style lang='scss'>


</style>
