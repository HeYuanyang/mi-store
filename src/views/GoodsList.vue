<!-- 商品列表 -->
<template>
  <section class="mi-module">
    <div class="mi-module--menu">
      <div class="mi-menu--box">
        <h4 class="mi-menu--box-title">
          <i class="fa fa-filter"></i>
          <span>类型：</span>
        </h4>
        <div class="mi-menu--box-content">
          <a class="mi-menu--item" href="javascript:void(0);" v-for="(type, index) in goodsTypeList" :key="index" :class="{ active: index === totalType }"
            @click="selectGoodsType(index)">{{ type }}</a>
        </div>
      </div>
      <div class="mi-menu--box">
        <h4 class="mi-menu--box-title">
          <i class="fa fa-sort-amount-asc" v-show="totalSort === 'ASC'"></i>
          <i class="fa fa-sort-amount-desc" v-show="totalSort === 'DESC'"></i>
          <span>排序：</span>
        </h4>
        <div class="mi-menu--box-content">
          <a class="mi-menu--item" href="javascript:void(0);" :class="{ active: totalSort === 'ASC' }" @click="selectGoodsSort('ASC')">价格从低到高</a>
          <a class="mi-menu--item" href="javascript:void(0);" :class="{ active: totalSort === 'DESC' }" @click="selectGoodsSort('DESC')">价格从高到低</a>
        </div>
      </div>
    </div>
    <div class="mi-module--body">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(goods, index) in selectedGoodsList" :key="index">
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
        // 当前商品类型的下标
        totalType: 0,
        // 商品列表的排序类型(ASC/DESC)
        totalSort: 'ASC',
        // 全部商品列表(模拟数据)！
        totalGoodsList: []
      };
    },
    computed: {
      // 商品类型列表
      goodsTypeList() {
        return this.totalGoodsList.map(item => item.type)
      },
      // 当前选中的商品列表
      selectedGoodsList() {
        let goodsList = this.totalGoodsList[this.totalType] && this.totalGoodsList[this.totalType].goodsList
        if (this.totalSort === 'ASC' && goodsList) {
          return goodsList.sort((a, b) => a.amount > b.amount)
        } else if (this.totalSort === 'DESC' && goodsList) {
          return goodsList.sort((a, b) => a.amount < b.amount)
        }
      }
    },
    methods: {
      // 商品类型的选中事件
      selectGoodsType(index) {
        this.totalType = index
      },
      // 商品排序的选中事件
      selectGoodsSort(sort) {
        this.totalSort = sort
      }
    },
    created() {
      // 获取"全部商品列表"！
      let loadingInstance = this.$loading.service({
        lock: true
      })
      this.$axios.get('/goods/totalGoodsList').then(res => {
        this.totalGoodsList = res.data
        loadingInstance.close()
      }).catch(err => {
        loadingInstance.close()
      })
    }
  }

</script>

<style lang='scss'>


</style>
