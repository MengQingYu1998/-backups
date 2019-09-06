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
          <country @childFn="parentFn"></country>
        </div>
      </div>
      <!-- <div class="options_03 option">
        <div class="margin_top_font">日期</div>
        <div class="date" @click="change_prop">
          <el-date-picker
            :picker-options="pickerOptions2"
            v-model="dateValue"
            type="date"
            placeholder="选择日期"
            clear-icon
          ></el-date-picker>
        </div>
        <div
          :class=" {'change_bg':change_bg_day,'font_block':true,'pointer':true}"
          @click="change_day_dateValue()"
        >昨日</div>
        <div
          :class=" {'change_bg':change_bg_week,'font_block':true,'pointer':true}"
          @click="change_week_dateValue()"
        >近七天</div>
      </div>-->
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
      equipmentValue: 'iPhone',

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
            searchWord

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
  height: 27px;
  background-color: #009bef;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
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
  line-height: 80px;
  border: solid 1px #f2f2f2;
  font-family: SourceHanSansCN-Normal;
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
  font-family: SourceHanSansCN-Normal;
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
  table-layout: fixed;
}
.font_block {
  text-align: center;
  line-height: 26px;
  font-family: SourceHanSansCN-Normal;
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
.options_03 .date div {
  width: 114px !important;
}
.option > div:first-child {
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
.options {
  margin: 22px 0;
  font-family: SourceHanSansCN-Medium;
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
  font-family: SourceHanSansCN-Medium;
  height: 18px;
  line-height: 18px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
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
</style>
