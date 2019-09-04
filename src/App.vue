<template>
  <div id="app">
    <navv />
    <div class="app_div">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
        </router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
      </router-view>
    </div>
    <foot />
  </div>
</template>

<script>
import Navv from './NumVue/navv'
import Foot from './NumVue/foot'

export default {
  name: 'App',
  created() {
    this.refresh_save_vuex(this)
  },
  components: {
    Navv,
    Foot
  }
}
</script>

<style>
/*message*/
#msg .bangdan .el-button:focus,
#msg .el-button:hover,
#msg .el-button:active {
  border: none;
}
#msg .el-button {
  border: none;
  color: #009bef;
}
/*滑动加载样式*/
#Application .scrollDiv,
.bangdan .scrollDiv,
#rank .scrollDiv {
  text-align: center;
  font-size: 20px;
  line-height: 40px;
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
#bangdan .el-popover {
  min-width: 128px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  color: #444444;
  line-height: 1.8;
  padding: 12px 0;
}
#bangdan .el-popover > div {
  width: 90px;
  margin: 0 auto;
  border: 1px solid red;
}
#bangdan .el-popover > div p {
  border: 1px solid red;
}
#bangdan .el-popover > div span {
  float: right;
  color: #009bef;
  margin-left: 40px;
  border: 1px solid red;
}

/*08-09*/
/*index页banner图*/
#index .el-carousel__container {
  height: 500px;
}
#index .el-carousel__container img {
  width: 100%;
  height: 500px;
}
.bangdan #country_select,
#Application #country_select {
  display: inline-block;
  margin-left: 5px;
}
#navv #country_select {
  display: inline-block;
  vertical-align: top;
  margin-top: 5px;
  border-left: 1px solid #dfdfdf;
}
#navv #country_select .country_name {
  background-color: transparent;
  border: none;
  height: 100%;
  padding: 0 3px;
  text-align: center;
}
/* =============================上面是芦的============================= */
/* =============================下面是孟的============================= */
#map_points {
  display: none;
}
.pointer {
  cursor: pointer;
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

#data_table .min_max .el-input__inner,
#ranking .min_max .el-input__inner,
#bidding_word .min_max .el-input__inner {
  padding: 5px 6px !important;
}

/* 表格的交互 */
table tbody tr:hover {
  background-color: #f5fcff;
}

.tabsContentTable .use > div:nth-child(3):hover {
  color: #009bef;
}
/* DatePicker日期组件自定义样式 */

.el-input__inner {
  padding-right: 4px !important;
}
/*  elementUI的提示框，鼠标悬浮白色提示 */
.el-popover {
  box-sizing: border-box;
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
/* 时间选择组件===》开始时间与结束时间共存组件 */

.el-date-editor .el-range-separator {
  line-height: 27px !important;
  color: #444444 !important;
}

.el-input__icon {
  line-height: 21px !important;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 250px !important;
}
/* 修改element的单选框 */
.el-radio-button {
  margin-left: 10px;
  font-family: SourceHanSansCN-Normal !important;
  outline: none !important;
}
.el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
  box-shadow: none;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: solid 1px #009bef !important;
  box-shadow: -1px 0 0 0 #009bef;
  background-color: #009bef;
  font-family: SourceHanSansCN-Normal !important;
}
.el-radio-button__inner {
  /* border-left: none; */
  font-family: SourceHanSansCN-Normal !important;

  line-height: 25px !important;
  font-size: 13px !important;
  padding: 0 12px !important;
  padding-top: 1px !important;
  border: solid 1px #dfdfdf !important;
  border-radius: 4px !important;
  box-sizing: border-box;
}
.el-radio-group .el-radio-button:first-child {
  margin-left: 0 !important;
}
.app_div {
  min-height: 100vh;
}
table thead tr th {
  font-family: SourceHanSansCN-Medium !important;
  font-size: 13px;
  color: #222222;
  font-weight: normal;
}

/* 世界地图的样式 */
#map-tip span {
  vertical-align: -2px;
}
#map-tip {
  background: #f6f6f6 !important;
  color: #000000 !important;
  border: 1px solid #c6c6c6;
  display: flex;
  align-items: center;
  width: auto;
  /* padding: 6px 3px; */
}
#map_base {
  margin: 0 auto;
}
/* 搜索结果的切换 */
#result .el-tabs__active-bar {
  height: 1px !important;
}
#result .el-tabs__nav-wrap::after {
  height: 1px !important;
}
#result .el-tabs__item {
  color: #888888;
}
#result .el-tabs__item.is-active {
  color: #009bef;
}
/* 应用信息的视频插件 */

.video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3 {
  border-radius: 4px;
  border: solid 1px #f2f2f2;
}
.vjs-icon-play:before,
.video-js .vjs-big-play-button .vjs-icon-placeholder:before,
.video-js .vjs-play-control .vjs-icon-placeholder:before {
  content: '\F101';
  font-size: 1.8em;
}
.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: #655e5c !important;
  font-size: 2em !important;
  height: 2.8em !important;
  line-height: 2.8em !important;
  margin-top: -1em !important;
  border-radius: 50% !important;
  border: none;
  outline: none;
}
.vjs-big-play-button {
  height: 2.8em !important;
  line-height: 2.8em !important;
}
/* timeline 时间轴组件的icon */
#version_message .timeline > li:first-child .el-timeline-item__icon {
  color: #009bef !important;
  font-size: 20px;
}
#version_message .el-timeline-item__icon {
  color: #009bef !important;
  font-size: 9px;
}
#version_message .el-timeline-item__timestamp.is-top {
  margin-left: -130px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
#version_message .el-timeline-item__tail {
  left: 1px !important;
  margin-top: 6px;
}

#version_message .el-timeline li:first-child .el-timeline-item__node-- {
  width: 17px !important;
  height: 17px !important;
  margin-left: -4px;
}
#version_message
  .el-timeline
  li:first-child
  .el-timeline-item__node
  .el-icon-time {
  font-size: 17px !important;
}
#version_message
  .el-timeline
  li:not(:first-child)
  .el-timeline-item__node
  .el-icon-time {
  display: none;
}
#version_message .el-timeline li:not(:first-child) .el-timeline-item__node {
  background-color: #009bef !important;
  width: 9px;
  height: 9px;
  display: flex;
  align-items: center;
}
/* select组件自定义样式 */
.el-select .el-input__inner {
  padding-right: 22px !important;
}
.el-input__inner {
  height: 28px !important;
  line-height: 28px !important;
}
.el-select {
  width: 86px !important;
}
.el-icon-arrow-up:before {
  display: none;
}
.el-icon-date {
  line-height: 28px !important;
}
.el-range-editor.el-input__inner {
  padding: 0 10px;
}
.el-select .el-input__icon:after {
  content: '';
  background-image: url('./assets/keyword/app_vue.png');
  background-repeat: no-repeat;
  width: 8px !important;
  height: 8px !important;
  transform: rotate(-90deg) !important;
  margin-top: -1px;
}

.el-select .el-input__icon:after {
  content: '';
  background-image: url('./assets/keyword/app_vue.png');
  background-repeat: no-repeat;
  width: 8px !important;
  height: 8px !important;
  transform: rotate(-90deg) !important;
  margin-top: -1px;
}
.el-input__suffix-inner {
  line-height: 10px !important;
}
/* 单选时间的长度 */
.el-date-editor--date {
  width: 114px !important;
}
/* Aso关键词 解决时间下拉框覆盖单选框 */
.el-picker-panel {
  z-index: 999 !important;
}
#app {
  padding-top: 67px;
}
</style>
