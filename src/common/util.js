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
  // parseInt(marr[0]) +
  // ':' +
  // parseInt(marr[1]) +
  // ':' +
  // parseInt(marr[2])
  return dd
}
