<template>
  <div id="hot_search" class="content">
    <div class="hot_search_title">实时热搜</div>
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
      <div class="options_03 option">
        <div class="margin_top_font">日期</div>
        <div class="date">
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker
            :picker-options="pickerOptions2"
            v-model="dateValue"
            type="date"
            placeholder="选择日期"
            clear-icon
            prefix-icon="fasle"
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
      </div>
      <div class="options_04 option">
        <div class="margin_top_font">搜索</div>
        <div class="search">
          <el-input v-model="search_input" placeholder="请输入搜索关键词"></el-input>
        </div>
        <div class="search_confirm pointer" @click="go_to_page01_son">搜索</div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>更新时间</th>
          <th>热门搜索关键词</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="no_data_img">
          <td colspan="2">
            <div class="no_data_img">
              <img src="../assets/ios/null.png" alt />
              <div>暂无相关数据</div>
            </div>
          </td>
        </tr>

        <tr v-for="(item,index) in response_data" :key="index">
          <td>
            <div class="table_font">{{item.strtime}}</div>
          </td>
          <td>
            <div class="table_font table_font_other">
              <div
                v-for="(item_list,index_list) in item.list"
                :key="index_list"
                @mouseover="get_data_for_popover(item_list.word,item.time)"
              >
                <el-popover
                  placement="bottom"
                  width="320"
                  trigger="hover"
                  :open-delay="300"
                  :visible-arrow="true"
                >
                  <div class="table_hover_title">
                    <span v-if="response_datafor_popover">搜索指数 {{response_datafor_popover.Hint}}</span>
                    <span class="pointer" @click="go_to_page01(item_list.word)">热搜历史</span>
                  </div>
                  <div class="table_hover_line"></div>
                  <div>热词搜索前5名搜索结果</div>
                  <div class="table_hover_app_group" v-if="response_datafor_popover">
                    <div
                      v-for="(item_for_popover ,index_for_popover) in response_datafor_popover.Appinfo"
                      :key="index_for_popover"
                    >
                      <img
                        :src="item_for_popover.icon_url"
                        class="pointer"
                        @click="go_to_page02(item_for_popover.app_id,item_for_popover.app_name)"
                        alt
                      />
                      <div
                        class="hide_font pointer"
                        @click="go_to_page02(item_for_popover.app_id,item_for_popover.app_name)"
                      >{{item_for_popover.app_name}}</div>
                    </div>
                  </div>
                  <div
                    slot="reference"
                    class="pointer font_word"
                    @click="go_to_page01(item_list.word)"
                  >{{item_list.word}}</div>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'
// 引入工具类
import { formatDate } from '../common/util.js'
export default {
  name: 'hot_search',
  components: { country },
  data() {
    return {
      no_data_img: false,
      response_data: null,
      response_datafor_popover: null,
      // 获取当前选中的国家
      now_country: '中国',
      // 请输入搜索关键词
      search_input: '',
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
      //给后台传递的参数endDate
      endDate: ''
    }
  },

  created: function() {
    // 设置默认endDate的值与日历值一样、
    this.endDate = formatDate(this.dateValue, 'yyyy-MM-dd')
    this.get_data()
    this.$watch('dateValue', function(newValue, oldValue) {
      // console.log('当前日期发生变化，重新请求数据...')
      if (newValue != '') {
        this.change_bg_week = false
        this.change_bg_day = false
      }

      this.get_data()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      // console.log('当前日期发生变化，重新请求数据...')
      this.get_data()
    })
    this.$watch('now_country', function(newValue, oldValue) {
      // console.log('当前国家发生变化，重新请求数据...')
      this.get_data()
    })
  },
  methods: {
    // 请求数据
    get_data() {
      // alert('444444444444')
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
          // console.log(555)
          // alert(this.dateValue)

          let url
          if (this.change_bg_week) {
            let day1 = new Date()
            day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000 * 7)
            // console.log(day1)
            // console.log(formatDate(new Date(), 'yyyy-MM-dd'))
            url =
              '/Word/HotSearch?deviceType=' +
              deviceType +
              '&countryId=' +
              country_id +
              '&startDate=' +
              formatDate(day1, 'yyyy-MM-dd') +
              '&endDate=' +
              formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.change_bg_day) {
            let day1 = new Date()
            day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
            url =
              '/Word/HotSearch?deviceType=' +
              deviceType +
              '&countryId=' +
              country_id +
              '&startDate=' +
              formatDate(day1, 'yyyy-MM-dd') +
              '&endDate=' +
              formatDate(day1, 'yyyy-MM-dd')
          } else {
            let startDate = formatDate(this.dateValue, 'yyyy-MM-dd')
            url =
              '/Word/HotSearch?deviceType=' +
              deviceType +
              '&countryId=' +
              country_id +
              '&startDate=' +
              startDate +
              '&endDate=' +
              startDate
          }
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.no_data_img = false

              if (
                response.data.Data == null ||
                response.data.Data.length == 0
              ) {
                this.no_data_img = true
              }
              this.response_data = response.data.Data
              // console.log(this.response_data)
              // console.log(555555555555555555555555)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 请求鼠标悬浮的框框数据
    get_data_for_popover(word, time) {
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
          let url =
            '/Word/HotSearchApps?deviceType=' +
            deviceType +
            '&countryId=' +
            country_id +
            '&word=' +
            encodeURIComponent(word) +
            '&time=' +
            time
          // console.log(url)

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_datafor_popover = response.data
              // console.log(this.response_datafor_popover)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
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

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    },
    go_to_page01_son() {
      if (this.search_input.trim() == '') {
        return false
      }

      this.$store.state.hot_search_to_hot_history_equipmentValue = this.equipmentValue
      this.$store.state.now_country_name = this.now_country
      this.$router.push({
        path: '/hot_history'
      })
      this.$store.state.now_app_name = this.search_input
    },
    go_to_page01(parm) {
      this.$store.state.hot_search_to_hot_history_equipmentValue = this.equipmentValue
      this.$store.state.now_country_name = this.now_country
      this.$router.push({
        path: '/hot_history'
      })
      this.$store.state.now_app_name = parm
    },
    go_to_page02(parm, parm02) {
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
.font_word {
  line-height: 27px;
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
  line-height: 26px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  margin-left: 10px;
}
.hide_font {
  width: 45px;
  height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.change_bg {
  color: #ffffff !important;
  background-color: #009bef;
  border: solid 1px #ffffff !important;
}
.table_font_other {
  color: #009bef;
}
.table_font_other > div {
  margin-right: 20px;
}
.table_font_other > div:nth-child(10),
.table_font_other > div:nth-child(8),
.table_font_other > div:nth-child(9) {
  color: #888888;
}
.table_hover_app_group > div {
  margin-right: 16px;
  text-align: center;
}
.table_hover_app_group {
  display: flex;
  align-items: center;
  margin-top: 15px;
  overflow: hidden;
}
.table_hover_app_group img {
  width: 40px;
  height: 40px;

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  border-radius: 10px;
  border: solid 1px #f2f2f2;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  letter-spacing: 0px;
  color: #444444;
}
.table_hover_line {
  width: 263px;
  height: 1px;
  background-color: #f2f2f2;
  margin: 15px auto;
}
.table_hover_title span:last-child {
  color: #009bef;
}
.table_hover_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table_hover {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
thead tr {
  height: 40px;
}
.table_font {
  display: flex;
  padding-left: 50px;
  flex-wrap: wrap;
}
.table_font > div {
  cursor: pointer;
}
tbody > tr > td:first-child {
  width: 325px;
}
tbody tr {
  height: 80px;
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
table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-bottom: 50px;
}
.font_block {
  text-align: center;
  line-height: 27px;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  width: 48px !important;
  height: 26px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  letter-spacing: 0px;
  color: #444444;
  margin-right: 10px;
  display: inline-block;
}
.options_04 {
  margin-left: 20px !important;
}
.options_04 .search div {
  width: 145px !important;
}

.options_03 .date {
  margin-right: 10px;
}

.option > div:first-child {
  font-weight: 600 !important;
  margin-right: 15px;
}
.option {
  display: flex;
  margin-left: 30px;
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
.hot_search_title {
  height: 18px;
  line-height: 18px;
  font-size: 16px;
  font-weight: 600;
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
</style>
