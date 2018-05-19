/**
 * 商品相关的控制器
 */

const goodsService = require('../service/goods')

// 获取广告图列表
const getAdItems = async (ctx) => {
  let result = {
    code: -1,
    data: ''
  }

  // 获取广告图列表
  let getResult = await goodsService.getAdItems()
  if (getResult.success === true) {
    result.code = 1
    result.data = getResult.data
  }

  ctx.body = result
}

// 获取全部商品列表
const getTotalGoodsList = async (ctx) => {
  let result = {
    code: -1,
    data: ''
  }

  // 获取商品列表
  let getResult = await goodsService.getGoodsList()
  if (getResult.success === true) {
    result.code = 1
    result.data = getResult.data
  }

  ctx.body = result
}

// 获取搜索商品列表
const getSearchGoodsList = async (ctx) => {
  const {
    keyword
  } = ctx.query // 关键字
  let result = {
    code: -1,
    data: ''
  }

  // 获取商品列表
  let getResult = await goodsService.getGoodsList({
    keyword
  })
  if (getResult.success === true) {
    result.code = 1
    result.data = getResult.data
  }

  ctx.body = result
}

module.exports = {
  getAdItems,
  getTotalGoodsList,
  getSearchGoodsList
}
