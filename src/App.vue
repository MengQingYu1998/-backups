<template>
  <div id="app">
    <navv />
    <router-view></router-view>
    <foot />
  </div>
</template>

<script>
import Navv from './NumVue/navv'
import Foot from './NumVue/foot'

export default {
  name: 'App',
  components: {
    Navv,
    Foot
  }
}
</script>

<style>
#Application .select2-container--default .select2-selection--single {
  border: 1px solid #dfdfdf;
}
#navv #country,
.bangdan #country,
#Application #country {
  display: inline-block;
}
.el-message {
  min-width: 0;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.18);
  border-radius: 4px;
  padding: 0 30px;
  margin-top: 300px;
}
.successicon {
  width: 18px;
  height: 18px;
  background-image: url('assets/NumImg/tick.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
.el-message .el-message__content {
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  color: #444444;
  margin-left: 17px;
}
/* .el-button.is-plain:focus,
.el-button.is-plain:hover {
  background-color: transparent;
  border: none;
}
.el-button:focus,
.el-button:hover {
  background-color: transparent;
  border: none;
} */

.block,
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  display: inline-block;
}
.el-input__inner::placeholder {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  color: #444444;
}
.bangdan .el-button {
  padding: 7px 9px;
  font-family: SourceHanSansCN-Regular;
  font-size: 12px;
  color: #888888;
  border: solid 1px #dfdfdf;
}
.bangdan .el-button:focus,
.el-button:hover,
.el-button:active {
  color: #888888 !important;
  border: solid 1px #dfdfdf;
}
/*榜单快照悬浮框*/
.bangdan .el-popover {
  min-width: 128px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  color: #444444;
  line-height: 1.8;
  padding: 12px 0;
}
.bangdan .el-popover > div {
  width: 90px;
  margin: 0 auto;
}
.bangdan .el-popover > div span {
  float: right;
  color: #009bef;
}

/*榜单页面*/
/*设备*/
.bangdan .el-input__inner {
  height: 26px;
  width: 75px;
  padding: 0;
  padding-left: 5px;
}
.bangdan .el-input__icon {
  width: 10px;
  line-height: 26px;
}
/*日期*/
.bangdan .date .el-date-editor.el-input,
.el-date-editor.el-input__inner,
.bangdan .date .el-input__inner {
  width: 120px;
}
.bangdan .date .el-input__inner {
  padding-left: 25px;
}
#navv #country .select2-container--default .select2-selection--single {
  background-color: transparent;
  border: none;
}
#navv #country {
  width: 97px;
  display: inline-block;
}
.bangdan #country .select2-container--default .select2-selection--single {
  border: solid 1px #dfdfdf;
  margin-top: 10px;
  margin-left: 4px;
}
/*新修改样式*/
.bangdan #country .select2-container {
  width: 130px !important;
}
.bangdan
  #country
  .select2-container--default
  .select2-selection--single
  .select2-selection__arrow {
  top: 10px;
}
#navv #country .select2-container .select2-selection--single {
  width: 118px !important;
  border: none !important;
  background-color: transparent;
}
#navv #country .select2 {
  width: 103px !important;
  margin-top: 2px;
}
/* =============================上面是芦的============================= */
/* =============================下面是孟的============================= */
.pointer {
  cursor: pointer;
}
/* 修改element的单选框 */
.el-radio-button {
  margin-left: 10px;
}
.el-radio-button__inner {
  border: solid 1px #dfdfdf;
  border-radius: 4px !important;
}
.el-radio-group .el-radio-button:first-child {
  margin-left: 0 !important;
}
/* video视频插件  */
#version_message .video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3 {
  height: 100% !important;
}
/* button组件自定义样式 */

#trend_many .el-button {
  line-height: 0 !important;
}
/* select组件自定义样式 */
.el-select .el-input__inner {
  padding-right: 22px !important;
}
.el-input__inner {
  height: 27px !important;
}
#data_table .min_max .el-input__inner,
#ranking .min_max .el-input__inner {
  padding: 5px 6px !important;
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
#data_table .el-input--suffix .el-input__inner,
#trend_many .el-input--suffix .el-input__inner,
#ranking .el-input--suffix .el-input__inner,
#trend_one .el-input--suffix .el-input__inner,
#hot_history .el-input--suffix .el-input__inner,
#think_word .el-input--suffix .el-input__inner,
#hot_search .el-input--suffix .el-input__inner,
#result .el-input--suffix .el-input__inner {
  padding-right: 4px;
}
/*  elementUI的提示框，鼠标悬浮白色提示 */
.el-popover {
  /* width: 320px !important ; */
  box-sizing: border-box;
  /* transition-duration: 0ms !important; */
  overflow: hidden;
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

#ios_header #country .select2-container .select2-selection--single,
#country .select2-container .select2-selection--single {
  width: 118px !important;
  border: solid 1px #dfdfdf !important;
  color: #444444 !important;
}
.select2-dropdown {
  width: 130px !important;
}
#ios_header
  .select2-container--default
  .select2-selection--single
  .select2-selection__arrow,
#country
  .select2-container--default
  .select2-selection--single
  .select2-selection__arrow {
  right: 43px !important;
}

#ios_header .select2,
#country .select2 {
  -moz-transform: scale(0.91);
  -webkit-transform: scale(0.91);
  -o-transform: scale(0.91);
}
/* 时间选择组件===》开始时间与结束时间共存组件 */

#grade_start .el-date-editor .el-range-separator,
#result .el-date-editor .el-range-separator,
#data_table .el-date-editor .el-range-separator,
#trend_one .el-date-editor .el-range-separator,
#trend_many .el-date-editor .el-range-separator,
#grade_start .el-date-editor .el-range-separator,
#now_ranking .el-date-editor .el-range-separator {
  line-height: 21px !important;
  color: #444444 !important;
}
#grade_start .el-input__icon,
#result .el-input__icon,
#data_table .el-input__icon,
#trend_one .el-input__icon,
#trend_many .el-input__icon,
#grade_start .el-input__icon,
#now_ranking .el-input__icon {
  line-height: 21px !important;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 250px !important;
}
</style>
