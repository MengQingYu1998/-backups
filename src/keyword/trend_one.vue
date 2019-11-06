<template>
  <div id="trend_one" class="content">
    <div class="trend_one_title">「{{this.$store.state.now_app_name}}」搜索结果数排名走势</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div class="margin_top_font">系统</div>
        <div>
          <!-- 饿了么的select组件 -->

          <el-radio-group v-model="systemValue" size="mini">
            <el-radio-button v-for="item in  system " :key="item.value" :label="item.value"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="options_01 option">
        <div class="margin_top_font">设备</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-radio-group v-model="equipmentValue" size="mini">
            <el-radio-button v-for="item in  equipment " :key="item.value" :label="item.value"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="options_02 option">
        <div class="margin_top_font">地区</div>
        <div>
          <!-- 选择国家 -->
          <country @childFn="parentFn" :custom_country="this.$store.state.now_country_name"></country>
        </div>
      </div>
      <div class="btn_item_03">
        <div class="margin_top_font">时间</div>
        <div class="date">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            clear-icon
            prefix-icon="fasle"
          ></el-date-picker>
        </div>
        <div @click="change_time01">
          <el-radio-group v-model="radio02" size="mini">
            <el-radio-button label="7天"></el-radio-button>
            <el-radio-button label="30天"></el-radio-button>
            <el-radio-button label="90天"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>

    <div class="position_relative">
      <div ref="myChart_trend_one" class="myChart" v-show="is_show_myChart_and_table"></div>

      <div class="bottom_image pointer">
        <img
          v-if="!is_show_myChart_and_table"
          v-on:click="is_show_myChart_function"
          class="float_right"
          src="../assets/keyword/three.png"
          alt
        />
        <img
          v-else
          v-on:click="is_show_myChart_function"
          class="float_right"
          src="../assets/keyword/three_active.png"
          alt
        />
        <img
          v-if="is_show_myChart_and_table"
          v-on:click="is_show_table_function"
          class="float_right"
          src="../assets/keyword/calculator.png"
          alt
        />
        <img
          v-else
          v-on:click="is_show_table_function"
          class="float_right"
          src="../assets/keyword/calculator_active.png"
          alt
        />
      </div>
    </div>
    <table v-show="!is_show_myChart_and_table">
      <thead>
        <tr>
          <th>
            <span>时间</span>
          </th>
          <th>
            <span>{{this.$store.state.now_app_name}}</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="response_data">
        <tr v-for="(item ,index) in response_data.Xtime.length" :key="'trend_one_table02'+index">
          <td>
            <div>{{response_data.Xtime[index]}}</div>
          </td>
          <td>
            <div>{{response_data.Yvalue[index]}}</div>
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
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'trend_one',
  components: {
    country
  },
  data() {
    return {
      response_data: null,
      is_show_myChart_and_table: true,
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
          value: 'iOS13/12'
        },
        {
          value: 'iOS11'
        }
      ],
      systemValue: 'iOS13/12',
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
      yAxis_max: 5,
      yAxis_min: 0
    }
  },
  created: function() {
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data()
    })
    // 监听第二部分的时间变化
    this.$watch('radio02', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('dateValue', function(newValue, oldValue) {
      this.radio02 = ''
      this.get_data()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.get_data()
    })
    this.$watch('systemValue', function(newValue, oldValue) {
      this.get_data()
    })
  },
  mounted() {
    // 请求数据
    this.get_data()
  },
  methods: {
    // 便利keyword_data生成canvas的series数据
    series_data: function() {
      let series_data_arr = new Array()
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'line'
        this.symbol = 'circle'
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
      this.myChart = this.$echarts.init(this.$refs.myChart_trend_one)
      this.myChart.showLoading({
        text: '',
        color: '#D3D3D3'
      })
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
            // console.log('时间未定义')
            return false
          }
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          // 系统选择
          let iosType = this.systemValue == 'iOS11' ? 11 : 12

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
              // console.log(this.response_data)
              this.keyword_data_value.length = 0
              this.xAxis_data.length = 0
              this.keyword_data_value.push(this.response_data.Yvalue)
              this.xAxis_data = this.response_data.Xtime

              this.keyword_data.push(this.$store.state.now_app_name)

              this.drawLine()

              this.myChart.hideLoading()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 控制显示echarts还是table
    is_show_myChart_function() {
      this.is_show_myChart_and_table = true
    },
    is_show_table_function() {
      this.is_show_myChart_and_table = false
    },
    // 画canvas
    drawLine: function() {
      let that = this

      // 绘制图表
      this.myChart.setOption(
        {
          title: {
            text: '【' + that.$store.state.now_app_name + '】搜索结果数走势',
            left: 'center',
            textStyle: {
              color: '#222222',
              fontSize: 16,
              fontFamily: 'SourceHanSansCN-Medium',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            formatter: function(data) {
              let tr = ''
              data.forEach(element => {
                tr += `<tr  style="border:none !important">
                  <td>${element.marker.replace(
                    'width:10px;height:10px;',
                    'width:6px;height:6px;vertical-align:2px;'
                  )}</td>
                  <td style="padding-right:10px">${element.seriesName}</td>
                  <td>${element.value}</td>
                  </tr>`
              })
              let str = `<p>${data[0].axisValue}</p><table><tbody>${tr}</tbody></table>`
              return str
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            backgroundColor: '#fff',
            extraCssText:
              'box-shadow: 0px 0px 4px 0px  rgba(0, 0, 0, 0.18);line-height:25px;padding:10px 15px',
            textStyle: {
              color: '#222222;',
              fontSize: 13,
              align: 'left'
            },
            trigger: 'axis'
          },
          color: [
            '#009bef',
            '#e75b48',
            '#05c898',
            '#f8c848',
            '#d55282',
            '#f49c47',
            '#39c3da',
            '#7b4dee',
            '#a4d53b',
            '#b2b2b2'
          ],

          legend: {
            data: that.keyword_data,
            y: 'bottom'
          },
          grid: {
            left: '5%',
            right: '3%',
            bottom: '20%'
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
            axisLine: {
              show: true,
              onZero: false,
              lineStyle: {
                color: '#DCDFE6'
              }
            },
            axisLabel: {
              color: '#222'
            },
            axisTick: {
              show: false
            },
            //网格样式
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#f2f2f2']
              }
            },
            type: 'category',
            boundaryGap: false,
            data: that.xAxis_data
          },
          yAxis: {
            axisLabel: {
              color: '#222'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCDFE6'
              }
            },
            axisTick: {
              show: false
            },
            //网格样式
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#f2f2f2']
              }
            },
            type: 'value',

            minInterval: 1,
            min: function(value) {
              if (value.min == Infinity) {
                return 0
              }
              return value.min
            },
            max: function(value) {
              if (value.max == -Infinity) {
                return 5
              }
              return value.max
            }
          },
          series: that.series_data()
        },
        true
      )
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
.float_right {
  width: 17px;
  height: 15px;
}
tbody div {
  margin-left: -11px;
}
.position_relative {
  position: relative;
}
.date {
}
.btn_item_03 > div:nth-child(1) {
  margin-right: 15px !important;
}
.btn_item_03 {
  display: flex;
  align-items: center;
  margin-left: 30px;
}
.btn_item_03 > div {
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 10px;
}
.classify {
  font-weight: 600 !important;
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

td {
  height: 60px;
  width: 600px;
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
  display: block;
  max-height: 609px;
  overflow-y: scroll;
}
thead tr span {
  margin-left: -26px;
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
  display: table;
  width: 100%;
  table-layout: fixed;
}
table {
  border: solid 1px #eaeaea;
  table-layout: fixed;
  text-align: center;
  margin-top: 90px;
  margin-bottom: 50px;
}

.bottom_image img {
  margin-left: 10px;
}
.bottom_image {
  position: absolute;
  top: 3px;
  right: 38px;
  z-index: 9999999999;
}

.myChart {
  width: 1200px;
  height: 380px;
  margin-top: 60px;
}

.table_title {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 90px;
  margin-bottom: 40px;
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

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
  margin-top: 3px;
}

.options_03 {
  margin-left: 70px !important;
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
  font-weight: 600 !important;
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
  align-items: center;
  display: flex;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #efefef;
}
.trend_one_title {
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
  position: relative;
}
</style>
