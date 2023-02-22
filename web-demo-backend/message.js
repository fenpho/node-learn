const { getNowFormatDate } = require('./utils/index')

const message = (req, res, connection, responseData, result, pathName) => {
  if (pathName === '/getMessage') {
    // 新增的 SQL 语句及新增的字段信息
    let readSql = "SELECT * FROM messages"
    // 连接 SQL 并实施语句
    connection.connect()
    connection.query(readSql, (err, data) => {
      if (err) throw err
      console.log("\n查询成功！");

      responseData.code = 200
      responseData.message = ''
      responseData.data = data
      res.end(JSON.stringify(responseData))
    })
  } else if (pathName === '/sendMessage') {
    // 提交留言信息
    let userId = result.userId; // id
    let userName = result.userName; // 用户名
    let messageText = result.message; // 留言内容
    let time = getNowFormatDate(); // 时间

    if (!messageText) {
      // 留言内容为空！
      responseData.code = 400
      responseData.message = '留言失败，留言内容不能为空！'
      res.end(JSON.stringify(responseData))
      return
    } else if (!messageText.length > 120) {
      // 字数超过限制
      responseData.code = 400
      responseData.message = '留言失败，最大长度为120！'
      res.end(JSON.stringify(responseData))
      return
    } else {
      // 查询 messages 表
      // 新增的 SQL 语句及新增的字段信息
      let readSql = `INSERT INTO messages(message, user_id, user_name, time) VALUES(?, ?, ?, ?)`
      let addSqlParams = [messageText, userId, userName, time]
      // 连接 SQL 并实施语句
      connection.connect()
      connection.query(readSql, addSqlParams, (err, data) => {
        if (err) throw err
        console.log("\n留言成功！");

        responseData.code = 200
        responseData.message = '留言成功！'
        res.end(JSON.stringify(responseData))
      })
    }
  }
}

module.exports = message