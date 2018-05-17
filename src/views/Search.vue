<!-- 搜索 -->
<template>
  <section class="mi-module">
    <div class="mi-module--tip">关键词
      <b>“{{ $route.params.keyword }}”</b> 的搜索结果：</div>
    <div class="mi-module--body">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(goods, index) in searchGoodsList" :key="index">
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
</template>

<script>
  export default {
    data() {
      return {
        // 搜索到的商品列表(模拟数据)！
        searchGoodsList: []
      }
    },
    created() {
      // 获取"搜索到的商品列表"！
      let loadingInstance = this.$loading.service({
        lock: true
      })
      this.$axios.get('/goods/searchGoodsList', {
        params: {
          keyword: this.$route.params.keyword
        }
      }).then(res => {
        this.searchGoodsList = res.data
        loadingInstance.close()
      }).catch(err => {
        loadingInstance.close()
      })
    }
  }

</script>

<style lang='scss'>


</style>
