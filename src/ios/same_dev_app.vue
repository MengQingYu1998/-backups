<template>
  <div id="same_dev_app">
    <div class="content">
      <!-- 自定义组件 -->
      <ios_header @childFn="parentFn" />
      <div class="left_and_right">
        <div class="left">
          <left_nav />
        </div>
        <div class="right">
          <div class="right_nav">同开发者应用</div>
          <div class="line"></div>
          <img class="loading_gif" src="../assets/ios/loading.gif" v-show="loading_gif" />
          <table v-show="!loading_gif">
            <thead>
              <tr>
                <th></th>
                <th>应用</th>
                <th>总榜排名</th>
                <th>分类榜排名</th>
                <th>关键词覆盖</th>
                <th>上架日期</th>
                <th>最后更新时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="disable_hover" v-if="nothing_data_can_show">
                <td colspan="8">
                  <div class="no_data_img">
                    <img src="../assets/ios/null.png" alt />
                    <div>暂无相关数据</div>
                  </div>
                </td>
              </tr>
              <tr v-for="(item ,index) in response_data" :key="index">
                <td class="first_td">{{index+1}}</td>
                <td class="second_td">
                  <div class="use">
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
                        class="pointer appName"
                        @click="go_to_page01(item.appId,item.appName)"
                      >{{item.appName}}</div>
                      <div class="rankingChangeFontColor">{{item.subtitle!='无'?item.subtitle:''}}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="rankingChangeFontColor" v-if="item.totalRank!=0">{{item.totalRank}}</div>
                  <div
                    class="rankingChangeFontColor"
                    v-if="item.totalGenreName!=null"
                  >{{item.totalGenreName}}</div>
                  <div class="rankingChangeFontColor" v-if="item.totalGenreName==null">--</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor" v-if="item.genreRank!=0">{{item.genreRank}}</div>
                  <div class="rankingChangeFontColor" v-if="item.genreName!=null">{{item.genreName}}</div>
                  <div class="rankingChangeFontColor" v-if="item.genreName==null">--</div>
                </td>

                <td class="rankingChangeFontColor">{{item.keyWordHide}}</td>
                <td>
                  <div class="rankingChangeFontColor">{{item.onLineTime}}</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">{{item.updateTime}}</div>
                </td>
                <td class="operation">
                  <div class="rankingChangeFontColor">{{item.status}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'same_dev_app',
  components: { ios_header, left_nav },
  data() {
    return {
      loading_gif: false,
      now_country: '中国',
      response_data: null,
      nothing_data_can_show: false
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
          // 1:iPhone 2:ipad
          // console.log(country_id)
          let appId = this.$store.state.now_app_id
          let url =
            '/GetSameDevApps?countryId=' +
            country_id +
            '&deviceType=1' +
            '&appId=' +
            appId
          // &appId=291322250
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.loading_gif = false

              this.response_data = response.data.Data
              if (response.data.Data == null) {
                this.nothing_data_can_show = true
              } else {
                this.nothing_data_can_show = false
              }
              // console.log(55555555555555555)
              // console.log(response)
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
      // console.log(this.now_country)
    },
    go_to_page01(parm, parm02) {
      this.$router.push({
        path:
          '/now_ranking?now_country_name=' +
          this.$store.state.now_country_name +
          '&now_app_id=' +
          this.$store.state.now_app_id
      })
      this.$store.state.now_app_id = parm
      this.$store.state.now_app_name = parm02
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
.second_td {
  width: 250px;
}
tbody > tr:nth-child(1) .first_td,
tbody > tr:nth-child(2) .first_td,
tbody > tr:nth-child(3) .first_td {
  font-weight: 600 !important;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #222222;
}
.first_td {
  width: 50px;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #888888;
  text-align: center;
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
.now_app {
  width: 58px;
  height: 20px;
  background-color: #f5fcff;
  border-radius: 4px;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #009bef;
  position: absolute;
  right: -9px;
  top: 0;
}

.use .rankingChangeFontColor {
  width: 180px;
  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.appName:hover {
  color: #009bef;
}
.appName {
  width: 180px;
  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rankingChangeFontColor {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  line-height: 24px;
  color: #888888;
}

.use img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  /* margin-left: 16px; */
  margin-right: 9px;
  border: solid 1px #f2f2f2;
}
.use {
  display: flex;
  align-items: center;
  text-align: left;
  position: relative;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
thead tr {
  height: 40px;
}
tbody tr td:last-child {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  width: 108px;
  height: 100px;
  box-sizing: border-box;
}
tbody {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
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
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
}
.right {
  padding: 25px 20px;
  background-color: #fff;
  margin-left: 14px;
  width: 100%;
  box-sizing: border-box;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
}
.right_nav {
  font-weight: 600 !important;
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
  margin-top: 14px;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
.no_data_img:hover {
  background-color: #fff;
}
.no_data_img img {
  width: 210px;
  margin-top: 193px;
}

.no_data_img {
  width: 100%;
  height: 606px;
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
#same_dev_app {
  background-color: #f4f4f4;
  padding-bottom: 50px;
}
.left {
  width: 231px;
  min-height: 621px;
}
</style>
