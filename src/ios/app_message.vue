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
            :class="{'section_content':true}"
            id="section_content"
            v-if="response_data"
            v-html="response_data.description"
          ></div>
          <div id="show_all" @click="show_more_function()" v-show="show_all">展开更多</div>
        </section>
        <!-- 第二部分 -->
        <!-- 第二部分 -->
        <!-- 第二部分 -->

        <section class="video" v-if="response_data">
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
              <div v-for="(item,index) in response_data.videoUrl.iphone" :key="'video00'+index">
                <video-player
                  cross-origin="*"
                  v-if="response_data.videoUrl.iphone!='无'&&radio01=='iPhone'"
                  class="video_iPhone video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions[index]"
                ></video-player>
              </div>
              <!-- iPad 的video -->
              <div v-for="(item,index) in response_data.videoUrl.ipad" :key="'video01'+index">
                <video-player
                  cross-origin="*"
                  v-if="response_data.videoUrl.ipad!='无'&&radio01=='iPad'"
                  class="video_iPad video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions[index]"
                ></video-player>
              </div>
              <!-- watch 的video -->
              <div v-for="(item,index) in response_data.videoUrl.watch" :key="'video02'+index">
                <video-player
                  cross-origin="*"
                  v-if="response_data.videoUrl.watch!='无'&&radio01=='watch'"
                  class="video_watch video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions[index]"
                ></video-player>
              </div>
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
          <div class="section_title">您可能还喜欢</div>
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
        <!-- 暂无数据 -->
        <!-- 暂无数据 -->
        <div class="no_data_img" v-if="no_data_img">
          <img src="../assets/ios/null.png" alt />
          <div>暂无相关数据</div>
        </div>
        <!-- 暂无数据 -->
        <!-- 暂无数据 -->
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
      no_data_img: false,
      // 播放m3u8格式的视频插件
      show_all: false,
      playerOptions: [],
      //单选按钮
      radio01: 'iPhone', //第二部分 视频
      radio02: 'iPhone', //第三部分 截图
      // 请求的数据
      response_data: null,
      now_country: '中国'
    }
  },
  created: function() {
    this.get_data()
    //'当前国家发生变化，重新请求数据...'

    this.$watch('now_country', function(newValue, oldValue) {
      this.$store.state.now_country_name = this.now_country
      this.get_data()
    })
    this.$watch('radio01', function(newValue, oldValue) {
      this.get_data()
    })
  },
  mounted() {},
  methods: {
    // 获取数据并且设置到视频插件的配置项
    onPlayerPlay(videoUrl_item) {
      // console.log(videoUrl_item)
      if (videoUrl_item == '无') {
        return false
      }
      videoUrl_item.forEach((element, index) => {
        let arr = new Array()
        function NewObj(videoSrc) {
          this.src = videoSrc
          this.type = 'application/x-mpegURL'
        }
        arr.push(new NewObj(element.video))
        let playerOption = new Object()
        playerOption.playbackRates = [0.7, 1.0, 1.5, 2.0] //播放速度
        playerOption.autoplay = false //如果true,浏览器准备好时开始回放。
        playerOption.muted = false //默认情况下将会消除任何音频。
        playerOption.loop = false //导致视频一结束就重新开始。
        playerOption.preload = 'auto' //建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        playerOption.language = 'zh-CN'
        playerOption.aspectRatio = '16:9' // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        playerOption.fluid = true // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        playerOption.poster = element.preview //你的封面地址
        playerOption.controlBar = {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false //全屏按钮
        }
        playerOption.sources = arr
        this.playerOptions.push(playerOption)
      })
      // console.log(this.playerOptions)
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
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              // console.log(response)
              if (response.data.Data) {
                this.no_data_img = false
                this.response_data = response.data.Data

                // 判断展开收起更多的按钮是否出现 小于125px 则不出现
                this.$nextTick(() => {
                  console.log(
                    window
                      .getComputedStyle(
                        document.getElementById('section_content'),
                        null
                      )
                      .getPropertyValue('height')
                  )
                  if (
                    parseInt(
                      window
                        .getComputedStyle(
                          document.getElementById('section_content'),
                          null
                        )
                        .getPropertyValue('height')
                    ) >= 140
                  ) {
                    this.show_all = true
                  } else {
                    this.show_all = false
                  }
                })
                // 判断展开收起更多的按钮是否出现

                // 获取数据并且设置到视频插件的配置项
                if (this.radio01 == 'iPhone') {
                  this.onPlayerPlay(this.response_data.videoUrl.iphone)
                } else if (this.radio01 == 'iPad') {
                  this.onPlayerPlay(this.response_data.videoUrl.ipad)
                } else if (this.radio01 == 'watch') {
                  this.onPlayerPlay(this.response_data.videoUrl.watch)
                }
              } else {
                this.no_data_img = true
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
        this_div.style.display = '-webkit-box'
        this_div02.innerHTML = '展开更多'
      }
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log('app_message' + this.now_country)
    },
    go_to_page01(parm, parm02) {
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_id = parm
      this.$router.push({
        path: '/now_ranking'
      })
    }
  }
}
</script>
<style scoped>
.section_img img {
  border: 1px solid #f2f2f2;
}

#version_message {
  padding-bottom: 53px;
}
#section_content {
  -webkit-line-clamp: 7;
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
  overflow: hidden;
}
.video_watch {
  width: 340px;
  height: 272px;
  overflow: hidden;
}

.video_iPhone {
  width: 225px;
  height: 399px;
  overflow: hidden;
  margin-left: 30px;
}
.like .section_content {
  flex-wrap: wrap;
  display: flex;
}
.like .block span {
  width: 60px;
  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.block img {
  width: 68px;
  height: 68px;
  border-radius: 10px;
  border: solid 1px #f7f7f7;
}

.message .section_content {
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
  padding-bottom: 15px;
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
  font-weight: 600 !important;
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
/* .section_video_flex > div:first-child > div {
  margin-left: 0;
} */
.section_video_flex > div > div {
  margin-left: 20px;
}
.section_video_flex {
  display: flex;
  margin-left: -20px;
  width: 995px;
  overflow-x: auto;
  padding-bottom: 15px;
}

.section_content {
  font-size: 14px;
  line-height: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
}
.section_title {
  font-weight: 600 !important;
  font-size: 16px;
  line-height: 16px;
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
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
.breadcrumb span:first-child {
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
.no_data_img {
  width: 857px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 13px;
  letter-spacing: 0px;
  color: #555555;
}
.no_data_img img {
  width: 210px;
  margin-top: 153px;
}
</style>
