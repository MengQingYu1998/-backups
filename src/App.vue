<template>
  <div id="app">
    <div class="go_to_top">
      <el-popover placement="right" trigger="hover">
        <div class="code_content">
          <div class="popper_arrow"></div>
          <div>QQ客服：983419919</div>
          <div>工作日：9:30--19:00</div>
        </div>
        <div slot="reference" class="message"></div>
      </el-popover>
      <el-popover placement="right" trigger="hover">
        <div class="message_content">
          <div class="popper_arrow"></div>
          <img src="./assets/ios/weChart_code.jpg" alt />
          <div>工作日：9:30--19:00</div>
        </div>
        <div slot="reference" class="code"></div>
      </el-popover>
      <div class="top" @click="backTop" v-show="is_show_go_to_top"></div>
    </div>

    <navv />
    <div class="app_div">
      <router-view> </router-view>
    </div>
    <foot />
  </div>
</template>

<script>
import Navv from "./NumVue/navv";
import Foot from "./NumVue/foot";

export default {
  name: "App",
  components: {
    Navv,
    Foot
  },
  data() {
    return {
      is_show_go_to_top: false
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },

  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 2);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 300) {
        that.is_show_go_to_top = true;
      } else {
        that.is_show_go_to_top = false;
      }
    }
  }
};
</script>

<style lang="less">
.el-icon-date:before {
  display: none;
}
/*日期间距*/
#Application .el-date-editor--date,
#bangdan .el-input,
#monitor .el-date-editor--date,
.recommend .el-date-editor--date {
  margin-left: 10px;
}
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
  background-image: url("assets/NumImg/tick.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.el-message .el-message__content {
  font-size: 15px;
  color: #444444;
  margin-left: 17px;
}
.bangdan .el-button {
  padding: 7px 9px;

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
  object-fit: cover;
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
  margin-left: 5px;
  border-left: 1px solid #dfdfdf;
}
#navv #country_select .country_name {
  background-color: transparent;
  width: 60px;
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
#ams_compete_word .min_max .el-input__inner,
#bidding_word .min_max .el-input__inner {
  padding: 5px 6px !important;
}

/* 表格的交互 */
//ios
#ams_compete_word table,
#app_message table,
#apple_history table,
#cover_compare table,
#data_table table,
#goods_optimize table,
#goods_show table,
#grade_start table,
#now_ranking table,
#ranking_compare table,
#same_dev_app table,
//keyword
#version_message table,
#hot_history table,
#hot_search table,
#ranking table,
#result table,
#think_word table,
#trend_many table,
#trend_one table,
//compete_manage
#compete_manage table,
#compete_optimize table,
#compete_report table,
//hand_school
#activity_club_details table,
#activity_club table,
#all table,
#ams_artical_details table,
#asm table,
#classes_details table {
     border: 1px solid #d6d6d6 !important;
  tr {
    border-bottom: 1px solid #d6d6d6 !important;
  }
  tbody tr:hover {
    background-color: #ebf7ff;
  }
}

.tabsContentTable .use > div:nth-child(3):hover {
  color: #009bef;
}
/* DatePicker日期组件自定义样式 */

/* 时间选择组件===》开始时间与结束时间共存组件 */
/* 单选时间的长度 */
.el-date-editor--date {
  width: 105px !important;
  cursor: pointer;
}
/* 多选时间的长度 */
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 225px;
  cursor: pointer;
}

.el-input--suffix .el-input__inner {
  padding-left: 12px;
  padding-right: 0px !important;
  font-size: 13px;
cursor: pointer;
}

// 时间组件的"至"这个字
.el-date-editor .el-range-separator {
  line-height: 19px;
  color: #444444;
}
.el-input__icon_ffffff {
  color: #ffffff !important;
}
.el-input__icon {
  line-height: 26px !important;
  color: #888;
}
.el-date-editor .el-range__icon {
  color: #888;
}
.el-date-editor .el-range__close-icon {
  display: none;
}
// 多选的时间的小三角
.el-date-editor--daterange .el-icon-caret-bottom {
  right: 0 !important;
  line-height: 24px !important;
}
/* 单选的时间的小三角 */
.el-icon-caret-bottom {
  font-size: 12px !important;
  position: absolute;
  right: -97px;
}
/*  elementUI的提示框，鼠标悬浮白色提示 */
.el-popover {
  box-sizing: border-box;
  z-index: 99999 !important;
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
/* 修改element的单选框 */
.el-radio-button {
  margin-left: 12px;

  outline: none !important;
}
.el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
  box-shadow: none;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: solid 1px #009bef !important;
  box-shadow: -1px 0 0 0 #009bef;
  background-color: #009bef;
}
.el-radio-button__inner {
  /* border-left: none; */
  color: #444;
  line-height: 23px !important;
  font-size: 13px !important;
  padding: 0 12px !important;
  padding-top: 1px !important;
  border: solid 1px #d6d6d6 !important;
  border-radius: 4px !important;
  box-sizing: border-box;
  font-weight: normal !important;
}
.el-radio-group .el-radio-button:first-child {
  margin-left: 0 !important;
}
.app_div {
  min-height: 80vh;
}
table thead tr th {
  font-size: 13px;
  color: #222222;
  font-weight: 600;
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
#result .el-tabs__nav.is-stretch {
  min-width: 43% !important;
}
#cover_compare .el-tabs__active-bar,
#result .el-tabs__active-bar {
  height: 2px !important;
}

#cover_compare .el-tabs__item,
#result .el-tabs__item {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  font-weight: 600;
}

#cover_compare .el-tabs__nav-wrap:after,
#result .el-tabs__nav-wrap:after {
  height: 1px !important;
  background-color: #d6d6d6;
}

/* 应用信息的视频插件 */

.video-js.vjs-fluid,
.video-js.vjs-16-9,
.video-js.vjs-4-3 {
  border-radius: 4px;
}
.vjs-icon-play:before,
.video-js .vjs-big-play-button .vjs-icon-placeholder:before,
.video-js .vjs-play-control .vjs-icon-placeholder:before {
  content: "\F101";
  font-size: 1.8em;
}
.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(101, 94, 92, 0.8) !important;
  font-size: 2em !important;
  height: 2.5em !important;
  width: 2.5em !important;
  line-height: 2.5em !important;
  margin-top: -1em !important;
  border-radius: 50% !important;
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
  margin-left: -108px;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
#version_message .el-timeline-item__tail {
  left: 2px;
  margin-top: 6px;
  border-left: 1px solid #e4e7ed;
}

#version_message .el-timeline li:first-child .el-timeline-item__node-- {
  width: 17px !important;
  height: 17px !important;
  margin-left: -4px;
  margin-top: -7px;
}
#version_message
  .el-timeline
  li:first-child
  .el-timeline-item__node
  .el-icon-time {
  font-size: 17px !important;
  font-weight: bold;
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
#version_message .el-timeline-item__wrapper {
  padding-left: 6px;
}
#version_message .el-timeline-item__timestamp.is-top {
  padding-top: 5px;
}
/* select组件自定义样式 */
.el-select .el-input__inner {
  padding-right: 22px !important;
}
#version_message .el-input__inner {
  height: 36px !important;
  line-height: 36px !important;
}
.el-input__inner input{
    cursor: pointer;
}
.el-input__inner {
  height: 26px !important;
  line-height: 26px !important;
  color: #444;
  border: 1px solid #d6d6d6;
}
.el-select {
  width: 88px !important;
}
.el-icon-arrow-up:before {
  display: none;
}
.el-icon-date {
  line-height: 26px !important;
}

.el-select .el-input__icon {
  background-image: url("./assets/keyword/arrows_up.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 8px 4px;
  display: block;
}

.el-input__suffix-inner {
  line-height: 10px !important;
}

/* Aso关键词 解决时间下拉框覆盖单选框 */
.el-picker-panel {
  z-index: 999 !important;
  border: none;
}
#app {
  padding-top: 67px;
  width: 100%;
  height: 100%;
}
.table_no_data {
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #bfbfbf;
}
/*文本域 */
.el-textarea {
  width: 652px;
}
.el-textarea__inner {
  height: 88px;
  border: solid 1px #f2f2f2;
}
.el-textarea .el-input__count {
  bottom: 9px;
  right: 11px;
}
/*  ios_header Tooltip 文字提示 */
.el-tooltip__popper.is-light {
  /* border: 1px solid #cccccc !important; */
  border: none !important;

  color: #666;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.18);
  margin-top: 10px;
}

/* 滚动条 */
/* 滚动条 */
/* 滚动条 */
/* 滚动条 */
::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 7px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  background-color: #9f9f9f;
  -webkit-border-radius: 4px;
}
/* 滚动条 */
/* 滚动条 */
/* 滚动条 */
/* 滚动条 */
/* element的分页 data_table最底下那个*/
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  margin: 0 5px;
  background-color: #fff;
  min-width: 30px;
  border: solid 1px #dfdfdf;
  border-radius: 4.7px;

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #888888;
}
/* input[type='number']去掉箭头 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
/* input[type='number']去掉箭头 */
/* 放回顶部 */
.go_to_top .code:hover {
  background-image: url("./assets/ios/code_active.png");
  border: none;
}
.go_to_top .code {
  background-image: url("./assets/ios/code.png");
  width: 36px;
  height: 36px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
  border: 1px solid #dddddd;
  box-sizing: border-box;
}
.code_content div:last-child {
  margin-top: 12px;
}
.code_content {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 12px;
  letter-spacing: 0px;
  color: #222222;
}
.message_content img {
  width: 70px;
  height: 70px;
  margin-bottom: 6px;
}
.message_content {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 12px;
  letter-spacing: 0px;
  text-align: center;
}

.go_to_top .message:hover {
  border: none;
  background-image: url("./assets/ios/message_active.png");
}
.go_to_top .message {
  background-image: url("./assets/ios/message.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 36px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  height: 36px;
  cursor: pointer;
  position: relative;
  z-index: 99999999;
}
.go_to_top .top:hover {
  border: none;
  background-image: url("./assets/ios/top_active.png");
}
.go_to_top .top {
  background-image: url("./assets/ios/top.png");
  width: 36px;
  background-position: center center;
  border-radius: 4px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 36px;
  border: 1px solid #dddddd;
  cursor: pointer;
}
.go_to_top {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  right: 20px;
  z-index: 9999;
  bottom: 40px;
}
.go_to_top > div,
.go_to_top > span {
  margin-top: 14px;
  cursor: pointer;
}
/* 放回顶部 */

.el-select-dropdown__item.selected {
  font-weight: normal;
}
// 改变input placeholder 的颜色
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #bfbfbf !important;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bfbfbf !important;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bfbfbf !important;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #bfbfbf !important;
}

// 改变input placeholder 的颜色
// ios_heade的悬浮框
.ios_header_popper {
  padding: 10px 20px !important;
  text-align: center;
}
// nav的悬浮框
.nav_popover_class {
  margin-left: 117px;
  padding: 15px 0;
}
// 饿了么loading
#data_table .export_data .el-loading-spinner i {
  font-size: 20px !important;
  color: #009bef !important;
}
#data_table .el-loading-spinner {
  display: flex;
  margin-top: -18px;
  align-items: center;
  justify-content: center;
}
.el-loading-spinner i {
  font-size: 30px;
  color: #bfbfbf;
}
.el-loading-mask {
  background-color: hsla(0, 0%, 100%, 1);
  -webkit-transition: opacity 0s;
  transition: opacity 0s;
  z-index: 998;
}
.el-loading-parent--relative {
  height: 200px;
  overflow: hidden;
}
// 搜索结果页面弹出时间选择器
.result_time_picker {
  z-index: 1800 !important;
}
// 开始时间结束时间的自定义按钮类样式
.custom_time {
  background-color: #fff;
  height: 26px;
  padding: 0 12px;
  position: absolute;
  z-index: 10;
  pointer-events: none;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  font-stretch: normal;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  color: #444;
  line-height: 25px;
  box-sizing: border-box;
}
.custom_time .el-icon-caret-top {
  color: #888;
  margin-left: 2px;
  font-size: 12px;
  vertical-align: 1px;
  transform: rotate(180deg) !important;
}
.opacity_0 {
  opacity: 0;
  width: 82px !important;
}
// 开始时间结束时间的自定义按钮类样式
</style>
