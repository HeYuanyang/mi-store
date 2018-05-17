/**
 * 商品相关的路由配置
 */

const Router = require('koa-router')
const goodsRouter = new Router()
const goodsController = require('../controller/goods')

// 广告图列表
goodsRouter.get('/adItems', goodsController.getAdItems)

// 推荐商品列表
goodsRouter.get('/recommendGoodsList', goodsController.getRecommendGoodsList)

// 全部商品列表
goodsRouter.get('/totalGoodsList', goodsController.getTotalGoodsList)

// 搜索到的商品列表
goodsRouter.get('/searchGoodsList', goodsController.getSearchGoodsList)

// 商品详情
goodsRouter.get('/goodsDetails', goodsController.getGoodsDetails)

module.exports = goodsRouter
