<template>
  <div id="ranking_compare" class="content">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>学习强国</span>
    </div>
    <!-- 自定义组件 -->
    <ios_header/>
    <div class="left_and_right">
      <div class="left">
        <left_nav/>
      </div>
      <div class="right">
        <!-- 顶部 关键词概述 -->
        <section></section>
        <!-- 底部 类型模块 -->
        <section>
          <div class="right_nav">榜单排名对比</div>
          <div class="line"></div>
          <div class="btn_group">
            <div class="classify">
              <div>日期</div>
              <div>
                <el-radio-group v-model="radio2" size="mini">
                  <el-radio-button label="按分钟"></el-radio-button>
                  <el-radio-button label="按小时"></el-radio-button>
                  <el-radio-button label="按天"></el-radio-button>
                  <el-radio-button label="近24小时"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="7天"></el-radio-button>
                  <el-radio-button label="30天"></el-radio-button>
                </el-radio-group>
              </div>
              <div>
                <el-select v-model="customValue">
                  <el-option v-for="item in  custom " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="position_relative">
            <div class="table_title">【今日】榜单排名走势</div>
            <div ref="myChart_data_table" class="myChart" v-show="is_show_myChart"></div>
            <div class="bottom_image" v-show="is_show_myChart">
              <!-- <img class="float_right" src="../assets/keyword/down.png" alt> -->
              <img
                v-on:click="is_show_myChart_function"
                class="float_right"
                src="../assets/keyword/three.png"
                alt
              >
              <img
                v-on:click="is_show_table_function"
                class="float_right"
                src="../assets/keyword/calculator.png"
                alt
              >
            </div>
            <table v-show="is_show_table">
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
            <div class="bottom_image bottom_image_for_table" v-show="is_show_table">
              <img class="float_right" src="../assets/keyword/down.png" alt v-show="false">
              <img
                v-on:click="is_show_myChart_function"
                class="float_right"
                src="../assets/keyword/three.png"
                alt
              >
              <img
                v-on:click="is_show_table_function"
                class="float_right"
                src="../assets/keyword/calculator.png"
                alt
              >
            </div>
            <div class="import_data" v-show="is_show_myChart">导出数据</div>
            <div class="import_data_for_table" v-show="is_show_table">导出数据</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'ranking_compare',
  components: { ios_header, left_nav },
  data() {
    return {
      // 是否显示myChart
      is_show_myChart: true,
      // 是否显示table表格
      is_show_table: false,
      //canvas 关键词data数组
      keyword_data: [
        '邮件营销',
        '联盟广告',
        '视频广告',
        '直接访问',
        '搜索引擎'
      ],
      xAxis_data: ['周3', '周二', '周三', '周四', '周五', '周六', '周日'],
      // 单选按钮组
      radio1: '上海',
      radio2: '今天',
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
      //自定义选择
      custom: [
        {
          value: '自定义'
        },
        {
          value: 'iOS'
        }
      ],
      customValue: '自定义'
    }
  },

  mounted() {
    this.drawLine()
  },
  methods: {
    // 便利keyword_data生成canvas的series数据
    series_data: function() {
      let series_data_arr = []
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'line'
        this.stack = '总量'
        this.data = data
      }
      //通过便利关键词数组从而创建canvas的series数据
      this.keyword_data.forEach(element => {
        series_data_arr.push(
          new Obj(element, [820, 932, 901, 934, 1290, 1330, 1320])
        )
      })
      console.log(series_data_arr)
      return series_data_arr
    },

    // 控制table和canvas的显隐
    is_show_table_function: function() {
      this.is_show_myChart = false
      this.is_show_table = true
    },
    is_show_myChart_function: function() {
      // console.log(5345345646)
      this.is_show_myChart = true
      this.is_show_table = false
    },
    // canvas画折线图
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_data_table)
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
        series: that.series_data()
      })
    }
  }
}
</script>
<style scoped>
.import_data_for_table {
  width: 65px;
  height: 24px;
  background-color: #009bef;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  position: absolute;
  right: 30px;
  bottom: -64px;
}
.import_data {
  width: 65px;
  height: 24px;
  background-color: #009bef;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  float: right;
  margin-top: -20px;
}
.position_relative {
  position: relative;
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
  margin-top: 44px;
  margin-right: 107px;
}
.bottom_image {
  float: right;
  position: absolute;
  top: 31px;
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
  width: 100%;
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
  width: 72px;
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
