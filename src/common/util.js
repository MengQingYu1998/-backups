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
    parseInt(darr[0]) + '-' + parseInt(darr[1]) + '-' + parseInt(darr[2]) + ' '

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
// 替换特殊字符，获取主标题
export function replace_some_chart(parm) {
  parm = parm.trim()
  let arr = ['_', ' ', '—', '-', '「', ':', '：']
  arr.forEach(element => {
    parm =
      parm.indexOf(element) != -1 ? parm.slice(0, parm.indexOf(element)) : parm
  })
  return parm
}
// 数组去重复
export function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array = []
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i])
    }
  }
  return array
}
// 非选中状态下的时间组件的样式
export function time_inactive(element) {
  // 这些是单个日期选择器

  if (document.querySelector(element + '  .el-input__inner')) {
    document.querySelector(
      element + ' .el-input__inner'
    ).style.backgroundColor = '#fff'
    document.querySelector(element + ' .el-input__inner').style.border =
      '1px solid #dcdfe6'
    document.querySelector(element + '  .el-input__inner').style.color =
      '#606266'
  }
  // 这些是单个日期选择器
  // 这些是多个日期选择器
  if (
    document.querySelectorAll(element + '  .el-date-editor .el-range-input')
      .length == 2
  ) {
    document.querySelectorAll(
      element + '  .el-date-editor .el-range-input'
    )[0].style.backgroundColor = '#fff'
    document.querySelectorAll(
      element + '  .el-date-editor .el-range-input'
    )[1].style.backgroundColor = '#fff'
    document.querySelector(
      element + '  .el-date-editor .el-range-separator'
    ).style.color = '#606266'
    document.querySelectorAll(
      element + '  .el-date-editor .el-range-input'
    )[0].style.color = '#606266'
    document.querySelectorAll(
      element + '  .el-date-editor .el-range-input'
    )[1].style.color = '#606266'
  }
  // 这些是多个日期选择器
  document.styleSheets[0].addRule(
    element + ' .el-date-editor::after',
    'border-color: #888 transparent transparent transparent;'
  )
}
//  选中状态下的时间组件的样式
export function time_active(element) {
  // 这些是单个日期选择器
  if (document.querySelector(element + '  .el-input__inner')) {
    document.querySelector(
      element + '  .el-input__inner'
    ).style.backgroundColor = '#009bef'
    document.querySelector(element + '  .el-input__inner').style.border =
      '1px solid #009bef'
    document.querySelector(element + '  .el-input__inner').style.color = '#fff'
  }
  // 这些是单个日期选择器
  // 这些是多个日期选择器
  if (
    document.querySelectorAll(element + '  .el-date-editor .el-range-input')
      .length == 2
  ) {
    document.querySelectorAll(
      element + '  .el-date-editor .el-range-input'
    )[0].style.backgroundColor = '#009bef'
    document.querySelectorAll(
      element + '  .el-date-editor .el-range-input'
    )[1].style.backgroundColor = '#009bef'
    document.querySelector(
      element + '  .el-date-editor .el-range-separator'
    ).style.color = '#fff'

    document.querySelectorAll(
      element + '  .el-date-editor .el-range-input'
    )[0].style.color = '#fff'
    document.querySelectorAll(
      element + '  .el-date-editor .el-range-input'
    )[1].style.color = '#fff'
  }
  // 这些是多个日期选择器

  document.styleSheets[0].addRule(
    element + ' .el-date-editor::after',
    'border-color: #fff transparent transparent transparent;'
  )
}
// 控制时间组件旋转
// 1.给日期组件的父类添加一个新的id

export function time_rotate(element) {
  // console.log('得到焦点')
  document.styleSheets[0].addRule(
    element + ' .el-date-editor::after',
    'transform: rotate(-180deg) !important;-webkit-transition-duration: .3s;transition-duration: .3s;  '
  )
}
export function time_reset(element) {
  // console.log('失去焦点')
  document.styleSheets[0].addRule(
    element + ' .el-date-editor::after',
    'transform: rotate(0deg) !important;-webkit-transition-duration: .3s;transition-duration: .3s; '
  )
}
