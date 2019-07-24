export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
export function myTime(date) {
  var arr = date.split('T')
  var d = arr[0]
  var darr = d.split('-')

  var t = arr[1]
  var tarr = t.split('.000')
  var marr = tarr[0].split(':')

  var dd =
    parseInt(darr[0]) + '/' + parseInt(darr[1]) + '/' + parseInt(darr[2]) + ' '

  return dd
}
// 把时间戳转为时间
export function timestamp(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  var returnArr = []

  var date = new Date(number * 1000)
  returnArr.push(date.getFullYear())
  returnArr.push(formatNumber_for_timestamp(date.getMonth() + 1))
  returnArr.push(formatNumber_for_timestamp(date.getDate()))

  returnArr.push(formatNumber_for_timestamp(date.getHours()))
  returnArr.push(formatNumber_for_timestamp(date.getMinutes()))
  returnArr.push(formatNumber_for_timestamp(date.getSeconds()))

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

//数据转化
function formatNumber_for_timestamp(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
