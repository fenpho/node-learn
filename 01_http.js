// 1. 引入http模块
var http = require('http')

// 2. 用http模块创建服务
/**
 * req 获取 url 信息（request）
 * res 返回响应信息（response）
 */
const port = 3000
http.createServer(function (req, res) {
  // 设置 HTTP 头部，状态码是200，文件类型是html，字符集是UTF-8
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=UTF-8'
  })

  // 页面输出hello world
  res.write('<h1>Hello World</h1>')

  // 结束响应
  res.end()
}).listen(port)

// 打印信息
console.info(`listen port: http://localhost:${port}`)