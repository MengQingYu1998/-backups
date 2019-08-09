<template>
  <div id="result" class="content">
    <div class="result_title">「{{this.$store.state.now_app_name}}」搜索结果</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div>设备</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-select v-model="equipmentValue">
            <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_02 option">
        <div>地区</div>
        <div>
          <!-- 选择国家 -->
          <country @childFn="parentFn"></country>
        </div>
      </div>
      <div class="options_03 option">
        <div>日期</div>
        <div>
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker
            v-model="dateValue"
            type="date"
            placeholder="选择日期"
            clear-icon
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <div class="keywordContentTable">
      <table>
        <thead>
          <tr>
            <th>关键词</th>
            <th v-show="activeName=='first'">搜索指数</th>
            <th v-show="activeName=='first'">搜索结果数</th>
            <th v-show="activeName=='first'">搜索联想词</th>
            <th v-show="activeName=='second'">搜索指数</th>
            <th v-show="activeName=='second'">搜索结果数</th>
            <th v-show="activeName=='second'">搜索联想词</th>
            <th v-show="activeName=='third'">搜索指数</th>
            <th v-show="activeName=='third'">ios12搜索结果数</th>
            <th v-show="activeName=='third'">ios11搜索结果数</th>
          </tr>
        </thead>
        <tbody v-if="data_for_top_table02&&data_for_top_table">
          <tr>
            <!-- 关键词 -->
            <td>{{data_for_top_table02.Word}}</td>
            <!-- ============ ios12============ -->
            <!-- ============ ios12============ -->
            <!-- ============ ios12============ -->
            <td v-show="activeName=='first'">
              {{data_for_top_table02.Hint}}
              <img
                src="../assets/keyword/keyword01.png"
                class="pointer"
                @click="go_to_page02(data_for_top_table02.Word)"
                alt
              />
            </td>
            <td v-show="activeName=='first'">
              <span>{{data_for_top_table02.SearchCount12}}</span>
              <img
                src="../assets/keyword/keyword01.png"
                class="pointer"
                @click="go_to_page03(data_for_top_table02.Word)"
                alt
              />
            </td>
            <td v-show="activeName=='first'" class="data_for_top_table_span">
              <span
                class="pointer"
                @click="go_to_page04(item_son.keyword)"
                v-for="(item_son, index_son) in data_for_top_table"
                :key="'data_for_top_tablesss'+index_son"
              >{{item_son.keyword}}</span>
              <span @click="go_to_page01(data_for_top_table02.Word)" class="pointer">查看更多>></span>
            </td>
            <!-- ============ ios11============ -->
            <!-- ============ ios11============ -->
            <!-- ============ ios11============ -->
            <td v-show="activeName=='second'">
              {{data_for_top_table02.Hint}}
              <img
                src="../assets/keyword/keyword01.png"
                @click="go_to_page02(data_for_top_table02.Word)"
                class="pointer"
                alt
              />
            </td>
            <td v-show="activeName=='second'">
              <span>{{data_for_top_table02.SearchCount11}}</span>
              <img
                src="../assets/keyword/keyword01.png"
                class="pointer"
                @click="go_to_page03(data_for_top_table02.Word)"
                alt
              />
            </td>
            <td v-show="activeName=='second'" class="data_for_top_table_span">
              <span
                class="pointer"
                @click="go_to_page04(item_son.keyword)"
                v-for="(item_son, index_son) in data_for_top_table"
                :key="'data_for_top_tablesss'+index_son"
              >{{item_son.keyword}}</span>
              <span @click="go_to_page01(data_for_top_table02.Word)" class="pointer">查看更多>></span>
            </td>
            <!-- ============ 搜索结果对比============ -->
            <!-- ============ 搜索结果对比============ -->
            <!-- ============ 搜索结果对比============ -->
            <td v-show="activeName=='third'">
              {{data_for_top_table02.Hint}}
              <img
                src="../assets/keyword/keyword01.png"
                class="pointer"
                @click="go_to_page02(data_for_top_table02.Word)"
                alt
              />
            </td>
            <td v-show="activeName=='third'">
              <span>{{data_for_top_table02.SearchCount12}}</span>
              <img
                src="../assets/keyword/keyword01.png"
                class="pointer"
                @click="go_to_page03(data_for_top_table02.Word)"
                alt
              />
            </td>
            <td v-show="activeName=='third'">
              <span>{{data_for_top_table02.SearchCount11}}</span>
              <img
                src="../assets/keyword/keyword01.png"
                class="pointer"
                @click="go_to_page03(data_for_top_table02.Word)"
                alt
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果 -->
        <el-tab-pane label="ios12搜索结果" name="first">
          <div class="left_and_right">
            <div class="left tabsContentTable">
              <table>
                <thead>
                  <tr>
                    <th>应用</th>
                    <th>搜索排名变动</th>
                    <th>总榜排名</th>
                    <th>分类榜排名</th>
                    <th>关键词覆盖数</th>
                    <th>top3关键词数</th>
                  </tr>
                </thead>
                <tbody v-if="response_data_for_ios12">
                  <tr v-for="(item,index) in response_data_for_ios12" :key="'table'+index">
                    <td>
                      <div class="use">
                        <div class="first_div">{{item.rowid}}</div>
                        <div class="second_div">
                          <img
                            :src="item.icon_url"
                            @click="go_to_page05(item.AppStoreId,item.app_name)"
                            alt
                          />
                        </div>
                        <div class="third_div">
                          <div
                            class="app_name pointer"
                            @click="go_to_page05(item.AppStoreId,item.app_name)"
                          >{{item.app_name}}</div>
                          <div class="app_subtitle rankingChangeFontColor">{{item.subtitle}}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="rankingChange">
                        <img
                          class="arrowsImg"
                          v-show="item.Change==0"
                          src="../assets/keyword/arrows (1).png"
                          alt
                        />
                        <img
                          v-show="item.Change<0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        />
                        <img
                          v-show="item.Change>0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                        />
                        <div>{{item.Change}}</div>
                        <img
                          src="../assets/keyword/keyword01.png"
                          class="pointer"
                          @click="show_dialog(item.app_name,item.AppStoreId)"
                          alt
                        />
                      </div>
                    </td>
                    <td>
                      <div>{{item.ranking.rank_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.rank_all}}</div>
                    </td>
                    <td>
                      <div>{{item.ranking.genre_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_all}}</div>
                    </td>
                    <td class="pointer" @click="go_to_page06(item.AppStoreId)">{{item.Cover}}</td>
                    <td>{{item.Top3}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="right">
              <div class="right_title">关键词搜索结果变化率</div>
              <div class="right_btn">
                <div>
                  <el-radio-group v-model="radio1" size="mini">
                    <el-radio-button label="top10"></el-radio-button>
                    <el-radio-button label="all"></el-radio-button>
                  </el-radio-group>
                </div>
                <div ref="myChart_result12" class="myChart"></div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果 -->
        <el-tab-pane label="ios11搜索结果" name="second">
          <div class="left_and_right">
            <div class="left tabsContentTable">
              <table>
                <thead>
                  <tr>
                    <th>应用</th>
                    <th>搜索排名变动</th>
                    <th>总榜排名</th>
                    <th>分类榜排名</th>
                    <th>关键词覆盖数</th>
                    <th>top3关键词数</th>
                  </tr>
                </thead>
                <tbody v-if="response_data_for_ios11">
                  <tr v-for="(item,index) in response_data_for_ios11" :key="'table'+index">
                    <td>
                      <div class="use">
                        <div class="first_div">{{item.rowid}}</div>
                        <div class="second_div">
                          <img
                            :src="item.icon_url"
                            alt
                            @click="go_to_page05(item.AppStoreId,item.app_name)"
                          />
                        </div>
                        <div class="third_div">
                          <div
                            class="app_name pointer"
                            @click="go_to_page05(item.AppStoreId,item.app_name)"
                          >{{item.app_name}}</div>
                          <div class="app_subtitle rankingChangeFontColor">{{item.subtitle}}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="rankingChange">
                        <img
                          class="arrowsImg"
                          v-show="item.Change==0"
                          src="../assets/keyword/arrows (1).png"
                          alt
                        />
                        <img
                          v-show="item.Change<0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        />
                        <img
                          v-show="item.Change>0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                        />
                        <div>{{item.Change}}</div>
                        <img
                          src="../assets/keyword/keyword01.png"
                          alt
                          class="pointer"
                          @click="show_dialog(item.app_name,item.AppStoreId)"
                        />
                      </div>
                    </td>
                    <td>
                      <div>{{item.ranking.rank_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.rank_all}}</div>
                    </td>
                    <td>
                      <div>{{item.ranking.genre_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_all}}</div>
                    </td>
                    <td class="pointer" @click="go_to_page06(item.AppStoreId)">{{item.Cover}}</td>
                    <td>{{item.Top3}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
        <!-- 搜索结果对比  搜索结果对比   搜索结果对比  搜索结果对比  搜索结果对比  搜索结果对比  搜索结果对比   -->
        <el-tab-pane label="搜索结果对比" name="third">
          <div class="flex-row">
            <div class="compare_iOS tabsContentTable">
              <div>
                <div>ios12</div>
                <div
                  v-if="response_data_for_ios11&&response_data_for_ios12"
                >更新时间 {{response_data_for_ios11.SearchDate}}</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>应用</th>
                    <th>排名/分类</th>
                    <th>排名变动</th>
                    <th>关键词覆盖</th>
                    <th>评论数</th>
                  </tr>
                </thead>
                <tbody v-if="response_data_for_ios12">
                  <tr v-for="(item,index) in response_data_for_ios12" :key="'tablesss'+index">
                    <td>
                      <div class="use">
                        <div class>{{item.rowid}}</div>
                        <div class="second_div">
                          <img
                            :src="item.icon_url"
                            @click="go_to_page05(item.AppStoreId,item.app_name)"
                            alt
                          />
                        </div>
                        <div class="third_div">
                          <div
                            class="app_name pointer"
                            @click="go_to_page05(item.AppStoreId,item.app_name)"
                          >{{item.app_name}}</div>
                          <div class="app_subtitle rankingChangeFontColor">{{item.subtitle}}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>{{item.ranking.genre_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_all}}</div>
                    </td>
                    <td>
                      <div class="rankingChange">
                        <img
                          class="arrowsImg"
                          v-show="item.Change==0"
                          src="../assets/keyword/arrows (1).png"
                          alt
                        />
                        <img
                          v-show="item.Change<0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        />
                        <img
                          v-show="item.Change>0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                        />
                        <div>{{item.Change}}</div>
                        <img
                          src="../assets/keyword/keyword01.png"
                          alt
                          class="pointer"
                          @click="show_dialog(item.app_name,item.AppStoreId)"
                        />
                      </div>
                    </td>
                    <td class="pointer" @click="go_to_page06(item.AppStoreId)">{{item.Cover}}</td>
                    <td>{{item.rating_count}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="compare_iOS tabsContentTable">
              <div>
                <div>ios11</div>
                <div
                  v-if="response_data_for_ios11&&response_data_for_ios12"
                >更新时间 {{response_data_for_ios11.SearchDate}}</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>应用</th>
                    <th>排名/分类</th>
                    <th>排名变动</th>
                    <th>关键词覆盖</th>
                    <th>评论数</th>
                  </tr>
                </thead>
                <tbody v-if="response_data_for_ios11">
                  <tr v-for="(item,index) in response_data_for_ios11" :key="'tablesss'+index">
                    <td>
                      <div class="use">
                        <div class>{{item.rowid}}</div>
                        <div class="second_div">
                          <img
                            :src="item.icon_url"
                            @click="go_to_page05(item.AppStoreId,item.app_name)"
                            alt
                          />
                        </div>
                        <div class="third_div">
                          <div
                            class="app_name pointer"
                            @click="go_to_page05(item.AppStoreId,item.app_name)"
                          >{{item.app_name}}</div>
                          <div class="app_subtitle rankingChangeFontColor">{{item.subtitle}}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>{{item.ranking.genre_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_all}}</div>
                    </td>
                    <td>
                      <div class="rankingChange">
                        <img
                          class="arrowsImg"
                          v-show="item.Change==0"
                          src="../assets/keyword/arrows (1).png"
                          alt
                        />
                        <img
                          v-show="item.Change<0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        />
                        <img
                          v-show="item.Change>0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                        />
                        <div>{{item.Change}}</div>
                        <img
                          src="../assets/keyword/keyword01.png"
                          class="pointer"
                          @click="show_dialog(item.app_name,item.AppStoreId)"
                          alt
                        />
                      </div>
                    </td>
                    <td class="pointer" @click="go_to_page06(item.AppStoreId)">{{item.Cover}}</td>
                    <td>{{item.rating_count}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- element的弹窗 -->
    <div class="my_dialog_wraper" v-show="dialogVisible">
      <div class="my_dialog">
        <img src="../assets/keyword/dialog_02.png" alt @click="dialogVisible=false" />
        <div class="result_title">【{{word}}】在【抖音】搜索结果中排名趋势</div>
        <div class="btn_group">
          <div class="classify">
            <div></div>
            <div>
              <el-radio-group v-model="radio01_dialog" size="mini">
                <el-radio-button label="按分钟"></el-radio-button>
                <el-radio-button label="按小时"></el-radio-button>
                <el-radio-button label="按天"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="classify bottom_time">
            <div></div>
            <div @click="click_second_el_radio">
              <el-radio-group v-model="radio02_dialog" size="mini">
                <!-- <el-radio-button label="近24小时"></el-radio-button> -->
                <el-radio-button
                  label="近24小时"
                  v-show="radio01_dialog=='按小时'||radio01_dialog=='按分钟'"
                ></el-radio-button>
                <el-radio-button label="昨日" v-show="radio01_dialog=='按小时'||radio01_dialog=='按分钟'"></el-radio-button>
                <el-radio-button
                  label="7天"
                  v-show="radio01_dialog=='按小时'||radio01_dialog=='按分钟'||radio01_dialog=='按天'"
                ></el-radio-button>
                <el-radio-button label="30天" v-show="radio01_dialog=='按小时'||radio01_dialog=='按天'"></el-radio-button>
                <el-radio-button label="180天" v-show="radio01_dialog=='按天'||radio01_dialog=='按天'"></el-radio-button>
                <el-radio-button label="380天" v-show="radio01_dialog=='按天'"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="btn_item_01">
            <div @click="click_second_el_date_picker">
              <el-date-picker
                v-model="time_dialog"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div ref="myChart_result_dialog" class="myChart_dialog" v-show="true"></div>
        <div class="footer__dialog">
          <img src="../assets/keyword/dialog_01.png" alt />iOS12与iOS11版本的排名不同
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'

// 引入工具类
import { formatDate } from '../common/util.js'
export default {
  name: 'result',
  components: {
    country
  },
  data() {
    return {
      can_excute: false,
      // 请求分页
      page: 1,
      // ===================顶部table================
      // ===================顶部table================
      // ===================顶部table================
      data_for_top_table: null,
      data_for_top_table02: null,
      // ===================element的弹窗================
      // ===================element的弹窗================
      // ===================element的弹窗================
      word: '',
      appid: '',
      radio01_dialog: '按天',
      radio02_dialog: '30天',
      dialogVisible: false,
      time_dialog: '',
      // true显示myChart false显示table表格
      is_show_table_myChart: true,
      response_data_for_dialog: null,
      //canvas 关键词data数组
      keyword_data: [],
      xAxis_data: [],
      // 数据
      keyword_data_value: [],
      // =============================tab可切换部分============================
      // =============================tab可切换部分============================
      // =============================tab可切换部分============================
      response_data_for_ios12: [],
      response_data_for_ios11: [],
      // 获取当前选中的国家
      now_country: '中国',
      // 设备选择
      equipment: [
        {
          value: 'iPhone'
        },
        {
          value: 'iPad'
        }
      ],
      equipmentValue: 'iPhone',

      //当前选中的日期
      dateValue: new Date(),
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      // tab-pane选择面板
      activeName: 'first',
      // =======================柱形图============================
      // =======================柱形图============================
      // =======================柱形图============================
      radio1: 'all',
      //canvas 关键词data数组
      keyword_data01: [],
      xAxis_data01: [],
      // 数据
      keyword_data_value01: []
    }
  },

  created: function() {
    this.get_data_for_top_table()
    this.get_data_12()
    this.get_data_11()
    this.get_data_column()
    this.$watch('activeName', function(newValue, oldValue) {
      this.get_data_for_top_table()
    })
    this.$watch('now_country', function(newValue, oldValue) {
      // console.log('当前国家发生变化，重新请求数据...')
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page = 1
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page = 1
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
    })
    this.$watch('radio1', function(newValue, oldValue) {
      this.get_data_column()
    })
    this.$watch('dateValue', function(newValue, oldValue) {
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page = 1
      // console.log('当前国家发生变化，重新请求数据...')
      this.get_data_12()
      this.get_data_11()
    })
    // ===============弹出框=====================
    this.$watch('radio01_dialog', function(newValue, oldValue) {
      this.get_data_dialog()
    })
    this.$watch('radio02_dialog', function(newValue, oldValue) {
      this.get_data_dialog()
    })
    this.$watch('time_dialog', function(newValue, oldValue) {
      this.get_data_dialog()
    })
  },
  mounted() {
    this.$nextTick(() => {
      let that = this
      window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight //滚动条到底部的条件
        if (scrollTop + windowHeight == scrollHeight) {
          // 需要执行的代码

          if (that.can_excute) {
            that.page += 1
            that.get_data_11()
            that.get_data_12()
            console.log('yes')
          }
        }
      }
    })
  },
  methods: {
    // =============================顶部table============================
    // =============================顶部table============================
    // =============================顶部table============================
    get_data_for_top_table() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据01==============================================
          // 请求数据01==============================================
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let iosType
          if (this.activeName == 'first') {
            iosType = 12
          } else if (this.activeName == 'second') {
            iosType = 11
          }
          let time = formatDate(this.dateValue, 'yyyy-MM-dd')
          let url = '/Word/FindTodayJoinWord'
          let word = this.$store.state.now_app_name
          let data = {
            deviceType: deviceType,
            countryId: country_id,
            sdate: time,
            word: word,
            iosType: iosType
          }
          // console.log(iosType)
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              this.data_for_top_table = response.data.Data
              // console.log(this.data_for_top_table)
            })
            .catch(error => {
              console.log(error)
            })
          // 请求数据02==============================================
          // 请求数据02==============================================
          let url02 = '/Word/FindWordInfo'

          this.$axios
            .post(url02, data)
            .then(response => {
              this.data_for_top_table02 = response.data.Data
              // console.log(this.data_for_top_table02)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    // =============================tab可切换部分============================
    // =============================tab可切换部分============================
    // =============================tab可切换部分============================
    // 请求数据  ios12 ios12 ios12
    get_data_12() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据
          // 1:iPhone 2:ipad
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let time = formatDate(this.dateValue, 'yyyy-MM-dd')
          let word = this.$store.state.now_app_name
          let url =
            '/Word/FindSearch?' +
            'deviceType=' +
            deviceType +
            '&page=' +
            this.page +
            '&countryId=' +
            country_id +
            '&word=' +
            word +
            '&time=' +
            time +
            '&iosType=12'
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              // console.log(response.data.AppInfoList)
              this.can_excute = true //是否可以执行滚动条到达底部事件
              this.response_data_for_ios12 = this.response_data_for_ios12.concat(
                response.data.AppInfoList
              )
              console.log(
                'ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12=='
              )
              console.log(this.response_data_for_ios12)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    get_data_11() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据
          // 1:iPhone 2:ipad
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let time = formatDate(this.dateValue, 'yyyy-MM-dd')
          let word = this.$store.state.now_app_name
          let url =
            '/Word/FindSearch?' +
            'deviceType=' +
            deviceType +
            '&page=' +
            this.page +
            '&countryId=' +
            country_id +
            '&word=' +
            word +
            '&time=' +
            time +
            '&iosType=11'
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              // console.log(response.data)
              this.can_excute = true //是否可以执行滚动条到达底部事件
              this.response_data_for_ios11 = this.response_data_for_ios11.concat(
                response.data.AppInfoList
              )
              console.log(
                'ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11=='
              )
              console.log(this.response_data_for_ios11)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // =======================柱形图============================
    // =======================柱形图============================
    // =======================柱形图============================
    get_data_column() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let type = this.radio1 == 'all' ? 1 : 0
          let url =
            '/Word/FindSearchRate?' +
            '&deviceType=' +
            deviceType +
            '&countryId=' +
            country_id +
            '&type=' +
            type
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.keyword_data01 = []
              this.keyword_data_value01 = []
              this.xAxis_data01 = []
              let temp = response.data
              // console.log(temp)
              this.keyword_data_value01.push(temp.Yvalue)
              this.xAxis_data01 = temp.Xvalue
              this.keyword_data01.push('ios12')

              this.drawLine12()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    drawLine12: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_result12)
      // 绘制图表
      myChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: that.keyword_data01,
          y: 'bottom'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: that.xAxis_data01,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            //设置Y轴百分比显示
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %'
            }
          }
        ],
        series: that.series_data01()
      })
    },
    // 便利keyword_data生成canvas的series数据
    series_data01: function() {
      let series_data_arr = []
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'bar'
        this.stack = '总量'
        this.data = data
      }
      //通过便利关键词数组从而创建canvas的series数据
      this.keyword_data01.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value01[index]))
      })
      // console.log(series_data_arr)
      return series_data_arr
    },
    // ==================element弹窗==============
    // ==================element弹窗==============
    // ==================element弹窗==============

    get_data_dialog() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据
          // 1:iPhone 2:ipad
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          // let system = this.systemValue == 'ios11' ? 11 : 12
          let sdate, edate
          if (this.time_dialog) {
            // console.log('--')
            sdate = formatDate(this.time_dialog[0], 'yyyy-MM-dd')
            edate = formatDate(this.time_dialog[1], 'yyyy-MM-dd')
          } else if (this.radio02_dialog == '近24小时') {
            // console.log近24小时

            edate = formatDate(new Date(), 'yyyy-MM-dd')
            sdate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.radio02_dialog == '7天') {
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 7)
            sdate = formatDate(time02, 'yyyy-MM-dd')
          } else if (this.radio02_dialog == '30天') {
            // console.log('30天')
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 30)
            sdate = formatDate(time02, 'yyyy-MM-dd')
          } else if (this.radio02_dialog == '昨日') {
            // console.log('昨日')
            edate = formatDate(new Date(), 'yyyy-MM-dd')
            let time02 = new Date()
            time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 1)
            sdate = formatDate(time02, 'yyyy-MM-dd')
          }
          let showType
          if (this.radio01_dialog == '按分钟') {
            showType = 2
          } else if (this.radio01_dialog == '按小时') {
            showType = 0
          } else if (this.radio01_dialog == '按天') {
            showType = 1
          }
          let Word = this.word
          let appid = this.appid
          let wordid = 5
          let url =
            '/Word/FindHistory?page=1' +
            '&deviceType=' +
            deviceType +
            '&countryId=' +
            country_id +
            '&word=' +
            Word +
            '&wordid=' +
            wordid +
            '&sdate=' +
            sdate +
            '&appid=' +
            appid +
            '&day=' +
            showType +
            '&edate=' +
            edate +
            '&iosType=12'
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.keyword_data = []
              this.keyword_data_value = []
              this.xAxis_data = []
              this.response_data_for_dialog = response.data
              console.log(this.response_data_for_dialog)
              this.keyword_data_value.push(this.response_data_for_dialog.Yvalue)
              this.xAxis_data = this.response_data_for_dialog.Xvalue
              this.keyword_data.push(this.word)

              this.drawLine_dialog()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    show_dialog(word, appid) {
      this.dialogVisible = true
      this.word = word
      this.appid = appid
      this.get_data_dialog()
    },
    //控制canvas和table的显示
    is_show_table_myChart_function: function() {
      this.is_show_table_myChart = !this.is_show_table_myChart
    },
    // 画canvas
    drawLine_dialog: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_result_dialog)
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
              result_title: '保存',
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
    // 点击单选按钮组件组件
    click_second_el_radio: function() {
      this.time_dialog = ''
    },
    // 点击日历组件
    click_second_el_date_picker: function() {
      this.radio02_dialog = ''
    },
    // ==================element弹窗==============
    // ==================element弹窗==============
    // ==================element弹窗==============
    // tab-pane选择面板
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    },
    go_to_page01(parm) {
      this.get_data_12()
      this.get_data_11()
      this.$router.push({
        path: '/think_word'
      })
      this.$store.state.now_app_name = parm
    },
    go_to_page02(parm) {
      this.$router.push({
        path: '/trend_many'
      })
      this.$store.state.now_app_name = parm
    },
    go_to_page03(parm) {
      this.$router.push({
        path: '/trend_one'
      })
      this.$store.state.now_app_name = parm
    },
    go_to_page04(parm) {
      // console.log(parm)
      this.get_data_for_top_table()
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
      this.$router.push({
        path: '/result'
      })
      this.$store.state.now_app_name = parm
    },
    go_to_page05(parm, parm02) {
      this.$router.push({
        path: '/now_ranking'
      })
      this.$store.state.now_app_id = parm
      this.$store.state.now_app_name = parm02
    },
    go_to_page06(parm) {
      this.$router.push({
        path: '/data_table'
      })
      this.$store.state.now_app_id = parm
    }
  }
}
</script>
<style scoped>
#result {
  padding-bottom: 52px;
}
.data_for_top_table_span {
  width: 524px;
  padding: 0 66px;
}
.data_for_top_table_span span {
  margin-left: 13px;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #009bef;
}
.app_name {
  cursor: pointer;
}

.keywordContentTable img {
  vertical-align: 0px;
}
.my_dialog_wraper {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(9, 22, 42, 0.6);
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.my_dialog > img {
  position: absolute;
  top: 16px;
  right: 16px;
}
.footer__dialog img {
  margin-right: 7px;
  vertical-align: -2px;
  margin-left: 46px;
  margin-top: 58px;
}

.footer__dialog {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
.bottom_time {
  margin-left: 196px !important;
}
.btn_group {
  display: flex;
  align-items: center;
  margin: 30px 0 40px 0;
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
  /* margin-left: 30px; */
  display: flex;
  align-items: center;
}

.my_dialog {
  width: 1060px;
  border-radius: 10px;
  position: relative;
  padding-top: 25px;
  padding-bottom: 34px;
  padding-left: 37px;
  padding-right: 37px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.myChart_dialog {
  width: 983px;
  height: 264px;
  margin: 0 auto;
}
.first_table_last_td {
  color: #222222 !important;
}
.second_div {
  width: 55px;
}
.third_div > div {
  width: 130px !important;
  text-align: left !important;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.first_div {
  width: 50px;
  text-align: center;
}

.myChart {
  width: 341px;
  height: 278px;
}
.flex-row {
  display: flex;
}
.compare_iOS > div:first-child div:first-child {
  font-family: SourceHanSansCN-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
.compare_iOS > div:first-child div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
.compare_iOS > div:first-child {
  width: 100%;
  height: 100px;
  border: solid 1px #f2f2f2;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 26px;
  box-sizing: border-box;
}
.compare_iOS {
  width: 100%;
}
.right_btn div:first-child {
  padding-left: 27px;
}
.right_btn {
  margin: 21px 0;
}

.right_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #429ae8;
  padding-left: 11px;
}
.left {
  width: 840px;
}
.right {
  width: 340px;
}
.left_and_right {
  display: flex;
}
.rankingChangeFontColor {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
.rankingChange div {
  margin: 0 9px;
}
.rankingChange {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabsContentTable .arrowsImg {
  width: 4px;
  height: 8px;
}

.tabsContentTable .use img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-right: 9px;
  margin-left: 9px;
  cursor: pointer;
}
.tabsContentTable .use {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabsContentTable thead tr {
  height: 40px;
}

.tabsContentTable tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
td {
  padding: 20px 0;
}
.tabsContentTable tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
}
.tabsContentTable thead {
  width: 100%;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.tabsContentTable table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
}
.tabsContentTable {
  margin-right: 22px;
}
.tabs {
  margin-top: 30px;
}

.keywordContentTable thead tr {
  height: 40px;
}

.keywordContentTable tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
}
.keywordContentTable thead {
  width: 1200px;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.keywordContentTable table {
  width: 1200px;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
}
.options_03 div:last-child {
  width: 114px !important;
}
.option div:first-child {
  margin-right: 15px;
}
.option div:last-child {
  width: 86px;
  height: 24px;
}
.option {
  display: flex;
}
option:first-child {
  margin: 0;
}
.options .option:first-child {
  margin-left: 0 !important;
}
.options_03 {
  margin-left: 70px;
}
.options_02 {
  margin-left: 30px;
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
.result_title {
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
