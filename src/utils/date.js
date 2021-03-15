/**
 * 日期格式化
 * @param {*} date  date日期类型
 * @param {*} fmt 格式
 */
export function formatDate(date, fmt) {
  // 正则匹配/(y+)/ 字符串fmt--'yyyy-MM-dd hh:mm'，如果匹配到，就获取第一个匹配的文本，即yyyy,
  if (/(y+)/.test(fmt)) {
    console.log(typeof (date.getFullYear()))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    // 将yyyy替换成年份，如1970
    // date.getFullYear()的类型是number,(date.getFullYear() + '') 加个空字符串将number转成字符串类型
    // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function add0(m) {
  return m < 10 ? '0' + m : m
}
export function timeFormat(timestamp) {
  debugger
  var time = new Date(timestamp)
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  var date = time.getDate()
  var hours = time.getHours()
  var minutes = time.getMinutes()
  var seconds = time.getSeconds()
  return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds)
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * 对日期进行加减,返回yyyy-MM-dd
 * @param {*} date 日期类型
 * @param {*} days 天数
 */
export function addDate(date, days) {
  if (days === undefined || days === '') {
    days = 1
  }
  date.setDate(date.getDate() + days)
  var month = date.getMonth() + 1
  var day = date.getDate()
  return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day)
}

/**
 * 对日期进行加减,返回yyyyMMdd
 * @param {*} date 日期类型
 * @param {*} days 天数
 */
export function addDateNew(date, days) {
  if (days === undefined || days === '') {
    days = 1
  }
  date.setDate(date.getDate() + days)
  var month = date.getMonth() + 1
  var day = date.getDate()
  return date.getFullYear() + getFormatDate(month) + getFormatDate(day)
}
// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
  if (arg === undefined || arg === '') {
    return ''
  }
  var re = arg + ''
  if (re.length < 2) {
    re = '0' + re
  }

  return re
}
// 比较当前时间是否在某个时间段内
var isDuringDate = function(beginDateStr, endDateStr) {
  var curDate = new Date()
  var beginDate = new Date(beginDateStr)
  var endDate = new Date(endDateStr)
  if (curDate >= beginDate && curDate <= endDate) {
    return true
  }
  return false
}
// 获取当前浏览器高度作为table高度
var tableH = function() {
  return document.documentElement.clientHeight - 210
}
export {
  tableH,
  isDuringDate
}
