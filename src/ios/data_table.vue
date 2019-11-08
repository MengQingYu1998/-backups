<template>
  <div id="data_table">
    <div class="content">
      <!-- 自定义组件 -->
      <ios_header @childFn="parentFn" />
      <div class="left_and_right">
        <div class="left">
          <left_nav />
        </div>
        <div class="right">
          <div class="right_nav">关键词明细</div>
          <div class="line"></div>
          <!-- 用户没有登录的状态 -->
          <!-- 用户没有登录的状态 -->
          <div class="no_login" v-show="false">
            <img src="../assets/ios/no_data.png" alt />
            <span>您还未登录，登录后可查看更多ASO相关数据</span>
            <div>
              <span>登录</span>
              <span>注册</span>
            </div>
          </div>
          <!-- 用户没有登录的状态 -->
          <!-- 用户没有登录的状态 -->
          <!-- 顶部 关键词概述 -->
          <!-- 顶部 关键词概述 -->
          <!-- 顶部 关键词概述 -->
          <section class="top">
            <div class="section_title">关键词概述</div>
            <div class="btn_group">
              <div class="option">
                <div>设备</div>
                <div>
                  <el-radio-group v-model="equipmentValue" size="mini">
                    <el-radio-button
                      v-for="item in  equipment "
                      :key="item.value"
                      :label="item.value"
                    ></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="option">
                <div>系统</div>
                <div>
                  <el-radio-group v-model="systemValue" size="mini">
                    <el-radio-button v-for="item in  system " :key="item.value" :label="item.value"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="option">
                <div>当前日期</div>
                <div class="date" id="dateValue01">
                  <!-- 饿了么的日期选择组件 -->
                  <el-date-picker
                    v-model="date_Now_for_top"
                    type="date"
                    placeholder="选择日期"
                    clear-icon
                    prefix-icon="fasle"
                    :picker-options="pickerOptions"
                    @blur="dateValue_blur01"
                    @focus="dateValue_focus01"
                  ></el-date-picker>
                </div>
              </div>
              <div class="option option_date">
                <div>对比日期</div>
                <div class="date" id="dateValue02">
                  <!-- 饿了么的日期选择组件 -->
                  <el-date-picker
                    v-model="dateCompare_for_top"
                    type="date"
                    placeholder="选择日期"
                    clear-icon
                    prefix-icon="fasle"
                    :picker-options="pickerOptions"
                    @blur="dateValue_blur02"
                    @focus="dateValue_focus02"
                  ></el-date-picker>
                </div>
              </div>
            </div>
            <div class="table_top_green">
              {{timestamp_wrap(date_Now_for_top / 1000, 'Y年M月D日')}}，关键词总覆盖数：
              <span>{{request_data_first&&request_data_first.totalCount}}</span> 前三关键词：
              <span>{{request_data_first&&request_data_first.top3Count}}</span> 前十关键词：
              <span>{{request_data_first&&request_data_first.top10Count}}</span>
            </div>
            <table class="first_table" v-show="!loading_gif_first">
              <thead>
                <tr>
                  <th>搜索指数</th>
                  <th>关键词数量</th>
                  <th>Top3关键词</th>
                  <th>Top10关键词</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="request_data_first!=null">
                  <tr
                    v-for="(item, index) in request_data_first.detailKeyWord"
                    :key="'detailKeyWord'+index"
                  >
                    <td>
                      <div>{{item.hintRange}}</div>
                    </td>
                    <td>
                      <div class="flex_div">
                        <span
                          @click="change_something(item.keyWordCount.allIds)"
                        >{{item.keyWordCount.num}}</span>
                        <span
                          :class="{'change_span_bg_color01':change_span_bg_color[0]==index&&change_span_bg_color[1]=='keyWordCount01'}"
                          @click="change_something(item.keyWordCount.addIds,index,'keyWordCount01')"
                          v-if="item.keyWordCount.addNum!=0"
                        >+{{item.keyWordCount.addNum}}</span>
                        <span v-else class="askljd">-</span>
                        <span
                          :class="{'change_span_bg_color':change_span_bg_color[0]==index&&change_span_bg_color[1]=='keyWordCount02'}"
                          @click="change_something(item.keyWordCount.difIds,index,'keyWordCount02')"
                          v-if="item.keyWordCount.difNum!=0"
                        >-{{item.keyWordCount.difNum}}</span>
                        <span v-else class="askljd">-</span>
                      </div>
                    </td>
                    <td>
                      <div class="flex_div">
                        <span @click="change_something(item.top3.allIds)">{{item.top3.num}}</span>
                        <span
                          :class="{'change_span_bg_color01':change_span_bg_color[0]==index&&change_span_bg_color[1]=='top301'}"
                          @click="change_something(item.top3.addIds,index,'top301')"
                          v-if="item.top3.addNum!=0"
                        >+{{item.top3.addNum}}</span>
                        <span v-else class="askljd">-</span>
                        <span
                          :class="{'change_span_bg_color':change_span_bg_color[0]==index&&change_span_bg_color[1]=='top302'}"
                          @click="change_something(item.top3.difIds,index,'top302')"
                          v-if="item.top3.difNum!=0"
                        >-{{item.top3.difNum}}</span>
                        <span v-else class="askljd">-</span>
                      </div>
                    </td>
                    <td>
                      <div class="flex_div">
                        <span @click="change_something(item.top10.allIds)">{{item.top10.num}}</span>
                        <span
                          :class="{'change_span_bg_color01':change_span_bg_color[0]==index&&change_span_bg_color[1]=='top1001'}"
                          @click="change_something(item.top10.addIds,index,'top1001')"
                          v-if="item.top10.addNum!=0"
                        >+{{item.top10.addNum}}</span>
                        <span v-else class="askljd">-</span>
                        <span
                          :class="{'change_span_bg_color':change_span_bg_color[0]==index&&change_span_bg_color[1]=='top1002'}"
                          @click="change_something(item.top10.difIds,index,'top1002')"
                          v-if="item.top10.difNum!=0"
                        >-{{item.top10.difNum}}</span>
                        <span v-else class="askljd">-</span>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <img class="loading_gif" src="../assets/ios/loading.gif" v-show="loading_gif_first" />
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
                  <el-radio-group v-model="equipmentValue" size="mini">
                    <el-radio-button
                      v-for="item in  equipment "
                      :key="item.value"
                      :label="item.value"
                    ></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="option">
                <div>系统</div>
                <div>
                  <el-radio-group v-model="systemValue" size="mini">
                    <el-radio-button v-for="item in  system " :key="item.value" :label="item.value"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="option">
                <div>当前日期</div>
                <div class="date" id="dateValue03">
                  <!-- 饿了么的日期选择组件 -->
                  <el-date-picker
                    v-model="date_Now_for_top"
                    type="date"
                    placeholder="选择日期"
                    clear-icon
                    prefix-icon="fasle"
                    :picker-options="pickerOptions"
                    @blur="dateValue_blur03"
                    @focus="dateValue_focus03"
                  ></el-date-picker>
                </div>
              </div>
              <div class="option option_date">
                <div>对比日期</div>
                <div class="date" id="dateValue04">
                  <!-- 饿了么的日期选择组件 -->
                  <el-date-picker
                    v-model="dateCompare_for_top"
                    type="date"
                    placeholder="选择日期"
                    clear-icon
                    prefix-icon="fasle"
                    :picker-options="pickerOptions"
                    @blur="dateValue_blur04"
                    @focus="dateValue_focus04"
                  ></el-date-picker>
                </div>
              </div>
            </div>
            <div class="btn_group">
              <div class="option_for_min_max">
                <div>搜索指数</div>
                <div
                  :class=" {'change_bg':change_bg_result,'radio_one':true,'pointer':true}"
                  @click="result_all()"
                >全部</div>
                <div class="min_max">
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
            <div class="btn_group">
              <div class="option option_search">
                <div class="margin_top_font">搜索</div>
                <div class="search">
                  <el-input v-model="search_input" placeholder="多个词同时搜索请用“，”隔开"></el-input>
                </div>
              </div>
            </div>
            <img class="loading_gif" src="../assets/ios/loading.gif" v-show="loading_gif" />

            <table v-show="!loading_gif">
              <thead>
                <tr class="tr_width">
                  <th>关键词</th>
                  <th>排名</th>
                  <th>变动</th>
                  <th>搜索指数</th>
                  <th>搜索结果数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody class="td_width">
                <tr
                  class="disable_hover"
                  v-show="temp01_request_data_second.length==0&&temp_request_data_second.length==0"
                >
                  <td colspan="6">暂无相关数据</td>
                </tr>
                <template
                  v-show="temp01_request_data_second.length!=0&&temp_request_data_second.length!=0"
                >
                  <tr v-for="(item ,index) in temp01_request_data_second" :key="'tableasdf'+index">
                    <td>
                      <span class="pointer item_word" @click="go_to_page03(item.Word)">{{item.Word}}</span>
                    </td>
                    <td>
                      <div>{{item.Ranking}}</div>
                    </td>

                    <td>
                      <div class="img_left_father">
                        <img
                          class="img_left arrowsImg_0"
                          src="../assets/keyword/arrows (1).png"
                          alt
                          v-show="item.Change==0"
                        />
                        <img
                          class="img_left arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                          v-show="item.Change>0"
                        />
                        <img
                          class="img_left arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                          v-show="item.Change<0"
                        />
                        <span
                          :class="{'pointer':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                        >{{Math.abs(item.Change)}}</span>
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
                        class="table_font pointer"
                        @click="middle_table_first(index,item.WordId,item.Word)"
                      >排名趋势</div>
                    </td>
                  </tr>
                  <transition name="fade">
                    <tr v-show="is_show_bottom" class="echarts_middle">
                      <td colspan="6">
                        <!-- 底部 类型模块 -->
                        <!-- 底部 类型模块 -->
                        <!-- 底部 类型模块 -->

                        <section class="bottom position_relative">
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
                              <div>
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
                              <div id="dateValue05" @click="dateValue05_click">
                                <el-date-picker
                                  v-model="middle_time01"
                                  type="daterange"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="middle_pickerOptions"
                                  clear-icon
                                  prefix-icon="fasle"
                                  @blur="dateValue_blur05"
                                  @focus="dateValue_focus05"
                                ></el-date-picker>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div
                              ref="myChart_data_table"
                              class="myChart"
                              v-show="is_show_myChart_and_table&&!no_data"
                            ></div>
                            <div class="myChart" v-show="no_data">暂无数据</div>
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

                            <table v-show="!no_data&&!is_show_myChart_and_table" class="scroll">
                              <thead>
                                <tr>
                                  <th>
                                    <span>时间</span>
                                  </th>
                                  <th>
                                    <span>{{keyword_data[0]}}</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody v-if="request_data_third">
                                <tr
                                  v-for="(item ,index) in xAxis_data.length"
                                  :key="'trend_one_table02'+index"
                                >
                                  <td>
                                    <div>{{xAxis_data[index]}}</div>
                                  </td>
                                  <td>
                                    <div>{{keyword_data_value[0][index]}}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <div class="import_data_for_table" v-show="false">导出数据</div>
                            <div class="clear_float"></div>
                          </div>
                        </section>

                        <!-- 底部 类型模块 -->
                        <!-- 底部 类型模块 -->
                        <!-- 底部 类型模块 -->
                      </td>
                    </tr>
                  </transition>
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
                          class="img_left arrowsImg_0"
                          src="../assets/keyword/arrows (1).png"
                          alt
                          v-show="item.Change==0"
                        />
                        <img
                          class="img_left arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                          v-show="item.Change>0"
                        />
                        <img
                          class="img_left arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                          v-show="item.Change<0"
                        />
                        <span
                          :class="{'pointer':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                        >{{Math.abs(item.Change)}}</span>
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
                        class="table_font pointer"
                        @click="middle_table_first(temp01_request_data_second.length+index,item.WordId,item.Word)"
                      >排名趋势</div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </section>

          <div
            class="paging"
            v-if="!loading_gif&&(temp01_request_data_second.length!=0||temp_request_data_second.length!=0)"
          >
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
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// 引入工具类
import {
  formatDate,
  timestamp,
  replace_some_chart,
  unique,
  time_reset,
  time_rotate,
  time_inactive,
  time_active
} from '../common/util.js'
export default {
  name: 'data_table',
  components: { ios_header, left_nav },

  data() {
    let that = this
    return {
      // nothing_data_can_show02: false,

      // 分页
      currentPage: 1,
      // 第一部分的参数
      // 第一部分的参数
      // 第一部分的参数
      change_span_bg_color: new Array(),
      wordIds: '',
      loading_gif_first: false,

      now_country: '中国',
      request_data_first: null,
      date_Now_for_top: new Date(), //top section的日期选择 当前日期or对比日期
      dateCompare_for_top: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            new Date('2019-09-01').getTime() > time.getTime()
          )
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
          value: 'iOS13/12'
        },
        {
          value: 'iOS11'
        }
      ],
      systemValue: 'iOS13/12',
      // 第二部分参数
      // 第二部分参数
      // 第二部分参数
      page: 1,
      loading_gif: false,
      search_input: '',
      stop_click_many_times: null,
      db_number_is_same: 0, //修复用户输入过快的bug
      total: 0,
      request_data_second: null,
      copy_request_data_second: null,
      temp_request_data_second: new Array(),
      temp01_request_data_second: new Array(),
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
      myChart: null,
      word: '',
      wordId: null,
      request_data_third: null,
      bottom_radio1: '按小时',
      bottom_radio3: '近24小时',
      middle_time01: '',
      middle_pickerOptions: {
        disabledDate(time) {
          if (that.bottom_radio1 == '按分钟') {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 7
            )
          } else if (that.bottom_radio1 == '按小时') {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 30
            )
          } else if (that.bottom_radio1 == '按天') {
            return time.getTime() > Date.now()
          }
        }
      },

      // true显示myChart  false显示table表格
      is_show_myChart_and_table: true,
      no_data: false,

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

    // ==================第一部分===========================
    // ==================第一部分===========================
    // ==================第一部分===========================
    this.get_data_for_first_part()
    this.get_data_for_second_part()
    this.change_time()

    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空

      this.$store.state.now_country_name = this.now_country
      this.get_data_for_first_part()
      this.get_data_for_second_part()
    })
    // 对日期做限制 第一部分
    this.$watch('date_Now_for_top', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_time()
      this.get_data_for_first_part()
      this.get_data_for_second_part()
    })
    this.$watch('dateCompare_for_top', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_time_Compare()
      this.get_data_for_first_part()
      this.get_data_for_second_part()
    })
    // 下拉框，系统 第一部分
    this.$watch('systemValue', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.get_data_for_first_part()
      this.get_data_for_second_part()
      this.get_data_for_third_part()
    })
    //  下拉框，设备 第一部分
    this.$watch('equipmentValue', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.get_data_for_first_part()
      this.get_data_for_second_part()
      this.get_data_for_third_part()
    })
    // ==================第二部分===========================
    // ==================第二 部分===========================
    // ==================第二部分===========================
    // 分页
    this.$watch('currentPage', function(newValue, oldValue) {
      this.page = this.currentPage
      this.get_data_for_second_part()
      this.is_show_bottom = false
    })
    this.$watch('search_input', function(newValue, oldValue) {
      this.search_input = this.search_input.replace(/\s+/g, '，')
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      // console.log(this.search_input)
      this.is_show_bottom = false
      this.get_data_for_second_part()
    })
    // 最大值最小值的改变
    this.$watch('result_min_input01', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.is_show_bottom = false
      this.get_data_for_second_part()
    })
    this.$watch('result_max_input01', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.is_show_bottom = false
      this.get_data_for_second_part()
    })
    this.$watch('result_min_input02', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.is_show_bottom = false
      this.get_data_for_second_part()
    })
    this.$watch('result_max_input02', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.is_show_bottom = false
      this.get_data_for_second_part()
    })
    this.$watch('result_min_input03', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.is_show_bottom = false
      this.get_data_for_second_part()
    })
    this.$watch('result_max_input03', function(newValue, oldValue) {
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.change_span_bg_color = [null, null]
      this.wordIds = ''
      // 去掉第一部分的span背景色，并且把第二部分传参的wordIDS置空
      this.is_show_bottom = false
      this.get_data_for_second_part()
    })
    // ==================第三部分===========================
    // ==================第三部分===========================
    // ==================第三部分===========================

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
      if (newValue != '') {
        time_inactive('#dateValue05')
      }
      this.get_data_for_third_part()
    })
    this.$watch('middle_time01', function(newValue, oldValue) {
      if (newValue != '') {
        this.bottom_radio3 = ''
        time_active('#dateValue05')
      }
      this.get_data_for_third_part()
    })
  },

  methods: {
    dateValue05_click() {
      if (this.middle_time01) {
        time_active('#dateValue05')
        this.bottom_radio3 = ''
        this.get_data_for_third_part()
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
    dateValue_blur04() {
      time_reset('#dateValue04')
    },
    dateValue_focus04() {
      time_rotate('#dateValue04')
    },
    dateValue_blur05() {
      time_reset('#dateValue05')
    },
    dateValue_focus05() {
      time_rotate('#dateValue05')
    },
    // ===========================第一部分数据=================================
    // ===========================第一部分数据=================================
    // ===========================第一部分数据=================================
    // 关键词概述
    get_data_for_first_part() {
      this.loading_gif_first = true
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
          let system = this.systemValue == 'iOS11' ? 11 : 12
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
          // console.log(url)

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              // console.log(555555555555555)
              // console.log(response)
              this.loading_gif_first = false

              this.request_data_first = response.data.Data
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    change_something(parm, parm01, parm02) {
      this.is_show_bottom = false
      this.change_span_bg_color[0] = parm01
      this.change_span_bg_color[1] = parm02
      this.wordIds = parm
      this.get_data_for_second_part()
    },
    // 设置对比日期永远比当前日期小一天 第一部分
    change_time() {
      // console.log(new Date(this.dateCompare_for_top).getTime())
      // console.log(new Date(this.date_Now_for_top).getTime())

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
      this.loading_gif = true
      this.db_number_is_same++
      let is_excute_function = this.db_number_is_same
      this.$axios
        .get('/GetCountry')
        .then(response => {
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
          let system = this.systemValue == 'iOS11' ? 11 : 12
          let nowDate = formatDate(this.date_Now_for_top, 'yyyy-MM-dd')
          let compareDate = timestamp(this.dateCompare_for_top / 1000, 'Y-M-D')
          let url = '/GetKeyWordDetail'
          let that = this
          let appId = this.$store.state.now_app_id
          let page = this.page
          let keywords = this.search_input
          let wordIds = this.wordIds
          let data = {
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
            maxResult: that.result_max_input03,
            page: page,
            size: 100,
            keywords: keywords,
            wordIds: wordIds
          }
          // console.log(data)
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              this.loading_gif = false
              if (is_excute_function == this.db_number_is_same) {
                // console.log('=================明细=====')
                // console.log(response)
                // console.log('=================明细=====')
                if (
                  response.data.Code != 1 &&
                  response.data.Data.keys[0] != null
                ) {
                  this.request_data_second = response.data.Data.keys
                  this.total = response.data.Data.totalCount //底部显示总共
                  this.temp01_request_data_second = response.data.Data.keys //第一个tr
                  this.temp_request_data_second = new Array() //第二个tr
                } else {
                  this.temp_request_data_second = new Array() //折线图下面的tr
                  this.temp01_request_data_second = new Array() //折线图上面的tr
                }
              }
            })
            .catch(error => {
              this.request_data_second = null
              this.temp_request_data_second = new Array() //折线图下面的tr
              this.temp01_request_data_second = new Array() //折线图上面的tr
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 点击搜索结果数的全部
    result_all() {
      this.result_min_input01 = ''
      this.result_max_input01 = ''
      this.change_bg_result = true
    },
    // 设置对比日期永远比当前日期小一天 第二部分
    change_time01() {
      this.dateCompare_for_top =
        new Date(this.date_Now_for_top).getTime() - 24 * 60 * 60 * 1000
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
      // console.log(index)
      this.bottom_radio1 = '按小时'
      this.bottom_radio3 = '近24小时'
      this.middle_time01 = ''
      // 防止多次点击
      if (this.stop_click_many_times == wordId + word) {
        this.is_show_bottom = !this.is_show_bottom
        this.stop_click_many_times = wordId + word
        return false
      }
      this.stop_click_many_times = wordId + word

      // 当前页面 显示的数据
      let now_show_data = this.request_data_second

      this.temp01_request_data_second = now_show_data.slice(0, index + 1)
      this.temp_request_data_second = now_show_data.slice(index + 1)
      this.wordId = wordId
      this.word = word
      this.is_show_myChart_and_table = true
      this.is_show_bottom = true
      this.get_data_for_third_part()
    },

    // ============================第三部分数据================================
    // ============================第三部分数据================================
    // ============================第三部分数据================================
    // 请求数据
    get_data_for_third_part() {
      this.myChart = this.$echarts.init(this.$refs.myChart_data_table)
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
          let url = '/GetKeyWordApp'
          let time, sdate, edate

          switch (this.bottom_radio3) {
            case '':
              sdate = formatDate(this.middle_time01[0], 'yyyy-MM-dd')
              edate = formatDate(this.middle_time01[1], 'yyyy-MM-dd')
              time = sdate + '-' + edate
              break
            case '近24小时':
              time = 1
              if (this.middle_time01 != '') {
                sdate = formatDate(this.middle_time01[0], 'yyyy-MM-dd')
                edate = formatDate(this.middle_time01[1], 'yyyy-MM-dd')
                time = sdate + '-' + edate
              }
              break
            case '昨日':
              let time02 = new Date()
              time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000)
              sdate = formatDate(time02, 'yyyy-MM-dd')
              edate = sdate
              time = sdate + '-' + edate
              break
            case '7天':
              edate = formatDate(new Date(), 'yyyy-MM-dd')
              let time03 = new Date()
              time03.setTime(time03.getTime() - 24 * 60 * 60 * 1000 * 7)
              sdate = formatDate(time03, 'yyyy-MM-dd')
              time = sdate + '-' + edate
              break
            case '30天':
              edate = formatDate(new Date(), 'yyyy-MM-dd')
              let time04 = new Date()
              time04.setTime(time04.getTime() - 24 * 60 * 60 * 1000 * 30)
              sdate = formatDate(time04, 'yyyy-MM-dd')
              time = sdate + '-' + edate
              break
            case '180天':
              edate = formatDate(new Date(), 'yyyy-MM-dd')
              let time05 = new Date()
              time05.setTime(time05.getTime() - 24 * 60 * 60 * 1000 * 180)
              sdate = formatDate(time05, 'yyyy-MM-dd')
              time = sdate + '-' + edate
              break

            default:
              break
          }
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          // 系统选择
          let iosType = this.systemValue == 'iOS11' ? 11 : 12

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
          // console.log(time)
          // console.log(wordId)
          // console.log(deviceType)
          // console.log(country_id)
          // console.log(iosType)
          // console.log(showType)
          // console.log(appId)

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
          this.keyword_data = new Array()
          this.keyword_data.push(this.word)
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              // console.log(response)
              // console.log(this.word)

              if (response.data.Data != null) {
                this.no_data = false
                this.request_data_third = response.data.Data
                // console.log(this.request_data_third)
                // this.keyword_data = new Array()
                this.keyword_data_value = new Array()
                this.xAxis_data = new Array()
                // console.log(this.word)
                // this.keyword_data.push(this.word) //需要把第二部分的APP名字传过来
                this.xAxis_data = this.request_data_third.timeList
                this.keyword_data_value.push(this.request_data_third.rankList)

                this.xAxis_data = this.xAxis_data.map(element => {
                  if (this.bottom_radio1 == '按天') {
                    return timestamp(element, 'Y年M月D日')
                  } else if (this.bottom_radio1 == '按小时') {
                    return timestamp(element, 'Y年M月D日 h点')
                  } else if (this.bottom_radio1 == '按分钟') {
                    return timestamp(element, 'M月D日 h点m分')
                  }
                })
                // console.log(this.xAxis_data)
                // console.log(this.keyword_data)
                // console.log(this.keyword_data_value)
                this.drawLine()
                this.myChart.hideLoading()
              } else if (response.data.Data == null) {
                this.no_data = true
              }
            })
            .catch(error => {
              this.no_data = true
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

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
      // 基于准备好的dom，初始化echarts实例

      // 绘制图表
      this.myChart.setOption(
        {
          // 应用【{{replace_some_chart_wrap(this.$store.state.now_app_name)}}】在关键词【{{keyword_data[0]}}】的排名趋势
          title: {
            text:
              '应用【' +
              that.replace_some_chart_wrap(that.$store.state.now_app_name) +
              '】在关键词【' +
              that.keyword_data[0] +
              '】的排名趋势',
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
            backgroundColor: '#fff',
            extraCssText:
              'box-shadow: 0px 0px 4px 0px  rgba(0, 0, 0, 0.18);line-height:25px;padding:10px 15px',
            textStyle: {
              align: 'left',
              color: '#222222;',
              fontSize: 13
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
            left: '4%',
            right: '4%',
            bottom: '19%'
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
              color: '#222',
              formatter: function(value, index) {
                if (
                  that.bottom_radio1 == '按分钟' &&
                  that.bottom_radio3 != '7天'
                ) {
                  return '　　' + value.slice(3, 6) + '　　'
                } else if (
                  that.bottom_radio1 == '按分钟' &&
                  that.bottom_radio3 == '7天'
                ) {
                  return '　　' + value.slice(0, 6) + '　　'
                } else if (
                  that.bottom_radio1 == '按小时' &&
                  that.bottom_radio3 == '近24小时'
                ) {
                  return '　　' + value.slice(-3) + '　　'
                } else if (
                  that.bottom_radio1 == '按小时' &&
                  that.bottom_radio3 == '昨日'
                ) {
                  return value.slice(8)
                } else if (
                  that.bottom_radio1 == '按小时' &&
                  that.bottom_radio3 == '7天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.bottom_radio1 == '按小时' &&
                  that.bottom_radio3 == '30天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.bottom_radio1 == '按小时' &&
                  that.bottom_radio3 == ''
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.bottom_radio1 == '按天' &&
                  that.bottom_radio3 == '7天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.bottom_radio1 == '按天' &&
                  that.bottom_radio3 == '30天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.bottom_radio1 == '按天' &&
                  that.bottom_radio3 == '180天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.bottom_radio1 == '按天' &&
                  that.bottom_radio3 == '360天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.bottom_radio1 == '按天' &&
                  that.bottom_radio3 == ''
                ) {
                  return value.slice(5, 12)
                }
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
            type: 'category',
            boundaryGap: false,
            // boundaryGap: false,
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
            minInterval: 1,
            type: 'value',
            inverse: true,
            min: 1,
            max: function(value) {
              let max_value = value.max
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

          series: that.series_data()
        },
        true
      )
    },
    replace_some_chart_wrap(parm) {
      return replace_some_chart(parm)
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    },
    go_to_page01(parm) {
      this.$store.state.now_app_name = parm

      this.$router.push({
        path: '/trend_one'
      })
    },
    go_to_page02(parm) {
      this.$store.state.now_app_name = parm

      this.$router.push({
        path: '/trend_many'
      })
    },
    go_to_page03(parm) {
      this.$store.state.now_app_name = parm
      this.hand_save_vuex(this)

      let routerUrl = this.$router.resolve({
        path: '/result'
      })
      window.open(routerUrl.href, '_blank')
    }
  }
}
</script>
<style scoped lang="less">
// .askljd {
//   color: rgb(178, 178, 178) !important;
// }
.change_span_bg_color01 {
  display: inline-block;
  background-color: #f50202 !important;
  color: #ffffff !important;
}
.change_span_bg_color {
  display: inline-block;
  background-color: #05c898 !important;
  color: #ffffff !important;
}
.first_table tbody tr:hover {
  background-color: #fff !important;
}
.first_table tbody tr:last-child td:first-child {
  color: #222;
}
.first_table tbody tr:last-child div {
  font-size: 17px !important;
  line-height: 17px !important;
}
.first_table tbody tr:last-child span {
  color: #009bef;
  font-size: 17px !important;
  line-height: 27px !important;
}
.first_table {
  table-layout: fixed;
}

.first_table td > div > span:nth-child(1) {
  font-size: 14px;
  line-height: 14px;
  color: #009bef;
  width: 50px;
  text-align: right;
}
.first_table td > div > span:nth-child(2) {
  font-size: 14px;
  line-height: 25px;
  color: #f50202;
}
.first_table td > div > span:nth-child(3) {
  font-size: 14px;
  line-height: 14px;
  line-height: 25px;
  color: #05c898;
}
.first_table td > div > span:last-child {
  margin-right: 0;
}
.first_table td > div > span {
  margin-right: 16px;
  cursor: pointer;
  // width: 48px;
  display: inline-block;
  border-radius: 4px;
  padding: 0px 5px;
}

.arrowsImg_0 {
  width: 5px;
  height: 11px;
}
.arrowsImg {
  width: 11px;
  height: 5px;
}
.item_word:hover {
  color: #009bef;
}
.item_word {
  padding: 10px;
}
.loading_gif {
  margin: 0 auto;
  width: 50px;
  height: 50px;
  margin-left: 47%;
  margin-top: 50px;
  margin-bottom: 50px;
}
.search > div {
  width: 230px !important;
  margin-right: 10px;
}
.search_confirm_all {
  margin-left: 10px;
}
.search_confirm {
  width: 48px !important;
  height: 26px;
  background-color: #009bef;
  border-radius: 4px;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
}

.scroll tbody {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: block;
  max-height: 366px;
  overflow-y: scroll;
  border: solid 1px #eaeaea;
}
.scroll thead tr:hover {
  background-color: #f7f7f7;
  height: 40px;
}
.scroll thead tr {
  height: 40px;
}
.scroll thead tr span {
  margin-left: -26px;
}
.scroll td div {
  margin-left: -15px;
}
.scroll td {
  width: 1% !important;
}
.scroll thead {
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
.scroll table {
  border: solid 1px #eaeaea;
  table-layout: fixed;
  text-align: center;
  width: 900px;
  margin: 0 auto;
}

.echarts_middle:hover {
  background-color: #fff !important;
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
.img_left_father {
  display: flex;
  align-items: center;
  justify-content: center;
}
.change_bg {
  color: #ffffff !important;
  background-color: #009bef;
  border: solid 1px #009bef !important;
}
.radio_one {
  text-align: center;
  line-height: 26px;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  padding: 0 12px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  letter-spacing: 0px;
  color: #444444;
  margin-right: 10px;
  display: inline-block;
}

.tr_width th,
.td_width td {
  width: 16.667%;
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
table img {
  vertical-align: 2px;
}
.min_max > div:nth-child(1),
.min_max > div:nth-child(3) div {
  width: 59px;
}
.min_max > div:nth-child(2) {
  color: #dfdfdf;
}
.option_for_min_max > div:first-child {
  margin-right: 15px;
}
.option_for_min_max .all {
  width: 48px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;

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
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-left: 29px;
}

.bottom table {
  margin: 0 auto;
  margin-top: 33px;
  margin-bottom: 50px;
  border: solid 0px;
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
  width: 100%;
  height: 40px;
  // background-color: #f5fcff;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  letter-spacing: 0px;
  color: #444444;
  // padding-left: 16px;
  margin-top: 10px;
}
.top .section_title {
  margin-top: 32px;
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
.clear_float {
  clear: both;
}
.import_data_for_table {
  width: 65px;
  height: 24px;
  background-color: #009bef;
  border-radius: 4px;

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
  font-weight: 600 !important;
  font-size: 16px;
  line-height: 16px;
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
  box-sizing: border-box;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #009bef;

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
  width: 100% !important;
  height: 121px;
  border: solid 1px #eaeaea;
  text-align: center;
  margin-top: 40px;
}

.bottom_image img {
  margin-left: 10px;
  width: 17px;
  height: 15px;
}
.bottom_image:hover {
  z-index: 999999999;
}
.bottom_image {
  position: absolute;
  top: 73px;
  right: 40px;
  z-index: 1;
}
.bottom {
  width: 100%;
}
.myChart_tips .float_right {
  float: right;
  margin-left: 20px;
}
.bottom_image_font {
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
  width: 950px;
  height: 320px;
  z-index: 1;
  text-align: center;
  color: #bfbfbf;
  line-height: 300px;
  font-size: 25px;
  margin: 0 auto;
  margin-top: 38px;
}

.table_title {
  font-weight: 600 !important;
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
.bottom_time {
  margin-left: 19px !important;
}
.classify > div:nth-child(2) {
  margin-left: 10px;
  margin-right: 10px;
}
.classify > div:nth-child(3) {
  width: 89px;
}
.classify > div:nth-child(1) {
  margin-left: 30px;
}
.classify {
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-left: 29px;
  display: flex;
  align-items: center;
}

.option > div:first-child {
  margin-right: 15px;
}
.btn_group > div:first-child {
  margin-left: 13px !important;
}
.option {
  font-weight: 600 !important;
  display: inline-block;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: flex;
  align-items: center;
  margin-left: 29px;
}
.right {
  padding: 25px 20px;
  background-color: #fff;
  margin-left: 14px;
  width: 100%;
  box-sizing: border-box;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #d6d6d6;
  margin-bottom: 22px;
  margin-top: -1px;
}
.right_nav {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  border-bottom: 2px solid #009bef;
  width: 100px;
  text-align: center;
  position: relative;
}
.left_and_right {
  display: flex;
  margin-top: 14px;
}
.breadcrumb span:last-child {
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
.breadcrumb span:first-child {
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
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.no_login {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  img {
    margin-top: 119px;
  }
  > span {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #888888;
  }
  > div {
    width: 140px;
    margin-top: 20px;
    span:first-child {
      display: inline-block;
      width: 60px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #009bef;

      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #009bef;
      text-align: center;
    }
    span:last-child {
      display: inline-block;
      width: 60px;
      height: 32px;
      background-color: #009bef;
      border-radius: 4px;

      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
    }
  }
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
#data_table {
  background-color: #f4f4f4;
  padding-bottom: 50px;
}
.left {
  width: 231px;
  position: relative;
  min-height: 621px;
}
.flex_div {
  display: flex;
  align-items: center;
  margin-left: 32px;
}
</style>
