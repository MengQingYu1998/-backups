<template>
  <div id="think_word" class="content">
    <div class="think_word_title">「{{input}}」关键词搜索联想词</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div class="margin_top_font">日期</div>
        <div class="days">7天</div>
        <div>
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker
            v-model="dateValue"
            type="date"
            placeholder="选择日期"
            clear-icon
            prefix-icon="fasle"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div class="options_02 option">
        <div class="margin_top_font">系统</div>
        <div>
          <el-radio-group v-model="systemValue" size="mini">
            <el-radio-button v-for="item in  system" :key="item.value" :label="item.value"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="options_03 option">
        <div class="margin_top_font">搜索</div>
        <div>
          <!-- 饿了么的input组件 -->
          <el-input v-model="input" placeholder="请输入关键词查询联想词"></el-input>
        </div>
      </div>
    </div>
    <div class="table_group">
      <table class="table_first">
        <thead>
          <tr>
            <th></th>
            <template v-if="response_data">
              <th v-for="(item,index) in response_data.Xtime" :key="'Xtime'+index">{{item}}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-if="response_data">
            <tr class="disable_hover" v-if="!response_data.Yvalue">
              <td colspan="8">
                <div class="no_data_img">
                  <img src="../assets/ios/null.png" alt />
                  <div>暂无相关数据</div>
                </div>
              </td>
            </tr>

            <tr v-for="(item,index) in response_data.Yvalue" :key="'Yvalue'+index">
              <td class="td_first">{{index+1}}</td>
              <td
                class="table_font"
                v-for="(item_son,index_son) in item"
                :key="'Yvalue_son'+index_son"
              >
                <div class="pointer" @click="go_to_page01(item.keyword)">{{item_son.keyword}}</div>
                <div>{{item_son.hint}}</div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// 引入工具类
import { formatDate } from '../common/util.js'
export default {
  name: 'think_word',
  data() {
    return {
      dateValue: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      system: [
        // 系统选择
        {
          value: 'ios11'
        },
        {
          value: 'ios13/12'
        }
      ],
      systemValue: 'ios13/12',
      now_country: '中国',
      response_data: null,
      input: ''
    }
  },
  created: function() {
    this.input = this.$store.state.now_app_name
    this.get_data()
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('systemValue', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('dateValue', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('input', function(newValue, oldValue) {
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

          // console.log(formatDate(this.dateValue, 'yyyy-MM-dd'))
          let system = this.systemValue == 'ios11' ? 11 : 12
          let edate = formatDate(this.dateValue, 'yyyy-MM-dd')
          let time02 = new Date(this.dateValue)
          time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 6)
          let sdate = formatDate(time02, 'yyyy-MM-dd')
          let word = this.input
          let url = '/Word/FindJoinWord'
          let data = {
            countryId: country_id,
            deviceType: 1,
            edate: edate,
            sdate: sdate,
            word: word,
            iosType: system
          }
          // console.log(data)
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              this.response_data = response.data
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
    }
  }
}
</script>
<style scoped>
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
.table_group {
  margin-bottom: 38px;
  display: flex;
  /* align-items: center; */
}
.table_font div:first-child {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  word-break: break-all;
  line-height: 20px;
}
.table_font div:last-child {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  line-height: 20px;
  color: #888888;
}
thead tr {
  height: 40px;
  border: 1px solid #f2f2f2;
}
td {
  padding: 24px 10px;
  border-right: 1px solid #f2f2f2;
}
th {
  border-right: 1px solid #f2f2f2;
}
tbody tr td:first-child {
  width: 59px;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
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
  width: 100%;
  background-color: #f7f7f7;
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.table_first {
  border-left: solid 1px #f2f2f2;
}
table {
  width: 100%;
  height: 121px;
  border-right: solid 1px #f2f2f2;
  text-align: center;
}
.option .days {
  width: 48px;
  line-height: 26px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
  margin-right: 10px;
}

.option > div:first-child {
  font-weight: 600 !important;
  margin-right: 15px;
}

.option {
  display: flex;
  margin-left: 29px;
}
option:first-child {
  margin: 0;
}
.options .option:first-child {
  margin-left: 0 !important;
}
.margin_top_font {
  margin-top: 4px;
}
.options {
  margin: 22px 0;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 30px; */
  letter-spacing: 0px;
  color: #222222;
  display: flex;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #efefef;
}
.think_word_title {
  font-weight: 600 !important;
  height: 18px;
  line-height: 18px;
  font-size: 16px;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #222222;
  border-left: 2px solid #429ae8;
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
</style>
