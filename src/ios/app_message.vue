<template>
  <div id="version_message" class="content">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>学习强国</span>
    </div>
    <!-- 自定义组件 -->
    <ios_header/>
    <div class="left_and_right">
      <div class="left">
        <left_nav/>
      </div>
      <div class="right">
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <section class="description">
          <div class="section_title">应用描述</div>
          <div class="section_content">
            【短视频】
            首页底部快速进入视频频道，海量明星娱乐、搞笑段子、经典剧集视频，还能拍小视频记录身边新鲜事，简单操作能拍又能看。
            【极速搜索】
            强大的搜索引擎，一站搜索全网，搜文字、搜图片，快速识别，帮你找到想要的内容。
            【热门资讯】
            精选新闻资讯、视频、漫画等优质内容。热门评论置顶显示，查看、互动更方便。
            【语音识别】
            加入最懂中文的语音识别技术，识别准确率高达98%。支持语音播报资讯，嘈杂环境也可精准识别，彻底解放双手。
            【正版小说】
          </div>
        </section>
        <!-- 第二部分 -->
        <!-- 第二部分 -->
        <!-- 第二部分 -->
        <section class="video">
          <div class="section_title">应用视频</div>
          <div class="section_video">
            <div class="btn_group">
              <div class="btn_item_02">
                <div>类型</div>
                <div>
                  <el-radio-group v-model="radio01" size="mini">
                    <el-radio-button label="iPhone"></el-radio-button>
                    <el-radio-button label="iPad"></el-radio-button>
                    <el-radio-button label="watch"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <video
              :class="{'video_iPhone':radio01=='iPhone','video_iPad':radio01=='iPad','video_watch':radio01=='watch'}"
              src="http://www.w3school.com.cn/i/movie.ogg"
              controls="controls"
            >your browser does not support the video tag</video>
          </div>
        </section>
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <section class="screenshot">
          <div class="section_title">应用视频</div>
          <div class="section_video">
            <div class="btn_group">
              <div class="btn_item_02">
                <div>类型</div>
                <div>
                  <el-radio-group v-model="radio02" size="mini">
                    <el-radio-button label="iPhone"></el-radio-button>
                    <el-radio-button label="iPad"></el-radio-button>
                    <el-radio-button label="watch"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <div class="img_group">
              <img
                :class="{'img_group_img_iPhone':radio02=='iPhone','img_group_img_iPad':radio02=='iPad','img_group_img_watch':radio02=='watch'}"
                v-for="item in 'asdfghj'"
                :key="item"
                src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562064279&di=4282b40222fc4cd8d8b8c029587676e3&src=http://pic54.nipic.com/file/20141126/9448607_192721578000_2.jpg"
                alt
              >
            </div>
          </div>
        </section>
        <!-- 第四部分 -->
        <!-- 第四部分 -->
        <!-- 第四部分 -->
        <section class="font">
          <div class="section_title">宣传文本</div>
          <div class="section_content">
            百度App，7亿用户首选的搜索和资讯客户端。
            最懂中文的语音搜索识别技术，准确率高达98%。
            热门新闻、视频抢先看，更有全网正版小说。
          </div>
        </section>
        <!-- 第五部分 -->
        <!-- 第五部分 -->
        <!-- 第五部分 -->
        <section class="message">
          <div class="section_title">基础信息</div>
          <div class="section_content">
            开发者 Beijing Baidu Netcom Science & Technology Co.,Ltd
            发布日期 2010-08-30
            更新日期 2019-02-11
            Bundle ID com.baidu.BaiduMobile
            版本 11.3.6
            大小 290.45M
            是否支持 Watch 支持
            家人共享 可使用
            支持网站 https://boxer.baidu.com/scheme?scheme=baiduboxapp%3A%2F%2Fv9%2Fucenter%2Ffeedback%3Fneedlog%3D1%26logargs
            %2522%253A%25221020418l%2522%257D&target=http%3a%2f%2ftieba.baidu.com%2ff%3fkw%3d%25CA%25
            开发者网站 http://xbox.m.baidu.com/mo/
            兼容性 需要 iOS 8.0 或更高版本。与 iPhone、iPad 和 iPod touch 兼容。
            支持语言 简体中文
            发行国家/地区
            内容评级 17+
          </div>
        </section>
        <!-- 第六部分 -->
        <!-- 第六部分 -->
        <!-- 第六部分 -->
        <section class="like">
          <div class="section_title">你可能还喜欢</div>
          <div class="section_content">
            <div class="block" v-for="item in 'asdfghjklzxcvbnm'" :key="item">
              <img src="../assets/keyword/test.png" alt>
              <span>计划</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'version_message',
  components: { ios_header, left_nav },
  data() {
    return {
      //单选按钮
      radio01: 'iPhone', //第二部分
      radio02: 'iPhone' //第三部分
    }
  }
}
</script>
<style scoped>
.video_iPad {
  width: 332px;
  height: 249px;
}
.video_watch {
  width: 283px;
  height: 226px;
}
.video_iPhone {
  width: 225px;
  height: 399px;
}
.like .section_content {
  flex-wrap: wrap;
}
.block img {
  width: 68px;
  height: 68px;
}
.section_content .block {
  height: 104px;
  width: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
  margin-right: 17px;
  margin-bottom: 20px;
}
.section_content {
  display: flex;
  width: 987px;
}
.message,
.like,
.font,
.video {
  margin-top: 40px;
}
.img_group_img_iPhone {
  width: 225px;
  height: 399px;
  margin-right: 19px;
  object-fit: cover;
}
.img_group_img_iPad {
  width: 297px;
  height: 223px;
  margin-right: 19px;
  object-fit: cover;
}
.img_group_img_watch {
  width: 283px;
  height: 227px;
  margin-right: 19px;
  object-fit: cover;
}
.img_group {
  width: 995px;
  overflow-x: auto;
  white-space: nowrap;
}
.btn_group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.btn_item_02 > div:nth-child(1) {
  margin-right: 16px !important;
}
.btn_item_02 {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 16px;
}
video {
  border: solid 1px #f2f2f2;
  margin-bottom: 40px;
}
.section_video video {
  /* width: 225px;
  height: 399px; */
}
.section_video {
}
.section_content {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
}
.section_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #009bef;
  padding-left: 8px;
  margin-bottom: 20px;
}
.right {
  padding-left: 57px;
}
.line {
  width: 985px;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
}
.left_and_right {
  display: flex;
  margin-top: 27px;
}
.breadcrumb span:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
.breadcrumb span:first-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
.breadcrumb {
  margin: 20px 0;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
</style>
