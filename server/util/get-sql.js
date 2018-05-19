const path = require('path')
const fs = require('fs')

const root = path.join(__dirname, '../') // 根目录
const sqlDir = path.join(root, 'sql') // sql目录

// 遍历目录
const walkDir = (dir) => {
  let fileArr = fs.readdirSync(dir)
  return fileArr.map((file) => {
    return {
      file,
      path: path.join(dir, file)
    }
  })
}

// 获取sql文件的脚本内容
const getSql = () => {
  let sqlFileArr = walkDir(sqlDir)
  let sqlContentMap = {}

  sqlFileArr.forEach((sqlFile) => {
    let key = sqlFile.file.replace(/\..*$/, '')
    let sqlShell = fs.readFileSync(sqlFile.path, 'binary')
    let sqlShellList = sqlShell ? sqlShell.split(';').map((shell) => {
      return shell.trim().replace(/(\r\n)|(\n)/mg, ' ')
    }) : []
    sqlContentMap[key] = sqlShellList
  })

  return sqlContentMap
}

module.exports = getSql
