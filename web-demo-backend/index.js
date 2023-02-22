const mysql = require('mysql2')
// const httpCode = require('./httpCode') 
const login = require('./login.js')
const message = require('./message.js')

const { getNowFormatDate } = require('./utils/index')

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'node-learn'
})

// 引入 http 模块
var http = require('http')

// 引入 url 模块
var url = require('url')

// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
// const qs = require('querystring');

// 用 http 模块创建服务
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
const port = 3000
const baseURL = '/api'
http.createServer(function (req, res) {
  // 设置 cors 跨域
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  // 设置 返回值类型
  res.setHeader('Content-Type', 'application/json') // json类型直接parse就能使用
  // res.setHeader('Content-Type', 'application/x-www-form-urlencoded') // 表单类型

  // 数据返回格式
  let responseData = {
    code: '',
    message: '',
    data: {}
  }
  console.log(req.method)
  if (req.method === 'POST') {
    // 接口 POST 形式
    console.log('\n【POST 形式】')

    // 获取前端发来的路由地址
    let pathName = req.url
    // 基地址处理
    pathName.includes(baseURL) > '-1' ? pathName = pathName.slice(baseURL.length) : pathName

    console.log('\n接口为：' + pathName)

    // 接收发送过来的参数
    let result = ''

    // 数据接入中 on等价于addListener
    req.on('data', function (chunk) {
      result += chunk
    })


    // 数据接收完成
    req.on('end', function () {
      result = JSON.parse(result)
      console.log('\n参数为：')
      console.log(result);

      if (pathName === '/sendMessage') { // 提交留言信息
        console.log('\n【API - 提交留言信息】')
        message(req, res, connection, responseData, result, pathName)
      } else if (pathName == '/login') { // 登录
        console.log('\n【API - 登录】')
        login(req, res, connection, responseData, result)
      } else if (pathName == '/register') { // 注册
        console.log('\n【API - 注册】')
        let name = result.name // 用户名
        let password = result.password // 密码
        let time = getNowFormatDate() // 时间

        if (!name) {
          // 用户名为空
          responseData.code = 400
          responseData.message = '注册失败，用户名为空！'
          res.end(JSON.stringify(responseData))
          return
        } else if (!password) { // 密码为空
          responseData.code = 400
          responseData.message = '注册失败，密码为空！'
          res.end(JSON.stringify(responseData))
          return
        } else {
          // 查询 users 表
          // 使用 Promise 的原因是因为中间调用了两次数据库，而数据库查询是异步的，所以需要用 Promise。
          new Promise((resolve, reject) => {
            // 查询的 SQL 语句
            let readSql = 'SELECT * FROM users'
            // 连接 SQL 并实施语句
            connection.connect()
            connection.query(readSql, (err, data) => {
              if (err) throw err
              console.log(data)
              // 判断姓名重复与否
              let nameRepeat = false
              for(let item in data) {
                if(data[item].name === name) {
                  nameRepeat = true
                }
              }

              if (nameRepeat) {
                responseData.code = 400
                responseData.message = '注册失败，姓名重复！'
                res.end(JSON.stringify(responseData))
                return
              } else {
                resolve()
              }
            })
          }).then(() => {
            // 新增的 SQL 语句及新增的字段信息
            let addSql = 'INSERT INTO users(name, password, time) VALUES(?,?,?)'
            let addSqlParams = [result.name, result.password, time]
            // 连接 SQL 并实施语句
            connection.query(addSql, addSqlParams, (err, data) => {
              if (err) {
                console.log("新增错误：");
                console.log(err);
                return;
              } else {
                console.log("\n注册成功！");
                console.log(data);
                responseData.code = 200
                responseData.message = '注册成功！'
                res.end(JSON.stringify(responseData))
                return
              }

              connection.end()
            })
          })
        }
      } else {
        res.end()
      }
      // 接口信息处理完毕
    })
  } else if (req.method === 'GET') {
    let pathName = url.parse(req.url).pathname
    // 基地址处理
    pathName.includes(baseURL) > '-1' ? pathName = pathName.slice(baseURL.length) : pathName

    console.log('\n接口为：' + pathName)

    if (pathName === '/getMessage') { // 获取留言信息
      console.log('\n【API - 获取留言信息】')
      message(req, res, connection, responseData, {}, pathName)
    } else if (pathName === '/' || pathName === '') { // 首页
      res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
      });

      res.write('<h1 style="text-align:center">fenpho 前端有限公司服务已开启！</h1><h2 style="text-align:center">详情可见：<a href="https://fenpho.github.io" target="_blank">Fenpho 博客</a></h2>');

      res.end();
    }
  } else {
    // 结束响应
    res.end()
  }

}).listen(port)

// 打印信息
console.info(`listen port: http://localhost:${port}`)
