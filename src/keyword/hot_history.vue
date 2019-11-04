<template>
  <div id="hot_history" class="content">
    <div class="hot_history_title">热搜词「{{search_input}}」</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div class="margin_top_font">设备</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-select v-model="equipmentValue">
            <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_02 option">
        <div class="margin_top_font">地区</div>
        <div>
          <!-- 选择国家 -->
          <country @childFn="parentFn" :custom_country="this.$store.state.now_country_name"></country>
        </div>
      </div>

      <div class="options_04 option">
        <div class="margin_top_font">搜索</div>
        <div class="search">
          <el-input v-model="search_input" placeholder="请输入搜索关键词"></el-input>
        </div>
        <div class="search_confirm pointer" @click="blur">搜索</div>
      </div>
    </div>
    <div class="table01" v-for="(item,index) in response_data" :key="'table01'+index">
      <!-- <div>{{new Date(item.time).getTime()}}</div> -->
      <div>{{formatDate_wrap(new Date(item.time).getTime()/1000, 'Y年M月D日')}}</div>

      <table>
        <thead>
          <tr>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>持续时长</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(table01_tr_item,table01_tr_index) in item.list"
            :key="'table01_tr'+table01_tr_index"
          >
            <td>
              <div>{{table01_tr_item.stime}}</div>
            </td>
            <td>
              <div>{{table01_tr_item.etime}}</div>
            </td>
            <td>
              <div>{{table01_tr_item.hours}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="no_data_img" v-show="response_data==null||response_data.length == 0">
      <img src="../assets/ios/null.png" alt />
      <div>暂无相关数据</div>
    </div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'
// 引入工具类
import { timestamp } from '../common/util.js'
export default {
  name: 'hot_history',
  components: { country },
  data() {
    let that = this
    return {
      // 动态改变本周 昨日的类样式
      change_bg_week: false,
      change_bg_day: false,
      //当前选中的日期
      dateValue: new Date(),
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      response_data: null,
      // 获取当前选中的国家
      now_country: '中国',
      // 请输入搜索关键词
      search_input: null,
      // 设备选择
      equipment: [
        {
          value: 'iPhone'
        },
        {
          value: 'iPad'
        }
      ],
      equipmentValue:
        that.$store.state.hot_search_to_hot_history_equipmentValue,

      // 国家选择
      countryValue: '中国'
    }
  },
  created: function() {
    this.search_input = this.$store.state.now_app_name
    this.get_data()
    this.$watch('now_country', function(newValue, oldValue) {
      // console.log('当前国家发生变化，重新请求数据...')
      this.get_data()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      // console.log('当前国家发生变化，重新请求数据...')
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
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let searchWord = this.search_input
          let url =
            '/Word/HotSearchDetail?deviceType=' +
            deviceType +
            '&countryId=' +
            country_id +
            '&searchWord=' +
            encodeURIComponent(searchWord)

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
    // 点击日历
    change_prop() {
      this.change_bg_week = false
      this.change_bg_day = false
    },
    //点击昨日按钮
    change_day_dateValue() {
      this.dateValue = ''
      this.change_bg_week = false
      this.change_bg_day = true
      this.get_data()
    },
    //点击本周按钮
    change_week_dateValue() {
      this.dateValue = ''
      this.change_bg_week = true
      this.change_bg_day = false
      this.get_data()
    },
    formatDate_wrap(parm01, parm02) {
      return timestamp(parm01, parm02)
    },
    // 输入框失去焦点
    blur: function() {
      this.get_data()
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    }
  }
}
</script>

<style scoped>
.margin_top_font {
  margin-top: 4px;
}
.search_confirm {
  width: 48px !important;
  height: 26px;
  background-color: #009bef;
  border-radius: 4px;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 27px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  margin-left: 10px;
}
.change_bg {
  color: #ffffff !important;
  background-color: #009bef;
  border: solid 1px #ffffff !important;
}
.table01 {
  margin-bottom: 22px;
}
.table01 > div:first-child {
  height: 80px;
  line-height: 80px;border: solid 1px #eaeaea;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
  text-align: center;
}
thead tr {
  height: 40px;
}
td,
th {
  border: 1px solid #f2f2f2;
}
.table_font {
  display: flex;
  justify-content: space-around;
}
tbody > tr > td:first-child {
  width: 325px;
  padding: 30px 0;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
  padding: 30px 0;
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
table {
  width: 100%;
  height: 121px;border: solid 1px #eaeaea;
  text-align: center;
  table-layout: fixed;
}
.font_block {
  text-align: center;
  line-height: 26px;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  width: 48px !important;
  height: 26px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  letter-spacing: 0px;
  color: #444444;
  margin-right: 15px;
  margin-left: -6px;
  display: inline-block;
}
.options_04 .search div {
  width: 145px !important;
}

.options_03 {
  margin-left: 15px !important;
}

.option > div:first-child {
  margin-right: 15px;
  font-weight: 600 !important;
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
.hot_history_title {
  font-weight: 600 !important;
  height: 18px;
  line-height: 18px;
  font-size: 16px;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #222222;
  border-left: 2px solid #429ae8;
  margin: 20px 0;
  padding-left: 9px;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
#hot_history {
  padding-bottom: 50px;
}

.no_data_img {
  margin: 0 auto;
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
.no_data_img img {
  width: 210px;
  margin-top: 193px;
}
</style>
