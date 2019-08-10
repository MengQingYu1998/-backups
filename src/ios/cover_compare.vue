<template>
  <div id="cover_compare" class="content">
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <div class="right_nav">榜单排名对比</div>
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
            </tbody>
          </table>
          <table>
            <thead>
              <tr v-if="response_data">
                <th colspan="3">公共覆盖关键词({{response_data.common.length}})</th>
              </tr>
            </thead>
            <tbody v-if="response_data">
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
            </tbody>
          </table>
          <table>
            <thead>
              <tr v-if="response_data">
                <th colspan="3">我的独家关键词({{response_data.comOwn.length}})</th>
              </tr>
            </thead>
            <tbody v-if="response_data">
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
  name: 'cover_compare',
  components: { ios_header, left_nav },
  data() {
    return {
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
    this.get_data()
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
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

          // console.log('country_id' + country_id)

          // let system=11
          // let device=1
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          // let system = this.systemValue == 'ios11' ? 11 : 12
          let system = 11
          let appid = this.$store.state.now_app_id
          let comappId = this.$store.state.now_app_id02
          // console.log('appid' + '----' + appid)
          // console.log('country_id' + '----' + country_id)
          // console.log('comappId' + '----' + comappId)
          // console.log('system' + '----' + system)
          // console.log('device' + '----' + device)
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
</style>
