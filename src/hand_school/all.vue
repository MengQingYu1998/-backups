<template>
  <div id="all">
    <div class="content">
      <div class="left">
        <div class="carousel">
          <el-carousel height="400px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <div class="title">掌上互动召开2019年首个移动互联网营销峰会</div>
        </div>
        <div class="article_list">
          <div class="article_item">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div>
              <div>产品运营万字解析 | 西西弗书店，书不能卖给读书人</div>
              <div>
                而今，以西西弗为首的线下实体书店再次兴起。似乎买书这件事儿，又从线上重
                而今，以西西弗为首的线下实体书店再次兴起。似乎买书这件事儿，又从线上重
              </div>
              <div>AS0 丨 2019-05-20</div>
            </div>
          </div>
          <div class="article_item">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div>
              <div>产品运营万字解析 | 西西弗书店，书不能卖给读书人</div>
              <div>
                而今，以西西弗为首的线下实体书店再次兴起。似乎买书这件事儿，又从线上重
                而今，以西西弗为首的线下实体书店再次兴起。似乎买书这件事儿，又从线上重
              </div>
              <div>AS0 丨 2019-05-20</div>
            </div>
          </div>
          <div class="article_item">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div>
              <div>产品运营万字解析 | 西西弗书店，书不能卖万字解析 | 西西弗书店，书不能卖万字解析 | 西西弗书店，书不能卖万字解析 | 西西弗书店，书不能卖给读书人</div>
              <div>
                而今，以西西弗为首的线下实体书店再次兴起。似乎买书这件事儿，又从线上重
                而今，以西西弗为首的线下实体书店再次兴起。似乎买书这件事儿，又从线上重
              </div>
              <div>AS0 丨 2019-05-20</div>
            </div>
          </div>
          <div class="article_item">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div>
              <div>产品运营万字解析 | 西西弗书店，书不能卖给读书人</div>
              <div>
                而今，以西西弗为首的线下实体书店再次兴起。似乎买书这件事儿，又从线上重
                而今，以西西弗为首的线下实体书店再次兴起。似乎买书这件事儿，又从线上重
              </div>
              <div>AS0 丨 2019-05-20</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="img_and_title">
          <img src="../assets/hand_school/header_bg.png" alt />
          <div>玩转APP精准获客之道—北京站玩转APP精准获客之道—北京站</div>
        </div>
        <div class="img_and_title">
          <img src="../assets/hand_school/header_bg.png" alt />
          <div>玩转APP精准获客之道—北京站玩转APP精准获客之道—北京站</div>
        </div>
        <div class="quick_report">
          <div class="title_tips">
            <div>参与竞价APP</div>
          </div>
          <div class="main">
            <div class="quick_report_title">复星联合健康险增资1.6亿元</div>
            <div class="quick_report_content">
              近日，复星联合健康保险股份有限公司在中国保险行业协会
              官网上披露了《关于变更注册资本有关情况的信息披露公告》
              复星联合健康保险股份有限公司本次增发1.6亿股股份，由上
              海复星产业投资有限公司、迪安诊断技术集团股份有限公司
              分别认购1.2亿股、0.4亿股。复星联合健康
            </div>
            <div class="quick_report_time">55分钟前</div>
          </div>
          <div class="title_and_time">
            <div>玩转APP精准获客之道—北京站玩转APP精准获客之道—北京站</div>
            <div>55分钟前</div>
          </div>
          <div class="title_and_time">
            <div>玩转APP精准获客之道—北京站玩转APP精准获客之道—北京站</div>
            <div>55分钟前</div>
          </div>
          <div class="title_and_time">
            <div>玩转APP精准获客之道—北京站玩转APP精准获客之道—北京站</div>
            <div>55分钟前</div>
          </div>
          <div class="title_and_time">
            <div>玩转APP精准获客之道—北京站玩转APP精准获客之道—北京站</div>
            <div>55分钟前</div>
          </div>
          <div class="title_and_time">
            <div>玩转APP精准获客之道—北京站玩转APP精准获客之道—北京站</div>
            <div>55分钟前</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'all',
  components: {},
  data() {
    return {}
  },
  created() {}
}
</script>
 
<style scoped lang="less">
.content {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  .left {
    box-sizing: border-box;
    width: 770px;
    .article_list {
      width: 770px;
      box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.04);
      box-sizing: border-box;
      padding: 30px;
      padding-bottom: 9px;
      .article_item {
        width: 100%;
        height: 162px;
        box-sizing: border-box;
        display: flex;
        margin-bottom: 21px;
        > div {
          margin-left: 23px;
          border-bottom: 1px solid #f2f2f2;
          > div:nth-child(1) {
            font-family: SourceHanSansCN-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 16px;
            letter-spacing: 0px;
            color: #222222;
            margin-top: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 454px;
          }
          > div:nth-child(2) {
            font-family: SourceHanSansCN-Normal;
            font-size: 13px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 28px;
            letter-spacing: 0px;
            color: #444444;
            margin-top: 5px;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            width: 454px;
          }
          > div:nth-child(3) {
            font-family: SourceHanSansCN-Normal;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 12px;
            letter-spacing: 0px;
            color: #888888;
            margin-top: 8px;
          }
        }
        > img {
          width: 230px;
          height: 140px;
        }
      }
    }
    .carousel {
      position: relative;
      margin-bottom: 30px;
      margin-top: 0;
      .title {
        font-family: SourceHanSansCN-Medium;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
        position: absolute;
        bottom: 21px;
        left: 21px;
      }
    }
  }
  .right {
    width: 400px;
    box-sizing: border-box;
    .quick_report {
      padding: 30px;
      box-sizing: border-box;
      width: 400px;
      min-height: 660px;
      box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.04);
      .title_and_time {
        margin-top: 30px;
        > div:nth-child(1) {
          font-family: SourceHanSansCN-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 0px;
          color: #222222;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          width: 338px;
        }
        > div:nth-child(2) {
          font-family: SourceHanSansCN-Normal;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 12px;
          letter-spacing: 0px;
          color: #888888;
          margin-top: 8px;
        }
      }
      .quick_report_time {
        font-family: SourceHanSansCN-Normal;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #888888;
        margin-top: 10px;
      }
      .quick_report_content {
        font-family: SourceHanSansCN-Normal;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 26px;
        letter-spacing: 0px;
        color: #444444;
      }
      .quick_report_title {
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #009bef;
        margin-top: 23px;
        margin-bottom: 9px;
      }
      .title_tips {
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #222222;
        margin-left: -10px;
        padding-left: 10px;
        border-left: 2px solid #429ae8;
      }
    }
    .img_and_title {
      width: 400px;
      height: 185px;
      position: relative;
      margin-bottom: 30px;
      div {
        width: 277px;
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #ffffff;
        position: absolute;
        left: 20px;
        bottom: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

#all {
  padding-bottom: 56px;
}
</style>
