/**
 * 用户相关的路由配置
 */

const Router = require('koa-router')
const userRouter = new Router()
const userController = require('../controller/user')

// 登录请求
userRouter.post('/login', userController.login)

// 注册请求
userRouter.post('/regist', userController.regist)

// 用户信息
userRouter.get('/info', userController.getInfo)

module.exports = userRouter
