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
          <div
            v-loading="loading_gif"
            element-loading-spinner="el-icon-loading"
          >
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>应用</th>
                  <th>总榜排名</th>
                  <th>分类榜排名</th>
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
                <tr v-for="(item, index) in response_data" :key="index">
                  <td class="first_td">{{ index + 1 }}</td>
                  <td class="second_td">
                    <div class="use">
                      <div>
                        <img
                          :src="item.icon"
                          class="pointer"
                          @click="go_to_page01(item.appId, item.appName)"
                          alt
                        />
                      </div>
                      <div>
                        <div
                          class="pointer appName"
                          @click="go_to_page01(item.appId, item.appName)"
                        >
                          {{ item.appName }}
                        </div>
                        <div class="rankingChangeFontColor">
                          {{ item.developer }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="third_td">
                    <div class="rankingChangeFontColor font_size_15">
                      {{ item.totalRank == 0 ? "-" : item.totalRank }}
                    </div>
                    <div class="rankingChangeFontColor letter_spacing_1">
                      {{
                        item.totalGenreName == null ? "-" : item.totalGenreName
                      }}
                    </div>
                  </td>
                  <td class="fourth_td">
                    <div class="rankingChangeFontColor font_size_15">
                      {{ item.genreRank == 0 ? "-" : item.genreRank }}
                    </div>
                    <div class="rankingChangeFontColor letter_spacing_1">
                      {{ item.genreName == null ? "-" : item.genreName }}
                    </div>
                  </td>

                  <td>
                    <div class="rankingChangeFontColor font_size_14">
                      {{ item.onLineTime }}
                    </div>
                  </td>
                  <td>
                    <div class="rankingChangeFontColor font_size_14">
                      {{ item.updateTime }}
                    </div>
                  </td>
                  <td>
                    <div class="rankingChangeFontColor">{{ item.status }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from "./ios_header";
import left_nav from "./left_nav";
export default {
  name: "same_dev_app",
  components: { ios_header, left_nav },
  data() {
    return {
      loading_gif: false,
      now_country: "中国",
      response_data: null,
      now_app_id: null,
      nothing_data_can_show: false
    };
  },
  watch: {
    $route(to, from) {
      this.$route.query.now_country
        ? (this.now_country = this.$route.query.now_country)
        : (this.now_country = "中国");
      this.$route.query.now_app_id
        ? (this.now_app_id = this.$route.query.now_app_id)
        : (this.now_app_id = null);
      this.get_data();
    }
  },
  created: function() {
    this.$route.query.now_country
      ? (this.now_country = this.$route.query.now_country)
      : (this.now_country = "中国");
    this.$route.query.now_app_id
      ? (this.now_app_id = this.$route.query.now_app_id)
      : (this.now_app_id = null);
    this.get_data();
    //'当前国家发生变化，重新请求数据...'
    this.$watch("now_country", function(newValue, oldValue) {
      let that = this;
      this.$router.push({
        path:
          "/same_dev_app?now_country=" +
          that.now_country +
          "&now_app_id=" +
          that.now_app_id
      });
    });
  },
  methods: {
    // 请求数据
    get_data() {
      this.loading_gif = true;
      this.$axios
        .get("/GetCountry")
        .then(response => {
          // 获取国家ID
          let country_id;
          let arr_country = response.data.Data;
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id;
              return false;
            }
          });
          // 请求数据
          // 1:iPhone 2:ipad
          // console.log(country_id)
          let appId = this.now_app_id;
          let url =
            "/GetSameDevApps?countryId=" +
            country_id +
            "&deviceType=1" +
            "&appId=" +
            appId;
          // &appId=291322250
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.loading_gif = false;

              this.response_data = response.data.Data;
              if (response.data.Data == null) {
                this.nothing_data_can_show = true;
              } else {
                this.nothing_data_can_show = false;
              }
              // console.log(55555555555555555)
              // console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload;
      // console.log(this.now_country)
    },
    go_to_page01(parm, parm02) {
      let that = this;
      let routerUrl = this.$router.resolve({
        path: "/now_ranking",
        query: { now_country: that.now_country, now_app_id: parm }
      });
      window.open(routerUrl.href, "_blank");
    }
  }
};
</script>
<style scoped>
.letter_spacing_1 {
  letter-spacing: 1px !important;
}
.font_size_14 {
  font-size: 14px !important;
  color: #222 !important;
}
.font_size_15 {
  font-size: 15px !important;
  color: #222 !important;
}

.fourth_td {
  width: 160px;
}
.third_td {
  width: 115px;
}
.second_td {
  width: 230px;
}
.first_td {
  width: 50px;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #222;
  text-align: center;
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
  width: 140px;
  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.appName:hover {
  color: #009bef;
}
.appName {
  width: 140px;
  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1px;
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
  width: 48px;
  height: 48px;
  border-radius: 10px;
  margin-right: 9px;
  box-sizing: border-box;
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
  width: 80px;
  height: 76px;
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
  border: solid 1px #eaeaea;
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
  position: relative;
  min-height: 621px;
}
</style>
