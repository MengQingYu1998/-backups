<template>
  <div id="trend_one" class="content">
    <div class="trend_one_title">「{{this.$store.state.now_app_name}}」搜索结果数排名走势</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div>系统</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-select v-model="systemValue">
            <el-option v-for="item in  system " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_01 option">
        <div>设备</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-select v-model="equipmentValue">
            <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_02 option">
        <div>地区</div>
        <div>
          <!-- 选择国家 -->
          <country @childFn="parentFn" :custom_country="this.$store.state.now_country_name"></country>
        </div>
      </div>
      <div class="btn_item_03" @click="change_radio02">
        <div>时间</div>
        <div class="date">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <div></div>
      </div>
      <div @click="change_time01">
        <el-radio-group v-model="radio02" size="mini">
          <el-radio-button label="7天"></el-radio-button>
          <el-radio-button label="30天"></el-radio-button>
          <el-radio-button label="90天"></el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="table_title">【{{this.$store.state.now_app_name}}】搜索结果数走势</div>
    <div ref="myChart_trend_one" class="myChart" v-show="is_show_table_myChart_myChart"></div>

    <div class="bottom_image" v-show="is_show_table_myChart_myChart">
      <!-- <img src="../assets/keyword/down.png" alt> -->
      <!-- <img v-on:click="is_show_table_myChart_function" src="../assets/keyword/three.png" alt />
      <img v-on:click="is_show_table_myChart_function" src="../assets/keyword/calculator.png" alt />-->
    </div>
    <table v-show="!is_show_table_myChart_myChart">
      <thead>
        <tr>
          <th>时间</th>
          <th>排名</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="table_font">2019-02-20 12:56</div>
          </td>
          <td>
            <div class="table_font">1</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bottom_image bottom_image_for_table" v-show="!is_show_table_myChart_myChart">
      <img class="float_right" src="../assets/keyword/down.png" alt v-show="false" />
      <img
        v-on:click="is_show_table_myChart_function"
        class="float_right"
        src="../assets/keyword/three.png"
        alt
      />
      <img
        v-on:click="is_show_table_myChart_function"
        class="float_right"
        src="../assets/keyword/calculator.png"
        alt
      />
    </div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'

// 引入工具类
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'trend_one',
  components: {
    country
  },
  data() {
    return {
      // 多选按钮
      radio02: '7天',
      // true显示myChart false显示table表格
      is_show_table_myChart_myChart: true,

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
      // 系统选择
      system: [
        {
          value: 'ios11'
        },
        {
          value: 'ios12'
        }
      ],
      systemValue: 'ios12',
      now_country: '中国',

      //日期选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      dateValue: '',
      //canvas 关键词data数组
      keyword_data: [],
      xAxis_data: [],
      // 数据
      keyword_data_value: [],
      yAxis_max: 5
    }
  },
  created: function() {
    // 请求数据
    this.get_data()

    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data()
    })
    // 监听第二部分的时间变化
    this.$watch('radio02', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('dateValue', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('systemValue', function(newValue, oldValue) {
      this.get_data()
    })
  },
  methods: {
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
    // 请求数据
    get_data() {
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
          // console.log('国家' + country_id)
          // 请求数据
          let url = '/Word/FindSearchNumber'
          let sdate, edate
          if (this.dateValue) {
            // alert(this.dateValue[0])

            sdate = formatDate(this.dateValue[0], 'yyyy-MM-dd')
            edate = formatDate(this.dateValue[1], 'yyyy-MM-dd')
          } else if (this.radio02 == '7天') {
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 7)
            sdate = formatDate(time02, 'yyyy-MM-dd')
          } else if (this.radio02 == '30天') {
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 30)
            sdate = formatDate(time02, 'yyyy-MM-dd')
          } else if (this.radio02 == '90天') {
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 90)
            sdate = formatDate(time02, 'yyyy-MM-dd')
          }
          // console.log(sdate)
          // console.log(edate)
          if (sdate == undefined && edate == undefined) {
            console.log('时间未定义')
            return false
          }
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          // 系统选择
          let iosType = this.systemValue == 'ios11' ? 11 : 12

          // console.log(word)
          // console.log(deviceType)
          // console.log(country_id)
          // console.log(iosType)
          let word = this.$store.state.now_app_name
          let data = {
            deviceType: deviceType,
            countryId: country_id,
            sdate: sdate,
            edate: edate,
            word: word,
            iosType: iosType
          }
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              this.response_data = response.data
              console.log(this.response_data)
              this.keyword_data_value.length = 0
              this.xAxis_data.length = 0
              this.keyword_data_value.push(this.response_data.Yvalue)
              this.xAxis_data = this.response_data.Xtime

              this.keyword_data.push(this.$store.state.now_app_name)
              // ==================找数组最大值====================
              let max_value_arr = new Array()
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
              this.drawLine()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    //控制canvas和table的显示
    is_show_table_myChart_function: function() {
      this.is_show_table_myChart_myChart = !this.is_show_table_myChart_myChart
    },
    // 画canvas
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_trend_one)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis'
        },
        color: [
          '#62c8ff',
          '#216aff',
          '#4209a2',
          '#a000d2',
          '#ec066d',
          '#f24d3e',
          '#ff9731',
          '#ffd800',
          '#c3df00',
          '#529323'
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: that.keyword_data,
          y: 'bottom'
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '13%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              trend_one_title: '保存',
              iconStyle: {
                opacity: 1,
                borderWidth: 2,
                borderColor: '#555'
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: that.xAxis_data
        },
        yAxis: {
          type: 'value',
          min: 0,
          minInterval: 1,
          max: that.yAxis_max,
          interval: that.yAxis_max / 5
        },
        series: that.series_data()
      })
    },
    change_radio02() {
      this.radio02 = ''
    },
    change_time01() {
      this.dateValue = ''
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
.date {
  margin-top: 2px !important;
}
.btn_item_03 > div:nth-child(1) {
  margin-right: 16px !important;
}
.btn_item_03 {
  display: flex;
  align-items: center;
  margin-left: 70px;
  margin-top: 10px;
}
.btn_item_03 > div {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 10px;
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
  margin-top: 5px;
}
.classify > div:nth-child(2) {
  margin-left: 28px;
  margin-right: 10px;
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
  top: 226px;
  right: -41px;
}

.myChart {
  width: 1200px;
  height: 300px;
}

.table_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 110px;
}
.options_div_margin {
  margin-left: 10px;
}
.options_div div:last-child {
  width: 74px !important;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
  margin-top: 3px;
}
.options_03 div:last-child {
  width: 114px !important;
}
.options_03 {
  margin-left: 70px !important;
}
.option div:first-child {
  margin-right: 15px;
}
.option div:last-child {
  width: 86px;
  height: 24px;
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
  height: 24px;
  margin: 22px 0;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  display: flex;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #efefef;
}
.trend_one_title {
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
}
.content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
</style>
