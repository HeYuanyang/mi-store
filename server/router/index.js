const Router = require('koa-router')
const router = new Router()
const userRouter = require('./user')
const goodsRouter = require('./goods')

// 应用用户相关的路由配置
router.use('/user', userRouter.routes())

// 应用商品相关的路由配置
router.use('/goods', goodsRouter.routes())

// 404
router.all('/*', ctx => {
  ctx.body = '404'
})

module.exports = router
