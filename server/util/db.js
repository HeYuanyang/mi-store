const mysql = require('mysql')
const config = require('../config')

// 创建数据池
const pool = mysql.createPool(config.database)

// 操作数据库
const query = (sql) => {
  return new Promise((resolve, reject) => {
    // 在数据池中进行会话操作
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, (error, results, fields) => {
          if (error) {
            reject(error)
          } else {
            resolve(results)
            connection.release() // 结束会话
          }
        })
      }
    })
  })
}

module.exports = {
  query
}
