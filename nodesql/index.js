var mysql = require('mysql2');

const add = require('./add')
const del = require('./delete')
const update = require('./update')
const read = require('./read')

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'node-learn'
});

connection.connect();

// 新增
// add(connection)
// 删除
// del(connection)
// 修改
// update(connection)
// 查询
read(connection)

connection.end();