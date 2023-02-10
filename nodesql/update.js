const update = (connection) => {
  let updateSql = "UPDATE user SET name = ?,age = ? WHERE Id = ?";
  let updateSqlParams = ["西施", "22", 5];
  
  connection.query(updateSql, updateSqlParams, function (err, res) {
    if (err) {
      console.log("修改错误：");
      console.log(err);
      return;
    } else {
      console.log("修改成功：");
      console.log(res);
    }
  });
}

module.exports = update