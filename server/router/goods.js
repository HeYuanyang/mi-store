/**
 * 商品相关的路由配置
 */

const Router = require('koa-router')
const goodsRouter = new Router()
const goodsController = require('../controller/goods')

// 广告图列表
goodsRouter.get('/adItems', goodsController.getAdItems)

// 全部商品列表
goodsRouter.get('/totalGoodsList', goodsController.getTotalGoodsList)

// 搜索商品列表
goodsRouter.get('/searchGoodsList', goodsController.getSearchGoodsList)

module.exports = goodsRouter
