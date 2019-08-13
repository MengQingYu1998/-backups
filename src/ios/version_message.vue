<template>
  <div id="version_message" class="content">
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
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
                v-for="(item ,index) in response_data"
                :key="index"
                :timestamp="format(item.publishTime)"
                placement="top"
                color="#fff"
                icon="el-icon-time"
                size="large"
              >
                <div class="time_line_item_title">版本{{item.versionNum}}</div>
                <div class="time_line_item">
                  <div class="img_description">
                    <img :src="item.Icon" alt />
                    <div class="img_description_child">
                      <div>{{item.appName}}</div>
                      <div>{{item.subtitle}}</div>
                    </div>
                  </div>
                  <div class="time_line_item_content">
                    <div v-html="item.updateLog" :id="'show_more'+index"></div>
                  </div>
                  <div
                    class="show_all"
                    :id="'show_hide'+index"
                    @click="show_more_function('show_more'+index,'show_hide'+index)"
                  >展开更多</div>
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
// 引入工具类
import { myTime } from '../common/util.js'
export default {
  name: 'version_message',
  components: { ios_header, left_nav },
  data() {
    return {
      // 顶部搜索框
      input1: '',

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
    this.$watch('input1', function(newValue, oldValue) {
      this.get_data()
    })
  },
  methods: {
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
          let timeOrVerNum =
            this.input1 == '' ? '&timeOrVerNum' : '&timeOrVerNum=' + this.input1
          // console.log(country_id)
          let appId = this.$store.state.now_app_id
          console.log(appId)

          let url =
            '/GetVersionLogs?countryId=' +
            country_id +
            timeOrVerNum +
            // '&appId=281736535'
            '&appId=' +
            appId

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data = response.data.Data
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
    show_more_function(parm, parm02) {
      let this_div02 = document.getElementById(parm02) //展开收起
      let this_div = document.getElementById(parm) //内容
      console.log(this_div02.innerHTML)
      if (this_div02.innerHTML == '展开更多') {
        this_div.style.height = 'auto'
        this_div.style.display = 'block'
        this_div02.innerHTML = '收起'
      } else if (this_div02.innerHTML == '收起') {
        this_div.style.height = '63px'
        this_div.style.display = '-webkit-box '
        this_div02.innerHTML = '展开更多'
      }
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log('version_message' + this.now_country)
    },
    format(parm) {
      // console.log(parm)
      return myTime(parm)
    }
  }
}
</script>
<style scoped>
.show_all {
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #009bef;
  text-align: right;
  margin-right: 30px;
  margin-top: 3px;
  /* background-color: #ffffff; */
  position: absolute;
  right: 3px;
  bottom: 19px;
}
.time_line_item_content div {
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 62px;
}
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
  padding: 21px 16px 40px 15px;
  margin-top: 20px;
  word-wrap: break-word;
  word-break: normal;
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
  border-radius: 10px;
  border: solid 1px #f2f2f2;
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
  margin-bottom: 31px;
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
