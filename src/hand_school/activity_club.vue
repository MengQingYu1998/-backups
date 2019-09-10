<template>
  <div id="activity_club">
    <div class="header_div">
      <el-carousel indicator-position="outside" height="314px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h1>{{ item }}</h1>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <div class="tab_nav">
        <span :class="{'no_boder':is_active,'pointer':true}" @click="is_active=false">活动</span>
        <span :class="{'no_boder':!is_active,'pointer':true}" @click="is_active=true">精品课程</span>
      </div>
      <!-- 活动 -->
      <div class="item_group" v-show="!is_active">
        <div class="item">
          <img src="../assets/hand_school/header_bg.png" alt />
          <div>第5期掌上ASO电台节目出炉，内含榜单优化实用锦囊！</div>
          <div>2019-05-22 15:00--2019-05-22 15:00</div>
          <div class="pointer">报名参加</div>
        </div>
        <div class="item">
          <img src="../assets/hand_school/header_bg.png" alt />
          <div>第5期掌上ASO电台节目出炉，内含榜单优化实用锦囊！</div>
          <div>2019-05-22 15:00--2019-05-22 15:00</div>
          <div class="pointer">报名参加</div>
        </div>
        <div class="item">
          <img src="../assets/hand_school/header_bg.png" alt />
          <div>第5期掌上ASO电台节目出炉，内含榜单优化实用锦囊！</div>
          <div>2019-05-22 15:00--2019-05-22 15:00</div>
          <div class="pointer">报名参加</div>
        </div>
        <div class="item">
          <img src="../assets/hand_school/header_bg.png" alt />
          <div>第5期掌上ASO电台节目出炉，内含榜单优化实用锦囊！</div>
          <div>2019-05-22 15:00--2019-05-22 15:00</div>
          <div class="pointer">报名参加</div>
        </div>
      </div>
      <!-- 精品课程 -->
      <div class="classes" v-show="is_active">
        <div class="title_tips">
          <div>精品课程</div>
        </div>
        <div class="class_wraper">
          <div class="class">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div class="title">掌上互动召开2019年首个移动互掌上互动召开2019年首个移动互联网</div>
            <div>
              <div>免费</div>
              <div>主讲人：莹莹</div>
              <img src="../assets/hand_school/headset.png" alt />
              <span>5555</span>
            </div>
          </div>
          <div class="class">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div class="title">掌上互动召开2019年首个移动互掌上互动召开2019年首个移动互联网</div>
            <div>
              <div>免费</div>
              <div>主讲人：莹莹</div>
              <img src="../assets/hand_school/headset.png" alt />
              <span>5555</span>
            </div>
          </div>
          <div class="class">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div class="title">掌上互动召开2019年首个移动互掌上互动召开2019年首个移动互联网</div>
            <div>
              <div>免费</div>
              <div>主讲人：莹莹</div>
              <img src="../assets/hand_school/headset.png" alt />
              <span>5555</span>
            </div>
          </div>
          <div class="class">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div class="title">掌上互动召开2019年首个移动互掌上互动召开2019年首个移动互联网</div>
            <div>
              <div>免费</div>
              <div>主讲人：莹莹</div>
              <img src="../assets/hand_school/headset.png" alt />
              <span>5555</span>
            </div>
          </div>
        </div>
      </div>
      <div class="more_things pointer">加载更多</div>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'activity_club',
  data() {
    return { is_active: true }
  },
  created() {},
  components: {}
}
</script>
 
<style scoped lang="less">
.more_things {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #009bef;
  text-align: center;
  margin-top: 38px;
  margin-bottom: 50px;
}
.content {
  width: 1200px;
  margin: 0 auto;
  .classes {
    box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.04);
    padding: 30px;

    .class_wraper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .class {
        width: 368px;
        height: 303px;
        border: solid 1px #f2f2f2;
        margin-top: 30px;
        div:nth-child(2) {
          width: 177px;
          margin-right: 30px;
        }
        div:nth-child(3) {
          display: flex;
          align-items: center;
          font-family: SourceHanSansCN-Normal;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 13px;
          letter-spacing: 0px;
          color: #444444;
          div:nth-child(1) {
            width: 48px;
            height: 24px;
            text-align: center;
            background-color: #009bef;
            border-radius: 4px;
            border: solid 1px #009bef;
            font-family: SourceHanSansCN-Normal;
            font-size: 13px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 26px;
            letter-spacing: 0px;
            color: #ffffff;
            margin-left: 23px;
            margin-right: 17px;
          }

          img {
            width: 15px;
            height: 15px;
            margin-top: -3px;
            margin-right: 8px;
          }
        }
        .title {
          font-family: SourceHanSansCN-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 16px;
          letter-spacing: 0px;
          color: #222222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 284px;
          margin: 22px 0 17px 22px;
        }
        img {
          width: 100%;
          height: 200px;
        }
      }
    }
    .title_tips {
      font-family: SourceHanSansCN-Medium;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 16px;
      letter-spacing: 0px;
      color: #222222;
      padding-left: 10px;
      border-left: 2px solid #429ae8;
      margin: 0 0 0 20px;
    }
  }
  .item_group {
    box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.04);
    padding: 30px;
    padding-top: 0px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 556px;
      height: 403px;
      border: solid 1px #f2f2f2;
      position: relative;
      margin-top: 30px;
      img {
        width: 100%;
        height: 320px;
        margin-bottom: 20px;
      }
      div:nth-child(2) {
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 15px;
        margin-left: 21px;
      }
      div:nth-child(3) {
        font-family: SourceHanSansCN-Normal;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        margin-bottom: 20px;
        margin-left: 21px;
        color: #888888;
      }
      div:nth-child(4) {
        font-family: SourceHanSansCN-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 34px;
        letter-spacing: 0px;
        color: #ffffff;
        width: 78px;
        height: 32px;
        background-color: #009bef;
        border-radius: 4px;
        border: solid 1px #009bef;
        text-align: center;
        position: absolute;
        right: 23px;
        bottom: 25px;
      }
    }
  }
  .tab_nav {
    margin: 46px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: red;
    width: 297px;
    .no_boder {
      border-bottom: 3px solid #fff;
    }
    span {
      font-family: SourceHanSansCN-Medium;
      font-size: 22px;
      font-weight: normal;
      width: 100px;
      text-align: center;
      font-stretch: normal;
      line-height: 48px;
      letter-spacing: 0px;
      color: #222222;
      display: inline-block;
      height: 48px;
      border-bottom: 3px solid #009bef;
      box-sizing: border-box;
    }
  }
}
#activity_club {
  padding-bottom: 56px;
}
</style>
