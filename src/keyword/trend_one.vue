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
          <el-select v-model="countryValue">
            <el-option v-for="item in  country " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_03 option">
        <div>日期</div>
        <div>
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" clear-icon></el-date-picker>
        </div>
      </div>
      <div class="options_div options_div_margin">
        <div>ios12</div>
      </div>
      <div class="options_div options_div_margin">
        <div>ios12</div>
      </div>
      <div class="options_div options_div_margin">
        <div>ios12</div>
      </div>
    </div>

    <div class="table_title">【抖音】搜索指数走势</div>
    <div ref="myChart" class="myChart"></div>
    <div class="bottom_image">
      <div>
        <img src="../assets/keyword/blue-line.png" alt>
        <div class="bottom_image_font">抖音</div>
      </div>
      <img class="float_right" src="../assets/keyword/calculator.png" alt>
      <img class="float_right" src="../assets/keyword/three.png" alt>
      <img class="float_right" src="../assets/keyword/down.png" alt>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trend_one',
  data() {
    return {
      // 请输入关键词查询联想词
      input: '',
      // 可以删除的div关键字
      keywords: ['抖音', '快手'],
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
      // 国家选择
      country: [
        {
          value: '中国'
        },
        {
          value: '美国'
        }
      ],
      countryValue: '中国',
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
      dateValue: ''
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          axisTick: {
            alignWithLabel: true
          },
          type: 'category',
          data: [
            '2014-5-6',
            '2014-5-6',
            '2014-5-6',
            '2014-5-6',
            '2014-5-6',
            '2014-5-6',
            '2014-5-6'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'asdf',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            itemStyle: {
              normal: {
                borderWidth: 3,
                // borderColor: 'white', //折线图上的点点
                color: ' #429ae8' //折线
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.bottom_image .float_right {
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
.bottom_image div:first-child {
  display: inline-block;
  width: 70px;
  margin-left: 553px;
}
.bottom_image {
  margin-top: 30px;
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
}
</style>
