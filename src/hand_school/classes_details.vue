<template>
  <div id="classes_details">
    <div class="header_div">
      <div>
        <div class="video_group">
          <video-player
            cross-origin="*"
            class="my_video video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
          <div class="video_list">
            <div class="video_item">
              <img src="../assets/hand_school/header_bg.png" alt />
              <div>掌上周报 | App Store一周盘点，上周有哪Sto，上周有哪Store一周盘点，上周有哪Sto，上周有哪</div>
            </div>
            <div class="video_item">
              <img src="../assets/hand_school/header_bg.png" alt />
              <div>掌上周报 | App Store一周盘点，上周有哪Sto，上周有哪Store一周盘点，上周有哪Sto，上周有哪</div>
            </div>
            <div class="video_item">
              <img src="../assets/hand_school/header_bg.png" alt />
              <div>掌上周报 | App Store一周盘点，上周有哪Sto，上周有哪Store一周盘点，上周有哪Sto，上周有哪</div>
            </div>
            <div class="video_item">
              <img src="../assets/hand_school/header_bg.png" alt />
              <div>掌上周报 | App Store一周盘点，上周有哪Sto，上周有哪Store一周盘点，上周有哪Sto，上周有哪</div>
            </div>
          </div>
          <div class="need_vip" v-show="false">
            <div>立即开通</div>
            <span>该视频需开通VIP，开通VIP享有更多特权</span>
          </div>
          <div class="need_vip" v-show="false">
            <div>登录</div>
            <span>当前处于未登录状态，登录后观看视频</span>
          </div>
        </div>
        <div class="title">巧用产品上下架，节约百万推广费用</div>
        <div class="auther">主讲人：赵莹莹</div>
      </div>
    </div>
    <div class="content">
      <div class="class_description">
        <div class="title_tips">
          <div>精品课程</div>
        </div>
      </div>
      <div class="comment">
        <div class="title_tips">
          <div>参与竞价APP</div>
        </div>
        <div class="push_comment">
          <div>
            <img src="../assets/hand_school/header_bg.png" alt />
            <el-input
              type="textarea"
              placeholder="请发表您的宝贵意见"
              v-model="textarea"
              maxlength="30"
              show-word-limit
            ></el-input>
          </div>
          <div class="add_comment pointer">发表评论</div>
        </div>
        <div class="comment_list">
          <div class="comment_count">88条评论</div>
          <div class="item">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div>
              <div>
                <span>皮卡丘:</span>了解了榜单提升逻辑、优化榜单的量级、榜单的优化周期及注意事项，相信可以帮助大家在优化榜单时，规避一些风险，从而提升产品榜单，为产品带来更多的新增和曝光；以上就是本期掌上ASO电台的主要内容。
              </div>
              <div>2019-05-20 15:32:30</div>
            </div>
          </div>
          <div class="item">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div>
              <div>
                <span>皮卡丘:</span>了解了榜单提升逻辑、优化榜单的量级、榜单的优化周期及注意事项，相信可以帮助大家在优化榜单时，规避一些风险，从而提升产品榜单，为产品带来更多的新增和曝光；以上就是本期掌上ASO电台的主要内容。
              </div>
              <div>2019-05-20 15:32:30</div>
            </div>
          </div>
          <div class="item">
            <img src="../assets/hand_school/header_bg.png" alt />
            <div>
              <div>
                <span>皮卡丘:</span>了解了榜单提升逻辑、优化榜单的量级、榜单的优化周期及注意事项，相信可以帮助大家在优化榜单时，规避一些风险，从而提升产品榜单，为产品带来更多的新增和曝光；以上就是本期掌上ASO电台的主要内容。
              </div>
              <div>2019-05-20 15:32:30</div>
            </div>
          </div>
          <div class="more_comment">查看更多评论</div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
// 引入播放m3u8格式的视频插件
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'classes_details',
  components: { videoPlayer },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            src:
              'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          }
        ],
        poster: '', //你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false //全屏按钮
        }
      },
      textarea: ''
    }
  },
  created() {}
}
</script>
 
<style scoped lang="less">
.content {
  width: 1200px;
  margin: 0 auto;
  .class_description {
    width: 880px;
    height: 510px;
    box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.04);
    padding-top: 30px;
    margin-top: 30px;
    box-sizing: border-box;
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
  .comment {
    margin-top: 30px;
    padding: 30px 30px 40px 30px;
    box-sizing: border-box;
    width: 778px;
    background-color: #ffffff;
    box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.04);
    .more_comment {
      width: 107px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #009bef;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 34px;
      text-align: center;
      letter-spacing: 0px;
      color: #009bef;
      margin: 0 auto;
    }
    .item {
      display: flex;
      justify-content: space-between;
      padding-bottom: 25px;
      img {
        width: 50px;
        height: 50px;
        border: solid 1px #f2f2f2;
        border-radius: 50%;
      }
      > div {
        width: 650px;
        padding-top: 15px;
        > div:first-child {
          font-family: SourceHanSansCN-Normal;
          font-size: 13px;
          font-weight: normal;
          letter-spacing: 0px;
          color: #222222;
          line-height: 30px;
        }
        > div:last-child {
          font-family: SourceHanSansCN-Normal;
          font-size: 13px;
          font-weight: normal;
          letter-spacing: 0px;
          line-height: 30px;
          color: #444444;
        }
        span {
          font-family: SourceHanSansCN-Normal;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 30px;
          letter-spacing: 0px;
          color: #009bef;
        }
      }
    }
    .comment_count {
      font-family: SourceHanSansCN-Medium;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 13px;
      letter-spacing: 0px;
      color: #222222;
      margin-top: 30px;
      margin-bottom: 22px;
    }
    .push_comment {
      border-bottom: 1px solid #f2f2f2;
      .add_comment {
        width: 78px;
        height: 32px;
        background-color: #009bef;
        border-radius: 4px;
        line-height: 33px;
        border: solid 1px #009bef;
        font-family: SourceHanSansCN-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        padding-left: 10px;
        box-sizing: border-box;
        color: #ffffff;
        margin-left: 639px;
        margin-top: 17px;
        margin-bottom: 30px;
      }
      > div:first-child {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        img {
          width: 50px;
          height: 50px;
          border: solid 1px #f2f2f2;
          border-radius: 50%;
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
      margin-left: -10px;
      padding-left: 10px;
      border-left: 2px solid #429ae8;
    }
  }
}

.header_div {
  width: 100%;
  height: 632px;
  background-color: #292929;
  padding-top: 30px;
  box-sizing: border-box;

  > div {
    margin: 0 auto;
    width: 1200px;
  }
  .auther {
    font-family: SourceHanSansCN-Normal;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 13px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .title {
    font-family: SourceHanSansCN-Medium;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    width: 100%;
    color: #ffffff;
    margin-top: 29px;
    margin-bottom: 15px;
  }
  .video_group {
    display: flex;
    position: relative;
    .need_vip {
      position: absolute;
      top: 0;
      left: 0;
      width: 880px;
      height: 495px;
      text-align: center;
      background: #000;
      > div {
        width: 78px;
        height: 32px;
        background-color: #009bef;
        border-radius: 4px;
        border: solid 1px #009bef;
        font-family: SourceHanSansCN-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 34px;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
        margin: 0 auto;
        margin-top: 214px;
      }
      span {
        font-family: SourceHanSansCN-Normal;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 60px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .video_list {
      width: 320px;
      height: 495px;
      background-color: #181818;
      padding: 21px;
      padding-bottom: 0;
      overflow-y: auto;
      box-sizing: border-box;
      .video_item {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-family: SourceHanSansCN-Regular;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #ffffff;
        margin-bottom: 28px;
        div {
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-left: 16px;
        }
        img {
          width: 116px;
          height: 67px;
        }
      }
    }
    .my_video {
      width: 880px;
      height: 495px;
    }
  }
}
#classes_details {
  padding-bottom: 56px;
}
</style>
