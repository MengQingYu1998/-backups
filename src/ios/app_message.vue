<template>
  <div id="version_message" class="content">
    <!-- 自定义组件 -->
    <!-- <keep-alive> -->
    <ios_header @childFn="parentFn" />
    <!-- </keep-alive> -->
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <section class="app_description" v-if="response_data&&response_data.description!='无'">
          <div class="section_title">应用描述</div>
          <div
            class="section_content"
            id="section_content"
            v-if="response_data"
            v-html="response_data.description"
          ></div>
          <div id="show_all" @click="show_more_function()">展开更多</div>
        </section>
        <!-- 第二部分 -->
        <!-- 第二部分 -->
        <!-- 第二部分 -->

        <section class="video" v-if="true&&response_data">
          <div
            class="section_title"
            v-if="response_data.videoUrl.iphone!='无'||response_data.videoUrl.ipad!='无'||response_data.videoUrl.watch!='无'"
          >应用视频</div>
          <div
            class="section_video"
            v-if="response_data.videoUrl.iphone!='无'||response_data.videoUrl.ipad!='无'||response_data.videoUrl.watch!='无'"
          >
            <div class="btn_group">
              <div class="btn_item_02">
                <div>类型</div>
                <div>
                  <el-radio-group v-model="radio01" size="mini">
                    <el-radio-button label="iPhone" v-if="response_data.videoUrl.iphone!='无'"></el-radio-button>
                    <el-radio-button label="iPad" v-if="response_data.videoUrl.ipad!='无'"></el-radio-button>
                    <el-radio-button label="watch" v-if="response_data.videoUrl.watch!='无'"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <div v-if="response_data" class="section_video_flex">
              <!-- iphone 的video -->
              <video-player
                v-if="response_data.videoUrl.iphone!='无'&&radio01=='iPhone'"
                class="video_iPhone video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
              <!-- iPad 的video -->
              <video-player
                v-else-if="response_data.videoUrl.ipad!='无'&&radio01=='iPad'"
                class="video_iPhone video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
              <!-- watch 的video -->
              <video-player
                v-else-if="response_data.videoUrl.watch!='无'&&radio01=='watch'"
                class="video_iPhone video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
          </div>
        </section>
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <section class="screenshot" v-if="response_data">
          <div class="section_title">应用截图</div>
          <div class="section_img">
            <div class="btn_group">
              <div class="btn_item_02">
                <div>类型</div>
                <div>
                  <el-radio-group v-model="radio02" size="mini" v-if="response_data">
                    <el-radio-button label="iPhone" v-if="response_data.prtscrUrl.iphone!='无'"></el-radio-button>
                    <el-radio-button label="iPad" v-if="response_data.prtscrUrl.ipad!='无'"></el-radio-button>
                    <el-radio-button label="watch" v-if="response_data.prtscrUrl.watch!='无'"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <div class="img_group" v-if="response_data">
              <div v-if="Array.isArray(response_data.prtscrUrl.iphone) && radio02=='iPhone'">
                <img
                  v-for="img_group_img_iPhone_item in response_data.prtscrUrl.iphone"
                  :key="img_group_img_iPhone_item"
                  class="img_group_img_iPhone"
                  :src="img_group_img_iPhone_item"
                />
              </div>
              <div v-if="Array.isArray(response_data.prtscrUrl.ipad)&&radio02=='iPad'">
                <img
                  v-for="img_group_img_iPad_item in response_data.prtscrUrl.ipad"
                  :key="img_group_img_iPad_item"
                  class="img_group_img_iPad"
                  :src="img_group_img_iPad_item"
                />
              </div>
              <div v-if="Array.isArray(response_data.prtscrUrl.watch)&&radio02=='watch'">
                <img
                  v-for="img_group_img_watch_item in response_data.prtscrUrl.watch"
                  :key="img_group_img_watch_item"
                  class="img_group_img_watch"
                  :src="img_group_img_watch_item"
                />
              </div>
            </div>
          </div>
        </section>
        <!-- 第四部分 -->
        <!-- 第四部分 -->
        <!-- 第四部分 -->
        <section class="font" v-if="response_data&&response_data.advertisingText!='无'">
          <div class="section_title">宣传文本</div>
          <div class="section_content" v-if="response_data">{{response_data.advertisingText}}</div>
        </section>
        <!-- 第五部分 -->
        <!-- 第五部分 -->
        <!-- 第五部分 -->
        <section class="message" v-if="response_data">
          <div class="section_title">基础信息</div>
          <div class="section_content" v-if="response_data&&response_data.developerName!='无'">
            <div>
              <span>开发者</span>
              <span>{{response_data.developerName}}</span>
            </div>
            <div v-if="response_data&&response_data.appUpdateTime!='无'">
              <span>更新日期</span>
              <span>{{response_data.appUpdateTime}}</span>
            </div>
            <div v-if="response_data&&response_data.bundleId!='无'">
              <span>Bundle ID</span>
              <span>{{response_data.bundleId}}</span>
            </div>
            <div v-if="response_data&&response_data.latestVersion!='无'">
              <span>版本</span>
              <span>{{response_data.latestVersion}}</span>
            </div>
            <div v-if="response_data&&response_data.appSize!='无'">
              <span>大小</span>
              <span>{{response_data.appSize}}</span>
            </div>
            <div>
              <span>是否支持Watch</span>
              <span v-if="response_data">{{response_data.detailInfo.is_support_iwatch?'支持':'不支持'}}</span>
            </div>
            <div v-if="response_data&&response_data.detailInfo.family_share!='无'">
              <span>家人共享</span>
              <span>{{response_data.detailInfo.family_share}}</span>
            </div>
            <div v-if="response_data&&response_data.detailInfo.support_url!='无'">
              <span>支持网站</span>
              <span>{{response_data.detailInfo.support_url}}</span>
            </div>
            <div v-if="response_data&&response_data.detailInfo.developer_url!='无'">
              <span>开发者网站</span>
              <span>{{response_data.detailInfo.developer_url}}</span>
            </div>
            <div v-if="response_data&&response_data.detailInfo.compatibility_ios!='无'">
              <span>兼容性</span>
              <span>{{response_data.detailInfo.compatibility_ios}}</span>
            </div>
            <div v-if="response_data&&response_data.detailInfo.support_language!='无'">
              <span>支持语言</span>
              <span>{{response_data.detailInfo.support_language}}</span>
            </div>
            <div v-if="response_data&&response_data.publishCountries!='无'">
              <span>发行国家/地区</span>
              <span>{{response_data.publishCountries}}</span>
            </div>
            <div v-if="response_data&&response_data.detailInfo.content_grade!='无'">
              <span>内容评级</span>
              <span>{{response_data.detailInfo.content_grade}}</span>
            </div>
          </div>
        </section>
        <!-- 第六部分 -->
        <!-- 第六部分 -->
        <!-- 第六部分 -->
        <section class="like" v-if="response_data&&response_data.mayLoveApp.length!=0">
          <div class="section_title">你可能还喜欢</div>
          <div class="section_content">
            <div
              @click="go_to_page01(mayLoveApp_item.appId,mayLoveApp_item.appName)"
              class="block pointer"
              v-for="(mayLoveApp_item,index) in response_data.mayLoveApp"
              :key="'mayLoveApp'+index"
            >
              <img :src="mayLoveApp_item.icon" alt />
              <span>{{mayLoveApp_item.appName}}</span>
            </div>
          </div>
          <!-- <div class="section_content" v-else>无</div> -->
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'

// 引入播放m3u8格式的视频插件
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'version_message',
  components: { ios_header, left_nav, videoPlayer },
  data() {
    return {
      // 播放m3u8格式的视频插件
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
          // {
          //   type: 'video/mp4',
          //   src:
          //     'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          // }
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
      //单选按钮
      radio01: 'iPhone', //第二部分 视频
      radio02: 'iPhone', //第三部分 截图
      // 请求的数据
      response_data: null,
      now_country: sessionStorage.getItem('now_country_name')
    }
  },
  created: function() {
    this.get_data()
    //'当前国家发生变化，重新请求数据...'

    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('radio01', function(newValue, oldValue) {
      this.get_data()
    })
  },

  methods: {
    // 获取数据并且设置到视频插件的配置项
    onPlayerPlay(videoUrl_item) {
      let arr = new Array()
      function NewObj(videoSrc) {
        this.src = videoSrc
        this.type = 'application/x-mpegURL'
        // this.type = 'video/mp4'
      }
      videoUrl_item.forEach(element => {
        arr.push(new NewObj(element.video))
      })
      this.playerOptions.sources = arr
      console.log(this.playerOptions)
    },
    // 请求数据
    get_data() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据
          // 1:iPhone 2:ipad

          // console.log('country_id' + country_id)
          let appId = this.$store.state.now_app_id
          let url =
            '/GetAppInfo?countryId=' +
            country_id +
            // '&appId=281736535'
            '&appId=' +
            appId
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data = response.data.Data
              console.log(5555555)
              console.log(response)
              // 获取数据并且设置到视频插件的配置项
              if (this.radio01 == 'iPhone') {
                this.onPlayerPlay(this.response_data.videoUrl.iphone)
              } else if (this.radio01 == 'iPad') {
                this.onPlayerPlay(this.response_data.videoUrl.ipad)
              } else if (this.radio01 == 'watch') {
                this.onPlayerPlay(this.response_data.videoUrl.watch)
              }
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    show_more_function() {
      let this_div02 = document.getElementById('show_all') //展开收起
      let this_div = document.getElementById('section_content') //内容
      // console.log(this_div)
      // console.log(this_div02)
      if (this_div02.innerHTML == '展开更多') {
        this_div.style.height = 'auto'
        this_div.style.display = 'block'
        this_div02.innerHTML = '收起'
      } else if (this_div02.innerHTML == '收起') {
        this_div.style.height = '125px'
        this_div.style.display = '-webkit-box '
        this_div02.innerHTML = '展开更多'
      }
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log('version_message' + this.now_country)
    },
    go_to_page01(parm, parm02) {
      this.$router.push({
        path: '/now_ranking'
      })
      this.$store.state.now_app_id = parm
      this.$store.state.now_app_name = parm02
    }
  }
}
</script>
<style scoped>
#version_message {
  padding-bottom: 53px;
}
#section_content {
  min-height: 125px;
  height: 125px;
  -webkit-line-clamp: 6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
#show_all {
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #009bef;
  text-align: right;
  margin-right: 30px;
  margin-top: 3px;
  /* background-color: #ffffff; */
  position: absolute;
  /* right: 13px; */
  bottom: -22px;
}
.app_description {
  margin-bottom: 50px;
  position: relative;
}
.video_iPad {
  width: 332px;
  height: 249px;
}
.video_watch {
  width: 340px;
  height: 272px;
}
.video_iPhone:first-child {
  margin-left: 0 !important;
}
.video_iPhone {
  width: 225px;
  height: 399px;
  margin-left: 30px;
}
.like .section_content {
  flex-wrap: wrap;
  display: flex;
}
.like .block span {
  height: 23px;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.block img {
  width: 68px;
  height: 68px;
}

.message .section_content {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
}
.message .section_content > div span:first-child {
  width: 120px;
  display: inline-block;
  vertical-align: top;
}
.message .section_content > div span:last-child {
  width: 850px;
  display: inline-block;
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
  /* display: flex; */
  width: 987px;
}

.message,
.like,
.font,
.video {
  margin-top: 40px;
}
.img_group_img_iPhone {
  /* width: 225px; */
  height: 399px;
  margin-right: 19px;
  object-fit: cover;
}
.img_group_img_iPad {
  /* width: 297px; */
  height: 223px;
  margin-right: 19px;
  object-fit: cover;
}
.img_group_img_watch {
  /* width: 283px; */
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
.video {
  /* border: solid 1px #f2f2f2; */
  margin-bottom: 40px;
}
.section_video_flex {
  display: flex;
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
