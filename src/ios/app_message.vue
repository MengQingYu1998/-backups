<template>
  <div id="version_message" class="content">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>学习强国</span>
    </div>
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
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
        </section>
        <!-- 第二部分 -->
        <!-- 第二部分 -->
        <!-- 第二部分 -->

        <section
          class="video"
          v-if="!response_data||response_data.videoUrl.iphone!='无'||response_data.videoUrl.ipad!='无'||response_data.videoUrl.watch!='无'"
        >
          <div class="section_title">应用视频</div>
          <div class="section_video">
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
              <!-- 测试video -->
              <!-- <video
                data-setup="{}"
                class="video_iPhone video-js vjs-default-skin"
                preload="auto"
                controls="controls"
                id="my-video"
              >
                <source
                  src="https://apptrailers-ssl.itunes.apple.com/itunes-assets/PurpleVideo128/v4/76/69/9b/76699b57-ae9e-e8ac-8aec-6756e068b688/P49805176_default.m3u8"
                  type="application/x-mpegURL"
                />
              </video>-->
              <!-- iphone 的video -->
              <video
                v-show="response_data.videoUrl.iphone!='无'"
                data-setup="{}"
                v-for="(videoUrl_item,index) in response_data.videoUrl.iphone"
                :key="'videoUrl_item_iphone'+index"
                class="video_iPhone video-js vjs-default-skin"
                preload="auto"
                :poster="videoUrl_item.preview"
                controls="controls"
                :id="'my-video-iphone'+index"
              >
                <source :src="videoUrl_item.video" type="application/x-mpegURL" />
              </video>
              <!-- iPad 的video -->
              <video
                v-show="response_data.videoUrl.ipad!='无'"
                data-setup="{}"
                v-for="(videoUrl_item,index) in response_data.videoUrl.ipad"
                :key="'videoUrl_item_iPad'+index"
                class="video_iPhone video-js vjs-default-skin"
                preload="auto"
                :poster="videoUrl_item.preview"
                controls="controls"
                :id="'my-video-ipad'+index"
              >
                <source :src="videoUrl_item.video" type="application/x-mpegURL" />
              </video>
              <!-- watch 的video -->
              <video
                v-show="response_data.videoUrl.watch!='无'"
                data-setup="{}"
                v-for="(videoUrl_item,index) in response_data.videoUrl.watch"
                :key="'videoUrl_item_watch'+index"
                class="video_iPhone video-js vjs-default-skin"
                preload="auto"
                :poster="videoUrl_item.preview"
                controls="controls"
                :id="'my-video-watch'+index"
              >
                <source :src="videoUrl_item.video" type="application/x-mpegURL" />
              </video>
            </div>
          </div>
        </section>
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <section
          class="screenshot"
          v-if="!response_data||response_data.prtscrUrl.iphone!='无'||response_data.prtscrUrl.ipad!='无'||response_data.prtscrUrl.watch!='无'"
        >
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
        <section class="font">
          <div class="section_title">宣传文本</div>
          <div class="section_content" v-if="response_data">{{response_data.advertisingText}}</div>
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
            </div>
            <div>
              <span>更新日期</span>
              <span v-if="response_data">{{response_data.appUpdateTime}}</span>
            </div>
            <div>
              <span>Bundle ID</span>
              <span v-if="response_data">{{response_data.bundleId}}</span>
            </div>
            <div>
              <span>版本</span>
              <span v-if="response_data">{{response_data.latestVersion}}</span>
            </div>
            <div>
              <span>大小</span>
              <span v-if="response_data">{{response_data.appSize}}</span>
            </div>
            <div>
              <span>是否支持Watch</span>
              <span v-if="response_data">{{response_data.detailInfo.is_support_iwatch?'支持':'不支持'}}</span>
            </div>
            <div>
              <span>家人共享</span>
              <span v-if="response_data">{{response_data.detailInfo.family_share}}</span>
            </div>
            <div>
              <span>支持网站</span>
              <span v-if="response_data">{{response_data.detailInfo.support_url}}</span>
            </div>
            <div>
              <span>开发者网站</span>
              <span v-if="response_data">{{response_data.detailInfo.developer_url}}</span>
            </div>
            <div>
              <span>兼容性</span>
              <span v-if="response_data">{{response_data.detailInfo.compatibility_ios}}</span>
            </div>
            <div>
              <span>支持语言</span>
              <span v-if="response_data">{{response_data.detailInfo.support_language}}</span>
            </div>
            <div>
              <span>发行国家/地区</span>
              <span v-if="response_data">{{response_data.publishCountries}}</span>
            </div>
            <div>
              <span>内容评级</span>
              <span v-if="response_data">{{response_data.detailInfo.content_grade}}</span>
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
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// 引入播放m3u8格式的视频插件
import videojs from 'video.js'
import 'videojs-contrib-hls'
export default {
  name: 'version_message',
  components: { ios_header, left_nav },
  data() {
    return {
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

  mounted: function() {},
  methods: {
    // 初始化videojs插件
    videojs_function() {
      videojs(
        'my-video-iphone0',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-iphone1',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-iphone2',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-iphone3',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-iphone4',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-iphone5',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-ipad0',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-ipad1',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-ipad2',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-ipad3',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-ipad4',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-ipad5',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-watch0',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-watch1',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-watch2',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-watch3',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-watch4',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
      videojs(
        'my-video-watch5',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true
        },
        function() {
          this.play()
        }
      )
    },
    // 请求数据
    get_data() {
      this.$axios
        .get('http://39.97.234.11:8080/GetCountry')
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

          console.log('country_id' + country_id)
          let url =
            'http://39.97.234.11:8080/GetAppInfo?countryId=' +
            country_id +
            '&appId=281736535'

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data = response.data.Data
              this.videojs_function()
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
    // 格式化时间
    // format(parm) {
    //   // console.log(parm)
    //   return myTime(parm)
    // }
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
video {
  border: solid 1px #f2f2f2;
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
