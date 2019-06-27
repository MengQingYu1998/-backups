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
