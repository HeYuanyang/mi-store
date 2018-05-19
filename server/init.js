/**
 * 项目初始化脚本
 */

require('colors')
const path = require('path')
const {
  URL
} = require('url')
const {
  query
} = require('./util/db')
const getSql = require('./util/get-sql')
const request = require('request')
const cheerio = require('cheerio')

// 初始化数据库
const sqlShellMap = getSql()
const sqlShellList = Object.values(sqlShellMap).reduce((arr, item) => {
  return arr.concat(item)
}, []).filter((item) => {
  return item
})
const initSqlTables = async (sqlShellList) => {
  console.log('===============', '数据库初始化开始', '===============')
  for (let i = 0; i < sqlShellList.length; i++) {
    let shell = sqlShellList[i]
    console.log(('第' + (i + 1) + '条' + 'sql脚本执行开始').blue)
    await query(shell).then((data) => {
      console.log(('第' + (i + 1) + '条' + 'sql脚本执行结束').green)
    }).catch((err) => {
      console.log(err.sqlMessage)
      console.log(('第' + (i + 1) + '条' + 'sql脚本执行失败').red)
    })
  }
  console.log('===============', '数据库初始化结束', '===============')
}

// 爬虫相关的网站参数
const miStoreUrl = 'https://www.mi.com/'
const miStoreListUrl = 'https://m.mi.com/category'
const miStoreListPost = 'https://m.mi.com/v1/home/category_v2'
const miStoreListForm = {
  'client_id': '180100031051',
  'channel_id': '17409.0242',
  'webp': '1'
}
const miStoreSublistPost = 'https://m.mi.com/v1/home/commodityList'
const miStoreSublistForm = {
  'client_id': '180100031051',
  'channel_id': '17409.0242',
  'webp': '1',
  'category_id': '',
  'page_index': '1',
  'page_size': '20'
}
const miStoreItemPost = 'https://m.mi.com/v1/product/productView2_new'
const miStoreItemForm = {
  'client_id': '180100031051',
  'channel_id': '17409.0242',
  'webp': '1',
  'commodity_id': '',
  'width': '720'
}
const miStoreRecommendPost = 'https://m.mi.com/v1/home/page'
const miStoreRecommendForm = {
  'client_id': '180100031051',
  'channel_id': '17409.0242',
  'webp': '1',
  'page_type': 'home'
}
// const adImgDir = path.join(__dirname, '/static/ad-img')
// const goodsImgDir = path.join(__dirname, '/static/goods-img')

// 爬取“小米商城”
const adTable = 'ad_tb'
const goodsTable = 'goods_tb'
const captureMiStore = async (adTable, goodsTable) => {
  // 爬取广告图
  await captureMiStoreAd(adTable)

  // 爬取网站商品
  await captureMiStoreGoods(goodsTable)
}

// 爬取广告图
const captureMiStoreAd = async (adTable) => {
  return new Promise((resolve, reject) => {
    console.log('===============', '广告图爬取开始', '===============')
    request(miStoreUrl, async (err, res, body) => {
      if (err) {
        console.log('===============', '广告图爬取失败', '===============')
        reject(err)
      } else {
        // 广告图列表
        let adItems = []
        let $ = cheerio.load(body)
        let $xmSlideList = $('.home-hero-slider .xm-slider .slide')
        $xmSlideList.each((index, xmSlide) => {
          let $xmSlide = $(xmSlide)
          let xmSlideUrl = $xmSlide.find('a').attr('href')
          let xmSlideImg = $xmSlide.data('bg-set') ?
            JSON.parse($xmSlide.data('bg-set').replace(/\'/g, '"')).img : $xmSlide.find('img').attr('src')
          let xmSlideId = /(\d{5,})/.test(xmSlideImg) ?
            RegExp.$1 : Math.random().toString().substr(2, 10)
          adItems.push({
            id: Number(xmSlideId),
            url: xmSlideUrl,
            img: xmSlideImg
          })
        })

        console.log('!!!广告表清空开始!!!'.blue)
        await query(`DELETE FROM ${adTable}`)
          .then((data) => {
            console.log('!!!广告表清空结束!!!'.green)
          }).catch((err) => {
            console.log(err.sqlMessage)
            console.log('!!!广告表清空失败!!!'.red)
          })

        for (let i = 0; i < adItems.length; i++) {
          let item = adItems[i]
          console.log(('第' + (i + 1) + '条' + '广告图插入开始').blue)
          await query(`
            INSERT INTO ${adTable}
            SET id=${item.id}, url="${item.url}", img="${item.img}"
          `).then((data) => {
            console.log(('第' + (i + 1) + '条' + '广告图插入结束').green)
          }).catch((err) => {
            console.log(err.sqlMessage)
            console.log(('第' + (i + 1) + '条' + '广告图插入失败').red)
          })
        }

        console.log('===============', '广告图爬取结束', '===============')
        resolve()
      }
    })
  })
}

// 爬取网站商品
const captureMiStoreGoods = async (goodsTable) => {
  return new Promise((resolve, reject) => {
    console.log('===============', '网站商品爬取开始', '===============')
    request.post(miStoreListPost, {
      headers: {
        'Referer': miStoreListUrl
      },
      form: miStoreListForm
    }, async (err, res, body) => {
      if (err) {
        console.log('===============', '网站商品爬取失败', '===============')
        reject(err)
      } else {
        // 全部商品列表
        let totalGoodsList = []
        let result = JSON.parse(body)
        if (result.code === 0) {
          for (let i = 0; i < result.data.length; i++) {
            for (let j = 0; j < result.data[i].category_list.length; j++) {
              if (result.data[i].category_list[j]['view_type'] === 'category_group') {
                for (let k = 0; k < result.data[i].category_list[j].body.items.length; k++) {
                  let categoryItem = result.data[i].category_list[j].body.items[k]
                  if (categoryItem.action.type === 'cate') {
                    let goodsList = await getGoodsList({
                      id: categoryItem.action.path,
                      type: categoryItem.category_name
                    })
                    goodsList && goodsList.length && totalGoodsList.concat(goodsList)
                  } else if (categoryItem.action.type === 'product') {
                    let goodsItem = await getGoodsItem({
                      id: Number(categoryItem.action.path),
                      type: categoryItem.category_name
                    })
                    goodsItem && totalGoodsList.push(goodsItem)
                  }
                }
              }
            }
          }
        }

        // 推荐商品列表
        let recommendGoodsList = await getRecommendGoodsList()
        for (let i = 0; i < totalGoodsList.length; i++) {
          for (let j = 0; j < recommendGoodsList.length; j++) {
            if (totalGoodsList[i].id === recommendGoodsList[j].id) {
              totalGoodsList[i].isRecommend = 1
              recommendGoodsList.splice(j, 1)
              break
            }
          }
          if (!recommendGoodsList.length) break
        }

        console.log('!!!商品表清空开始!!!'.blue)
        await query(`DELETE FROM ${goodsTable}`)
          .then((data) => {
            console.log('!!!商品表清空结束!!!'.green)
          }).catch((err) => {
            console.log(err.sqlMessage)
            console.log('!!!商品表清空失败!!!'.red)
          })

        for (let i = 0; i < totalGoodsList.length; i++) {
          let item = totalGoodsList[i]
          console.log(('第' + (i + 1) + '条' + '商品插入开始').blue)
          await query(`
            INSERT INTO ${goodsTable}
            SET id=${item.id}, type="${item.type}", img="${item.img}", name="${item.name}", info="${item.info}", amount=${item.amount}, is_recommend=${item.isRecommend}
          `).then((data) => {
            console.log(('第' + (i + 1) + '条' + '商品插入结束').green)
          }).catch((err) => {
            console.log(err.sqlMessage)
            console.log(('第' + (i + 1) + '条' + '商品插入失败').red)
          })
        }

        console.log('===============', '网站商品爬取结束', '===============')
        resolve()
      }
    })
  })
}

// 获取商品列表
const getGoodsList = async (options) => {
  return new Promise((resolve, reject) => {
    request.post(miStoreSublistPost, {
      headers: {
        'Referer': miStoreListUrl
      },
      form: Object.assign({}, miStoreSublistForm, {
        'category_id': options.id
      })
    }, async (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        let result = JSON.parse(body)
        if (result.code === 0) {
          let goodsList = []
          for (let i = 0; i < result.data.list.length; i++) {
            let goodsItem = await getGoodsItem(Object.assign({}, options, {
              id: Number(result.data.list[i].product_id)
            }))
            goodsItem && goodsList.push(goodsItem)
          }

          resolve(goodsList)
          return
        }

        resolve()
      }
    })
  })
}

// 获取推荐商品列表
const getRecommendGoodsList = async () => {
  return new Promise((resolve, reject) => {
    request.post(miStoreRecommendPost, {
      headers: {
        'Referer': miStoreListUrl
      },
      form: miStoreRecommendForm
    }, async (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        let result = JSON.parse(body)
        if (result.code === 0) {
          let goodsList = []
          for (let i = 0; i < result.data.data.sections.length; i++) {
            if (/^list_(one|two)_/.test(result.data.data.sections[i].view_type)) {
              for (let j = 0; j < result.data.data.sections[i].body.items.length; j++) {
                let sectionItem = result.data.data.sections[i].body.items[j]
                if (sectionItem['product_id']) {
                  goodsList.push({
                    id: Number(sectionItem['product_id'])
                  })
                }
              }
            }
          }

          resolve(goodsList)
          return
        }

        resolve()
      }
    })
  })
}

// 获取商品详情
const getGoodsItem = async (options) => {
  return new Promise((resolve, reject) => {
    request.post(miStoreItemPost, {
      headers: {
        'Referer': miStoreListUrl
      },
      form: Object.assign({}, miStoreItemForm, {
        'commodity_id': options.id
      })
    }, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        let result = JSON.parse(body)
        if (result.code === 0) {
          let img = result.data.goods_info[0].img_url
          let name = result.data.product_info.name.trim()
          let info = result.data.product_info.product_desc.replace(/<[^>]*>/g, '').trim()
          info = info || name
          let amount = parseFloat(result.data.goods_info[0].price)
          let isRecommend = 0
          if (img && name && info && amount) {
            console.log('爬取到：' + name.blue)
            resolve(Object.assign({}, options, {
              img,
              name,
              info,
              amount,
              isRecommend
            }))
            return
          }
        }

        resolve()
      }
    })
  })
}

(async () => {
  // 初始化数据库
  await initSqlTables(sqlShellList)

  // 爬取“小米商城”
  await captureMiStore(adTable, goodsTable)

  // 退出终端
  process.exit()
})()
