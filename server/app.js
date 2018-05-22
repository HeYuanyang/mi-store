const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const config = require('./config')
const router = require('./router')

const app = new Koa()

// session中间件
app.use(session({
  key: 'SESSION_ID',
  // 存储session信息的MySQL配置
  store: new MysqlSession(config.database),
  cookie: {
    path: '/',
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    overwrite: false
  }
}))

// 控制台日志
app.use(logger())

// 请求解析
app.use(bodyParser())

// 路由解析
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port)
