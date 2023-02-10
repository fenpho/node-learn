const read = (connection) => {
  let readSql = "SELECT * FROM user";
  
  connection.query(readSql, function (err, res) {
    if (err) throw err;
    console.log(res);
  });
}

module.exports = read