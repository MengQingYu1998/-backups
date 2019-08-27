<template>
  <div id="trend_many" class="content">
    <div class="trend_many_title">「{{this.$store.state.now_app_name}}」搜索指数排名走势</div>
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
      <div class="btn_item_03" @click="change_radio02">
        <div class="margin_top_font">时间</div>
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
    <div class="keywords">
      <div>关键词</div>

      <div class="can_del_div" v-for="(item, index) in keyword_data" :key="index">
        <div>{{item}}</div>
        <img @click="remove_keyword_data(index)" src="../assets/keyword/del.png" alt />
      </div>
      <div>
        <el-input v-model="input" placeholder="请输入关键词查询联想词"></el-input>
      </div>
      <div @click="add_can_del_div">
        <div class="search_confirm pointer">添加</div>
      </div>
    </div>
    <div class="table_title">【{{keyword_data.join(',')}}】搜索指数走势</div>
    <div ref="myChart_trend_many" class="myChart" v-show="is_show_myChart_and_table"></div>

    <div class="bottom_image pointer" v-show="is_show_myChart_and_table">
      <img
        v-on:click="is_show_myChart_function"
        class="float_right"
        src="../assets/keyword/three.png"
        alt
      />
      <img
        v-on:click="is_show_table_function"
        class="float_right"
        src="../assets/keyword/calculator.png"
        alt
      />
    </div>

    <table v-show="!is_show_myChart_and_table">
      <thead>
        <tr>
          <th>
            <span>时间</span>
          </th>
          <th v-for="(item ,index) in keyword_data" :key="'trend_many_table01'+index">
            <span>{{item}}</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="response_data">
        <tr v-for="(item ,index) in response_data.Xtime.length" :key="'trend_many_table02'+index">
          <td>
            <div class="table_font">{{response_data.Xtime[index]}}</div>
          </td>
          <td v-for="(item_son ,index_son) in keyword_data" :key="'trend_many_table03'+index_son">
            <div class="table_font">{{response_data.Yvalue[index_son][index]}}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bottom_image pointer bottom_image_for_table" v-show="!is_show_myChart_and_table">
      <img
        v-on:click="is_show_myChart_function"
        class="float_right"
        src="../assets/keyword/three.png"
        alt
      />
      <img
        v-on:click="is_show_table_function"
        class="float_right"
        src="../assets/keyword/calculator.png"
        alt
      />
    </div>
    <div
      class="show_all pointer"
      v-show="is_show_myChart_and_table&&!canvas_is_show_all"
      @click="selected_data_function(true)"
    >显示所有</div>
    <div
      class="show_all pointer"
      v-show="is_show_myChart_and_table&&canvas_is_show_all"
      @click="selected_data_function(false)"
    >隐藏所有</div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'

// 引入工具类
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'trend_many',
  components: {
    country
  },
  data() {
    return {
      // 请求的数据
      response_data: null,
      // true显示myChart  false显示table表格
      is_show_myChart_and_table: true,
      // 单选框
      radio02: '7天',
      // 请输入关键词查询联想词
      input: '',
      // 设备选择
      equipment: [
        // 设备选择
        {
          value: 'iPhone'
        },
        {
          value: 'iPad'
        }
      ],
      equipmentValue: 'iPhone',

      now_country: '中国',
      //日期选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      dateValue: '',
      // 控制折线图显示所有
      canvas_is_show_all: true,
      //canvas 关键词data数组
      keyword_data: new Array(),
      // 数据
      keyword_data_value: new Array(),
      // X轴文本
      xAxis_data: new Array(),
      yAxis_max: 5,
      yAxis_min: 0,
      // 控制折线显隐
      selected_data: {}
    }
  },

  created: function() {
    // console.log(this.dateValue)
    this.keyword_data.length = 0
    this.keyword_data.push(this.$store.state.now_app_name)
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
  },
  methods: {
    // 请求参数
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
          let url = '/Word/FindSearchHint'
          let sdate, edate
          if (this.dateValue) {
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
          console.log(sdate)
          console.log(edate)
          if (sdate == undefined && edate == undefined) {
            console.log('时间未定义')
            return false
          }
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2

          let word = this.keyword_data
          // console.log(word)
          console.log(deviceType)
          // console.log(country_id)
          let data = {
            deviceType: deviceType,
            countryId: country_id,
            sdate: sdate,
            edate: edate,
            word: word
          }
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              this.response_data = response.data
              console.log(this.response_data)

              this.xAxis_data = this.response_data.Xtime
              this.keyword_data_value = this.response_data.Yvalue

            

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
    // 画表格
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_trend_many)
      // 绘制图表
      myChart.setOption(
        {
          tooltip: {
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

          legend: {
            data: that.keyword_data,
            y: 'bottom',
            // 控制显示隐藏哪一个折线
            // selected: {
            //   邮件营销: false
            // }
            selected: that.selected_data
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
              show: false
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
            axisLine: {
              show: false
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
            min: function(value) {
              let min_value = value.min
              if (min_value <= 5) {
                that.yAxis_min = 0
              } else if (min_value <= 20) {
                that.yAxis_min = 5
              } else if (min_value <= 50) {
                that.yAxis_min = 20
              } else if (min_value <= 100) {
                that.yAxis_min = 50
              } else if (min_value <= 500) {
                that.yAxis_min = 100
              } else if (min_value <= 1000) {
                that.yAxis_min = 500
              } else if (min_value <= 1500) {
                that.yAxis_min = 1000
              } else if (min_value <= 2000) {
                that.yAxis_min = 1500
              } else if (min_value <= 2500) {
                that.yAxis_min = 2000
              } else if (min_value <= 3000) {
                that.yAxis_min = 2500
              } else if (min_value <= 3500) {
                that.yAxis_min = 3000
              } else if (min_value <= 4000) {
                that.yAxis_min = 3500
              } else if (min_value <= 4500) {
                that.yAxis_min = 4000
              } else if (min_value <= 5000) {
                that.yAxis_min = 4500
              } else if (min_value <= 5500) {
                that.yAxis_min = 5000
              } else if (min_value <= 6000) {
                that.yAxis_min = 5500
              } else if (min_value <= 6500) {
                that.yAxis_min = 6000
              } else if (min_value <= 7000) {
                that.yAxis_min = 6500
              } else if (min_value <= 7500) {
                that.yAxis_min = 7000
              } else if (min_value <= 8000) {
                that.yAxis_min = 7500
              } else if (min_value <= 8500) {
                that.yAxis_min = 8000
              } else if (min_value <= 9000) {
                that.yAxis_min = 8500
              } else if (min_value <= 9500) {
                that.yAxis_min = 9000
              } else if (min_value <= 10000) {
                that.yAxis_min = 9500
              } else if (min_value <= 10500) {
                that.yAxis_min = 10000
              } else if (min_value <= 11000) {
                that.yAxis_min = 10500
              } else if (min_value <= 11500) {
                that.yAxis_min = 11000
              } else if (min_value <= 12000) {
                that.yAxis_min = 11500
              } else if (min_value <= 12500) {
                that.yAxis_min = 12000
              } else if (min_value <= 13000) {
                that.yAxis_min = 12500
              } else {
                that.yAxis_min = min_value - 100
              }
              return that.yAxis_min
            },
            max: function(value) {
              let max_value = value.max
              if (max_value <= 5) {
                that.yAxis_max = 5
              } else if (max_value <= 20) {
                that.yAxis_max = 20
              } else if (max_value <= 50) {
                that.yAxis_max = 50
              } else if (max_value <= 100) {
                that.yAxis_max = 100
              } else if (max_value <= 500) {
                that.yAxis_max = 500
              } else if (max_value <= 1000) {
                that.yAxis_max = 1000
              } else if (max_value <= 1500) {
                that.yAxis_max = 1500
              } else if (max_value <= 2000) {
                that.yAxis_max = 2000
              } else if (max_value <= 2500) {
                that.yAxis_max = 2500
              } else if (max_value <= 3000) {
                that.yAxis_max = 3000
              } else if (max_value <= 3500) {
                that.yAxis_max = 3500
              } else if (max_value <= 4000) {
                that.yAxis_max = 4000
              } else if (max_value <= 4500) {
                that.yAxis_max = 4500
              } else if (max_value <= 5000) {
                that.yAxis_max = 5000
              } else if (max_value <= 5500) {
                that.yAxis_max = 5500
              } else if (max_value <= 6000) {
                that.yAxis_max = 6000
              } else if (max_value <= 6500) {
                that.yAxis_max = 6500
              } else if (max_value <= 7000) {
                that.yAxis_max = 7000
              } else if (max_value <= 7500) {
                that.yAxis_max = 7500
              } else if (max_value <= 8000) {
                that.yAxis_max = 8000
              } else if (max_value <= 8500) {
                that.yAxis_max = 8500
              } else if (max_value <= 9000) {
                that.yAxis_max = 9000
              } else if (max_value <= 9500) {
                that.yAxis_max = 9500
              } else if (max_value <= 10000) {
                that.yAxis_max = 10000
              } else if (max_value <= 10500) {
                that.yAxis_max = 10500
              } else if (max_value <= 11000) {
                that.yAxis_max = 11000
              } else if (max_value <= 11500) {
                that.yAxis_max = 11500
              } else if (max_value <= 12000) {
                that.yAxis_max = 12000
              } else if (max_value <= 12500) {
                that.yAxis_max = 12500
              } else if (max_value <= 13000) {
                that.yAxis_max = 13000
              } else {
                that.yAxis_max = max_value + 100
              }
              return that.yAxis_max
            },
            type: 'value',
            minInterval: 1
          },
          series: that.series_data()
        },
        true
      )
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
    // 控制显示echarts还是table
    is_show_myChart_function() {
      this.is_show_myChart_and_table = true
    },
    is_show_table_function() {
      this.is_show_myChart_and_table = false
    },
    // 删除keyword_data数组里面数据，从而删除can_del_div，canvas随之改变
    remove_keyword_data: function(index) {
      if (index == 0) {
        return false
      }
      this.selected_data[this.keyword_data[index]] = false
      this.keyword_data.splice(index, 1)
      this.drawLine()
    },
    // 向keyword_data数组里面添加数据，从而can_del_div和canvas随之改变
    add_can_del_div: function() {
      if (this.input == '') {
        // this.$alert('不允许添加空的内容', {
        //   confirmButtonText: '确定'
        // })
        return false
      }
      if (!(this.keyword_data.indexOf(this.input) == -1)) {
        // this.$alert('不允许添加重复内容', {
        //   confirmButtonText: '确定'
        // })
        return false
      }
      this.keyword_data.push(this.input)
      // this.selected_data[this.keyword_data[this.input]] = true
      this.input = ''
      this.get_data()
      this.selected_data_function(true)
      this.drawLine()
    },

    change_radio02() {
      console.log(this.dateValue)
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
td {
  height: 60px;
  width: 600px;
}
.options_02 {
  margin-top: 1px;
}
.search_confirm {
  width: 48px !important;
  height: 25px;
  background-color: #009bef;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 25px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
}
.date {
  margin-top: 2px !important;
}
.btn_item_03 > div:nth-child(1) {
  margin-right: 16px !important;
}
.btn_item_03 {
  display: flex;
  align-items: center;
  margin-left: 22px;
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
tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
thead tr span {
  margin-left: -26px;
}
tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: block;
  max-height: 609px;
  overflow-y: scroll;
}
thead {
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
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
  border: solid 1px #f2f2f2;
  table-layout: fixed;
  text-align: center;
}
.bottom_image {
  float: right;
  position: absolute;
  top: 270.5px;
  right: -41px;
  margin-bottom: 50px;
}
.bottom_image img:first-child {
  z-index: 9999 !important;
}
.bottom_image_for_table {
  position: static !important;
  margin-top: 40px;
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
  width: 1200px;
  height: 300px;
  z-index: 1;
}

.table_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
}
.keywords > div {
  margin-right: 10px;
}
.keywords > div:first-child {
  margin-right: 15px;
}
.keywords {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.can_del_div div {
  display: inline-block;
}
.can_del_div {
  padding: 0 6px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #444444;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  text-align: center;
  /* display: flex; */
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
  width: 87px;
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
.margin_top_font {
  margin-top: 4px;
}
.options {
  margin: 22px 0;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 30px; */
  align-items: center;
  letter-spacing: 0px;
  color: #222222;
  display: flex;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #efefef;
}
.trend_many_title {
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
