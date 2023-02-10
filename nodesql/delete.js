const del = (connection) => {
  let delSql = "DELETE FROM user where id = 4";
  
  connection.query(delSql, function (err, res) {
    if (err) {
      console.log("删除错误：");
      console.log(err);
      return;
    } else {
      console.log("删除成功：");
      console.log(res);
    }
  });
}

module.exports = del