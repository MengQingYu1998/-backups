<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
/* video视频插件  */
#version_message .video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3 {
  height: 100% !important;
}
/* button组件自定义样式 */
.el-button {
  padding: 7px 6px !important;
  height: 27px;
}
/* select组件自定义样式 */
.el-select .el-input__inner {
  padding-right: 22px !important;
}
.el-input__inner {
  height: 27px !important;
}
.el-input__icon {
  line-height: 30px !important;
}

/* 表格的交互 */
table tbody tr:hover {
  background-color: #f5fcff;
}

.tabsContentTable .use > div:nth-child(3):hover {
  color: #009bef;
}
/* DatePicker日期组件自定义样式 */
#trend_many .el-input--suffix .el-input__inner,
#ranking .el-input--suffix .el-input__inner,
#trend_one .el-input--suffix .el-input__inner,
#hot_history .el-input--suffix .el-input__inner,
#think_word .el-input--suffix .el-input__inner,
#hot_search .el-input--suffix .el-input__inner,
#result .el-input--suffix .el-input__inner {
  padding-right: 4px;
}
/* elementUI的提示框，鼠标悬浮白色提示 */
#hot_search .el-popover {
  width: 300px !important ;
  box-sizing: border-box;
  /* transition-duration: 0ms !important; */
}
/* 进度条组件element */
#grade_start .el-progress-bar__innerText {
  display: none;
}
#grade_start .el-progress-bar__inner {
  border-radius: 0 !important;
}
#grade_start .el-progress-bar__outer {
  border-radius: 0 !important;
}
/* timeline 时间轴组件的icon */
#version_message .el-timeline-item__icon {
  color: #009bef !important;
  font-size: 20px;
}

/* timeline 时间轴组件 */
#version_message .el-timeline-item__timestamp.is-top {
  margin-left: -130px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
/* 选择国家组件的自定义下拉样式 */
#country .select2-container .select2-selection--single {
  width: 118px !important;
  border: solid 1px #dfdfdf !important;
  color: #444444 !important;
}
#country .select2-dropdown {
  width: 130px !important;
}
#country
  .select2-container--default
  .select2-selection--single
  .select2-selection__arrow {
  right: 43px !important;
}

/* 时间选择组件===》开始时间与结束时间共存组件 */
#grade_start .el-date-editor .el-range-separator {
  line-height: 21px !important;
  color: #444444 !important;
}
#grade_start .el-input__icon {
  line-height: 21px !important;
}
#grade_start .el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 250px !important;
}
</style>
