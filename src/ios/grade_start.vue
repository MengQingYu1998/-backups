<template>
  <div id="grade_start">
    <div class="content">
      <!-- 自定义组件 -->
      <ios_header @childFn="parentFn" />
      <div class="left_and_right">
        <div class="left">
          <left_nav :position_fixed_form_father="position_fixed" />
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
                    <div>{{response_data_first_part&&response_data_first_part.current.ratingAverage}}</div>
                    <div>
                      <el-rate v-model="start_left" disabled></el-rate>
                    </div>
                    <div>评分次数：{{response_data_first_part&&response_data_first_part.current.totalCount}}</div>
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
                          color=" #33aff2"
                        ></el-progress>
                      </div>
                      <div
                        v-if="response_data_first_part"
                      >{{response_data_first_part.current.gradeList[4].count}}</div>
                    </section>
                    <section>
                      <div>4星</div>
                      <div>
                        <el-progress
                          v-if="response_data_first_part"
                          :text-inside="true"
                          :stroke-width="22"
                          :percentage="parseInt(response_data_first_part.current.gradeList[3].percent.slice(0, -1))"
                          color=" #37d3ad "
                        ></el-progress>
                      </div>
                      <div
                        v-if="response_data_first_part"
                      >{{response_data_first_part.current.gradeList[3].count}}</div>
                    </section>
                    <section>
                      <div>3星</div>
                      <div>
                        <el-progress
                          v-if="response_data_first_part"
                          :text-inside="true"
                          :stroke-width="22"
                          :percentage="parseInt(response_data_first_part.current.gradeList[2].percent.slice(0, -1))"
                          color=" #ec7c6d"
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
                          color="#f6b06c"
                        ></el-progress>
                      </div>
                      <div
                        v-if="response_data_first_part"
                      >{{response_data_first_part.current.gradeList[1].count}}</div>
                    </section>
                    <section>
                      <div>1星</div>
                      <div>
                        <el-progress
                          v-if="response_data_first_part"
                          :text-inside="true"
                          :stroke-width="22"
                          :percentage="parseInt(response_data_first_part.current.gradeList[0].percent.slice(0, -1))"
                          color=" #f9d36d"
                        ></el-progress>
                      </div>
                      <div
                        v-if="response_data_first_part"
                      >{{response_data_first_part.current.gradeList[0].count}}</div>
                    </section>
                  </div>
                </div>
              </div>
              <div class="start_right">
                <div class="start_right_title">所有版本评分</div>
                <div class="start_left_bottom">
                  <div class="start_left_bottom_child_left">
                    <div>{{response_data_first_part&&response_data_first_part.all.ratingAverage}}</div>
                    <div>
                      <el-rate v-model="start_right" disabled></el-rate>
                    </div>
                    <div>评分次数：{{response_data_first_part&&response_data_first_part.all.totalCount}}</div>
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
                          color="#33aff2"
                        ></el-progress>
                      </div>
                      <div
                        v-if="response_data_first_part"
                      >{{response_data_first_part.all.gradeList[4].count}}</div>
                    </section>
                    <section>
                      <div>4星</div>
                      <div>
                        <el-progress
                          v-if="response_data_first_part"
                          :text-inside="true"
                          :stroke-width="22"
                          :percentage="parseInt(response_data_first_part.all.gradeList[3].percent.slice(0, -1))"
                          color=" #37d3ad "
                        ></el-progress>
                      </div>
                      <div
                        v-if="response_data_first_part"
                      >{{response_data_first_part.all.gradeList[3].count}}</div>
                    </section>
                    <section>
                      <div>3星</div>
                      <div>
                        <el-progress
                          v-if="response_data_first_part"
                          :text-inside="true"
                          :stroke-width="22"
                          :percentage="parseInt(response_data_first_part.all.gradeList[2].percent.slice(0, -1))"
                          color="#ec7c6d"
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
                          color="#f6b06c"
                        ></el-progress>
                      </div>
                      <div
                        v-if="response_data_first_part"
                      >{{response_data_first_part.all.gradeList[1].count}}</div>
                    </section>
                    <section>
                      <div>1星</div>
                      <div>
                        <el-progress
                          v-if="response_data_first_part"
                          :text-inside="true"
                          :stroke-width="22"
                          :percentage="parseInt(response_data_first_part.all.gradeList[0].percent.slice(0, -1))"
                          color="#f9d36d"
                        ></el-progress>
                      </div>
                      <div
                        v-if="response_data_first_part"
                      >{{response_data_first_part.all.gradeList[0].count}}</div>
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
                <div id="dateValue01" @click="dateValue01_click">
                  <el-date-picker
                    v-model="middle_top_time01"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    :clearable="false"
                    unlink-panels
                    prefix-icon="el-icon-caret-bottom"
                    end-placeholder="结束日期"
                    :picker-options="middle_top_pickerOptions"
                    @blur="dateValue_blur01"
                    @focus="dateValue_focus01"
                  ></el-date-picker>
                </div>

                <div>
                  <el-radio-group v-model="middle_bottom_radio_update" size="mini">
                    <el-radio-button label="近一个月"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <div ref="grade_start_one" class="myChart"></div>
          </section>
          <!-- ===================第三部分====================== -->
          <!-- ====================第三部分===================== -->
          <!-- ====================第三部分===================== -->
          <section class="middle_bottom">
            <div class="section_title">评论统计（在线与已删除）</div>
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
              <div class="btn_item_03">
                <div>时间</div>
                <div id="dateValue02" @click="dateValue02_click">
                  <el-date-picker
                    v-model="middle_bottom_time01"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    :clearable="false"
                    unlink-panels
                    prefix-icon="el-icon-caret-bottom"
                    end-placeholder="结束日期"
                    :picker-options="middle_bottom_pickerOptions"
                    @blur="dateValue_blur02"
                    @focus="dateValue_focus02"
                  ></el-date-picker>
                </div>
                <div>
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
                <div>评论类型</div>
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
                <div>排序</div>
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
                <div id="dateValue03" @click="dateValue03_click">
                  <el-date-picker
                    v-model="bottom_time01"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    :clearable="false"
                    unlink-panels
                    prefix-icon="el-icon-caret-bottom"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2"
                    @blur="dateValue_blur03"
                    @focus="dateValue_focus03"
                  ></el-date-picker>
                </div>
                <div>
                  <el-radio-group v-model="bottom_radio04" size="mini">
                    <el-radio-button label="今日"></el-radio-button>
                    <el-radio-button label="昨日"></el-radio-button>
                    <el-radio-button label="近一个月"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>
            <div class="table_top_green">
              <span>置顶的评论是指在 App Store 应用详情页面直接显示的评论。其他评论需在 App Store 点击“查看全部”才能查看。</span>
            </div>
            <!-- <div v-loading="loading" element-loading-spinner="el-icon-loading"> -->
            <table>
              <thead>
                <tr>
                  <th class="bottom_table_td01">评级</th>
                  <th>内容</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                <tr class="disable_hover" v-if="response_data_fourth_part.length==0">
                  <td colspan="3">暂无相关数据</td>
                </tr>
                <template v-if="response_data_fourth_part.length!=0">
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
                      <div
                        :id="'show_more'+index"
                        :class="{'table_description':true,'table_description_height':response_data_fourth_part_item.commentContent.length<90} "
                      >{{response_data_fourth_part_item.commentContent}}</div>
                      <div
                        v-if="response_data_fourth_part_item.commentContent.length>90"
                        class="show_all pointer"
                        :id="'show_hide'+index"
                        @click="show_more_function('show_more'+index,'show_hide'+index)"
                      >展开更多</div>
                      <div class="table_author">
                        作者：
                        <span>{{response_data_fourth_part_item.authorName}}</span>
                      </div>
                    </td>
                    <td class="bottom_table_td03">
                      <div>{{(response_data_fourth_part_item.publishTime).replace('T',' ')}}</div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <!-- </div> -->

            <div class="paging">
              <div>显示第 {{(currentPage-1)*20+1}} 至 {{currentPage==Math.ceil(total/20)?((currentPage-1)*20)+(total%20):currentPage*20}} 项结果，共 {{total}} 项</div>
              <div>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="total/2"
                  :current-page.sync="currentPage"
                ></el-pagination>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// 引入工具类
import {
  formatDate,
  time_reset,
  time_rotate,
  time_inactive,
  time_active
} from '../common/util.js'
export default {
  name: 'grade_start',
  components: { ios_header, left_nav },
  data() {
    return {
      // 分页
      currentPage: 1,
      total: 0,
      // 同时存在监听滚动条滚动事件
      position_fixed: false, // 1.在父组件的监听滚动条事件里面写子组件监听的逻辑代码,给子组件传递参数

      // loading: false,
      page: 1,
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
      yAxis_max: 5,
      // click_near_month: true,
      response_data_second_part: null,
      middle_top_time01: '',
      middle_bottom_radio_update: '近一个月',
      middle_top_pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      middle_top_xAxis: [
        {
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: '#d6d6d6'
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      one_start_data: [],
      two_start_data: [],
      three_start_data: [],
      four_start_data: [],
      five_start_data: [],
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
      middle_bottom_xAxis: {
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: '#d6d6d6'
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      grade_start_three: false, //五星图表默认隐藏
      common_one: true, //在线删除图表默认隐藏
      yAxis_max01: 5,
      online_data: [],
      delete_data: [],
      yAxis_max03: 5,
      one_start_data_third: [],
      two_start_data_third: [],
      three_start_data_third: [],
      four_start_data_third: [],
      five_start_data_third: [],
      // 第四部分的参数
      // 第四部分的参数
      // 第四部分的参数
      show_more_less: true, //展开 收起
      response_data_fourth_part: new Array(),
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
    this.get_data_for_fourth_part()
    // 分页
    this.$watch('currentPage', function(newValue, oldValue) {
      this.page = this.currentPage
      this.get_data_for_fourth_part()
    })
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.$store.state.now_country_name = this.now_country
      this.get_data_for_first_part()
      this.get_data_for_fourth_part()
      this.get_data_for_third_part()
      this.get_data_for_second_part()
    })
    // 监听第二部分的时间变化
    this.$watch('middle_top_time01', function(newValue, oldValue) {
      if (newValue != '') {
        this.middle_bottom_radio_update = ''
        time_active('#dateValue01')
      }
      this.get_data_for_second_part()
    })
    this.$watch('middle_bottom_radio_update', function(newValue, oldValue) {
      if (newValue != '') {
        time_inactive('#dateValue01')
      }
      this.get_data_for_second_part()
    })

    // 监听第三部分的时间变化
    this.$watch('middle_bottom_radio02', function(newValue, oldValue) {
      if (newValue != '') {
        time_inactive('#dateValue02')
      }
      this.get_data_for_third_part()
    })
    this.$watch('middle_bottom_radio01', function(newValue, oldValue) {
      this.get_data_for_third_part()
    })
    this.$watch('middle_bottom_time01', function(newValue, oldValue) {
      if (newValue != '') {
        this.middle_bottom_radio02 = ''
        time_active('#dateValue02')
      }
      this.get_data_for_third_part()
    })
    //'当前第四部分=》评论部分的    时间  发生变化，重新请求数据...'
    this.$watch('bottom_time01', function(newValue, oldValue) {
      if (newValue != '') {
        this.bottom_radio04 = ''
        time_active('#dateValue03')
      }
      this.page = 1
      this.get_data_for_fourth_part()
    })
    this.$watch('bottom_radio01', function(newValue, oldValue) {
      this.page = 1
      this.get_data_for_fourth_part()
    })
    this.$watch('bottom_radio02', function(newValue, oldValue) {
      this.page = 1
      this.get_data_for_fourth_part()
    })
    this.$watch('bottom_radio03', function(newValue, oldValue) {
      this.page = 1
      this.get_data_for_fourth_part()
    })
    this.$watch('bottom_radio04', function(newValue, oldValue) {
      if (newValue != '') {
        time_inactive('#dateValue03')
      }
      this.page = 1
      this.get_data_for_fourth_part()
    })
  },
  mounted() {
    this.get_data_for_second_part()
    this.get_data_for_third_part()
  },
  methods: {
    dateValue01_click() {
      if (this.middle_top_time01) {
        time_active('#dateValue01')
        this.middle_bottom_radio_update = ''
        this.get_data_for_second_part()
      }
    },
    dateValue02_click() {
      if (this.middle_bottom_time01) {
        time_active('#dateValue02')
        this.middle_bottom_radio02 = ''
        this.get_data_for_third_part()
      }
    },
    dateValue03_click() {
      if (this.bottom_time01) {
        time_active('#dateValue03')
        this.bottom_radio04 = ''
        this.get_data_for_fourth_part()
      }
    },
    // 控制时间组件旋转
    // 1.给日期组件的父类添加一个新的id,然后调用方法

    dateValue_blur01() {
      time_reset('#dateValue01')
    },
    dateValue_focus01() {
      time_rotate('#dateValue01')
    },
    dateValue_blur02() {
      time_reset('#dateValue02')
    },
    dateValue_focus02() {
      time_rotate('#dateValue02')
    },
    dateValue_blur03() {
      time_reset('#dateValue03')
    },
    dateValue_focus03() {
      time_rotate('#dateValue03')
    },
    // ==========================请求第一部分评分统计的数据==============================
    // ==========================请求第一部分评分统计的数据==============================
    // ==========================请求第一部分评分统计的数据==============================
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
          // console.log(url)

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              if (response.data.Data != null) {
                this.response_data_first_part = response.data.Data

                // 设置左边的五评分五角星
                this.start_left = this.response_data_first_part.current.ratingAverage
                // 设置右边的五评分五角星
                this.start_right = this.response_data_first_part.all.ratingAverage
              } else {
                this.response_data_first_part = null
                this.start_left = 0
                this.start_right = 0
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

    // ====================第二部分=========================
    // ===================第二部分==========================
    // ====================第二部分=========================
    // 第二部分的画middle_top的canvas
    drawLine: function() {
      let that = this

      // 绘制图表
      this.myChart.setOption(
        {
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

          legend: {
            y: 'bottom',
            data: ['一星', '二星', '三星', '四星', '五星'],
            textStyle: {
              fontSize: 13,
              padding: [3, 0, 0, 0]
            },
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 25,
            icon: 'rect'
          },
          grid: {
            left: '7%',
            right: '3%',
            bottom: '19%',
            top: '7%'
          },
          xAxis: this.middle_top_xAxis,
          yAxis: {
            axisLabel: {
              color: '#222'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#d6d6d6'
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

            max: function(value) {
              let max_value = value.max
              if (value.max == -Infinity) {
                return 5
              }
              if (max_value < 5) {
                that.yAxis_max = 5
              } else if (max_value < 20) {
                that.yAxis_max = 20
              } else if (max_value < 50) {
                that.yAxis_max = 50
              } else if (max_value < 100) {
                that.yAxis_max = 100
              } else if (max_value < 500) {
                that.yAxis_max = 500
              } else if (max_value < 1000) {
                that.yAxis_max = 1000
              } else if (max_value < 1500) {
                that.yAxis_max = 1500
              } else {
                that.yAxis_max = max_value + 100
              }
              return that.yAxis_max
            }
          },
          series: [
            {
              name: '一星',
              stack: 'start',
              type: 'bar',
              itemStyle: {
                color: '#f9d36d'
              },
              data: this.one_start_data
            },
            {
              name: '二星',
              type: 'bar',
              stack: 'start',
              itemStyle: {
                color: '#f6b06c'
              },
              data: this.two_start_data
            },
            {
              name: '三星',
              type: 'bar',
              stack: 'start',
              itemStyle: {
                color: '#ec7c6d'
              },
              data: this.three_start_data
            },
            {
              name: '四星',
              stack: 'start',
              type: 'bar',
              itemStyle: {
                color: '#37d3ad'
              },
              data: this.four_start_data
            },
            {
              name: '五星',
              stack: 'start',
              barWidth: 22, //宽度

              type: 'bar',
              itemStyle: {
                color: '#33aff2'
              },
              data: this.five_start_data
            }
          ]
        },
        true
      )
    },

    // 请求第二部分的图标参数
    get_data_for_second_part() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.grade_start_one)
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

          if (this.middle_bottom_radio_update != '近一个月') {
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
            '/GetCommentCount?time=' +
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
              this.myChart.hideLoading()
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

      // 绘制图表
      this.myChart01.setOption(
        {
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

          legend: {
            y: 'bottom',
            data: ['在线评论', '已删除评论'],
            textStyle: {
              fontSize: 13,
              padding: [3, 0, 0, 0]
            },
            itemWidth: 12,
            itemGap: 25,
            itemHeight: 12,
            icon: 'rect'
          },
          grid: {
            left: '5%',
            right: '3%',
            bottom: '19%',
            top: '7%'
          },
          xAxis: this.middle_bottom_xAxis,
          yAxis: {
            axisLabel: {
              color: '#222'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#d6d6d6'
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

            max: function(value) {
              if (value.max == -Infinity) {
                return 5
              }
              let max_value = value.max
              if (max_value < 5) {
                that.yAxis_max01 = 5
              } else if (max_value < 20) {
                that.yAxis_max01 = 20
              } else if (max_value < 50) {
                that.yAxis_max01 = 50
              } else if (max_value < 100) {
                that.yAxis_max01 = 100
              } else if (max_value < 500) {
                that.yAxis_max01 = 500
              } else if (max_value < 1000) {
                that.yAxis_max01 = 1000
              } else if (max_value < 1500) {
                that.yAxis_max01 = 1500
              } else {
                that.yAxis_max01 = max_value + 100
              }
              return that.yAxis_max01
            }
          },
          series: [
            {
              name: '在线评论',
              type: 'bar',
              stack: 'start',
              itemStyle: {
                color: '#33aff2'
              },
              data: this.online_data
            },
            {
              name: '已删除评论',
              stack: 'start',
              type: 'bar',
              barWidth: 22, //宽度
              itemStyle: {
                color: '#c5c5c5'
              },
              data: this.delete_data
            }
          ]
        },
        true
      )
    },
    drawLine03: function() {
      let that = this

      // 绘制图表
      this.myChart03.setOption(
        {
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

          legend: {
            y: 'bottom',
            data: ['一星', '二星', '三星', '四星', '五星'],
            textStyle: {
              fontSize: 13,
              padding: [3, 0, 0, 0]
            },
            itemWidth: 12,
            itemGap: 25,
            itemHeight: 12,
            icon: 'rect'
          },
          grid: {
            left: '5%',
            right: '3%',
            bottom: '19%',
            top: '7%'
          },
          xAxis: this.middle_bottom_xAxis,
          yAxis: {
            axisLabel: {
              color: '#222'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#d6d6d6'
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

            max: function(value) {
              if (value.max == -Infinity) {
                return 5
              }
              let max_value = value.max
              if (max_value < 5) {
                that.yAxis_max03 = 5
              } else if (max_value < 20) {
                that.yAxis_max03 = 20
              } else if (max_value < 50) {
                that.yAxis_max03 = 50
              } else if (max_value < 100) {
                that.yAxis_max03 = 100
              } else if (max_value < 500) {
                that.yAxis_max03 = 500
              } else if (max_value < 1000) {
                that.yAxis_max03 = 1000
              } else if (max_value < 1500) {
                that.yAxis_max03 = 1500
              } else {
                that.yAxis_max03 = max_value + 100
              }
              return that.yAxis_max03
            }
          },
          series: [
            {
              name: '一星',
              stack: 'start',
              type: 'bar',
              itemStyle: {
                color: '#f9d36d'
              },
              data: this.one_start_data_third
            },
            {
              name: '二星',
              type: 'bar',
              stack: 'start',
              itemStyle: {
                color: '#f6b06c'
              },
              data: this.two_start_data_third
            },
            {
              name: '三星',
              type: 'bar',
              stack: 'start',
              itemStyle: {
                color: '#ec7c6d'
              },
              data: this.three_start_data_third
            },
            {
              name: '四星',
              stack: 'start',
              type: 'bar',
              itemStyle: {
                color: '#37d3ad'
              },
              data: this.four_start_data_third
            },
            {
              name: '五星',
              barWidth: 22, //宽度
              stack: 'start',
              type: 'bar',
              itemStyle: {
                color: '#33aff2'
              },
              data: this.five_start_data_third
            }
          ]
        },
        true
      )
    },

    get_data_for_third_part() {
      this.myChart03 = this.$echarts.init(this.$refs.grade_start_three)
      this.myChart01 = this.$echarts.init(this.$refs.common_one)
      this.myChart03.showLoading({
        text: '',
        color: '#D3D3D3'
      })
      this.myChart01.showLoading({
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
          // 请求数据
          let time

          // console.log(time)
          switch (this.middle_bottom_radio02) {
            case '':
              let middle_bottom_time01 = this.middle_bottom_time01
              time =
                formatDate(middle_bottom_time01[0], 'yyyy-MM-dd') +
                '-' +
                formatDate(middle_bottom_time01[1], 'yyyy-MM-dd')
              break
            case '今日':
              let time01 = new Date()
              time =
                formatDate(time01, 'yyyy-MM-dd') +
                '-' +
                formatDate(new Date(), 'yyyy-MM-dd')
              break
            case '昨日':
              let time02 = new Date()
              time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000)
              time =
                formatDate(time02, 'yyyy-MM-dd') +
                '-' +
                formatDate(new Date(), 'yyyy-MM-dd')
              break
            case '近一个月':
              let time03 = new Date()
              time03.setTime(time03.getTime() - 24 * 60 * 60 * 1000 * 30)
              time =
                formatDate(time03, 'yyyy-MM-dd') +
                '-' +
                formatDate(new Date(), 'yyyy-MM-dd')
              break

            default:
              break
          }
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
              // console.log(this.response_data_third_part)
              this.one_start_data_third = this.response_data_third_part.oneStar
              this.two_start_data_third = this.response_data_third_part.twoStar
              this.three_start_data_third = this.response_data_third_part.threeStar
              this.four_start_data_third = this.response_data_third_part.fourStar
              this.five_start_data_third = this.response_data_third_part.fiveStar
              this.online_data = this.response_data_third_part.onLine
              this.delete_data = this.response_data_third_part.haveDeleted
              this.middle_bottom_xAxis.data = this.response_data_third_part.publishTime
              if (
                (this.one_start_data_third != undefined,
                this.two_start_data_third != undefined,
                this.three_start_data_third != undefined,
                this.four_start_data_third != undefined,
                this.five_start_data_third != undefined)
              ) {
              } else if (
                (this.online_data != undefined, this.delete_data != undefined)
              ) {
              }

              this.drawLine01()
              this.drawLine03()
              this.myChart03.hideLoading()
              this.myChart01.hideLoading()
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
      // this.loading = true

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

          switch (this.bottom_radio04) {
            case '':
              let arr = []
              this.bottom_time01.forEach(element => {
                let arr_item = formatDate(element, 'yyyy-MM-dd')
                arr.push(arr_item)
              })
              time = arr.join('-')
              break
            case '今日':
              time = formatDate(new Date(), 'yyyy-MM-dd')
              break
            case '昨日':
              let day1 = new Date()
              day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
              time = formatDate(day1, 'yyyy-MM-dd')
              break
            case '近一个月':
              let day2 = new Date()
              day2.setTime(day2.getTime() - 24 * 60 * 60 * 1000 * 31)
              let time1 = formatDate(new Date(), 'yyyy-MM-dd')
              let time2 = formatDate(day2, 'yyyy-MM-dd')
              time = time2 + '-' + time1
              break
            case value:
              break

            default:
              break
          }
          // console.log(time)
          let appId = this.$store.state.now_app_id
          let page = this.page
          let data = {
            appId: appId,
            countryId: country_id,
            commentType: commentType,
            starLevel: starLevel,
            orderType: orderType,
            time: time,
            page: page,
            size: 20
          }
          console.log(data)
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              console.log('=========评论================')
              console.log(response)
              this.response_data_fourth_part = response.data.Data.comments
              this.total = response.data.Data.totalCount //底部显示总共
              console.log(this.total)
              // this.loading = false
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    show_more_function(parm, parm02) {
      let this_div02 = document.getElementById(parm02) //展开收起
      let this_div = document.getElementById(parm) //内容
      // console.log(this_div02.innerHTML)
      if (this_div02.innerHTML == '展开更多') {
        this_div.style.height = 'auto'
        this_div.style.display = 'block'
        this_div02.innerHTML = '收起'
      } else if (this_div02.innerHTML == '收起') {
        this_div.style.height = '54px'
        this_div.style.display = '-webkit-box '
        this_div02.innerHTML = '展开更多'
      }
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
.show_all {
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #009bef;
  text-align: right;
  margin-right: 30px;
  margin-top: 3px;
  /* background-color: #ffffff; */
  position: absolute;
  right: 0px;
  bottom: 18px;
}
.change_bg {
  color: #ffffff !important;
  background-color: #009bef;
  border: solid 1px #ffffff !important;
}
.font_block {
  text-align: center;
  line-height: 24px;

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
  box-sizing: border-box;
  position: relative;
}

table .table_author span {
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #009bef;
}
table .table_author {
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
  margin-top: 7px;
  margin-bottom: 17px;
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
table .table_description {
  font-size: 13px;
  letter-spacing: 1px !important;
  font-weight: normal;
  color: #888888;
  margin-top: 7px;
  line-height: 18px;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 54px;
  height: 54px;
  width: 460px !important;
  word-break: break-all;
  overflow-wrap: break-word;
}

.table_description_height {
  height: auto !important;
  min-height: 0px !important;
}
table .table_title {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222;
  margin-top: 17px;
  width: 100% !important;
}
thead tr {
  height: 40px;
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
  vertical-align: middle;
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
}
.table_font {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
table {
  width: 100%;
  height: 121px;
  border: solid 1px #eaeaea;
  text-align: center;
  margin-bottom: 50px;
}
.table_top_green span {
  color: #009bef;
  margin-right: 5px;
}
.table_top_green {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  background-color: #f5fcff;

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
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 10px;
}
.btn_item_02 > div:nth-child(1) {
  margin-right: 15px !important;
}
.btn_item_02 {
  display: flex;
  align-items: center;
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 30px;
}
.myChart {
  width: 950px;
  height: 320px;
}
.btn_item_01 > div:nth-child(4),
.btn_item_01 > div:nth-child(5),
.btn_item_01 > div:nth-child(6) {
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
  font-weight: 600 !important;
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
.top,
.middle_bottom,
.middle_top {
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
  font-weight: 600 !important;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 78px;
}
.start_left_bottom_child_left div:last-child {
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
  border: solid 1px #eaeaea;
  border-top: none;
  display: flex;
}
.start .start_right_title,
.start .start_left_title {
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  border: solid 1px #eaeaea;
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
  font-weight: 600 !important;
  font-size: 16px;
  line-height: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #009bef;
  padding-left: 8px;
  margin-bottom: 20px;
}
.right {
  background-color: #fff;
  margin-left: 14px;
  padding: 25px 20px;
  padding-bottom: 0;
  box-sizing: border-box;
}
.line {
  width: 985px;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
}
.left_and_right {
  display: flex;
  margin-top: 14px;
}
.content {
  width: 1200px;
  margin: 0 auto;
}

.disable_hover {
  border-bottom: solid 1px #f2f2f2;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #bfbfbf;
}
.disable_hover :hover {
  background-color: #fff !important;
}
#grade_start {
  background: #f4f4f4;
  padding-bottom: 50px;
}
.left {
  width: 231px;
  position: relative;
  min-height: 621px;
}
.paging {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  margin-bottom: 30px;
}
</style>
