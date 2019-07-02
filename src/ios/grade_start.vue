<template>
  <div id="version_message" class="content">
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
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <section class="top">
          <div class="section_title">评分统计</div>
          <div class="start">
            <div class="start_left">
              <div class="start_left_title">App Store 当前显示评分</div>
              <div class="start_left_bottom">
                <div class="start_left_bottom_child_left">
                  <div>4.7</div>
                  <div>
                    <el-rate v-model="start_left"></el-rate>
                  </div>
                  <div>评分次数：64866774</div>
                </div>
                <div class="start_left_bottom_child_right">
                  <section>
                    <div>5星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color=" #fad356"
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                  <section>
                    <div>4星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color=" #81ef8e "
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                  <section>
                    <div>3星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color=" #81e1ef"
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                  <section>
                    <div>2星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color="#ef81d4"
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                  <section>
                    <div>1星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color=" #ef8189"
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                </div>
              </div>
            </div>
            <div class="start_right">
              <div class="start_right_title">所有版本评分</div>
              <div class="start_left_bottom">
                <div class="start_left_bottom_child_left">
                  <div>4.7</div>
                  <div>
                    <el-rate v-model="start_right"></el-rate>
                  </div>
                  <div>评分次数：64866774</div>
                </div>
                <div class="start_left_bottom_child_right">
                  <section>
                    <div>5星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color=" #fad356"
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                  <section>
                    <div>4星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color=" #81ef8e "
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                  <section>
                    <div>3星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color=" #81e1ef"
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                  <section>
                    <div>2星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color="#ef81d4"
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                  <section>
                    <div>1星</div>
                    <div>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="70"
                        color=" #ef8189"
                      ></el-progress>
                    </div>
                    <div>34252637</div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="middle_top">
          <div class="section_title">评分记录</div>
          <div class="btn_group">
            <div class="btn_item_01">
              <div>时间</div>
              <div>
                <el-date-picker
                  v-model="start_date"
                  type="date"
                  placeholder="起始时间"
                  :clearable="false"
                ></el-date-picker>
              </div>
              <div>
                <el-date-picker
                  v-model="end_date"
                  type="date"
                  placeholder="结束时间"
                  :clearable="false"
                ></el-date-picker>
              </div>
              <div>近一个月</div>
            </div>
          </div>
          <div ref="grade_start_one" class="myChart"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'version_message',
  components: { ios_header, left_nav },
  data() {
    return {
      //起始时间，结束时间
      start_date: '',
      end_date: '',

      // 顶部搜索框
      input1: '',
      // 评分五角星
      start_left: 2,
      start_right: 3
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    // 画canvas
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.grade_start_one)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          y: 'bottom',
          data: [
            '直接访问',
            '邮件营销',
            '联盟广告',
            '视频广告',
            '搜索引擎',
            '百度',
            '谷歌',
            '必应',
            '其他'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              },
              data: [[{ type: 'min' }, { type: 'max' }]]
            }
          },
          {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.myChart {
  width: 976px;
  height: 297px;
}
.btn_item_01 > div:nth-child(4) {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  width: 70px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
}
.btn_item_01 > div:nth-child(2) div {
  width: 119px;
}
.btn_item_01 > div:nth-child(3) div {
  width: 119px;
}
.btn_item_01 > div:nth-child(1) {
  margin-right: 16px !important;
}
.btn_item_01 {
  display: flex;
  align-items: center;
}
.btn_item_01 > div {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 10px;
}
.top {
  margin-bottom: 50px;
}
.start_left_bottom_child_right section > div {
  margin-right: 15px;
}
.start_left_bottom_child_right section > div:nth-child(2) {
  width: 175px;
  height: 22px;
}
.start_left_bottom_child_right > section:first-child {
  margin-top: 34px;
}
.start_left_bottom_child_right > section {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
  margin-bottom: 13px;
}
.start_left_bottom_child_left {
  width: 155px;
}
.start_left_bottom_child_left > div {
  margin-top: 5px;
}
.start_left_bottom_child_left > div:first-child {
  font-family: SourceHanSansCN-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 78px;
}
.start_left_bottom_child_left div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  text-align: center;
}
.start .start_right_bottom,
.start .start_left_bottom {
  height: 230px;
  border: solid 1px #f7f7f7;
  display: flex;
}
.start .start_right_title,
.start .start_left_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0px;
  color: #222222;
  height: 40px;
  background-color: #f7f7f7;
}
.start > div:first-child {
  margin-right: 22px;
}
.start > div {
  width: 465px !important;
}
.start {
  display: flex;
  align-items: center;
}
.section_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #009bef;
  padding-left: 8px;
  margin-bottom: 20px;
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
