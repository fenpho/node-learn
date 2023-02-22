const login = (req, res, connection, responseData, result) => {
  let name = result.name // 用户名
  let password = result.password // 密码
  console.log(name)

  if (!name) {
    // 用户名为空
    responseData.code = 400
    responseData.message = '登录失败，用户名为空！'
    res.end(JSON.stringify(responseData))
    return
  } else if (!password) { // 密码为空
    responseData.code = 400
    responseData.message = '登录失败，密码为空！'
    res.end(JSON.stringify(responseData))
    return
  } else {
    // 查询 users 表
    // 查询的 SQL 语句
    let readSql = `SELECT * FROM users WHERE name = '${name}'`
    // 连接 SQL 并实施语句
    connection.connect()
    connection.query(readSql, (err, data) => {
      if (err) throw err
      console.log(data)

      if (!data?.length) {
        // 不存在用户
        responseData.code = 400
        responseData.message = '不存在该用户！'
        res.end(JSON.stringify(responseData))
        return;
      } else {
        // 存在用户
        console.log("\n存在该用户！");

        if (data[0].password === result.password) {
          // 密码正确
          responseData.code = 200
          responseData.message = '登录成功！'
          responseData.data = {
            id: data[0].id,
            name: data[0].name
          }
          res.end(JSON.stringify(responseData))
        } else {
          // 密码错误
          responseData.code = 400
          responseData.message = '密码错误！'
          res.end(JSON.stringify(responseData))
        }
      }
    })
  }
}

module.exports = login