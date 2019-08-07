<template>
  <div id="version_message" class="content">
    <!-- 自定义组件 -->
    <!-- <keep-alive> -->
    <ios_header
      @childFn="parentFn"
    
    />
    <!-- </keep-alive> -->
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <section class="app_description">
          <div class="section_title">应用描述</div>
          <div class="section_content" v-if="response_data" v-html="response_data.description"></div>
          <div class="section_content" v-else>无</div>
        </section>
        <!-- 第二部分 -->
        <!-- 第二部分 -->
        <!-- 第二部分 -->

        <section
          class="video"
          v-if="!response_data||response_data.videoUrl.iphone!='无'||response_data.videoUrl.ipad!='无'||response_data.videoUrl.watch!='无'"
        >
          <div class="section_title">应用视频</div>
          <div class="section_video" v-if="response_data">
            <div class="btn_group">
              <div class="btn_item_02">
                <div>类型</div>
                <div>
                  <el-radio-group v-model="radio01" size="mini" v-if="response_data">
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
                v-show="response_data.videoUrl.iphone!='无'"
                v-for="(videoUrl_item,index) in response_data.videoUrl.iphone"
                :key="'videoUrl_item_iphone'+index"
                class="video_iPhone video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
              <!-- iPad 的video -->
              <video-player
                v-show="response_data.videoUrl.ipad!='无'"
                v-for="(videoUrl_item,index) in response_data.videoUrl.ipad"
                :key="'videoUrl_item_ipad'+index"
                class="video_iPhone video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
              <!-- watch 的video -->
              <video-player
                v-show="response_data.videoUrl.watch!='无'"
                v-for="(videoUrl_item,index) in response_data.videoUrl.watch"
                :key="'videoUrl_item_watch'+index"
                class="video_iPhone video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
          </div>
          <div class="section_video" v-else>无</div>
        </section>
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <section
          class="screenshot"
          v-if="!response_data||response_data.prtscrUrl.iphone!='无'||response_data.prtscrUrl.ipad!='无'||response_data.prtscrUrl.watch!='无'"
        >
          <div class="section_title">应用截图</div>
          <div class="section_img" v-if="response_data">
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
          <div class="section_img" v-else>无</div>
        </section>
        <!-- 第四部分 -->
        <!-- 第四部分 -->
        <!-- 第四部分 -->
        <section class="font">
          <div class="section_title">宣传文本</div>
          <div class="section_content" v-if="response_data">{{response_data.advertisingText}}</div>
          <div class="section_content" v-else>无</div>
        </section>
        <!-- 第五部分 -->
        <!-- 第五部分 -->
        <!-- 第五部分 -->
        <section class="message">
          <div class="section_title">基础信息</div>
          <div class="section_content">
            <div>
              <span>开发者</span>
              <span v-if="response_data">{{response_data.developerName}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>更新日期</span>
              <span v-if="response_data">{{response_data.appUpdateTime}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>Bundle ID</span>
              <span v-if="response_data">{{response_data.bundleId}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>版本</span>
              <span v-if="response_data">{{response_data.latestVersion}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>大小</span>
              <span v-if="response_data">{{response_data.appSize}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>是否支持Watch</span>
              <span v-if="response_data">{{response_data.detailInfo.is_support_iwatch?'支持':'不支持'}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>家人共享</span>
              <span v-if="response_data">{{response_data.detailInfo.family_share}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>支持网站</span>
              <span v-if="response_data">{{response_data.detailInfo.support_url}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>开发者网站</span>
              <span v-if="response_data">{{response_data.detailInfo.developer_url}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>兼容性</span>
              <span v-if="response_data">{{response_data.detailInfo.compatibility_ios}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>支持语言</span>
              <span v-if="response_data">{{response_data.detailInfo.support_language}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>发行国家/地区</span>
              <span v-if="response_data">{{response_data.publishCountries}}</span>
              <span v-else>无</span>
            </div>
            <div>
              <span>内容评级</span>
              <span v-if="response_data">{{response_data.detailInfo.content_grade}}</span>
              <span v-else>无</span>
            </div>
          </div>
        </section>
        <!-- 第六部分 -->
        <!-- 第六部分 -->
        <!-- 第六部分 -->
        <section class="like">
          <div class="section_title">你可能还喜欢</div>
          <div class="section_content" v-if="response_data">
            <div
              class="block"
              v-for="(mayLoveApp_item,index) in response_data.mayLoveApp"
              :key="'mayLoveApp'+index"
            >
              <img :src="mayLoveApp_item.icon" alt />
              <span>{{mayLoveApp_item.appName}}</span>
            </div>
          </div>
          <div class="section_content" v-else>无</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// import $ from 'jquery'
// import '../common/country_select/select_gj.css'
// import '../common/country_select/select_gj.min.js'
// import '../common/country_select/select2_1.js'
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
        sources: [],
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
      radio01: 'iPhone', //第二部分
      radio02: 'iPhone', //第三部分
      // 请求的数据
      response_data: null,
      now_country: '中国'
    }
  },
  created: function() {
    this.get_data()
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data()
    })
  },

  methods: {
    // 获取数据并且设置到视频插件的配置项
    onPlayerPlay(videoUrl_item) {
      let arr = []
      function NewObj(videoSrc) {
        this.src = videoSrc
        this.type = 'application/x-mpegURL'
      }
      videoUrl_item.forEach(element => {
        arr.push(new NewObj(element.video))
      })
      this.playerOptions.sources = arr
      // console.log(this.playerOptions.sources)
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

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data = response.data.Data
              // 获取数据并且设置到视频插件的配置项
              this.onPlayerPlay(this.response_data.videoUrl.iphone)
              console.log(this.response_data)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log('version_message' + this.now_country)
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
