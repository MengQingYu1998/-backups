<template>
  <div id="data_table" class="content">
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
              <el-radio-group v-model="radio1" size="mini">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
                <el-radio-button label="广州"></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="classify">
            <div>日期</div>
            <div>
              <el-radio-group v-model="radio2" size="mini">
                <el-radio-button label="今天"></el-radio-button>
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
        <div class="right_title">蘑菇街与趣多多排名对比</div>
        <div class="table_title">【今日】榜单排名走势</div>
        <div ref="myChart_data_table" class="myChart" v-show="is_show_table_myChart"></div>

        <div class="bottom_image" v-show="is_show_table_myChart">
          <!-- <img class="float_right" src="../assets/keyword/down.png" alt> -->
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
        <table v-show="!is_show_table_myChart">
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
        <div class="bottom_image bottom_image_for_table" v-show="!is_show_table_myChart">
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
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'data_table',
  components: { ios_header, left_nav },
  data() {
    return {
      // true显示myChart false显示table表格
      is_show_table_myChart: true,

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
      customValue: '自定义',
      // 控制折线图显示所有
      canvas_is_show_all: true,
      //canvas 关键词data数组
      keyword_data: [
        '邮件营销',
        '联盟广告',
        '视频广告',
        '直接访问',
        '搜索引擎'
      ],
      // 数据
      keyword_data_value: [
        [820, 932, 901, 0, 11, 1330, 1320],
        [555, 555, 555, 0, 555, 555, 555],
        [820, 932, 901, 0, 1290, 1330, 1320],
        [555, 6, 555, 0, 555, 555, 555],
        [88, 932, 901, 0, 1290, 1330, 75]
      ],
      // X轴文本
      xAxis_data: ['周30', '周二', '周三', '周四', '周五', '周六', '周日'],
      // 控制折线显隐
      selected_data: {}
    }
  },

  mounted() {
    this.drawLine()
  },
  methods: {
    // 控制全部数据隐藏
    selected_data_function: function(bol) {
      let obj = {}
      this.keyword_data.forEach(element => {
        obj[element] = bol
      })
      this.selected_data = obj
      this.drawLine()
      this.canvas_is_show_all = !this.canvas_is_show_all
      // console.log(this.selected_data)
    },
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
      this.keyword_data.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value[index]))
      })
      // console.log(series_data_arr)
      return series_data_arr
    },

    //控制canvas和table的显示
    is_show_table_myChart_function: function() {
      this.is_show_table_myChart = !this.is_show_table_myChart
    },
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
      this.keyword_data.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value[index]))
      })
      // console.log(series_data_arr)
      return series_data_arr
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
          y: 'bottom',
          // 控制显示隐藏哪一个折线
          // selected: {
          //   邮件营销: false
          // }
          selected: that.selected_data
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
