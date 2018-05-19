/**
 * 用户相关的业务逻辑
 */

const {
  query
} = require('../util/db')

const userTable = 'user_tb'

// 校验用户注册信息
const validateRegist = (userInfo) => {
  let result = {
    success: false,
    message: ''
  }

  if (!userInfo.username) {
    result.message = '用户名不能为空'
  } else if (!userInfo.password) {
    result.message = '密码不能为空'
  } else {
    result.success = true
  }

  return result
}

// 校验是否存在用户
const isExistOne = async (username) => {
  let sqlShell = `
    SELECT * FROM ${userTable} WHERE username='${username}'
  `
  let result = await query(sqlShell)

  if (Array.isArray(result) && result.length > 0) {
    return true
  }
  return false
}

// 创建用户
const createUser = async (userInfo) => {
  let {
    username,
    password
  } = userInfo
  let createResult = {
    success: false,
    message: ''
  }
  let sqlShell = `
    INSERT INTO ${userTable} SET username='${username}', password='${password}'
  `
  let result = await query(sqlShell)

  if (result && result.insertId * 1 > 0) {
    createResult.success = true
  } else {
    createResult.message = '用户创建失败'
  }

  return createResult
}

// 校验用户登录信息
const validateLogin = (userInfo) => {
  let result = {
    success: false,
    message: ''
  }

  if (!userInfo.username) {
    result.message = '用户名不能为空'
  } else if (!userInfo.password) {
    result.message = '密码不能为空'
  } else {
    result.success = true
  }

  return result
}

// 校验用户信息
const checkUserInfo = async (userInfo) => {
  let {
    username,
    password
  } = userInfo
  let checkResult = {
    success: false,
    message: ''
  }
  let sqlShell = `
    SELECT * FROM ${userTable} WHERE username='${username}'
  `
  let result = await query(sqlShell)

  if (Array.isArray(result) && result.length > 0) {
    if (result[0].password === password) {
      checkResult.success = true
      checkResult.result = result[0]
    } else {
      checkResult.message = '密码错误'
    }
  } else {
    checkResult.message = '用户不存在'
  }

  return checkResult
}

// 获取用户信息
const getUserInfo = (session) => {
  let result = {
    success: false,
    data: ''
  }

  if (session && session.isLogin && session.username) {
    result.success = true
    result.data = {
      userId: session.userId,
      username: session.username
    }
  }

  return result
}

module.exports = {
  validateRegist,
  isExistOne,
  createUser,
  validateLogin,
  checkUserInfo,
  getUserInfo
}
