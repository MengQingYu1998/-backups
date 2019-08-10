<template>
  <div id="grade_start" class="content">
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
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
                  <div
                    v-if="response_data_first_part"
                  >{{response_data_first_part.current.ratingAverage}}</div>
                  <div>
                    <el-rate v-model="start_left" disabled></el-rate>
                  </div>
                  <div
                    v-if="response_data_first_part"
                  >评分次数：{{response_data_first_part.current.totalCount}}</div>
                </div>
                <div class="start_left_bottom_child_right">
                  <section>
                    <div>5星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[4].percent.slice(0, -1))"
                        color=" #fad356"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[0].count}}</div>
                  </section>
                  <section>
                    <div>4星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[3].percent.slice(0, -1))"
                        color=" #81ef8e "
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[1].count}}</div>
                  </section>
                  <section>
                    <div>3星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[2].percent.slice(0, -1))"
                        color=" #81e1ef"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[2].count}}</div>
                  </section>
                  <section>
                    <div>2星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[1].percent.slice(0, -1))"
                        color="#ef81d4"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[3].count}}</div>
                  </section>
                  <section>
                    <div>1星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[0].percent.slice(0, -1))"
                        color=" #ef8189"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[4].count}}</div>
                  </section>
                </div>
              </div>
            </div>
            <div class="start_right">
              <div class="start_right_title">所有版本评分</div>
              <div class="start_left_bottom">
                <div class="start_left_bottom_child_left">
                  <div
                    v-if="response_data_first_part"
                  >{{response_data_first_part.all.ratingAverage}}</div>
                  <div>
                    <el-rate v-model="start_right" disabled></el-rate>
                  </div>
                  <div
                    v-if="response_data_first_part"
                  >评分次数：{{response_data_first_part.all.totalCount}}</div>
                </div>
                <div class="start_left_bottom_child_right">
                  <section>
                    <div>5星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[4].percent.slice(0, -1))"
                        color=" #fad356"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[0].count}}</div>
                  </section>
                  <section>
                    <div>4星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[3].percent.slice(0, -1))"
                        color=" #81ef8e "
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[1].count}}</div>
                  </section>
                  <section>
                    <div>3星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[2].percent.slice(0, -1))"
                        color=" #81e1ef"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[2].count}}</div>
                  </section>
                  <section>
                    <div>2星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[1].percent.slice(0, -1))"
                        color="#ef81d4"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[3].count}}</div>
                  </section>
                  <section>
                    <div>1星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[0].percent.slice(0, -1))"
                        color=" #ef8189"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[4].count}}</div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- ===================第二部分====================== -->
        <!-- ====================第二部分===================== -->
        <!-- ====================第二部分===================== -->
        <section class="middle_top">
          <div class="section_title">评分记录</div>
          <div class="btn_group">
            <div class="btn_item_01">
              <div>时间</div>
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
              <div
                :class="{'font_block':true,'change_bg':click_near_month}"
                @click="click_near_month_function"
              >近一个月</div>
            </div>
          </div>
          <div ref="grade_start_one" class="myChart"></div>
        </section>
        <!-- ===================第三部分====================== -->
        <!-- ====================第三部分===================== -->
        <!-- ====================第三部分===================== -->
        <section class="middle_bottom">
          <div class="section_title">评论统计</div>
          <div class="btn_group">
            <div class="btn_item_02">
              <div>类型</div>
              <div>
                <el-radio-group v-model="middle_bottom_radio01" size="mini">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="在线评论"></el-radio-button>
                  <el-radio-button label="已删除评论"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="btn_item_03" @click="change_middle_bottom_radio02">
              <div>时间</div>
              <div>
                <el-date-picker
                  v-model="middle_bottom_time01"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="middle_bottom_pickerOptions"
                ></el-date-picker>
              </div>
              <div></div>
              <div @click="change_middle_bottom_time01">
                <el-radio-group v-model="middle_bottom_radio02" size="mini">
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="近一个月"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div ref="common_one" class="myChart" v-show="common_one"></div>
          <div ref="grade_start_three" class="myChart" v-show="grade_start_three"></div>
        </section>
        <!-- ===================第四部分====================== -->
        <!-- ====================第四部分===================== -->
        <!-- ====================第四部分===================== -->
        <section class="bottom">
          <div class="section_title">评论详情</div>
          <div class="btn_group">
            <div class="btn_item_02">
              <div>类型</div>
              <div>
                <el-radio-group v-model="bottom_radio01" size="mini">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="在线评论"></el-radio-button>
                  <el-radio-button label="已删除评论"></el-radio-button>
                  <el-radio-button label="开发者回复"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="btn_item_02">
              <div>评论</div>
              <div>
                <el-radio-group v-model="bottom_radio02" size="mini">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="五星"></el-radio-button>
                  <el-radio-button label="四星"></el-radio-button>
                  <el-radio-button label="三星"></el-radio-button>
                  <el-radio-button label="两星"></el-radio-button>
                  <el-radio-button label="一星"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="btn_group">
            <div class="btn_item_02">
              <div>类型</div>
              <div>
                <el-radio-group v-model="bottom_radio03" size="mini">
                  <el-radio-button label="最有帮助"></el-radio-button>
                  <el-radio-button label="最高评价"></el-radio-button>
                  <el-radio-button label="最低评价"></el-radio-button>
                  <el-radio-button label="最新评价"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="btn_item_03">
              <div>时间</div>
              <div @click="change_bottom_radio04">
                <el-date-picker
                  v-model="bottom_time01"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2"
                ></el-date-picker>
              </div>
              <div></div>
              <div @click="change_bottom_time01">
                <el-radio-group v-model="bottom_radio04" size="mini">
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="近一个月"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="table_top_green">
            2019年2月20日，关键词总覆盖数：
            <span>63254</span> 前三关键词：
            <span>1244</span> 前十关键词：
            <span>6546</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>评级</th>
                <th>内容</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody v-if="response_data_fourth_part">
              <tr
                v-for="(response_data_fourth_part_item,index) in response_data_fourth_part"
                :key="'response_data_fourth_part'+index"
              >
                <td class="bottom_table_td01">
                  <div>
                    <el-rate v-model="response_data_fourth_part_item.starLevel" disabled></el-rate>
                  </div>
                </td>
                <td class="bottom_table_td02">
                  <div class="table_title">
                    {{response_data_fourth_part_item.title}}
                    <span
                      v-if="response_data_fourth_part_item.isDelete"
                    >该条评论已被删除</span>
                  </div>
                  <div class="table_description">{{response_data_fourth_part_item.commentContent}}</div>
                  <div class="table_author">
                    作者：
                    <span>{{response_data_fourth_part_item.authorName}}</span>
                  </div>
                </td>
                <td class="bottom_table_td03">
                  <div>{{format(response_data_fourth_part_item.publishTime)}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// 引入工具类
import { myTime, formatDate } from '../common/util.js'
export default {
  name: 'grade_start',
  components: { ios_header, left_nav },
  data() {
    return {
      // 第一部分参数
      // 第一部分参数
      // 第一部分参数
      // 评分五角星
      start_left: 0,
      start_right: 0,

      table_start: 4,
      response_data_first_part: null,

      //  第二部分参数
      //  第二部分参数
      //  第二部分参数
      click_near_month: true,
      response_data_second_part: null,
      middle_top_time01: '',
      middle_top_pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      middle_top_xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      one_start_data: [-320, 332, 301, 334, 390, 330, 320],
      two_start_data: [-320, 332, 301, 334, 390, 330, 320],
      three_start_data: [-320, 332, 301, 334, 390, 330, 320],
      four_start_data: [-320, 332, 301, 334, 390, 330, 320],
      five_start_data: [-320, 332, 301, 334, 390, 330, 320],
      //  第三部分参数
      //  第三部分参数
      //  第三部分参数
      response_data_third_part: null,
      middle_bottom_radio02: '近一个月', //今日 昨日 近一个月
      middle_bottom_radio01: '全部', //全部 删除 在线
      middle_bottom_time01: '',
      middle_bottom_pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      middle_bottom_xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      grade_start_three: false, //五星图表默认隐藏
      common_one: true, //在线删除图表默认隐藏
      online_data: [-320, 332, 301, 334, 390, 330, 320],
      delete_data: [-320, 332, 301, 334, 390, 330, 320],
      one_start_data_third: [-320, 332, 301, 334, 390, 330, 320],
      two_start_data_third: [-320, 332, 301, 334, 390, 330, 320],
      three_start_data_third: [-320, 332, 301, 334, 390, 330, 320],
      four_start_data_third: [-320, 332, 301, 334, 390, 330, 320],
      five_start_data_third: [-320, 332, 301, 334, 390, 330, 320],
      // 第四部分的参数
      // 第四部分的参数
      // 第四部分的参数
      response_data_fourth_part: null,
      bottom_radio01: '全部',
      bottom_radio02: '全部',
      bottom_radio03: '最有帮助',
      bottom_radio04: '近一个月',
      bottom_time01: '',
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      //评论统计的单选按钮
      radio01: '',

      //起始时间，结束时间
      start_date_for_grade: '',
      end_date_for_grade: '',
      start_date_for_common: '',
      end_date_for_common: '',
      start_date_for_common_description: '',
      end_date_for_common_description: '',
      // 顶部搜索框
      input1: '',

      now_country: '中国'
    }
  },

  created: function() {
    // 请求数据
    this.get_data_for_first_part()
    this.get_data_for_second_part()
    this.get_data_for_third_part()
    this.get_data_for_fourth_part()
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data_for_first_part()
      this.get_data_for_fourth_part()
      this.get_data_for_third_part()
      this.get_data_for_second_part()
    })
    // 监听第二部分的时间变化
    this.$watch('middle_top_time01', function(newValue, oldValue) {
      this.get_data_for_second_part()
    })
    // 监听第三部分的时间变化
    this.$watch('middle_bottom_radio02', function(newValue, oldValue) {
      this.get_data_for_third_part()
    })
    this.$watch('middle_bottom_radio01', function(newValue, oldValue) {
      this.get_data_for_third_part()
    })
    this.$watch('middle_bottom_time01', function(newValue, oldValue) {
      this.get_data_for_third_part()
    })
    //'当前第四部分=》评论部分的    时间  发生变化，重新请求数据...'
    this.$watch('bottom_time01', function(newValue, oldValue) {
      this.get_data_for_fourth_part()
    })
    this.$watch('bottom_radio01', function(newValue, oldValue) {
      this.get_data_for_fourth_part()
    })
    this.$watch('bottom_radio02', function(newValue, oldValue) {
      this.get_data_for_fourth_part()
    })
    this.$watch('bottom_radio03', function(newValue, oldValue) {
      this.get_data_for_fourth_part()
    })
    this.$watch('bottom_radio04', function(newValue, oldValue) {
      this.get_data_for_fourth_part()
    })
  },
  methods: {
    // ====================第二部分=========================
    // ===================第二部分==========================
    // ====================第二部分=========================
    // 第二部分的画middle_top的canvas
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.grade_start_one)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis'
        },
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
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          y: 'bottom',
          data: ['一星', '二星', '三星', '四星', '五星']
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '12%',
          top: '7%',
          containLabel: true
        },
        xAxis: this.middle_top_xAxis,
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '一星',
            stack: 'start',
            type: 'bar',
            barWidth: 30, //宽度
            itemStyle: {
              color: '#ef8189'
            },
            data: this.one_start_data
          },
          {
            name: '二星',
            type: 'bar',
            stack: 'start',
            itemStyle: {
              color: '#ef81d4'
            },
            data: this.two_start_data
          },
          {
            name: '三星',
            type: 'bar',
            stack: 'start',
            itemStyle: {
              color: '#81e1ef'
            },
            data: this.three_start_data
          },
          {
            name: '四星',
            stack: 'start',
            type: 'bar',
            itemStyle: {
              color: '#81ef8e'
            },
            data: this.four_start_data
          },
          {
            name: '五星',
            stack: 'start',
            type: 'bar',
            itemStyle: {
              color: '#efd581'
            },
            data: this.five_start_data
          }
        ]
      })
    },
    click_near_month_function: function() {
      this.click_near_month = true
      this.get_data_for_second_part()
    },
    click_second_el_date_picker: function() {
      this.click_near_month = false
    },
    // 请求第二部分的图标参数
    get_data_for_second_part() {
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
          // 点击近一个月
          let near_month_time = new Date()
          near_month_time.setTime(
            near_month_time.getTime() - 24 * 60 * 60 * 1000 * 30
          )
          let time =
            formatDate(near_month_time, 'yyyy-MM-dd') +
            '-' +
            formatDate(new Date(), 'yyyy-MM-dd')

          if (!this.click_near_month) {
            let middle_top_time01 = this.middle_top_time01
            time =
              formatDate(middle_top_time01[0], 'yyyy-MM-dd') +
              '-' +
              formatDate(middle_top_time01[1], 'yyyy-MM-dd')
          }
          // console.log(time)
          let appId = this.$store.state.now_app_id
          let url =
            // appId=112&
            '/GetPageStarStatistics?time=' +
            time +
            '&appId=' +
            appId +
            '&countryId=' +
            country_id

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data_second_part = response.data.Data
              // console.log(this.response_data_second_part)
              this.one_start_data = this.response_data_second_part.oneStar
              this.two_start_data = this.response_data_second_part.twoStar
              this.three_start_data = this.response_data_second_part.threeStar
              this.four_start_data = this.response_data_second_part.fourStar
              this.five_start_data = this.response_data_second_part.fiveStar
              this.middle_top_xAxis[0].data = this.response_data_second_part.publishTime
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
    // ===================第三部分==========================
    // ===================第三部分==========================
    // ====================第三部分=========================
    //  第三部分的画middle_bottom的canvas
    drawLine01: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.common_one)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis'
        },
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
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          y: 'bottom',
          data: ['在线评论', '已删除评论']
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '12%',
          top: '7%',
          containLabel: true
        },
        xAxis: this.middle_bottom_xAxis,
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '在线评论',
            type: 'bar',
            stack: 'start',
            itemStyle: {
              color: '#009bef'
            },
            data: this.online_data
          },
          {
            name: '已删除评论',
            stack: 'start',
            type: 'bar',
            barWidth: 30, //宽度
            itemStyle: {
              color: '#d3f0ff'
            },
            data: this.delete_data
          }
        ]
      })
    },
    drawLine03: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.grade_start_three)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis'
        },
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
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          y: 'bottom',
          data: ['一星', '二星', '三星', '四星', '五星']
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '12%',
          top: '7%',
          containLabel: true
        },
        xAxis: this.middle_bottom_xAxis,
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '一星',
            stack: 'start',
            type: 'bar',
            barWidth: 30, //宽度
            itemStyle: {
              color: '#ef8189'
            },
            data: this.one_start_data_third
          },
          {
            name: '二星',
            type: 'bar',
            stack: 'start',
            itemStyle: {
              color: '#ef81d4'
            },
            data: this.two_start_data_third
          },
          {
            name: '三星',
            type: 'bar',
            stack: 'start',
            itemStyle: {
              color: '#81e1ef'
            },
            data: this.three_start_data_third
          },
          {
            name: '四星',
            stack: 'start',
            type: 'bar',
            itemStyle: {
              color: '#81ef8e'
            },
            data: this.four_start_data_third
          },
          {
            name: '五星',
            stack: 'start',
            type: 'bar',
            itemStyle: {
              color: '#efd581'
            },
            data: this.five_start_data_third
          }
        ]
      })
    },
    change_middle_bottom_radio02() {
      this.middle_bottom_radio02 = ''
    },
    change_middle_bottom_time01() {
      this.middle_bottom_time01 = ''
    },
    get_data_for_third_part() {
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
          let time
          if (this.middle_bottom_time01) {
            let middle_bottom_time01 = this.middle_bottom_time01
            time =
              formatDate(middle_bottom_time01[0], 'yyyy-MM-dd') +
              '-' +
              formatDate(middle_bottom_time01[1], 'yyyy-MM-dd')
          }
          if (this.middle_bottom_radio02 == '今日') {
            let time01 = new Date()
            time =
              formatDate(time01, 'yyyy-MM-dd') +
              '-' +
              formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_bottom_radio02 == '昨日') {
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000)
            time =
              formatDate(time02, 'yyyy-MM-dd') +
              '-' +
              formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_bottom_radio02 == '近一个月') {
            let time03 = new Date()
            time03.setTime(time03.getTime() - 24 * 60 * 60 * 1000 * 30)
            time =
              formatDate(time03, 'yyyy-MM-dd') +
              '-' +
              formatDate(new Date(), 'yyyy-MM-dd')
          }
          // console.log(time)

          let type = 0
          if (this.middle_bottom_radio01 == '全部') {
            this.grade_start_three = false //五星图表显示
            this.common_one = true //在线删除图表隐藏
            type = 0
          } else if (this.middle_bottom_radio01 == '在线评论') {
            this.grade_start_three = true //五星图表显示
            this.common_one = false //在线删除图表隐藏
            type = 1
          } else if (this.middle_bottom_radio01 == '已删除评论') {
            this.grade_start_three = true //五星图表显示
            this.common_one = false //在线删除图表隐藏
            type = 2
          }
          let appId = this.$store.state.now_app_id
          let url =
            // appId=112
            '/GetIsDelete?time=' +
            time +
            '&countryId=' +
            country_id +
            '&appId=' +
            appId +
            '&type=' +
            type
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data_third_part = response.data.Data
              console.log(this.response_data_third_part)
              this.one_start_data_third = this.response_data_third_part.oneStar
              this.two_start_data_third = this.response_data_third_part.twoStar
              this.three_start_data_third = this.response_data_third_part.threeStar
              this.four_start_data_third = this.response_data_third_part.fourStar
              this.five_start_data_third = this.response_data_third_part.fiveStar
              this.online_data = this.response_data_third_part.onLine
              this.delete_data = this.response_data_third_part.haveDeleted
              this.middle_bottom_xAxis[0].data = this.response_data_third_part.publishTime
              this.drawLine01()
              this.drawLine03()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // ==================第四部分===========================
    // =================第四部分============================
    // ==================第四部分===========================
    // 请求第四部分=》评论部分的数据
    get_data_for_fourth_part() {
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
          // console.log(555555555555555555)
          // console.log(country_id)
          let url = '/GetPageCommentInfo'
          // console.log(this.bottom_radio01)
          let commentType
          if (this.bottom_radio01 == '全部') {
            commentType = 0
          } else if (this.bottom_radio01 == '在线评论') {
            commentType = 1
          } else if (this.bottom_radio01 == '已删除评论') {
            commentType = 2
          } else if (this.bottom_radio01 == '开发者回复') {
            commentType = 3
          }
          let starLevel
          if (this.bottom_radio02 == '全部') {
            starLevel = 0
          } else if (this.bottom_radio02 == '五星') {
            starLevel = 5
          } else if (this.bottom_radio02 == '四星') {
            starLevel = 4
          } else if (this.bottom_radio02 == '三星') {
            starLevel = 3
          } else if (this.bottom_radio02 == '两星') {
            starLevel = 2
          } else if (this.bottom_radio02 == '一星') {
            starLevel = 1
          }
          let orderType
          if (this.bottom_radio03 == '最有帮助') {
            orderType = 1
          } else if (this.bottom_radio03 == '最高评价') {
            orderType = 2
          } else if (this.bottom_radio03 == '最低评价') {
            orderType = 3
          } else if (this.bottom_radio03 == '最新评价') {
            orderType = 4
          }
          let time
          if (this.bottom_radio04 == '今日') {
            time = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.bottom_radio04 == '昨日') {
            let day1 = new Date()
            day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
            time = formatDate(day1, 'yyyy-MM-dd')
          } else if (this.bottom_radio04 == '近一个月') {
            let day1 = new Date()
            day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000 * 31)
            let time1 = formatDate(new Date(), 'yyyy-MM-dd')
            let time2 = formatDate(day1, 'yyyy-MM-dd')
            time = time2 + '-' + time1
          } else if (this.bottom_radio04 == '') {
            let arr = []
            this.bottom_time01.forEach(element => {
              let arr_item = formatDate(element, 'yyyy-MM-dd')
              arr.push(arr_item)
            })
            time = arr.join('-')
          }
          // console.log(time)
          let appId = this.$store.state.now_app_id
          console.log(appId)
          let data = {
            appId: appId,
            countryId: country_id,
            commentType: commentType,
            starLevel: starLevel,
            orderType: orderType,
            time: time
          }
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              console.log('=========评论================')
              console.log(response)
              this.response_data_fourth_part = response.data.Data
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 请求第一部分评分统计的数据
    // 请求第一部分评分统计的数据
    // 请求第一部分评分统计的数据
    // 请求第一部分评分统计的数据
    get_data_for_first_part() {
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
          // console.log(country_id)
          let appId = this.$store.state.now_app_id
          let url = '/GetRating?countryId=' + country_id + '&appId=' + appId
          console.log(url)

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              console.log('==========分数======')
              console.log(response)

              this.response_data_first_part = response.data.Data
              // 设置左边的五评分五角星
              this.start_left = this.response_data_first_part.current.ratingAverage
              // 设置右边的五评分五角星
              this.start_right = this.response_data_first_part.all.ratingAverage
              // console.log(
              //   this.
              // )
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 当点击第四部分的时间的时候，把和时间一起的单选框置空
    change_bottom_radio04: function() {
      this.bottom_radio04 = ''
    },
    // 当点击第四部分的单选框的时候，把和单选框一起的时间置空
    change_bottom_time01: function() {
      this.bottom_time01 = ''
    },

    // =================通用============================
    // =================通用============================
    // =================通用============================
    // 格式化时间
    format(parm) {
      // console.log(parm)
      return myTime(parm)
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log('grade_start' + this.now_country)
    }
  }
}
</script>
<style scoped>
.change_bg {
  color: #ffffff !important;
  background-color: #009bef;
  border: solid 1px #ffffff !important;
}
.font_block {
  text-align: center;
  line-height: 24px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  width: 70px !important;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  letter-spacing: 0px;
  color: #444444;
  display: inline-block;
}
.bottom_table_td01 {
  width: 238px !important;
}

.bottom_table_td02 .table_title span {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fe1728;
  margin-left: 5px;
}
.bottom_table_td02 {
  text-align: left;
  width: 480px !important;
  padding: 30px;
  box-sizing: border-box;
}

table .table_author span {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #009bef;
}
table .table_description,
table .table_author {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
table .table_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
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
.table_font {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-bottom: 50px;
}
.table_top_green span {
  color: #009bef;
  margin-right: 5px;
}
.table_top_green {
  width: 984px;
  height: 40px;
  background-color: #f5fcff;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  letter-spacing: 0px;
  color: #444444;
  padding-left: 16px;
  margin-top: 22px;
}
.bottom > div:nth-child(3) {
  margin-top: 16px;
}
/* .btn_item_03 > div:nth-child(2) div {
  width: 119px;
}
.btn_item_03 > div:nth-child(3) div {
  width: 119px;
} */
.btn_item_03 > div:nth-child(1) {
  margin-right: 16px !important;
}
.btn_item_03 {
  display: flex;
  align-items: center;
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
.btn_item_02 > div:nth-child(1) {
  margin-right: 16px !important;
}
.btn_item_02 {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 16px;
}
.myChart {
  width: 976px;
  height: 350px;
}
.btn_item_01 > div:nth-child(4),
.btn_item_01 > div:nth-child(5),
.btn_item_01 > div:nth-child(6) {
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
/* .btn_item_01 > div:nth-child(2) div {
  width: 119px;
}
.btn_item_01 > div:nth-child(3) div {
  width: 119px;
} */
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
.btn_group {
  display: flex;
  align-items: center;
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
.content {
  width: 1200px;
  margin: 0 auto;
}
</style>
