// 1. 引入 url 模块
var url = require('url')

// 2. 引入 http 模块
var http = require('http')

// 3. 用 http 模块创建服务
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
const port = 3000
http.createServer(function (req, res) {
  // 4. 获取服务器请求
  /**
   * 访问地址是：http://localhost:3000/?userName=fenpho&userAge=20
   * 如果你执行 console.log(req.url)，它将执行两次，分别返回下面的信息：
   * /  ?userName=fenpho&userAge=20
   * /  /favicon.ico
   * 这里为了防止重复执行，所以排除 req.url == /favicon.ico 的情况
   */
  if (req.url !== '/favicon.ico') {
    // 5. 使用 url 的 parse 方法
    /**
     * parse 方法需要两个参数：
     * 第一个参数是地址
     * 第二个参数是 true 的话表示把 get 传值转换成对象
     */
    var result = url.parse(req.url, true);
    console.log(result)
    /**
     * Url {
     *   protocol: null,
     *   slashes: null,
     *   auth: null,
     *   host: null,
     *   port: null,
     *   hostname: null,
     *   hash: null,
     *   search: '?userName=fenpho&userAge=20',
     *   query: [Object: null prototype] { userName: 'fenpho', userAge: '20' },
     *   pathname: '/',
     *   path: '/?userName=fenpho&userAge=20',
     *   href: '/?userName=fenpho&userAge=20'
     * }
     * fenpho
     * 20
     */
    console.log(result.query.userName); // fenpho
    console.log(result.query.userAge); // 20
  }

  // 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
  res.writeHead(200, {
    'Content-Type': 'text/html;chartset=UTF-8'
  })

  // 页面输出hello world
  res.write('<h1>Hello World</h1>')

  // 结束响应
  res.end()
}).listen(port)

// 打印信息
console.info(`listen port: http://localhost:${port}`)