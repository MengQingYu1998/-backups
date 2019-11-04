<template>
  <div id="cover_compare">
    <div class="content">
      <!-- 自定义组件 -->
      <ios_header @childFn="parentFn" />
      <div class="left_and_right">
        <div class="left">
          <left_nav :position_fixed_form_father="position_fixed" />
        </div>
        <div class="right">
          <div class="right_nav">关键词覆盖对比</div>
          <div class="line"></div>
          <div class="btn_group">
            <div class="option">
              <div>设备</div>
              <div>
                <el-select v-model="equipmentValue">
                  <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="vs" v-if="response_data">
            <div class="vs_div">
              <img :src="response_data.currentApp.icon" alt />
              <span>{{response_data.currentApp.appName }}</span>
            </div>
            <img src="../assets/ios/vs.png" alt />
            <div class="vs_div">
              <img :src="response_data.compareApp.icon" alt />
              <span>{{response_data.compareApp.appName }}</span>
            </div>
          </div>
          <div class="table_group">
            <table>
              <thead>
                <tr>
                  <th
                    colspan="3"
                    v-if="response_data"
                  >我的独家关键词({{response_data&&response_data.myOwn.length}})</th>
                  <th colspan="3" v-if="!response_data">我的独家关键词(0)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="disable_hover" v-if="myOwn_no_data">
                  <td colspan="3">暂无相关数据</td>
                </tr>
                <template v-if="response_data">
                  <tr v-show="!myOwn_no_data">
                    <td>关键词</td>
                    <td>搜索指数</td>
                    <td>排名</td>
                  </tr>
                  <tr v-for="(item,index) in response_data.myOwn" :key="'table01'+index">
                    <td>
                      <div class="pointer" @click="go_to_page01(item.Word)">{{item.Word}}</div>
                    </td>
                    <td>
                      <div class="pointer" @click="go_to_page02()">{{item.WordIdHint}}</div>
                    </td>
                    <td>
                      <div>{{item.Ranking}}</div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th
                    colspan="3"
                    v-if="response_data"
                  >公共覆盖关键词({{response_data&&response_data.common.length}})</th>
                  <th colspan="3" v-if="!response_data">公共覆盖关键词(0)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="disable_hover" v-if="common_no_data">
                  <td colspan="3">暂无相关数据</td>
                </tr>
                <template v-if="response_data">
                  <tr v-show="!common_no_data">
                    <td>关键词</td>
                    <td>搜索指数</td>
                    <td>排名</td>
                  </tr>
                  <tr v-for="(item,index) in response_data.common" :key="'table02'+index">
                    <td>
                      <div class="pointer" @click="go_to_page01(item.Word)">{{item.Word}}</div>
                    </td>
                    <td>
                      <div class="pointer" @click="go_to_page02">{{item.WordIdHint}}</div>
                    </td>
                    <td>
                      <div>{{item.Ranking}}</div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th
                    colspan="3"
                    v-if="response_data"
                  >我的独家关键词({{response_data&&response_data.comOwn.length}})</th>
                  <th colspan="3" v-if="!response_data">我的独家关键词(0)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="disable_hover" v-if="comOwn_no_data">
                  <td colspan="3">暂无相关数据</td>
                </tr>
                <template v-if="response_data">
                  <tr v-show="!comOwn_no_data">
                    <td>关键词</td>
                    <td>搜索指数</td>
                    <td>排名</td>
                  </tr>
                  <tr v-for="(item,index) in response_data.comOwn" :key="'table03'+index">
                    <td>
                      <div class="pointer" @click="go_to_page01(item.Word)">{{item.Word}}</div>
                    </td>
                    <td>
                      <div class="pointer" @click="go_to_page02">{{item.WordIdHint}}</div>
                    </td>
                    <td>
                      <div>{{item.Ranking}}</div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div class="loading" v-show="loading">
            <img src="../assets/ios/loading.gif" alt />
          </div>

          <div
            class="it_is_over"
            v-show="!it_is_over&&!loading&&response_data!=null&&(response_data.common.length!=0||response_data.myOwn.length!=0||response_data.comOwn.length!=0)"
          >下拉加载更多</div>
          <div class="it_is_over" v-show="it_is_over">我是有底线的～</div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'cover_compare',
  components: { ios_header, left_nav },
  data() {
    return {
      // 同时存在监听滚动条滚动事件
      position_fixed: false, // 1.在父组件的监听滚动条事件里面写子组件监听的逻辑代码,给子组件传递参数
      // 同时存在监听滚动条滚动事件
      comOwn_no_data: false,
      myOwn_no_data: false,
      common_no_data: false,
      can_execute_scorll: true, //是否可以执行滚动
      it_is_over: false,
      loading: false,
      // loading02: false,
      page: 1,
      // 设备选择
      equipment: [
        {
          value: 'iPhone'
        },
        {
          value: 'iPad'
        }
      ],
      equipmentValue: 'iPhone',
      now_country: '中国',
      response_data: null
    }
  },
  created: function() {
    this.page = 1
    this.get_data()
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      // this.loading02 = true
      this.page = 1
      this.get_data()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.response_data.comOwn = new Array()
      this.response_data.common.length = new Array()
      this.response_data.myOwn.length = new Array()

      this.comOwn_no_data = false
      this.myOwn_no_data = false
      this.common_no_data = false
      // this.loading02 = true
      this.page = 1
      this.get_data()
    })
  },
  mounted() {
    this.is_render_left_nav = true
    this.$nextTick(() => {
      let that = this
      window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight //滚动条到底部的条件
        var int = Math.round(scrollTop + windowHeight)
        if (scrollTop > 160) {
          that.position_fixed = true
        } else {
          that.position_fixed = false
        }
        if (
          int == scrollHeight ||
          int + 1 == scrollHeight ||
          int - 1 == scrollHeight
        ) {
          // 需要执行的代码
          if (that.can_execute_scorll) {
            document.documentElement.scrollTop =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight -
              1
            that.get_data()
          }
        }
      }
    })
  },
  methods: {
    // 请求数据
    get_data() {
      this.can_execute_scorll = false
      // console.log('============================')
      this.loading = true
      this.it_is_over = false
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

          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let system = 11
          let appid = this.$store.state.now_app_id
          let comappId = this.$store.state.now_app_id02

          let url =
            '/GetKeyWordCompare?countryId=' +
            country_id +
            '&appId=' +
            appid +
            '&comappId=' +
            comappId +
            '&system=' +
            system +
            '&device=' +
            deviceType
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.loading = false
              // this.loading02 = false
              if (response.data.Data != null) {
                if (response.data.Data.comOwn.length == 0) {
                  this.comOwn_no_data = true
                } else {
                  this.comOwn_no_data = false
                }
                if (response.data.Data.common.length == 0) {
                  this.common_no_data = true
                } else {
                  this.common_no_data = false
                }
                if (response.data.Data.myOwn.length == 0) {
                  this.myOwn_no_data = true
                } else {
                  this.myOwn_no_data = false
                }
                this.response_data = response.data.Data
                // console.log(response)
                this.response_data.comOwn = this.response_data.comOwn.slice(
                  0,
                  this.page * 20
                )
                this.response_data.common = this.response_data.common.slice(
                  0,
                  this.page * 20
                )
                this.response_data.myOwn = this.response_data.myOwn.slice(
                  0,
                  this.page * 20
                )

                this.page += 1
                this.can_execute_scorll = true //是否可以执行滚动
              } else {
                // alert(111)
                // console.log(response)

                this.response_data = null
                this.comOwn_no_data = true
                this.common_no_data = true
                this.myOwn_no_data = true
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

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log('version_message' + this.now_country)
    },
    go_to_page01(parm) {
      this.$router.push({
        path: '/result'
      })
      this.$store.state.now_app_name = parm
    },
    go_to_page02() {
      this.$router.push('ranking')
    }
  }
}
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
.table_group table:last-child {
  margin-right: 0;
}
.table_group table {
  margin-right: 22px;
}
.table_group {
  display: flex;
  justify-content: space-around;
}
thead tr {
  height: 40px;
}

th {
  border: 1px solid #f2f2f2;
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
  height: 121px;
  border: solid 1px #eaeaea;
  text-align: center;
  margin-top: 40px;
  /* 表格定长 */
  table-layout: fixed;
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
}
.option div:first-child {
  margin-right: 5px;
  margin-left: 10px;
}
.option div:last-child {
  width: 86px;
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
.it_is_over {
  text-align: center;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 74px;
  letter-spacing: 0px;
  color: #bfbfbf;
  margin-bottom: -50px;
}
.loading {
  width: 100%;
  text-align: center;
  margin-bottom: -20px;
  margin-top: 30px;
}
.loading > img {
  width: 50px;
  height: 50px;
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
}
.disable_hover :hover {
  background-color: #fff !important;
}
.left {
  width: 231px;position: relative;
  min-height: 621px;
}
</style>
