/**
 * 用户相关的控制器
 */

// 登录事件
const login = (ctx) => {
  ctx.body = 'post login'
}

// 注册事件
const regist = (ctx) => {
  ctx.body = 'post regist'
}

// 获取用户信息
const getInfo = (ctx) => {
  ctx.body = 'user info'
}

module.exports = {
  login,
  regist,
  getInfo
}
