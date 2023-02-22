function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var strDate = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minute = date.getMinutes(); // 分
  var second = date.getSeconds(); // 秒
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  // 返回 yyyy-mm-dd hh:mm:ss 形式
  var currentdate = year + '-' + month + '-' + strDate + ' ' + hour + ':' + minute + ':' + second;
  return currentdate;
}

// 获取当前时间
module.exports = {
  getNowFormatDate
}