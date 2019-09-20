<template>
  <div id="goods_show" class="content">
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <div class="right_nav">竞品概览</div>
        <div class="line"></div>
        <img class="loading_gif" src="../assets/ios/loading.gif" v-show="loading_gif" />
        <table v-show="!loading_gif">
          <thead>
            <tr>
              <th>应用</th>
              <th>总榜排名</th>
              <th>分类排名</th>
              <th>关键词覆盖数</th>
              <th>当前版本评分</th>
              <th>所有版本评分</th>
              <th>竞品对比&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody v-if="response_data!=null">
            <tr v-for="(item,index) in response_data.data_0" :key="'tabless'+index">
              <td>
                <div class="use">
                  <div>{{index+1}}</div>
                  <div>
                    <img
                      :src="item.icon"
                      class="pointer"
                      @click="go_to_page01(item.appId,item.appName)"
                      alt
                    />
                  </div>
                  <div>
                    <div
                      class="app_name pointer"
                      @click="go_to_page01(item.appId,item.appName)"
                    >{{item.appName}}>{{item.appName}}</div>
                    <div class="now_app" v-show="index==0">当前应用</div>
                    <div class="rankingChangeFontColor app_subtitle">{{item.publisher}}</div>
                  </div>
                </div>
              </td>

              <td>
                <div class="rankingChangeFontColor" v-if="item.rank_a">{{item.rank_a.rankID}}</div>
                <div class="rankingChangeFontColor" v-else>- -</div>
                <div class="rankingChangeFontColor" v-if="item.rank_a">{{item.rank_a.genreName}}</div>
                <div class="rankingChangeFontColor" v-else>- -</div>
              </td>
              <td>
                <div class="rankingChangeFontColor" v-if="item.rank_b">{{item.rank_b.rankID}}</div>
                <div class="rankingChangeFontColor" v-else>- -</div>
                <div class="rankingChangeFontColor" v-if="item.rank_b">{{item.rank_b.genreName}}</div>
                <div class="rankingChangeFontColor" v-else>- -</div>
              </td>
              <td class="rankingChangeFontColor">{{item.keywordCover}}</td>
              <td>
                <div class="rankingChangeFontColor">{{item.currentcomment.num}}</div>
                <div class="rankingChangeFontColor">{{item.currentcomment.rating}}</div>
              </td>
              <td>
                <div class="rankingChangeFontColor">{{item.comment.num}}</div>
                <div class="rankingChangeFontColor">{{item.comment.rating}}</div>
              </td>
              <td class="operation">
                <div>
                  <div v-show="index==0">当前应用</div>
                  <div
                    v-show="index!=0"
                    class="pointer"
                    @click="go_to_page03(item.appId,item.appName)"
                  >实时排名</div>
                  <div v-show="index!=0" class="pointer" @click="go_to_page02(item.appId)">关键词</div>
                </div>
                <img
                  :class="{opacity_0:index==0}"
                  src="../assets/ios/compare_del.png"
                  @click="remove_data(index)"
                  alt
                />
              </td>
            </tr>
            <tr class="disable_hover" v-show="response_data.data_0.length==0">
              <td colspan="7">暂无相关数据</td>
            </tr>
          </tbody>
        </table>
        <!-- ================================ -->
        <div class="section_title">竞品推荐</div>
        <img class="loading_gif" src="../assets/ios/loading.gif" v-show="loading_gif" />
        <table v-show="!loading_gif">
          <thead>
            <tr>
              <th>应用</th>
              <th>总榜排名</th>
              <th>分类排名</th>
              <th>关键词覆盖数</th>
              <th>当前版本评分</th>
              <th>所有版本评</th>
              <th>竞品对比</th>
            </tr>
          </thead>
          <tbody v-if="response_data!=null">
            <tr v-for="(item,index) in response_data.data_1" :key="'tablessss'+index">
              <td>
                <div class="use">
                  <div>{{index+1}}</div>
                  <div>
                    <img
                      :src="item.icon"
                      class="pointer"
                      @click="go_to_page01(item.appId,item.appName)"
                      alt
                    />
                  </div>
                  <div>
                    <div
                      class="app_name pointer"
                      @click="go_to_page01(item.appId,item.appName)"
                    >{{item.appName}}</div>
                    <!-- <div class="now_app">当前应用</div> -->
                    <div class="rankingChangeFontColor app_subtitle">{{item.publisher}}</div>
                  </div>
                </div>
              </td>

              <td>
                <div class="rankingChangeFontColor" v-if="item.rank_a">{{item.rank_a.rankID}}</div>
                <div class="rankingChangeFontColor" v-else>- -</div>
                <div class="rankingChangeFontColor" v-if="item.rank_a">{{item.rank_a.genreName}}</div>
                <div class="rankingChangeFontColor" v-else>- -</div>
              </td>
              <td>
                <div class="rankingChangeFontColor" v-if="item.rank_b">{{item.rank_b.rankID}}</div>
                <div class="rankingChangeFontColor" v-else>- -</div>
                <div class="rankingChangeFontColor" v-if="item.rank_b">{{item.rank_b.genreName}}</div>
                <div class="rankingChangeFontColor" v-else>- -</div>
              </td>
              <td class="rankingChangeFontColor">{{item.keywordCover}}</td>
              <td>
                <div class="rankingChangeFontColor">{{item.currentcomment.num}}</div>
                <div class="rankingChangeFontColor">{{item.currentcomment.rating}}</div>
              </td>
              <td>
                <div class="rankingChangeFontColor">{{item.comment.num}}</div>
                <div class="rankingChangeFontColor">{{item.comment.rating}}</div>
              </td>
              <td>
                <img src="../assets/ios/ios_add_blue.png" @click="add_data(index)" alt />
              </td>
            </tr>
            <tr class="disable_hover" v-show="response_data.data_1.length==0">
              <td colspan="7">暂无相关数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// 引入工具类
import { formatDate } from '../common/util.js'
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'goods_show',
  components: { ios_header, left_nav },
  data() {
    return {
      loading_gif: false,
      response_data: null,
      now_country: '中国'
    }
  },
  created: function() {
    this.get_data()

    this.$watch('now_country', function(newValue, oldValue) {
      // console.log('当前国家发生变化，重新请求数据...')
      this.$store.state.now_country_name = this.now_country
      this.get_data()
    })
  },
  methods: {
    // 请求数据
    get_data() {
      this.loading_gif = true
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

          let url =
            '/GetCompetingProducts?appId=' +
            this.$store.state.now_app_id +
            '&countryID=' +
            country_id +
            '&device=' +
            1 +
            '&date=' +
            formatDate(new Date(), 'yyyy-MM-dd')
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              if (response.data.Code == 0) {
                this.loading_gif = false
                this.response_data = response.data.Data

                // console.log(99999999999999999999999999)
                // console.log(this.response_data)
                // console.log(response)
              } else {
                this.loading_gif = false
                this.response_data = null
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
    add_data(index) {
      this.response_data.data_0.push(this.response_data.data_1[index])
      this.response_data.data_1.splice(index, 1)
    },
    remove_data(index) {
      if (index == 0) {
        return false
      }
      this.response_data.data_1.unshift(this.response_data.data_0[index])
      this.response_data.data_0.splice(index, 1)
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
      this.$store.state.now_app_id02 = parm
      this.$store.state.now_app_name = parm02
    },
    go_to_page02(parm) {
      this.$router.push({
        path: '/cover_compare'
      })
      this.$store.state.now_app_id02 = parm
      this.$store.state.now_app_id = this.$store.state.now_app_id
    },
    go_to_page03(parm, parm02) {
      this.$router.push({
        path: '/ranking_compare?app_name02=' + parm02
      })
      this.$store.state.now_app_id = this.$store.state.now_app_id
      this.$store.state.now_app_id02 = parm
    }
  }
}
</script>
<style scoped>
.loading_gif {
  margin: 0 auto;
  width: 50px;
  height: 50px;
  margin-left: 47%;
  margin-top: 50px;
  margin-bottom: 50px;
}
.opacity_0 {
  opacity: 0;
}
td {
  height: 100px;
  box-sizing: border-box;
}
.app_subtitle {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  width: 179px;
  height: 18px;
}

.app_name:hover {
  color: #009bef;
}
.app_name {
  height: 23px;
  width: 122px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.use img {
  border: solid 1px #f2f2f2;
}
.use > div:nth-child(1) {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #888888;
}
tbody > tr:nth-child(1) .use > div:nth-child(1),
tbody > tr:nth-child(2) .use > div:nth-child(1),
tbody > tr:nth-child(3) .use > div:nth-child(1) {
  font-family: SourceHanSansCN-Bold;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #222222;
}
.section_title {
  margin-top: 50px;
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
.operation > img {
  margin-left: 21px;
}
.operation {
  display: flex;
  align-items: center;
  /* margin-top: 8px; */
  justify-content: center;
  height: 100px;
}
.operation > div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.operation > div > div:last-child {
  margin-bottom: 0px;
}
.operation > div > div {
  width: 62px;
  height: 26px;
  border-radius: 4px;
  border: solid 1px #009bef;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #009bef;
  margin-bottom: 9px;
}
.now_app {
  width: 58px;
  height: 20px;
  background-color: #f5fcff;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #009bef;
  position: absolute;
  right: -115px;
  top: 1px;
}
.rankingChangeFontColor {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}

.use img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-left: 16px;
  margin-right: 9px;
}
.use {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 20px;
  box-sizing: border-box;
  width: 160px;
}
thead tr {
  height: 40px;
}

tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
thead {
  width: 1200px;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-bottom: 50px;
}
.right {
  padding-left: 57px;
  position: relative;
}
.line {
  width: 985px;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
}
.right_nav {
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  border-bottom: 1px solid #009bef;
  width: 100px;
  text-align: center;
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
.disable_hover {
  border-bottom: solid 1px #f2f2f2;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #bfbfbf;
}
.disable_hover :hover {
  background-color: #fff !important;
}
</style>
