const Router = require('koa-router')
const router = new Router()
const userRouter = require('./user')
const goodsRouter = require('./goods')

// 用户相关的路由配置
router.use('/api/user', userRouter.routes(), userRouter.allowedMethods())

// 商品相关的路由配置
router.use('/api/goods', goodsRouter.routes(), goodsRouter.allowedMethods())

// 404
router.all('/*', ctx => {
  ctx.body = '404 - Not Found'
})

module.exports = router
