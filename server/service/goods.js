/**
 * 商品相关的业务逻辑
 */

const {
  query
} = require('../util/db')

const adTable = 'ad_tb'
const goodsTable = 'goods_tb'

// 获取广告图列表
const getAdItems = async () => {
  let getResult = {
    success: false,
    data: ''
  }
  let sqlShell = `
    SELECT id, url, img FROM ${adTable}
  `
  let result = await query(sqlShell)

  if (Array.isArray(result) && result.length > 0) {
    getResult.success = true
    getResult.data = result
  }

  return getResult
}

// 获取商品列表
const getGoodsList = async (options) => {
  let getResult = {
    success: false,
    data: ''
  }
  let sqlShell = `
    SELECT id, type, img, name, info, amount, is_recommend FROM ${goodsTable}
  `
  if (options && options.keyword) {
    sqlShell = `
      SELECT id, type, img, name, info, amount, is_recommend FROM ${goodsTable} WHERE name LIKE "%${options.keyword}%"
    `
  }
  let result = await query(sqlShell)

  if (Array.isArray(result) && result.length > 0) {
    getResult.success = true
    getResult.data = result.map((item) => {
      let isRecommend = item['is_recommend']
      delete item['is_recommend']
      item.isRecommend = isRecommend
      return item
    })
  }

  return getResult
}

module.exports = {
  getAdItems,
  getGoodsList
}
