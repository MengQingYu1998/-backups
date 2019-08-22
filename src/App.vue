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
.bangdan .date .el-input__inner,
#Application .el-date-editor.el-input,
.el-date-editor.el-input__inner,
#Application .el-input__inner,
#monitor .el-date-editor.el-input,
.el-date-editor.el-input__inner,
#monitor .el-input__inner {
  width: 120px;
  margin-left: 5px;
}
#Application .el-date-editor.el-input,
#Application .el-input__inner,
#monitor .el-date-editor.el-input,
#monitor .el-input__inner {
  height: 27px;
}
.bangdan .date .el-input__inner,
#Application .el-input__inner,
#monitor .el-input__inner {
  padding-left: 25px;
  padding-right: 12px;
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
#Application .el-input__prefix,
#monitor .el-input__prefix {
  top: -2px;
}
#Application .el-input__suffix,
#monitor .el-input__suffix {
  display: none;
}
/*新修改样式*/
.bangdan #country .select2-container {
  width: 150px !important;
  margin-top: -12px;
}
.bangdan .date .el-input__icon {
  margin-top: -2px;
  margin-left: 6px;
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
  width: 140px !important;
  margin-top: 2px;
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
}
#navv #country_select .country_name {
  background-color: transparent;
  border: none;
  height: 100%;
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
/* select组件自定义样式 */
.el-select .el-input__inner {
  padding-right: 22px !important;
}
.el-input__inner {
  height: 27px !important;
  line-height: 27px !important;
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
  /* overflow: hidden; */
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
  border: none !important;
  box-shadow: -1px 0 0 0 #009bef;
  background-color: #009bef;
  font-family: SourceHanSansCN-Normal !important;
}
.el-radio-button__inner {
  /* border-left: none; */

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
.f32 {
  transform: scale(0.9);
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
.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: #655e5c;
  font-size: 2em;
  height: 2.8em !important;
  line-height: 2.8em !important;
  margin-top: -1em !important;
  border-radius: 50%;
}
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
.video-js .vjs-big-play-button {
  border: none;
  outline: none;
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
  left: 1.5;
  margin-top: 14px;
}
#version_message .el-timeline-item__node--large:not(:first-child) {
  width: 9px;
  height: 9px;
}
#version_message .timeline > li:not(:first-child) .el-timeline-item__node {
  background-color: #009bef !important;
}
</style>
