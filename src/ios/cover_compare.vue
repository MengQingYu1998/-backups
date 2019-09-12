<template>
  <div id="cover_compare" class="content">
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
              <tr v-if="response_data">
                <th colspan="3">我的独家关键词({{response_data.myOwn.length}})</th>
              </tr>
            </thead>
            <tbody v-if="response_data">
              <tr class="disable_hover" v-if="response_data.myOwn==0">
                <td colspan="3">暂无相关数据</td>
              </tr>
              <template v-if="response_data.myOwn!=0">
                <tr>
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
              <tr v-if="response_data">
                <th colspan="3">公共覆盖关键词({{response_data.common.length}})</th>
              </tr>
            </thead>
            <tbody v-if="response_data">
              <tr class="disable_hover" v-if="response_data.common==0">
                <td colspan="3">暂无相关数据</td>
              </tr>
              <template v-if="response_data.common!=0">
                <tr>
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
              <tr v-if="response_data">
                <th colspan="3">我的独家关键词({{response_data.comOwn.length}})</th>
              </tr>
            </thead>
            <tbody v-if="response_data">
              <tr class="disable_hover" v-if="response_data.comOwn==0">
                <td colspan="3">暂无相关数据</td>
              </tr>
              <template v-if="response_data.comOwn!=0">
                <tr>
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
          v-show="!it_is_over&&!loading&&(response_data.comOwn.length!=0||response_data.common.length!=0||response_data.myOwn.length!=0)"
        >下拉加载更多</div>
        <div class="it_is_over" v-show="it_is_over">我是有底线的～</div>
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
      can_execute_scorll: true, //是否可以执行滚动
      it_is_over: false,
      loading: false,
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
      this.page = 1
      this.get_data()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.page = 1
      this.get_data()
    })
  },
  mounted() {
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
        if (scrollTop + windowHeight == scrollHeight) {
          // 需要执行的代码
          if (that.can_execute_scorll) {
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
      console.log('============================')
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
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data = response.data.Data
              console.log(response)
              //  this.it_is_over =
              //   this.response_data.myOwn.length < this.page * 20 &&
              //   this.response_data.common.length < this.page * 20 &&
              //   this.response_data.comOwn.length < this.page * 20
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
              this.loading = false
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
  font-family: SourceHanSansCN-Medium;
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
td,
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
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
}
td {
  padding: 33px 0;
}
thead {
  width: 100%;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.table_font {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-top: 40px;
  /* 表格定长 */
  table-layout: fixed;
}

.vs_div img {
  width: 94px;
  height: 94px;
  border-radius: 8px;
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
  font-family: SourceHanSansCN-Medium;
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
.it_is_over {
  text-align: center;
  font-family: SourceHanSansCN-Normal;
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
