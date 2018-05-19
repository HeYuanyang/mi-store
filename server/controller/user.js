/**
 * 用户相关的控制器
 */

const userService = require('../service/user')

// 登录事件
const login = async (ctx) => {
  let {
    username, // 用户名
    password // 密码
  } = ctx.request.body
  let userInfo = {
    username,
    password
  }
  let result = {
    code: -1,
    msg: '登录成功'
  }

  // 校验用户登录信息
  let validateResult = userService.validateLogin(userInfo)
  if (validateResult.success === false) {
    result.msg = validateResult.message
    ctx.body = result
    return
  }

  // 校验用户信息
  let checkResult = await userService.checkUserInfo(userInfo)
  if (checkResult.success === false) {
    result.msg = checkResult.message
    ctx.body = result
    return
  }

  // 登录信息写入session
  ctx.session = {
    isLogin: true,
    userId: checkResult.result.id,
    username: checkResult.result.username
  }

  result.code = 1
  ctx.body = result
}

// 注册事件
const regist = async (ctx) => {
  let {
    username, // 用户名
    password // 密码
  } = ctx.request.body
  let userInfo = {
    username,
    password
  }
  let result = {
    code: -1,
    msg: '注册成功'
  }

  // 校验用户注册信息
  let validateResult = userService.validateRegist(userInfo)
  if (validateResult.success === false) {
    result.msg = validateResult.message
    ctx.body = result
    return
  }

  // 校验是否存在用户
  let existResult = await userService.isExistOne(userInfo.username)
  if (existResult === true) {
    result.msg = '该用户名已被注册'
    ctx.body = result
    return
  }

  // 创建用户
  let userResult = await userService.createUser(userInfo)
  if (userResult.success === false) {
    result.msg = userResult.message
    ctx.body = result
    return
  }

  result.code = 1
  ctx.body = result
}

// 注销事件
const exit = (ctx) => {
  let result = {
    code: 1,
    msg: '注销成功'
  }

  // 清空session
  ctx.session = {}

  ctx.body = result
}

// 获取用户信息
const getInfo = (ctx) => {
  let result = {
    code: -1,
    data: ''
  }

  // 获取用户信息
  let getResult = userService.getUserInfo(ctx.session)
  if (getResult.success === true) {
    result.code = 1
    result.data = getResult.data
  }

  ctx.body = result
}

module.exports = {
  login,
  regist,
  exit,
  getInfo
}
