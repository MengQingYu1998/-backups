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
/* 进度条组件element */
.el-progress-bar__innerText {
  display: none;
}
.el-progress-bar__inner {
  border-radius: 0 !important;
}
.el-progress-bar__outer {
  border-radius: 0 !important;
}
/* timeline 时间轴组件的icon */
.el-timeline-item__icon {
  color: #009bef !important;
  font-size: 20px;
}
/* timeline 时间轴组件 */
.el-timeline-item__timestamp.is-top {
  margin-left: -130px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
/* 选择国家组件的自定义下拉样式 */
.select2-container .select2-selection--single {
  height: 22px !important;
}
/* button组件自定义样式 */
.el-button {
  padding: 7px 6px !important;
  height: 24px;
  line-height: 0px;
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

/* DatePicker日期组件自定义样式 */
.el-input--suffix .el-input__inner {
  padding-right: 4px;
}
</style>
