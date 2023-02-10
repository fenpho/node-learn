var http = require("http");

var tools1 = require('./03_tool-add');

// 如果 Node 在当前目录没找到 tool.js 文件，则会去 node_modules 里面去查找
var tools2 = require('03_tool-multiply');

var tools3 = require('my-module')

http.createServer(function (req, res) {

  res.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });

  res.write('<h1 style="text-align:center">Hello NodeJS</h1>');

  console.log('tool 1:', tools1.add(1, 2, 3));
  console.log('tool 2:', tools2.multiply(1, 2, 3, 4));
  console.log('tool 3:', tools3.add(1, 2, 3));
  console.log('tool 3:', tools3.multiply(1, 2, 3, 4));

  /**
   * Console：
   * 6
   * 6
   * 这里要记得 Node 运行过程中，它请求了两次，
   * http://localhost:3000/ 为一次，
   * http://localhost:3000/favicon.ico 为第二次
   */

  res.end();

}).listen(3000);