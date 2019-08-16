<template>
  <div id="data_table" class="content">
    <!-- 自定义组件 -->
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
          <div class="classify">
            <div>榜单分类</div>
            <div>
              <el-radio-group v-model="middle_top_radio2" size="mini">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="免费"></el-radio-button>
                <el-radio-button label="付费"></el-radio-button>
                <el-radio-button label="畅销"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="classify type">
            <div>类型</div>
            <div>
              <el-radio-group v-model="middle_top_radio1" size="mini">
                <el-radio-button label="按分钟"></el-radio-button>
                <el-radio-button label="按小时"></el-radio-button>
                <el-radio-button label="按天"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="btn_group">
          <div class="classify middle_top_time">
            <div class="time_width">时间</div>
            <div @click="click_second_el_radio" class="time">
              <el-radio-group v-model="middle_top_radio3" size="mini">
                <el-radio-button
                  label="今日"
                  v-show="middle_top_radio1=='按小时'||middle_top_radio1=='按分钟'"
                ></el-radio-button>
                <el-radio-button
                  label="昨日"
                  v-show="middle_top_radio1=='按小时'||middle_top_radio1=='按分钟'"
                ></el-radio-button>
                <el-radio-button
                  label="7天"
                  v-show="middle_top_radio1=='按小时'||middle_top_radio1=='按分钟'||middle_top_radio1=='按天'"
                ></el-radio-button>
                <el-radio-button
                  label="30天"
                  v-show="middle_top_radio1=='按小时'||middle_top_radio1=='按天'"
                ></el-radio-button>
                <el-radio-button
                  label="180天"
                  v-show="middle_top_radio1=='按天'||middle_top_radio1=='按天'"
                ></el-radio-button>
                <el-radio-button label="360天" v-show="middle_top_radio1=='按天'"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="btn_item_01">
            <!-- <div>时间</div> -->
            <div @click="click_second_el_date_picker">
              <el-date-picker
                v-model="middle_top_time01"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="middle_top_pickerOptions"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div ref="ranking_compare" class="myChart" v-show="is_show_mychart"></div>

        <div class="myChart" v-show="!is_show_mychart">暂无数据</div>

        <div>
          <div
            class="show_all"
            v-show="!canvas_is_show_all"
            @click="selected_data_function(true)"
          >显示所有</div>
          <div
            class="show_all"
            v-show="canvas_is_show_all"
            @click="selected_data_function(false)"
          >隐藏所有</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// 引入工具类
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'data_table',
  components: { ios_header, left_nav },
  data() {
    return {
      is_show_mychart: false,
      now_country: sessionStorage.getItem('now_country_name'),
      response_data_second: null,
      response_data_second02: null,
      middle_top_radio1: '按天',
      middle_top_radio2: '全部',
      middle_top_radio3: '7天',
      middle_top_time01: '',
      middle_top_pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      // 控制折线图显示所有
      canvas_is_show_all: true,
      //canvas 关键词data数组
      keyword_data: [],
      // 数据
      keyword_data_value: [],
      // X轴文本
      xAxis_data: [],
      // 控制折线显隐
      selected_data: {},
      yAxis_max: 5, //Y轴值的问题
      // grid_bottom: '13%',

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
      is_show_table_myChart: true
    }
  },

  created: function() {
    this.get_data_second()
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data_second()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.get_data_second()
    })
    this.$watch('middle_top_time01', function(newValue, oldValue) {
      this.get_data_second()
    })
    this.$watch('middle_top_radio1', function(newValue, oldValue) {
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)

      // 2.解决切换之后380天消失了的bug
      if (this.middle_top_radio1 == '按分钟') {
        this.middle_top_radio3 = '今日'
      } else if (this.middle_top_radio1 == '按小时') {
        this.middle_top_radio3 = '今日'
      } else if (this.middle_top_radio1 == '按天') {
        this.middle_top_radio3 = '7天'
      }

      this.get_data_second()
    })
    this.$watch('middle_top_radio2', function(newValue, oldValue) {
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)
      this.get_data_second()
    })
    this.$watch('middle_top_radio3', function(newValue, oldValue) {
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)
      this.get_data_second()
    })
  },
  methods: {
    get_data_second() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          // console.log('获取国家ID')

          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据
          //      middle_top_radio1: '按分钟',
          // middle_top_radio2: '全部',
          // middle_top_radio3: '30天',
          let endDate, startDate
          if (this.middle_top_radio3 == '今日') {
            startDate = formatDate(new Date(), 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '昨日') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '7天') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 7)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '30天') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 30)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '180天') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 180)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '360天') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 380)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '') {
            let middle_top_time01 = this.middle_top_time01
            startDate = formatDate(middle_top_time01[0], 'yyyy-MM-dd')
            endDate = formatDate(middle_top_time01[1], 'yyyy-MM-dd')
          }
          // console.log(endDate)
          // console.log('=================')
          // console.log(startDate)
          let brand
          if (this.middle_top_radio2 == '全部') {
            brand = 0
          } else if (this.middle_top_radio2 == '免费') {
            brand = 1
          } else if (this.middle_top_radio2 == '付费') {
            brand = 2
          } else if (this.middle_top_radio2 == '畅销') {
            brand = 3
          }
          let timeType
          if (this.middle_top_radio1 == '按分钟') {
            timeType = 1
          } else if (this.middle_top_radio1 == '按小时') {
            timeType = 2
          } else if (this.middle_top_radio1 == '按天') {
            timeType = 3
          }
          // console.log(endDate)
          // console.log(startDate)
          // console.log('country_id' + country_id)
          // console.log('brand' + brand)
          // console.log('timeType' + timeType)
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let url = '/PostRandTrend'

          let appid =
            this.$store.state.now_app_id + ',' + this.$store.state.now_app_id02
          console.log('appid=' + appid)
          console.log('countryId=' + country_id)
          console.log('startDate=' + startDate)
          console.log('endDate=' + endDate)
          console.log('brand=' + brand)
          console.log('timeType=' + timeType)
          console.log('device=' + deviceType)
          let data = {
            // appids: '600273928,951391381',
            appids: appid,
            countryId: country_id,
            startDate: startDate,
            endDate: endDate,
            brand: brand,
            timeType: timeType,
            device: deviceType
          }

          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              console.log(response.data)
              // console.log(response.data.Data.length)
              this.is_show_mychart = false
              if (response.data.Data != null && response.data.Data.length > 0) {
                this.selected_data_function(false)
                this.is_show_mychart = true
                console.log('有数据')
                this.keyword_data_value = new Array()
                this.xAxis_data.length = new Array()
                this.keyword_data.length = new Array()

                this.response_data_second = response.data.Data[0]
                let temp = response.data.Data[1]
                // 都谁？ 抖音 快手 内涵
                let name_group01 = this.response_data_second.rankTrendInfo
                  .RankList
                let name_group02 = temp.rankTrendInfo.RankList
                name_group01.forEach(element => {
                  this.keyword_data.push(
                    this.response_data_second.appName + '-' + element
                  )
                })
                name_group02.forEach(element => {
                  this.keyword_data.push(temp.appName + '-' + element)
                })
                // this.keyword_data = this.keyword_data.concat(
                //   temp.rankTrendInfo.RankList
                // )
                //y轴数值
                let temp01 = this.response_data_second.rankTrendInfo.r1
                temp01.forEach(element => {
                  this.keyword_data_value.push(element.data)
                })
                let temp03 = temp.rankTrendInfo.r1
                temp03.forEach(element => {
                  this.keyword_data_value.push(element.data)
                })
                // x轴数据
                let temp02 = this.response_data_second.rankTrendInfo.r2.data
                this.xAxis_data = temp02.map(element => {
                  if (this.middle_top_radio1 == '按天') {
                    return timestamp(element, 'Y/M/D')
                  } else if (this.middle_top_radio1 == '按小时') {
                    return timestamp(element, 'Y/M/D h')
                  } else if (this.middle_top_radio1 == '按分钟') {
                    return timestamp(element, 'Y/M/D h:s')
                  }
                })

                // ==================找数组最大值====================
                let max_value_arr = []
                this.keyword_data_value.forEach(element => {
                  max_value_arr.push(element.slice(0))
                })
                let max_value = 0
                max_value_arr.forEach(element => {
                  element.forEach(element_son => {
                    // console.log(element_son)
                    element_son = parseInt(element_son)
                    if (max_value <= element_son) {
                      max_value = element_son
                    }
                  })
                })
                // console.log(max_value)
                // this.yAxis_max = max_value + 5
                if (max_value <= 5) {
                  this.yAxis_max = 5
                } else if (max_value <= 20) {
                  this.yAxis_max = 20
                } else if (max_value <= 50) {
                  this.yAxis_max = 50
                } else if (max_value <= 100) {
                  this.yAxis_max = 100
                } else if (max_value <= 500) {
                  this.yAxis_max = 500
                } else if (max_value <= 1000) {
                  this.yAxis_max = 1000
                } else if (max_value <= 1500) {
                  this.yAxis_max = 1500
                } else {
                  this.yAxis_max = max_value + 100
                }
                // ==================找数组最大值====================
                let str_length = this.keyword_data.join(',').length
                console.log(str_length)
                // if (str_length < 50) {
                //   this.grid_bottom = '13%'
                // } else if (str_length < 100) {
                //   this.grid_bottom = '17%'
                // } else if (str_length < 150) {
                //   this.grid_bottom = '21%'
                // } else if (str_length < 200) {
                //   this.grid_bottom = '24%'
                // } else if (str_length < 250) {
                //   this.grid_bottom = '27%'
                // } else if (str_length < 300) {
                //   this.grid_bottom = '30%'
                // } else if (str_length < 350) {
                //   this.grid_bottom = '33%'
                // } else if (str_length < 400) {
                //   this.grid_bottom = '36%'
                // } else if (str_length < 450) {
                //   this.grid_bottom = '39%'
                // } else if (str_length < 500) {
                //   this.grid_bottom = '42%'
                // }
                this.selected_data_function(true)
                this.drawLine()
              } else {
                console.log('无数据')
                this.is_show_mychart = false
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
    // 点击日历组件
    click_second_el_date_picker: function() {
      this.middle_top_radio3 = ''
    },
    // 点击单选按钮组件组件
    click_second_el_radio: function() {
      this.middle_top_time01 = ''
    },
    // 控制全部数据隐藏
    selected_data_function: function(bol) {
      let obj = new Object()
      this.keyword_data.forEach(element => {
        obj[element] = bol
      })
      this.selected_data = obj
      this.drawLine()
      this.canvas_is_show_all = bol
      this.canvas_is_show_all = bol
      // console.log(this.selected_data)
    },
    // 便利keyword_data生成canvas的series数据
    series_data: function() {
      let series_data_arr = new Array()
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'line'
        // this.stack = '总量'
        this.data = data
      }
      //通过便利关键词数组从而创建canvas的series数据
      this.keyword_data.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value[index]))
      })
      // console.log(series_data_arr)
      return series_data_arr
    },
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.ranking_compare)
      // 绘制图表
      myChart.setOption({
        color: [
          '#009bef',
          '#ff6969',
          '#6277ff',
          '#ff5c7c',
          '#7546fd',
          '#ff6946',
          '#0ec597',
          '#e8ed55',
          '#a6ff70',
          '#e13eff'
        ],
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis'
        },
        legend: {
          data: that.keyword_data,
          y: 'bottom',
          type: 'scroll',
          orient: 'horizontal',
          selected: that.selected_data
        },
        grid: {
          // height: '250px',
          left: '3%',
          right: '3%',
          // bottom: that.grid_bottom,
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: '保存',
              iconStyle: {
                opacity: 1,
                borderWidth: 2,
                borderColor: '#555'
              }
            }
          }
        },
        xAxis: {
          position: 'bottom',
          type: 'category',
          data: that.xAxis_data,
          // alignWithLabel: false
          boundaryGap: false
          // show: this.xAxis_is_show
          // gridIndex: 0
          // axisLine: { show: false }
        },
        yAxis: {
          minInterval: 1,
          type: 'value',
          inverse: true,
          min: 1,
          max: that.yAxis_max,
          interval: that.yAxis_max / 5
        },
        series: that.series_data()
      })
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
.time_width {
  width: 30px;
}
.middle_top_time {
  margin-left: 10px !important;
}
.time {
  margin-left: 5px !important;
}
.type {
  z-index: 100;
}
.right_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-top: 49px;
  text-align: center;
}
.show_all {
  width: 65px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #009bef;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
  margin: 32px auto;
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
  margin-top: 40px;
}
.bottom_image img:first-child {
  z-index: 9999 !important;
}
.bottom_image_for_table {
  position: static !important;
  margin-top: 40px;
}
.bottom_image {
  float: right;
  position: absolute;
  top: 206px;
  right: -40px;
}
.myChart_tips .float_right {
  float: right;
  margin-left: 20px;
}
.bottom_image_font {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: inline-block;
  vertical-align: top;
}

.myChart_tips div:nth-child(1),
.myChart_tips div:nth-child(2) {
  display: inline-block;
  width: 70px;
  /* margin-left: 553px; */
}
.myChart_tips {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.myChart {
  width: 965px;
  height: 300px;
  z-index: 999;
  text-align: center;
  color: #666;
  line-height: 300px;
  font-size: 50px;
}

.table_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 20px;
}
.custom {
  width: 59px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
}

.btn_group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.classify > div:nth-child(2) {
  margin-left: 28px;
  margin-right: 10px;
}
.classify > div:nth-child(3) {
  width: 89px;
}
.classify {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-left: 30px;
  display: flex;
  align-items: center;
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
