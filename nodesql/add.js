const add = (connection) => {
  let addSql = "INSERT INTO user(id,name,age) VALUES(0,?,?)";
  let addSqlParams = ["西施", "23"];
  
  connection.query(addSql, addSqlParams, function (err, res) {
    if (err) {
      console.log("新增错误：");
      console.log(err);
      return;
    } else {
      console.log("新增成功：");
      console.log(res);
    }
  });
}

module.exports = add