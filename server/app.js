const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./router')

// 请求解析
app.use(bodyParser())

// 路由解析
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
