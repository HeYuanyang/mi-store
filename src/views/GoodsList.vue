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
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        // 当前商品类型的下标
        totalType: 0,
        // 商品列表的排序类型(ASC/DESC)
        totalSort: 'ASC'
      };
    },
    computed: {
      ...mapState({
        // 全部商品列表(处理前的数据)
        preTotalGoodsList: 'totalGoodsList'
      }),
      // 全部商品列表(处理后的数据)
      totalGoodsList() {
        return this.typeGoodsList(this.preTotalGoodsList)
      },
      // 商品类型列表
      goodsTypeList() {
        return this.totalGoodsList.map(item => item.type)
      },
      // 当前选中的商品列表
      selectedGoodsList() {
        let goodsList = this.totalGoodsList[this.totalType] && this.totalGoodsList[this.totalType].goodsList
        if (this.totalSort === 'ASC' && goodsList) {
          return this.sortGoodsList(goodsList, this.totalSort)
        } else if (this.totalSort === 'DESC' && goodsList) {
          return this.sortGoodsList(goodsList, this.totalSort)
        }
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
      },
      // 商品类型的选中事件
      selectGoodsType(index) {
        this.totalType = index
      },
      // 商品排序的选中事件
      selectGoodsSort(sort) {
        this.totalSort = sort
      },
      // 商品列表的排序方法
      sortGoodsList(goodsList, sort) {
        let minIndex
        for (let i = 0; i < goodsList.length - 1; i++) {
          minIndex = i
          for (let j = i; j < goodsList.length; j++) {
            if (goodsList[minIndex].amount > goodsList[j].amount) {
              minIndex = j
            }
          }
          if (i !== minIndex) {
            let temp = goodsList[i]
            goodsList[i] = goodsList[minIndex]
            goodsList[minIndex] = temp
          }
        }
        sort === 'DESC' && goodsList.reverse()
        return goodsList
      }
    }
  }

</script>

<style lang='scss'>


</style>
