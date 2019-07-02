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
        <section class="top">
          <div class="section_title">版本记录</div>
          <div class="search_input">
            <el-input placeholder="请输入日期或者版本号" suffix-icon="el-icon-search" v-model="input1"></el-input>
          </div>
          <div class="timeline">
            <el-timeline>
              <el-timeline-item
                timestamp="2018/4/12"
                placement="top"
                color="#fff"
                icon="el-icon-time"
                size="large"
              >
                <div class="time_line_item_title">版本5.0.0</div>
                <div class="time_line_item">
                  <div class="img_description">
                    <img src="../assets/keyword/test.png" alt>
                    <div class="img_description_child">
                      <div>学习强国</div>
                      <div>学习强国学习强国学习强国</div>
                    </div>
                  </div>
                  <div class="time_line_item_content">
                    修复了一些问题，优化体验。
                    【游戏介绍】
                    《和平精英》是腾讯光子工作室群自研打造的反恐军事竞赛体验手游。虚幻引擎4研发，次世代完美画质，极致视听感受；超大实
                    地图，打造指尖战场，全方面自由施展战术；百人同场竞技，真实弹道，完美的射击手感；好友一键组队，语音开黑；腾讯光子
                    室群超过300人团队研发，给您带来一场震撼的竞技体验。
                    【游戏特色】
                    实景地图 百人竞技
                    多张超大实景地图，体验丰富的环境变化，百人同场竞技，凭借战斗策略及射击能力勇夺冠军，力争胜利！
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/12" placement="top" color=" #009bef" size="large">
                <div class="time_line_item_title">版本5.0.0</div>
                <div class="time_line_item">
                  <div class="img_description">
                    <img src="../assets/keyword/test.png" alt>
                    <div class="img_description_child">
                      <div>学习强国</div>
                      <div>学习强国学习强国学习强国</div>
                    </div>
                  </div>
                  <div class="time_line_item_content">
                    修复了一些问题，优化体验。
                    【游戏介绍】
                    《和平精英》是腾讯光子工作室群自研打造的反恐军事竞赛体验手游。虚幻引擎4研发，次世代完美画质，极致视听感受；超大实
                    地图，打造指尖战场，全方面自由施展战术；百人同场竞技，真实弹道，完美的射击手感；好友一键组队，语音开黑；腾讯光子
                    室群超过300人团队研发，给您带来一场震撼的竞技体验。
                    【游戏特色】
                    实景地图 百人竞技
                    多张超大实景地图，体验丰富的环境变化，百人同场竞技，凭借战斗策略及射击能力勇夺冠军，力争胜利！
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
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
      // 顶部搜索框
      input1: ''
      // 时间线配置
    }
  }
}
</script>
<style scoped>
.time_line_item_content {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
  width: 789px;
  background-color: #f7f7f7;
  padding: 21px 16px 19px 15px;
  margin-top: 20px;
}
.img_description_child div:first-child {
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.img_description_child div:last-child {
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
.img_description img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.img_description {
  display: flex;
  align-items: center;
}
.time_line_item {
  margin-top: -30px;
  margin-left: 30px;
}
.time_line_item_title {
  left: -101px;
  top: -17px;
  position: absolute;
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
}
.timeline {
  position: relative;
  left: 105px;
  margin-top: 30px;
}
.search_input div {
  width: 260px;
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
