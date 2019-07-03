<template>
  <div id="trend_one" class="content">
    <div class="title">「网易云音乐」搜索结果数排名走势</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div>系统</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-select v-model="equipmentValue">
            <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_div option">
        <div>设备</div>
        <div>ios12</div>
      </div>
      <div class="options_02 option">
        <div>地区</div>
        <div>
          <!-- 选择国家 -->
          <country/>
        </div>
      </div>
      <div class="options_03 option">
        <div>日期</div>
        <div>
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" clear-icon></el-date-picker>
        </div>
      </div>
      <div class="classify">
        <div>榜单分类</div>
        <div>
          <el-radio-group v-model="radio1" size="mini">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>

    <div class="table_title">【抖音】搜索指数走势</div>
    <div ref="myChart_trend_one" class="myChart" v-show="is_show_table_myChart_myChart"></div>

    <div class="bottom_image" v-show="is_show_table_myChart_myChart">
      <!-- <img src="../assets/keyword/down.png" alt> -->
      <img v-on:click="is_show_table_myChart_function" src="../assets/keyword/three.png" alt>
      <img v-on:click="is_show_table_myChart_function" src="../assets/keyword/calculator.png" alt>
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
      <img class="float_right" src="../assets/keyword/down.png" alt v-show="false">
      <img
        v-on:click="is_show_table_myChart_function"
        class="float_right"
        src="../assets/keyword/three.png"
        alt
      >
      <img
        v-on:click="is_show_table_myChart_function"
        class="float_right"
        src="../assets/keyword/calculator.png"
        alt
      >
    </div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'

export default {
  name: 'trend_one',
  components: {
    country
  },
  data() {
    return {
      // 多选按钮
      radio1: '',
      // true显示myChart false显示table表格
      is_show_table_myChart_myChart: true,

      // 设备选择
      equipment: [
        {
          value: '安卓'
        },
        {
          value: 'iOS'
        }
      ],
      equipmentValue: '安卓',

      //日期选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      dateValue: '',
      //canvas 关键词data数组
      keyword_data: ['直接访问'],
      xAxis_data: ['周3', '周二', '周三', '周四', '周五', '周六', '周日'],
      series_data: [
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        }
      ]
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
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
          trigger: 'axis'
        },
        legend: {
          data: that.keyword_data,
          y: 'bottom'
        },
        grid: {
          left: '0%',
          right: '1%',
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
          type: 'category',
          boundaryGap: false,
          data: that.xAxis_data
        },
        yAxis: {
          type: 'value'
        },
        series: that.series_data
      })
    }
  }
}
</script>
<style scoped>
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
.option div:first-child {
  margin-right: 15px;
}
.option div:last-child {
  width: 72px;
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
.title {
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
