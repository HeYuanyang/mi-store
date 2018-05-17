const Mock = require('mockjs')

// 商品相关的模拟数据
module.exports = {
  // 广告图列表
  adItems: [
    {
      url: 'https://www.mi.com/migaminglaptop/',
      img: '/static/xmad/xmad_15233543731007_tMnpH.jpg'
    },
    {
      url: 'https://item.mi.com/product/6222.html',
      img: '/static/xmad/xmad_15241430560031_DLnhX.jpg'
    },
    {
      url: 'https://item.mi.com/product/10000064.html',
      img: '/static/xmad/xmad_15244917834341_JvOnB.jpg'
    },
    {
      url: 'https://item.mi.com/product/10000083.html',
      img: '/static/xmad/xmad_15244920669748_uFleh.jpg'
    },
    {
      url: 'https://hd.mi.com/w/18/04101m/index.html?client_id=180100041086&masid=17409.0338',
      img: '/static/xmad/xmad_15245532590265_CTmKJ.jpg'
    }
  ],
  // 推荐商品列表
  recommendGoodsList: Mock.mock({
    'arr|5': [
      {
        'type': '@cword(2)',
        'goodsList|1-10': [
          {
            id: '@zip',
            img: 'https://i1.mifile.cn/a1/pms_1510019402.48089978!220x220.jpg',
            name: '@ctitle',
            info: '@cparagraph',
            amount: '@integer(100, 10000)'
          }
        ]
      }
    ]
  }).arr,
  // 全部商品列表
  totalGoodsList: Mock.mock({
    'arr|5-10': [
      {
        'type': '@cword(2)',
        'goodsList|1-10': [
          {
            id: '@zip',
            img: 'https://i1.mifile.cn/a1/pms_1510019402.48089978!220x220.jpg',
            name: '@ctitle',
            info: '@cparagraph',
            amount: '@integer(100, 10000)'
          }
        ]
      }
    ]
  }).arr,
  // 搜索到的商品列表
  searchGoodsList: Mock.mock({
    'arr|5-10': [
      {
        id: '@zip',
        img: 'https://i1.mifile.cn/a1/pms_1510019402.48089978!220x220.jpg',
        name: '@ctitle',
        info: '@cparagraph',
        amount: '@integer(100, 10000)'
      }
    ]
  }).arr,
  // 商品详情
  goodsDetails: Mock.mock({
    'obj': {
      id: '@zip',
      img: 'https://i8.mifile.cn/a1/pms_1524621084.0039673!560x560.jpg',
      name: '@ctitle',
      info: '@cparagraph',
      amount: '@integer(100, 10000)'
    }
  }).obj
}
