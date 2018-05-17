const Mock = require('mockjs')

// 用户相关的模拟数据
module.exports = {
  // 登录接口的模拟数据
  login: Mock.mock({
    'code': 1,
    'msg': '@csentence'
  }),
  // 注册接口的模拟数据
  regist: Mock.mock({
    'code': 1,
    'msg': '@csentence'
  }),
  // 用户信息的模拟数据
  info: Mock.mock({
    'id': '@id',
    'name': '@last'
  })
}
