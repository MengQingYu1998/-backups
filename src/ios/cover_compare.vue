<template>
  <div id="cover_compare">
    <div class="content">
      <!-- 自定义组件 -->
      <ios_header @childFn="parentFn" />
      <div class="left_and_right">
        <div class="left">
          <left_nav />
        </div>
        <div class="right">
          <div class="right_nav">关键词覆盖对比</div>
          <div class="line"></div>
          <div class="btn_group">
            <div class="option">
              <div>设备</div>
              <div>
                <el-radio-group v-model="equipmentValue" size="mini">
                  <el-radio-button
                    v-for="item in equipment"
                    :key="item.value"
                    :label="item.value"
                  ></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div v-loading="loading" element-loading-spinner="el-icon-loading">
            <div class="vs">
              <div class="vs_div">
                <img
                  :src="
                    response_data &&
                      response_data.currentApp &&
                      response_data.currentApp.icon
                  "
                  alt
                />
                <span>{{
                  response_data &&
                    response_data.currentApp &&
                    response_data.currentApp.appName
                }}</span>
              </div>
              <img src="../assets/ios/vs.png" alt />
              <div class="vs_div">
                <img
                  :src="
                    response_data &&
                      response_data.compareApp &&
                      response_data.compareApp.icon
                  "
                  alt
                />
                <span>{{
                  response_data &&
                    response_data.compareApp &&
                    response_data.compareApp.appName
                }}</span>
              </div>
            </div>
            <el-tabs v-model="activeName" :stretch="true">
              <!-- ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果 -->
              <el-tab-pane label="我的独家关键词" name="first">
                <table>
                  <thead>
                    <tr>
                      <th colspan="3">
                        我的独家关键词({{
                          response_data && response_data.myCount
                        }})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="disable_hover"
                      v-if="response_data && response_data.myOwn.length == 0"
                    >
                      <td colspan="3">暂无相关数据</td>
                    </tr>
                    <tr v-else>
                      <td>关键词</td>
                      <td>搜索指数</td>
                      <td>排名</td>
                    </tr>
                    <tr
                      v-for="(item, index) in response_data &&
                        response_data.myOwn"
                      :key="'table01' + index"
                    >
                      <td>
                        <div class="pointer" @click="go_to_page01(item.Word)">
                          {{ item.Word }}
                        </div>
                      </td>
                      <td>
                        <div class="pointer" @click="go_to_page02()">
                          {{ item.WordIdHint }}
                        </div>
                      </td>
                      <td>
                        <div>{{ item.Ranking }}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="paging"
                  v-if="!loading && response_data.myOwn.length != 0"
                >
                  <div>
                    显示第 {{ (currentPage - 1) * 100 + 1 }} 至
                    {{
                      currentPage == Math.ceil(total / 100)
                        ? (currentPage - 1) * 100 + (total % 100)
                        : currentPage * 100
                    }}
                    项结果，共 {{ total }} 项
                  </div>
                  <div>
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="total / 10"
                      :current-page.sync="currentPage"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="公共覆盖关键词" name="second">
                <table>
                  <thead>
                    <tr>
                      <th colspan="3">
                        公共覆盖关键词({{
                          response_data && response_data.commonCount
                        }})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="disable_hover"
                      v-if="response_data && response_data.common.length == 0"
                    >
                      <td colspan="3">暂无相关数据</td>
                    </tr>
                    <tr v-else>
                      <td>关键词</td>
                      <td>搜索指数</td>
                      <td>排名</td>
                    </tr>
                    <tr
                      v-for="(item, index) in response_data &&
                        response_data.common"
                      :key="'table02' + index"
                    >
                      <td>
                        <div class="pointer" @click="go_to_page01(item.Word)">
                          {{ item.Word }}
                        </div>
                      </td>
                      <td>
                        <div class="pointer" @click="go_to_page02">
                          {{ item.WordIdHint }}
                        </div>
                      </td>
                      <td>
                        <div>{{ item.Ranking }}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="paging"
                  v-if="!loading && response_data.common.length != 0"
                >
                  <div>
                    显示第 {{ (currentPage - 1) * 100 + 1 }} 至
                    {{
                      currentPage == Math.ceil(total / 100)
                        ? (currentPage - 1) * 100 + (total % 100)
                        : currentPage * 100
                    }}
                    项结果，共 {{ total }} 项
                  </div>
                  <div>
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="total / 10"
                      :current-page.sync="currentPage"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="竞品独家关键词" name="third">
                <table>
                  <thead>
                    <tr>
                      <th colspan="3">
                        竞品独家关键词({{
                          response_data && response_data.comCount
                        }})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="disable_hover"
                      v-if="response_data && response_data.comOwn.length == 0"
                    >
                      <td colspan="3">暂无相关数据</td>
                    </tr>
                    <tr v-else>
                      <td>关键词</td>
                      <td>搜索指数</td>
                      <td>排名</td>
                    </tr>
                    <tr
                      v-for="(item, index) in response_data &&
                        response_data.comOwn"
                      :key="'table03' + index"
                    >
                      <td>
                        <div class="pointer" @click="go_to_page01(item.Word)">
                          {{ item.Word }}
                        </div>
                      </td>
                      <td>
                        <div class="pointer" @click="go_to_page02">
                          {{ item.WordIdHint }}
                        </div>
                      </td>
                      <td>
                        <div>{{ item.Ranking }}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="paging"
                  v-if="!loading && response_data.comOwn.length != 0"
                >
                  <div>
                    显示第 {{ (currentPage - 1) * 100 + 1 }} 至
                    {{
                      currentPage == Math.ceil(total / 100)
                        ? (currentPage - 1) * 100 + (total % 100)
                        : currentPage * 100
                    }}
                    项结果，共 {{ total }} 项
                  </div>
                  <div>
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="total / 10"
                      :current-page.sync="currentPage"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
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
  name: "cover_compare",
  components: { ios_header, left_nav },
  data() {
    return {
      // tab-pane选择面板
      activeName: "first",
      now_app_id: null,
      now_app_id02: null,
      loading: false,
      // 分页
      currentPage: 1,
      total: 0,
      response_data: null,
      // 设备选择
      equipment: [
        {
          value: "iPhone"
        },
        {
          value: "iPad"
        }
      ],
      equipmentValue: "iPhone",
      now_country: "中国"
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
      this.$route.query.now_app_id02
        ? (this.now_app_id02 = this.$route.query.now_app_id02)
        : (this.now_app_id02 = null);
      this.currentPage = 1;
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
    this.$route.query.now_app_id02
      ? (this.now_app_id02 = this.$route.query.now_app_id02)
      : (this.now_app_id02 = null);
    this.get_data();
    //'当前国家发生变化，重新请求数据...'
    this.$watch("now_country", function(newValue, oldValue) {
      let that = this;
      this.$router.push({
        path: "/cover_compare",
        query: {
          now_country: that.now_country,
          now_app_id: that.now_app_id,
          now_app_id02: that.now_app_id02
        }
      });
    });
    this.$watch("equipmentValue", function(newValue, oldValue) {
      this.currentPage = 1;
      this.get_data();
    });
    this.$watch("activeName", function(newValue, oldValue) {
      this.currentPage = 1;
      this.get_data();
    });
    this.$watch("currentPage", function(newValue, oldValue) {
      this.get_data();
    });
  },
  methods: {
    // 请求数据
    get_data() {
      this.loading = true;
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

          // 设备选择
          let deviceType = this.equipmentValue == "iPhone" ? 1 : 2;
          let system = 11;
          let appid = this.now_app_id;
          let comappId = this.now_app_id02;

          let url =
            "/GetKeyWordCompare?countryId=" +
            country_id +
            "&appId=" +
            appid +
            "&comappId=" +
            comappId +
            "&system=" +
            system +
            "&device=" +
            deviceType +
            "&page=" +
            this.currentPage;

          // console.log(url);
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.loading = false;
              console.log(response);
              if (response.data.Data != null) {
                this.response_data = response.data.Data;

                switch (this.activeName) {
                  case "first":
                    this.total = this.response_data.myCount; //底部显示总共
                    break;
                  case "second":
                    this.total = this.response_data.commonCount; //底部显示总共
                    break;
                  case "third":
                    this.total = this.response_data.comCount; //底部显示总共
                    break;
                  default:
                    break;
                }
              } else {
                this.response_data = {
                  myOwn: new Array(),
                  comOwn: new Array(),
                  common: new Array()
                };
              }
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
      // console.log('version_message' + this.now_country)
    },
    go_to_page01(parm) {
      let that = this;
      this.$router.push({
        path:
          "/result?now_country=" + that.now_country + "&now_app_name=" + parm
      });
    },
    go_to_page02() {
      this.$router.push("ranking");
    }
  }
};
</script>
<style scoped>
.vs_div span {
  width: 130px;
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
}

thead tr {
  height: 40px;
}

tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
tbody tr td:first-child {
  width: 50%;
}
tbody {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
}
td {
  padding: 14px 0;
}
tbody tr > td:nth-child(1) {
  padding: 0 8px;
}
thead {
  width: 100%;
  background-color: #f7f7f7;
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.table_font {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
table {
  width: 100%;
  border: solid 1px #eaeaea;
  text-align: center;
  /* 表格定长 */
  table-layout: fixed;
  margin-top: 30px;
}

.vs_div img {
  width: 94px;
  height: 94px;
  border-radius: 8px;
  border: solid 1px #f7f7f7;
}
.vs_div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 150px;
  height: 172px;
}
.vs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 202px;
  margin-top: 60px;
  margin-bottom: 30px;
}
.option > div:first-child {
  margin-right: 12px;
  margin-left: 10px;
}

.option {
  font-weight: 600 !important;
  display: inline-block;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: flex;
  align-items: center;
}

.right {
  width: 100%;
  background-color: #fff;
  margin-left: 14px;
  padding: 25px 20px;
  padding-bottom: 50px;
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
  width: 125px;
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

#cover_compare {
  padding-bottom: 50px;
  background-color: #f4f4f4;
}

.disable_hover {
  border-bottom: solid 1px #f2f2f2;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #bfbfbf;
  height: 80px;
}
.disable_hover :hover {
  background-color: #fff !important;
}
.left {
  width: 231px;
  position: relative;
  min-height: 621px;
}
.paging {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  margin-bottom: 30px;
}
</style>
