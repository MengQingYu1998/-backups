<template>
  <div id="data_table" class="content">
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <div class="right_nav">关键词明细</div>
        <div class="line"></div>
        <!-- 顶部 关键词概述 -->
        <!-- 顶部 关键词概述 -->
        <!-- 顶部 关键词概述 -->
        <section class="top">
          <div class="section_title">关键词概述</div>
          <div class="btn_group">
            <div class="option">
              <div>设备</div>
              <div>
                <el-select v-model="equipmentValue">
                  <el-option v-for="item in equipment " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="option">
              <div>系统</div>
              <div>
                <el-select v-model="systemValue">
                  <el-option v-for="item in system " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="option">
              <div>当前日期</div>
              <div class="date">
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="date_Now_for_top"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
            <div class="option option_date">
              <div>对比日期</div>
              <div class="date">
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="dateCompare_for_top"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="table_top_green">
            {{timestamp_wrap(date_Now_for_top / 1000, 'Y年M月D日')}}，关键词总覆盖数：
            <span
              v-if="request_data_first"
            >{{request_data_first.totalCount}}</span> 前三关键词：
            <span v-if="request_data_first">{{request_data_first.top3Count}}</span> 前十关键词：
            <span v-if="request_data_first">{{request_data_first.top10Count}}</span>
          </div>
          <table>
            <thead>
              <tr class="th_width01">
                <th>搜索指数</th>
                <th>关键词数量</th>
                <th>Top3关键词</th>
                <th>Top10关键词</th>
              </tr>
            </thead>
            <tbody v-if="request_data_first" class="tr_height">
              <tr
                v-for="(item, index) in request_data_first.detailKeyWord"
                :key="'detailKeyWord'+index"
              >
                <td>
                  <div>{{item.hintRange}}</div>
                </td>
                <td>
                  <div>{{item.keyWordCount.num}}</div>
                </td>
                <td>
                  <div>{{item.top3.num}}</div>
                </td>
                <td>
                  <div>{{item.top10.num}}</div>
                </td>
              </tr>
              <tr>
                <td>合计：</td>
                <td>{{request_data_first.totalCount}}</td>
                <td>{{request_data_first.top3Count}}</td>
                <td>{{request_data_first.top10Count}}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <!-- 中部 关键词明细 -->
        <!-- 中部 关键词明细 -->
        <!-- 中部 关键词明细 -->
        <section class="middle">
          <div class="section_title">关键词明细</div>
          <div class="btn_group">
            <div class="option">
              <div>设备</div>
              <div>
                <el-select v-model="equipmentValue">
                  <el-option v-for="item in equipment " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="option">
              <div>系统</div>
              <div>
                <el-select v-model="systemValue">
                  <el-option v-for="item in system " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="option">
              <div>当前日期</div>
              <div class="date">
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="date_Now_for_top"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
            <div class="option option_date">
              <div>对比日期</div>
              <div class="date">
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="dateCompare_for_top"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="btn_group">
            <div class="option_for_min_max">
              <div>搜索指数</div>
              <div
                :class=" {'change_bg':change_bg_result,'radio_one':true}"
                @click="result_all()"
              >全部</div>
              <div class="min_max" @click="change_bg_result_function">
                <div>
                  <el-input v-model="result_min_input01" placeholder="最小值" type="number"></el-input>
                </div>
                <div>---</div>
                <div>
                  <el-input v-model="result_max_input01" placeholder="最大值" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="option_for_min_max">
              <div>排名</div>
              <div class="min_max">
                <div>
                  <el-input v-model="result_min_input02" placeholder="最小值" type="number"></el-input>
                </div>
                <div>---</div>
                <div>
                  <el-input v-model="result_max_input02" placeholder="最大值" type="number"></el-input>
                </div>
              </div>
            </div>
            <div class="option_for_min_max">
              <div>搜索结果</div>
              <div class="min_max">
                <div>
                  <el-input v-model="result_min_input03" placeholder="最小值" type="number"></el-input>
                </div>
                <div>---</div>
                <div>
                  <el-input v-model="result_max_input03" placeholder="最大值" type="number"></el-input>
                </div>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr class="tr_width">
                <th class="table_width01">关键词</th>
                <th>排名</th>
                <th>变动</th>
                <th>搜索指数</th>
                <th>搜索结果数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody v-if="request_data_second" class="td_width">
              <tr v-for="(item ,index) in temp01_request_data_second" :key="'tableasdf'+index">
                <td>
                  <div class="pointer table_width01" @click="go_to_page03(item.Word)">{{item.Word}}</div>
                </td>
                <td>
                  <div>{{item.Ranking}}</div>
                </td>

                <td>
                  <div>
                    <img
                      class="img_left"
                      src="../assets/keyword/arrows (1).png"
                      alt
                      v-show="item.Change==0"
                    />
                    <img
                      class="img_left"
                      src="../assets/keyword/arrows (2).png"
                      alt
                      v-show="item.Change>0"
                    />
                    <img
                      class="img_left"
                      src="../assets/keyword/arrows (3).png"
                      alt
                      v-show="item.Change<0"
                    />
                    {{Math.abs(item.Change)}}
                  </div>
                </td>
                <td>
                  <div
                    class="table_font pointer"
                    @click="go_to_page02(item.Word)"
                  >{{item.WordIdHint}}</div>
                </td>
                <td>
                  <div
                    class="table_font pointer"
                    @click="go_to_page01(item.Word)"
                  >{{item.SearchCount}}</div>
                </td>
                <td>
                  <div
                    class="table_font"
                    @click="middle_table_first(index,item.WordId,item.Word)"
                  >排名趋势</div>
                </td>
              </tr>
              <tr v-show="is_show_bottom" class="echarts_middle">
                <td colspan="6">
                  <!-- 底部 类型模块 -->
                  <!-- 底部 类型模块 -->
                  <!-- 底部 类型模块 -->
                  <section class="bottom">
                    <div class="btn_group">
                      <div class="classify">
                        <div>类型</div>
                        <div>
                          <el-radio-group v-model="bottom_radio1" size="mini">
                            <el-radio-button label="按分钟"></el-radio-button>
                            <el-radio-button label="按小时"></el-radio-button>
                            <el-radio-button label="按天"></el-radio-button>
                          </el-radio-group>
                        </div>
                      </div>
                      <div class="classify bottom_time">
                        <div>时间</div>
                        <div @click="click_second_el_radio">
                          <el-radio-group v-model="bottom_radio3" size="mini">
                            <el-radio-button
                              label="近24小时"
                              v-show="bottom_radio1=='按小时'||bottom_radio1=='按分钟'"
                            ></el-radio-button>
                            <el-radio-button
                              label="昨日"
                              v-show="bottom_radio1=='按小时'||bottom_radio1=='按分钟'"
                            ></el-radio-button>
                            <el-radio-button
                              label="7天"
                              v-show="bottom_radio1=='按小时'||bottom_radio1=='按分钟'||bottom_radio1=='按天'"
                            ></el-radio-button>
                            <el-radio-button
                              label="30天"
                              v-show="bottom_radio1=='按小时'||bottom_radio1=='按天'"
                            ></el-radio-button>
                            <el-radio-button
                              label="180天"
                              v-show="bottom_radio1=='按天'||bottom_radio1=='按天'"
                            ></el-radio-button>
                            <!-- <el-radio-button label="380天" v-show="bottom_radio1=='按天'"></el-radio-button> -->
                          </el-radio-group>
                        </div>
                      </div>
                      <div class="btn_item_01">
                        <!-- <div>时间</div> -->
                        <div @click="click_second_el_date_picker">
                          <el-date-picker
                            v-model="middle_time01"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="middle_pickerOptions"
                          ></el-date-picker>
                        </div>
                      </div>
                    </div>

                    <div class="position_relative">
                      <div class="table_title">【{{keyword_data[0]}}】榜单排名走势</div>
                      <div
                        ref="myChart_data_table"
                        class="myChart"
                        v-show="is_show_myChart_and_table"
                      ></div>
                      <div class="myChart" v-if="!is_show_myChart_and_table">暂无数据</div>
                      <div class="bottom_image" v-show="false">
                        <img class="float_right" src="../assets/keyword/down.png" alt />
                        <img
                          v-on:click="is_show_myChart_and_table_function"
                          class="float_right"
                          src="../assets/keyword/three.png"
                          alt
                        />
                        <img
                          v-on:click="is_show_myChart_and_table_function"
                          class="float_right"
                          src="../assets/keyword/calculator.png"
                          alt
                        />
                      </div>

                      <table v-show="false">
                        <thead>
                          <tr>
                            <th>时间</th>
                            <th>排名</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div>2019-02-20 12:56</div>
                            </td>
                            <td>
                              <div>1</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="bottom_image_for_table" v-show="false">
                        <img
                          class="float_right"
                          src="../assets/keyword/down.png"
                          alt
                          v-show="false"
                        />
                        <img
                          v-on:click="is_show_myChart_and_table_function"
                          class="float_right"
                          src="../assets/keyword/three.png"
                          alt
                        />
                        <img
                          v-on:click="is_show_myChart_and_table_function"
                          class="float_right"
                          src="../assets/keyword/calculator.png"
                          alt
                        />
                      </div>

                      <div class="import_data_for_table" v-show="false">导出数据</div>
                      <div class="clear_float"></div>
                    </div>
                  </section>
                  <!-- 底部 类型模块 -->
                  <!-- 底部 类型模块 -->
                  <!-- 底部 类型模块 -->
                </td>
              </tr>

              <tr v-for="(item ,index) in temp_request_data_second" :key="'tasbleasdf'+index">
                <td>
                  <div class="pointer" @click="go_to_page03(item.Word)">{{item.Word}}</div>
                </td>
                <td>
                  <div>{{item.Ranking}}</div>
                </td>

                <td>
                  <div>
                    <img
                      class="img_left"
                      src="../assets/keyword/arrows (1).png"
                      alt
                      v-show="item.Change==0"
                    />
                    <img
                      class="img_left"
                      src="../assets/keyword/arrows (2).png"
                      alt
                      v-show="item.Change>0"
                    />
                    <img
                      class="img_left"
                      src="../assets/keyword/arrows (3).png"
                      alt
                      v-show="item.Change<0"
                    />
                    {{Math.abs(item.Change)}}
                  </div>
                </td>
                <td>
                  <div
                    class="table_font pointer"
                    @click="go_to_page02(item.Word)"
                  >{{item.WordIdHint}}</div>
                </td>
                <td>
                  <div
                    class="table_font pointer"
                    @click="go_to_page01(item.Word)"
                  >{{item.SearchCount}}</div>
                </td>
                <td>
                  <div
                    class="table_font"
                    @click="middle_table_second(index,item.WordId,item.Word)"
                  >排名趋势</div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <div class="paging" v-if="request_data_second">
          <div>显示第 {{(currentPage-1)*100}} 至 {{currentPage*100}} 项结果，共 {{total}} 项</div>
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total/10"
              :current-page.sync="currentPage"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// 引入工具类
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'data_table',
  components: { ios_header, left_nav },

  data() {
    return {
      // 分页
      currentPage: 1,
      // 第一部分的参数
      // 第一部分的参数
      // 第一部分的参数
      now_country: '中国',
      request_data_first: null,
      date_Now_for_top: new Date(), //top section的日期选择 当前日期or对比日期
      dateCompare_for_top: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
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
      system: [
        // 系统选择
        {
          value: 'ios11'
        },
        {
          value: 'ios12'
        }
      ],
      systemValue: 'ios12',
      // 第二部分参数
      // 第二部分参数
      // 第二部分参数
      stop_click_many_times: null,
      db_number_is_same: 0, //修复用户输入过快的bug
      total: 0,
      request_data_second: null,
      temp_request_data_second: null,
      temp01_request_data_second: null,
      is_show_bottom: false, //默认设置底部折线图隐藏

      change_bg_result: true,
      result_min_input01: '',
      result_max_input01: '',
      result_min_input02: '',
      result_max_input02: '',
      result_min_input03: '',
      result_max_input03: '',

      // 第三部分参数
      // 第三部分参数
      // 第三部分参数
      yAxis_max: 5,
      echart_function_body_can_excute: 'ss',
      echart_function_body_can_excute02: 'ss',
      word: '',
      wordId: null,
      request_data_third: null,
      systemValue: 'ios12',
      bottom_radio1: '按天',
      bottom_radio3: '7天',
      middle_time01: '',
      middle_pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },

      // true显示myChart  false显示table表格
      is_show_myChart_and_table: false,

      //canvas 关键词data数组
      keyword_data: [],
      xAxis_data: [],
      // 数据
      keyword_data_value: []
    }
  },

  created: function() {
    if (this.$route.query.now_app_id && this.$route.query.now_app_name) {
      this.$store.state.now_app_id = this.$route.query.now_app_id
      this.$store.state.now_app_name = this.$route.query.now_app_name
    }
    // 分页
    this.$watch('currentPage', function(newValue, oldValue) {
      console.log(333333333333333333333333333)
      console.log(newValue, oldValue)
      this.get_data_for_second_part()
    })

    // ==================第一部分===========================
    // ==================第一部分===========================
    // ==================第一部分===========================
    this.get_data_for_first_part()
    this.get_data_for_second_part()
    this.change_time()

    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data_for_first_part()
      this.get_data_for_second_part()
    })
    // 对日期做限制 第一部分
    this.$watch('date_Now_for_top', function(newValue, oldValue) {
      this.change_time()
      this.get_data_for_first_part()
      this.get_data_for_second_part()
    })
    this.$watch('dateCompare_for_top', function(newValue, oldValue) {
      this.change_time_Compare()
      this.get_data_for_first_part()
      this.get_data_for_second_part()
    })
    // 下拉框，系统 第一部分
    this.$watch('systemValue', function(newValue, oldValue) {
      this.get_data_for_first_part()
      this.get_data_for_second_part()
      this.get_data_for_third_part()
    })
    //  下拉框，设备 第一部分
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.get_data_for_first_part()
      this.get_data_for_second_part()
      this.get_data_for_third_part()
    })
    // ==================第二部分===========================
    // ==================第二 部分===========================
    // ==================第二部分===========================

    // 最大值最小值的改变
    this.$watch('result_min_input01', function(newValue, oldValue) {
      this.get_data_for_second_part()
    })
    this.$watch('result_max_input01', function(newValue, oldValue) {
      this.get_data_for_second_part()
    })
    this.$watch('result_min_input02', function(newValue, oldValue) {
      this.get_data_for_second_part()
    })
    this.$watch('result_max_input02', function(newValue, oldValue) {
      this.get_data_for_second_part()
    })
    this.$watch('result_min_input03', function(newValue, oldValue) {
      this.get_data_for_second_part()
    })
    this.$watch('result_max_input03', function(newValue, oldValue) {
      this.get_data_for_second_part()
    })
    // ==================第三部分===========================
    // ==================第三部分===========================
    // ==================第三部分===========================
    this.get_data_for_third_part()
    this.$watch('bottom_radio1', function(newValue, oldValue) {
      // 2.解决切换之后380天消失了的bug
      this.middle_time01 = ''
      if (this.bottom_radio1 == '按分钟') {
        this.bottom_radio3 = '近24小时'
      } else if (this.bottom_radio1 == '按小时') {
        this.bottom_radio3 = '昨日'
      } else if (this.bottom_radio1 == '按天') {
        this.bottom_radio3 = '7天'
      }
      this.get_data_for_third_part()
    })
    this.$watch('bottom_radio3', function(newValue, oldValue) {
      this.get_data_for_third_part()
    })
    this.$watch('middle_time01', function(newValue, oldValue) {
      this.get_data_for_third_part()
    })
  },
  methods: {
    // ===========================第一部分数据=================================
    // ===========================第一部分数据=================================
    // ===========================第一部分数据=================================
    // 关键词概述
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
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let system = this.systemValue == 'ios11' ? 11 : 12
          // console.log(this.date_Now_for_top)
          // console.log(timestamp(this.dateCompare_for_top / 1000, 'Y-M-D'))
          let nowDate = formatDate(this.date_Now_for_top, 'yyyy-MM-dd')
          let compareDate = timestamp(this.dateCompare_for_top / 1000, 'Y-M-D')
          let appId = this.$store.state.now_app_id
          let url =
            '/GetKeyWordSynopsis?' +
            // 'appId=112' +
            'appId=' +
            appId +
            '&countryId=' +
            country_id +
            '&device=' +
            deviceType +
            '&system=' +
            system +
            '&nowDate=' +
            nowDate +
            '&compareDate=' +
            compareDate
          console.log(url)

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.request_data_first = response.data.Data
              console.log('=================概述=====')
              console.log(response)
              // console.log(this.request_data_first)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 设置对比日期永远比当前日期小一天 第一部分
    change_time() {
      console.log(new Date(this.dateCompare_for_top).getTime())
      console.log(new Date(this.date_Now_for_top).getTime())

      this.dateCompare_for_top =
        new Date(this.date_Now_for_top).getTime() - 24 * 60 * 60 * 1000
    },
    change_time_Compare() {
      if (
        new Date(this.dateCompare_for_top).getTime() >=
        new Date(this.date_Now_for_top).getTime()
      ) {
        this.dateCompare_for_top =
          new Date(this.date_Now_for_top).getTime() - 24 * 60 * 60 * 1000
      }
    },
    timestamp_wrap(parm01, parm02) {
      return timestamp(parm01, parm02)
    },

    // ===========================第二部分数据=================================
    // ===========================第二部分数据=================================
    // ===========================第二部分数据=================================
    get_data_for_second_part() {
      this.db_number_is_same++
      let is_excute_function = this.db_number_is_same
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          console.log(response)

          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let system = this.systemValue == 'ios11' ? 11 : 12
          let nowDate = formatDate(this.date_Now_for_top, 'yyyy-MM-dd')
          let compareDate = timestamp(this.dateCompare_for_top / 1000, 'Y-M-D')
          let url = '/GetKeyWordDetail'
          let that = this
          let appId = this.$store.state.now_app_id
          console.log('appId=' + appId)
          console.log('countryId=' + country_id)
          console.log('device=' + deviceType)
          console.log('system=' + system)
          console.log('nowDate=' + nowDate)
          console.log('compareDate=' + compareDate)
          console.log('minHint=' + that.result_min_input01)
          console.log('maxHint=' + that.result_max_input01)
          console.log('minRank=' + that.result_min_input02)
          console.log('maxRank=' + that.result_max_input02)
          console.log('minResult=' + that.result_min_input03)
          console.log('maxResult=' + that.result_max_input03)
          let data = {
            // appId: 112,
            appId: appId,
            countryId: country_id,
            device: deviceType,
            system: system,
            nowDate: nowDate,
            compareDate: compareDate,
            minHint: that.result_min_input01,
            maxHint: that.result_max_input01,
            minRank: that.result_min_input02,
            maxRank: that.result_max_input02,
            minResult: that.result_min_input03,
            maxResult: that.result_max_input03
          }

          // console.log(url)

          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              console.log('=================明细=====')
              console.log(response)
              if (is_excute_function == this.db_number_is_same) {
                this.total = response.data.Data.length //底部显示总共
                this.request_data_second = response.data.Data
                // console.log(this.request_data_second)
                // this.currentPage = Math.ceil(
                //   this.request_data_second.length / 100
                // )

                // console.log(this.currentPage * 100 + 101)
                // 先把数组置空，不然会出现页面渲染问题
                this.temp_request_data_second = null //折线图下面的tr
                this.temp01_request_data_second = null //折线图上面的tr
                this.is_show_bottom = false //折线图隐藏

                this.temp01_request_data_second = response.data.Data.slice(
                  (this.currentPage - 1) * 100,
                  this.currentPage * 100 + 1
                )
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
    // 点击搜索结果数的min_mix
    change_bg_result_function() {
      this.change_bg_result = false
    },
    // 点击搜索结果数的全部
    result_all() {
      this.result_min_input01 = ''
      this.result_max_input01 = ''
      this.change_bg_result = true
    },
    // 设置对比日期永远比当前日期小一天 第二部分
    change_time01() {
      // console.log(this.date_Now_for_top)
      // console.log(this.dateCompare_for_top)
      // if (
      //   new Date(this.date_Now_for_top).getTime() <=
      //   new Date(this.dateCompare_for_top).getTime()
      // ) {
      this.dateCompare_for_top =
        new Date(this.date_Now_for_top).getTime() - 24 * 60 * 60 * 1000
      // }
    },
    change_time_Compare01() {
      if (
        new Date(this.dateCompare_for_top).getTime() >=
        new Date(this.date_Now_for_top).getTime()
      ) {
        this.dateCompare_for_top =
          new Date(this.date_Now_for_top).getTime() - 24 * 60 * 60 * 1000
      }
    },
    // 控制折线图在表格的中间显示
    middle_table_first(index, wordId, word) {
      // 防止多次点击
      if (this.stop_click_many_times == wordId + word) {
        this.is_show_bottom = !this.is_show_bottom
        this.stop_click_many_times = wordId + word
        return false
      }
      this.stop_click_many_times = wordId + word
      // temp01是一个tr        temp是第三个tr

      // if (this.echart_function_body_can_excute != index) {
      // console.log('第一个方法执行了')

      this.temp01_request_data_second = this.request_data_second.slice(
        (this.currentPage - 1) * 100,
        this.currentPage * 100 + 1
      )
      this.temp_request_data_second = this.temp01_request_data_second.slice(
        index + 1
      )
      this.temp01_request_data_second = this.temp01_request_data_second.slice(
        0,
        index + 1
      )
      this.wordId = wordId
      this.word = word
      this.is_show_bottom = true
      this.get_data_for_third_part()
      // }

      // this.echart_function_body_can_excute = index
    },
    middle_table_second(index, wordId, word) {
      // 防止多次点击
      if (this.stop_click_many_times == wordId + word) {
        this.is_show_bottom = !this.is_show_bottom
        this.stop_click_many_times = wordId + word
        return false
      }
      this.stop_click_many_times = wordId + word
      // if (this.echart_function_body_can_excute02 != index) {
      // console.log('第二个方法执行了')
      this.temp01_request_data_second = this.temp01_request_data_second.concat(
        this.temp_request_data_second.slice(0, index + 1)
      )
      this.temp_request_data_second = this.temp_request_data_second.slice(
        index + 1
      )
      this.wordId = wordId
      this.word = word
      this.is_show_bottom = true
      this.get_data_for_third_part()
      // }
      // this.echart_function_body_can_excute02 = index
    },
    // ============================第三部分数据================================
    // ============================第三部分数据================================
    // ============================第三部分数据================================
    // 请求数据
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
          // console.log('国家' + country_id)
          // 请求数据
          let url = '/GetKeyWordApp'
          let time, sdate, edate
          if (this.middle_time01) {
            sdate = formatDate(this.middle_time01[0], 'yyyy-MM-dd')
            edate = formatDate(this.middle_time01[1], 'yyyy-MM-dd')
            time = sdate + '-' + edate
          } else if (this.bottom_radio3 == '近24小时') {
            time = 1
          } else if (this.bottom_radio3 == '昨日') {
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000)
            sdate = formatDate(time02, 'yyyy-MM-dd')
            time = sdate + '-' + edate
          } else if (this.bottom_radio3 == '7天') {
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 7)
            sdate = formatDate(time02, 'yyyy-MM-dd')
            time = sdate + '-' + edate
          } else if (this.bottom_radio3 == '30天') {
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 30)
            sdate = formatDate(time02, 'yyyy-MM-dd')
            time = sdate + '-' + edate
          } else if (this.bottom_radio3 == '180天') {
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 180)
            sdate = formatDate(time02, 'yyyy-MM-dd')
            time = sdate + '-' + edate
          }
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          // 系统选择
          let iosType = this.systemValue == 'ios11' ? 11 : 12

          let showType
          if (this.bottom_radio1 == '按分钟') {
            showType = 1
          } else if (this.bottom_radio1 == '按小时') {
            showType = 2
          } else if (this.bottom_radio1 == '按天') {
            showType = 3
          }
          let wordId = this.wordId
          let appId = this.$store.state.now_app_id
          // wordId	是	int	关键词id
          // showType	是	int	appId
          console.log(time)
          console.log(wordId)
          console.log(deviceType)
          console.log(country_id)
          console.log(iosType)
          console.log(showType)
          console.log(appId)

          let data = {
            countryId: country_id,
            wordId: wordId,
            appId: appId,
            system: iosType,
            device: deviceType,
            showType: showType,
            date: time
          }
          // console.log('==============')

          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              console.log(response)
              // console.log(this.word)
              this.keyword_data = []
              this.keyword_data.push(this.word)
              if (response.data.Data != null) {
                this.is_show_myChart_and_table = true
                this.request_data_third = response.data.Data
                this.keyword_data = new Array()
                this.keyword_data_value = new Array()
                this.xAxis_data = new Array()
                console.log(this.word)
                this.keyword_data.push(this.word) //需要把第二部分的APP名字传过来
                this.xAxis_data = this.request_data_third.timeList
                this.keyword_data_value.push(this.request_data_third.rankList)
                // ==================找数组最大值====================
                let max_value_arr = []
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
              } else if (response.data.Data == null) {
                this.is_show_myChart_and_table = false
                this.keyword_data_value = []
                this.xAxis_data = []
                this.keyword_data.push(this.word)
                this.drawLine()
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
    // 点击单选按钮组件组件
    click_second_el_radio: function() {
      this.middle_time01 = ''
    },
    // 点击日历组件
    click_second_el_date_picker: function() {
      this.bottom_radio3 = ''
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
    is_show_myChart_and_table_function: function() {
      this.is_show_myChart_and_table = !this.is_show_myChart_and_table
    },

    // 画canvas
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_data_table)
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
          left: '4%',
          right: '4%',
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
          // boundaryGap: false,
          data: that.xAxis_data
        },
        yAxis: {
          minInterval: 1,
          type: 'value',
          inverse: true,
          min: 1,
          max: that.yAxis_max,
          interval: that.yAxis_max / 5
        },

        series: that.series_data()
      })
    },

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    },
    go_to_page01(parm) {
      this.$router.push({
        path: '/trend_one'
      })
      this.$store.state.now_app_name = parm
    },
    go_to_page01(parm) {
      this.$router.push({
        path: '/trend_many'
      })
      this.$store.state.now_app_name = parm
    },
    go_to_page03(parm) {
      this.$router.push({
        path: '/result'
      })
      this.$store.state.now_app_name = parm
    }
  }
}
</script>
<style scoped>
.echarts_middle:hover {
  background-color: #fff;
}
.gray {
  color: #888888;
}
.red {
  color: #f50202;
}
.blue {
  color: #009bef;
}
.img_left {
  margin-right: 8px;
}
.tr_height td {
  padding: 14px 0 !important;
  width: 25%;
}
.th_width01 {
  width: 25%;
}
.table_width01 {
  width: 200px;
}
.change_bg {
  color: #ffffff !important;
  background-color: #009bef;
  border: solid 1px #ffffff !important;
}
.radio_one {
  text-align: center;
  line-height: 24px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  width: 48px !important;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  letter-spacing: 0px;
  color: #444444;
  margin-right: 10px;
  margin-top: 2px;
  display: inline-block;
}
.tr_width th,
.td_width td {
  width: 16.667%;
}
.paging {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
}
table img {
  vertical-align: 2px;
}
.min_max > div:nth-child(1),
.min_max > div:nth-child(3) div {
  width: 75px;
}
.min_max > div:nth-child(2) {
  color: #dfdfdf;
}
.option_for_min_max > div:first-child {
  margin-right: 10px;
}
.option_for_min_max .all {
  width: 48px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
  margin-right: 10px;
}
.min_max > div {
  display: inline-block;
}
.option_for_min_max {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-left: 30px;
}

.bottom table {
  margin-bottom: 50px;
}
.middle table {
  margin-bottom: 33px;
}
.top table {
  margin-top: 0;
  margin-bottom: 53px;
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
.option_date {
  margin-left: 78px !important;
}
.date div {
  width: 119px !important;
  z-index: 999 !important;
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
.clear_float {
  clear: both;
}
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
  /* position: absolute;
  right: 30px;
  bottom: -64px; */
  float: right;
  margin-right: -112px;
  margin-top: -4px;
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
td {
  padding: 14px 0;
}
th {
  border: 1px solid #f2f2f2;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
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
  margin-top: 40px;
}
.bottom_image img:first-child {
  z-index: 9999 !important;
}

.bottom_image_for_table {
  position: static !important;
  margin-right: 107px;
  float: right;
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
}
.myChart_tips {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.myChart {
  width: 979px;
  height: 320px;
  z-index: 1;
  text-align: center;
  color: #666;
  line-height: 300px;
  font-size: 50px;
  margin-top: -24px;
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
.middle .btn_group {
  margin-top: 16px;
}
.btn_group {
  display: flex;
  align-items: center;
}
.classify > div:nth-child(2) {
  margin-left: 10px;
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
  margin-left: 10px;
}
.option div:last-child {
  width: 85px;
}
.btn_group .option:first-child div:first-child {
  margin-left: 0;
  margin-right: 10px;
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
  margin-left: 30px;
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
