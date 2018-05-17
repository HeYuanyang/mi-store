/**
 * 商品相关的控制器
 */

// 获取广告图列表
const getAdItems = (ctx) => {
  ctx.body = '广告图列表'
}

// 获取推荐商品列表
const getRecommendGoodsList = (ctx) => {
  ctx.body = '推荐商品列表'
}

// 获取全部商品列表
const getTotalGoodsList = (ctx) => {
  ctx.body = '全部商品列表'
}

// 获取搜索到的商品列表
const getSearchGoodsList = (ctx) => {
  ctx.body = '搜索到的商品列表'
}

// 获取商品详情
const getGoodsDetails = (ctx) => {
  ctx.body = '商品详情'
}

module.exports = {
  getAdItems,
  getRecommendGoodsList,
  getTotalGoodsList,
  getSearchGoodsList,
  getGoodsDetails
}
