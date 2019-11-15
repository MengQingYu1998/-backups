<template>
  <div id="goods_show">
    <div class="content">
      <!-- 自定义组件 -->
      <ios_header @childFn="parentFn" />
      <div class="left_and_right">
        <div class="left">
          <left_nav />
        </div>
        <div class="right">
          <div class="right_nav">竞品概览</div>
          <div class="line"></div>
          <!-- 用户没有登录的状态 -->
          <!-- 用户没有登录的状态 -->
          <div class="is_login" v-if="!is_login">
            <img src="../assets/ios/no_data.png" alt />
            <span>您暂时还未登录，请先登录后查看</span>
            <div>
              <span @click="$router.push('/login')">登录</span>
              <span @click="$router.push('/register')">注册</span>
            </div>
          </div>
          <!-- 用户没有登录的状态 -->
          <!-- 用户没有登录的状态 -->
          <div v-else>
            <div v-loading="loading" element-loading-spinner="el-icon-loading">
              <table>
                <thead>
                  <tr>
                    <th>应用</th>
                    <th>总榜排名</th>
                    <th>分类排名</th>
                    <th>关键词覆盖数</th>
                    <th>当前版本评分</th>
                    <th>所有版本评分</th>
                    <th class="width_th01">竞品对比</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in response_data_top&&response_data_top"
                    :key="'tabless'+index"
                  >
                    <td class="www_width01">
                      <div class="use">
                        <div>{{index+1}}</div>
                        <div>
                          <img
                            :src="item.icon"
                            class="pointer"
                            @click="go_to_page01(item.appId)"
                            alt
                          />
                        </div>
                        <div>
                          <div
                            class="app_name pointer"
                            @click="go_to_page01(item.appId)"
                          >{{item.appName}}>{{item.appName}}</div>
                          <div class="rankingChangeFontColor app_subtitle">{{item.publisher}}</div>
                        </div>
                      </div>
                    </td>

                    <td class="www_width10">
                      <div
                        class="rankingChangeFontColor font_size_15"
                        v-if="item.rank_a"
                      >{{item.rank_a.rankID}}</div>
                      <div class="rankingChangeFontColor font_size_15" v-else>-</div>
                      <div
                        class="rankingChangeFontColor letter_spacing_1 mt_1"
                        v-if="item.rank_a"
                      >{{item.rank_a.genreName}}</div>
                      <div class="rankingChangeFontColor" v-else>-</div>
                    </td>
                    <td class="www_width02">
                      <div
                        class="rankingChangeFontColor font_size_15"
                        v-if="item.rank_b"
                      >{{item.rank_b.rankID}}</div>
                      <div class="rankingChangeFontColor font_size_15" v-else>-</div>
                      <div
                        class="rankingChangeFontColor letter_spacing_1 mt_1"
                        v-if="item.rank_b"
                      >{{item.rank_b.genreName}}</div>
                      <div class="rankingChangeFontColor" v-else>-</div>
                    </td>
                    <td
                      class="rankingChangeFontColor font_size_14 www_width03"
                    >{{item.keywordCover}}</td>
                    <td class="www_width03">
                      <div class="rankingChangeFontColor font_size_15">{{item.currentcomment.num}}</div>
                      <div class="rankingChangeFontColor mt_1">{{item.currentcomment.rating}}</div>
                    </td>
                    <td class="www_width03">
                      <div class="rankingChangeFontColor font_size_15">{{item.comment.num}}</div>
                      <div class="rankingChangeFontColor mt_1">{{item.comment.rating}}</div>
                    </td>
                    <td class="width_td01">
                      <div class="operation">
                        <div>
                          <div v-show="index==0">当前应用</div>
                          <div
                            v-show="index!=0"
                            class="pointer"
                            @click="go_to_page03(item.appId)"
                          >实时排名</div>
                          <div
                            v-show="index!=0"
                            class="pointer"
                            @click="go_to_page02(item.appId)"
                          >关键词</div>
                        </div>
                        <img
                          :class="{opacity_0:index==0}"
                          src="../assets/ios/compare_del.png"
                          @click="remove_data(index,item.appId)"
                          alt
                        />
                      </div>
                    </td>
                  </tr>
                  <tr class="disable_hover" v-show="response_data_top&&response_data_top.length==0">
                    <td colspan="7">暂无相关数据</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- ================================ -->
            <div class="section_title">竞品推荐</div>
            <div v-loading="loading02" element-loading-spinner="el-icon-loading">
              <table>
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
                <tbody>
                  <tr
                    v-for="(item,index) in response_data_bottom&&response_data_bottom"
                    :key="'tablessss'+index"
                  >
                    <td class="tbody02_td01">
                      <div class="use">
                        <div>{{index+1}}</div>
                        <div>
                          <img
                            :src="item.icon"
                            class="pointer"
                            @click="go_to_page01(item.appId)"
                            alt
                          />
                        </div>
                        <div>
                          <div
                            class="app_name pointer"
                            @click="go_to_page01(item.appId)"
                          >{{item.appName}}</div>
                          <div class="rankingChangeFontColor app_subtitle">{{item.publisher}}</div>
                        </div>
                      </div>
                    </td>

                    <td class="tbody02_td02">
                      <div
                        class="rankingChangeFontColor font_size_15"
                        v-if="item.rank_a"
                      >{{item.rank_a.rankID}}</div>
                      <div class="rankingChangeFontColor font_size_15" v-else>-</div>
                      <div
                        class="rankingChangeFontColor letter_spacing_1 mt_1"
                        v-if="item.rank_a"
                      >{{item.rank_a.genreName}}</div>
                      <div class="rankingChangeFontColor" v-else>-</div>
                    </td>
                    <td class="tbody02_td03">
                      <div
                        class="rankingChangeFontColor font_size_15"
                        v-if="item.rank_b"
                      >{{item.rank_b.rankID}}</div>
                      <div class="rankingChangeFontColor font_size_15" v-else>-</div>
                      <div
                        class="rankingChangeFontColor letter_spacing_1 mt_1"
                        v-if="item.rank_b"
                      >{{item.rank_b.genreName}}</div>
                      <div class="rankingChangeFontColor" v-else>-</div>
                    </td>
                    <td
                      class="rankingChangeFontColor font_size_14 tbody02_td04"
                    >{{item.keywordCover}}</td>
                    <td class="tbody02_td05">
                      <div class="rankingChangeFontColor font_size_15">{{item.currentcomment.num}}</div>
                      <div class="rankingChangeFontColor mt_1">{{item.currentcomment.rating}}</div>
                    </td>
                    <td class="tbody02_td06">
                      <div class="rankingChangeFontColor font_size_15">{{item.comment.num}}</div>
                      <div class="rankingChangeFontColor mt_1">{{item.comment.rating}}</div>
                    </td>
                    <td class="tbody02_td07">
                      <img
                        src="../assets/ios/ios_add_blue.png"
                        @click="add_data(index,item.appId)"
                        alt
                      />
                    </td>
                  </tr>
                  <tr
                    class="disable_hover"
                    v-show="response_data_bottom&&response_data_bottom.length==0"
                  >
                    <td colspan="7">暂无相关数据</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
    return { now_app_id: null,
      is_login: false,
      loading: false,
      loading02: false,
      response_data_bottom: null,
      response_data_top: null,
      now_country: '中国'
    }
  },
   watch: {
    $route(to, from) {
      this.$route.query.now_country
        ? (this.now_country = this.$route.query.now_country)
        : (this.now_country = "中国");
      this.$route.query.now_app_id
        ? (this.now_app_id = this.$route.query.now_app_id)
        : (this.now_app_id = null);
      this.get_data_top()
    this.get_data_bottom()
    }
  },
  created: function() {
    if (localStorage.getItem('userId')) {
      this.is_login = true
    } else {
      this.is_login = false
    }
      this.$route.query.now_country
        ? (this.now_country = this.$route.query.now_country)
        : (this.now_country = "中国");
      this.$route.query.now_app_id
        ? (this.now_app_id = this.$route.query.now_app_id)
        : (this.now_app_id = null);
    this.get_data_top()
    this.get_data_bottom()

    this.$watch("now_country", function(newValue, oldValue) {
      let that=this
      this.$router.push({
        path:
          "/goods_show?now_country=" +
          that.now_country +
          "&now_app_id=" +
          that.now_app_id
      });
    });
  },
  methods: {
    // 请求数据
    get_data_bottom() {
      this.loading02 = true
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
            this.now_app_id +
            '&countryID=' +
            country_id +
            '&device=' +
            1 +
            '&date=' +
            formatDate(new Date(), 'yyyy-MM-dd')+'&accountId=' +
            localStorage.getItem('userId') //获取userId
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.loading02 = false
              if (response.data.Code == 0) {
                this.response_data_bottom = response.data.Data.data_1
                // console.log(88888888888)
                // console.log(this.response_data_bottom)
              } else {
                this.response_data_bottom = null
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
    // 请求数据
    get_data_top() {
      this.loading = true
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
            '/GetCompetingAppRelation?appId=' +
            this.now_app_id +
            '&countryID=' +
            country_id +
            '&accountId=' +
            localStorage.getItem('userId') //获取userId
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.loading = false
              if (response.data.Code == 0) {
                this.response_data_top = response.data.Data

                console.log(9999999999999)
                console.log(this.response_data_top)
              } else {
                this.response_data_top = null
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
    add_data(index, CompetingAppId) {
      this.response_data_top.push(this.response_data_bottom[index])
      this.response_data_bottom.splice(index, 1)

      let that = this
      let data = {
        appId: that.now_app_id,
        CompetingAppId: CompetingAppId,
        accountId: localStorage.getItem('userId')
      }
      // console.log(url)
      // 请求数据
      this.$axios
        .post('/AddCompetingApp', data)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    remove_data(index, CompetingAppId) {
      if (index == 0) {
        return false
      }
      this.response_data_bottom.unshift(this.response_data_top[index])
      this.response_data_top.splice(index, 1)
      let that = this
      let data = {
        appId: that.now_app_id,
        CompetingAppId: CompetingAppId,
        accountId: localStorage.getItem('userId')
      }
      // console.log(url)
      // 请求数据
      this.$axios
        .post('/DelCompetingApp', data)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log('version_message' + this.now_country)
    },
    go_to_page01(parm) {
         let that = this;
      let routerUrl = this.$router.resolve({
        path: "/now_ranking",
        query: { now_country: that.now_country, now_app_id: parm }
      });
      window.open(routerUrl.href, "_blank");
    },
    go_to_page02(parm) {
    
         let that = this;
      let routerUrl = this.$router.resolve({
        path: "/cover_compare",
       query: { now_country: that.now_country, now_app_id: that.now_app_id, now_app_id02: parm }
      });
      window.open(routerUrl.href, "_blank");
    },
    go_to_page03(parm) {
      
         let that = this;
      let routerUrl = this.$router.resolve({
        path: "/ranking_compare",
        query: { now_country: that.now_country, now_app_id: that.now_app_id, now_app_id02: parm }
      });
      window.open(routerUrl.href, "_blank");

     
    }
  }
}
</script>
<style scoped  lang="less">
.tbody02_td07 img {
  width: 18px;
  height: 18px;
}
.www_width03 {
  width: 99px;
  /* background-color: blue; */
}
.www_width10 {
  width: 88px;
}
.www_width01 {
  width: 282px;
  /* background-color: red; */
}
.www_width02 {
  width: 100px;
  /* background-color: red; */
}
.tbody02_td01 {
  /* background-color: red; */
  width: 282px;
}
.tbody02_td02 {
  width: 100px;
  /* background-color: red; */
}
.tbody02_td03 {
  width: 135px;
  /* background-color: blue; */
}

.width_th01 {
  text-align: left;
  padding-left: 24px;
}
.width_td01 {
  width: 100px !important;
}
.mt_1 {
  margin-top: 5px;
}
.font_size_14 {
  font-size: 14px !important;
  color: #222 !important;
}
.letter_spacing_1 {
  letter-spacing: 1px !important;
}
.font_size_15 {
  font-size: 15px !important;
  color: #222 !important;
}

.opacity_0 {
  opacity: 0;
}
td {
  height: 76px;
  box-sizing: border-box;
}
.app_subtitle {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  width: 179px;
  height: 18px;
  margin-top: 3px;
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
  margin-top: 1px;
  text-align: left;
}

.use > div:nth-child(1) {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #222;
}

.section_title {
  margin-top: 50px;
  font-weight: 600 !important;
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
  width: 18px;
  height: 18px;
}
.operation {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
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

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #009bef;
  margin-bottom: 9px;
}

.rankingChangeFontColor {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}

.use img {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  border: solid 1px #f2f2f2;
  box-sizing: border-box;
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
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
table {
  width: 100%;
  border: solid 1px #eaeaea;
  text-align: center;
  margin-bottom: 50px;
}
.right {
  width: 100%;
  background-color: #fff;
  margin-left: 14px;
  padding: 25px 20px;
  padding-bottom: 0;
  box-sizing: border-box;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #d6d6d6;
  margin-bottom: 22px;
  margin-top: -1px;
}
.right_nav {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  border-bottom: 2px solid #009bef;
  width: 100px;
  text-align: center;
  position: relative;
}
.left_and_right {
  display: flex;
  margin-top: 14px;
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
.disable_hover {
  border-bottom: solid 1px #f2f2f2;
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
#goods_show {
  background-color: #f4f4f4;
  padding-bottom: 50px;
}
.left {
  width: 231px;
  position: relative;
  min-height: 621px;
}
.is_login {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  img {
    margin-top: 119px;
  }
  > span {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #888888;
  }
  > div {
    width: 140px;
    margin-top: 20px;
    span:first-child {
      display: inline-block;
      width: 60px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #009bef;

      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #009bef;
      text-align: center;
    }
    span:last-child {
      display: inline-block;
      width: 60px;
      height: 32px;
      background-color: #009bef;
      border-radius: 4px;

      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>
