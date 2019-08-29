<template>
  <div id="result" class="content">
    <div class="result_title">「{{this.$store.state.now_app_name}}」搜索结果</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div class="margin_top_font">设备</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-select v-model="equipmentValue">
            <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_02 option">
        <div class="margin_top_font">地区</div>
        <div>
          <!-- 选择国家 -->
          <country @childFn="parentFn" :custom_country="this.$store.state.now_country_name"></country>
        </div>
      </div>
      <div class="options_03 option">
        <div class="margin_top_font">日期</div>
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
            <th class="keywordContentTable_th">关键词</th>
            <th v-show="activeName=='first'">搜索指数</th>
            <th v-show="activeName=='first'">搜索结果数</th>
            <th v-show="activeName=='first'">搜索联想词</th>
            <th v-show="activeName=='second'">搜索指数</th>
            <th v-show="activeName=='second'">搜索结果数</th>
            <th v-show="activeName=='second'">搜索联想词</th>
            <th v-show="activeName=='third'" class="keywordContentTable_th">搜索指数</th>
            <th v-show="activeName=='third'" class="keywordContentTable_th">ios12搜索结果数</th>
            <th v-show="activeName=='third'" class="keywordContentTable_th">ios11搜索结果数</th>
          </tr>
        </thead>
        <tbody v-if="data_for_top_table02">
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
                    <th class="th_width">应用</th>
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
                          <div
                            class="app_subtitle rankingChangeFontColor"
                          >{{item.subtitle!='无'?item.subtitle:''}}</div>
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
                          src="../assets/keyword/arrows (3).png"
                          alt
                        />
                        <img
                          v-show="item.Change>0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        />
                        <div
                          :class="{'pointer':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                        >{{Math.abs(item.Change)}}</div>
                        <img
                          src="../assets/keyword/keyword01.png"
                          class="pointer"
                          @click="show_dialog(item.app_name,item.AppStoreId,item.WordId)"
                          alt
                        />
                      </div>
                    </td>
                    <td>
                      <div>{{item.ranking.rank_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.rank_all}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_allprice}}</div>
                    </td>
                    <td>
                      <div>{{item.ranking.genre_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_all}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_classprice}}</div>
                    </td>
                    <td
                      class="pointer"
                      @click="go_to_page06(item.AppStoreId,item.app_name)"
                    >{{item.Cover}}</td>
                    <td>{{item.Top3}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="right" v-if="now_country=='中国'">
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
                    <th class="th_width">应用</th>
                    <th>搜索排名变动</th>
                    <th>总榜排名</th>
                    <th>分类榜排名</th>
                    <th>关键词覆盖数</th>
                    <th>top3关键词数</th>
                  </tr>
                </thead>
                <tbody v-if="response_data_for_ios11" class="use_father">
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
                          <div
                            class="app_subtitle rankingChangeFontColor"
                          >{{item.subtitle!='无'?item.subtitle:''}}</div>
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
                          src="../assets/keyword/arrows (3).png"
                          alt
                        />
                        <img
                          v-show="item.Change>0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        />
                        <div
                          :class="{'pointer':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                        >{{Math.abs(item.Change)}}</div>
                        <img
                          src="../assets/keyword/keyword01.png"
                          class="pointer"
                          @click="show_dialog(item.app_name,item.AppStoreId,item.WordId)"
                          alt
                        />
                      </div>
                    </td>
                    <td>
                      <div>{{item.ranking.rank_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.rank_all}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_allprice}}</div>
                    </td>
                    <td>
                      <div>{{item.ranking.genre_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_all}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_classprice}}</div>
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
            <div class="compare_iOS tabsContentTable" @click="result_compare_iosType(12)">
              <div>
                <div>ios12</div>
                <div
                  v-if="response_data_for_ios11&&response_data_for_ios12"
                >更新时间 {{response_data_for_ios11.SearchDate}}</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th class="th_width">应用</th>
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
                          <div
                            class="app_subtitle rankingChangeFontColor"
                          >{{item.subtitle!='无'?item.subtitle:''}}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>{{item.ranking.genre_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_all}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_classprice}}</div>
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
                          src="../assets/keyword/arrows (3).png"
                          alt
                        />
                        <img
                          v-show="item.Change>0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        />
                        <div
                          :class="{'pointer':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                        >{{Math.abs(item.Change)}}</div>
                        <img
                          src="../assets/keyword/keyword01.png"
                          class="pointer"
                          @click="show_dialog(item.app_name,item.AppStoreId,item.WordId)"
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
            <div class="compare_iOS tabsContentTable" @click="result_compare_iosType(11)">
              <div>
                <div>ios11</div>
                <div
                  v-if="response_data_for_ios11&&response_data_for_ios12"
                >更新时间 {{response_data_for_ios11.SearchDate}}</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th class="th_width">应用</th>
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
                          <div
                            class="app_subtitle rankingChangeFontColor"
                          >{{item.subtitle!='无'?item.subtitle:''}}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>{{item.ranking.genre_class}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_all}}</div>
                      <div class="rankingChangeFontColor">{{item.ranking.genre_classprice}}</div>
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
                          src="../assets/keyword/arrows (3).png"
                          alt
                        />
                        <img
                          v-show="item.Change>0"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        />
                        <div
                          :class="{'pointer':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                        >{{Math.abs(item.Change)}}</div>
                        <img
                          src="../assets/keyword/keyword01.png"
                          class="pointer"
                          @click="show_dialog(item.app_name,item.AppStoreId,item.WordId)"
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
        <div class="result_title">【{{word}}】在【{{this.$store.state.now_app_name}}】搜索结果中排名趋势</div>
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
                <el-radio-button label="360天" v-show="radio01_dialog=='按天'"></el-radio-button>
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
                clear-icon
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
        </div>

        <div
          ref="myChart_result_dialog"
          class="myChart_dialog"
          v-show="is_show_myChart_and_table&&!no_data"
        ></div>
        <div class="myChart" v-show="no_data">暂无数据</div>
        <div class="bottom_image pointer" v-show="is_show_myChart_and_table">
          <img
            v-on:click="is_show_myChart_function"
            class="float_right"
            src="../assets/keyword/three.png"
            alt
          />
          <img
            v-on:click="is_show_table_function"
            class="float_right"
            src="../assets/keyword/calculator.png"
            alt
          />
        </div>
        <table v-show="!no_data&&!is_show_myChart_and_table">
          <thead>
            <tr>
              <th>
                <span>时间</span>
              </th>
              <th>
                <span>{{this.$store.state.now_app_name}}</span>
              </th>
            </tr>
          </thead>
          <tbody v-if="response_data_for_dialog">
            <tr v-for="(item ,index) in xAxis_data.length" :key="'trend_one_table02'+index">
              <td>
                <div class="table_font">{{xAxis_data[index]}}</div>
              </td>
              <td>
                <div class="table_font">{{keyword_data_value[0][index]}}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="footer__dialog">
          <img src="../assets/keyword/dialog_01.png" alt />
          iOS12与iOS11版本的排名不同
          <div class="bottom_image_table pointer" v-show="!no_data&&!is_show_myChart_and_table">
            <img
              v-on:click="is_show_myChart_function"
              class="float_right"
              src="../assets/keyword/three.png"
              alt
            />
            <img
              v-on:click="is_show_table_function"
              class="float_right"
              src="../assets/keyword/calculator.png"
              alt
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'

// 引入工具类
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'result',
  components: {
    country
  },
  beforeRouteEnter(to, from, next) {
    // alert(from.name)
    if (
      from.name == 'think_word' ||
      from.name == 'trend_many' ||
      from.name == 'trend_one'
    ) {
      to.meta.isBack = true
      //判断是从哪个路由过来的，
      //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }
    // alert(to.meta.isBack)
    next()
  },
  data() {
    let that = this
    return {
      custom_country: null, //自定义显示国家
      isFirstEnter: false, // 是否第一次进入，默认false
      // can_excute12: false,
      // can_excute11: false,
      // 请求分页
      page11: 1,
      page12: 1,
      db_number_is_same12: 0,
      db_number_is_same11: 0,
      // ===================顶部table================
      // ===================顶部table================
      // ===================顶部table================
      data_for_top_table: null,
      data_for_top_table02: null,
      // ===================element的弹窗================
      // ===================element的弹窗================
      // ===================element的弹窗================
      dialog_iosType: '',
      no_data: false,
      word: '',
      appid: '',
      WordId: '',
      radio01_dialog: '按小时',
      radio02_dialog: '近24小时',
      dialogVisible: false,
      time_dialog: '',
      pickerOptions: {
        disabledDate(time) {
          if (that.radio01_dialog == '按分钟') {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 7
            )
          } else if (that.radio01_dialog == '按小时') {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 30
            )
          } else if (that.radio01_dialog == '按天') {
            return time.getTime() > Date.now()
          }
          // 这里就是设置当天后的日期不能被点击
        }
      },
      // true显示myChart false显示table表格
      is_show_myChart_and_table: true,
      response_data_for_dialog: null,
      //canvas 关键词data数组
      keyword_data: [],
      xAxis_data: [],
      // 数据
      keyword_data_value: [],
      yAxis_max: 5,
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
      column_max: 100,
      column_min: -100,
      radio1: 'all',
      //canvas 关键词data数组
      keyword_data01: [],
      xAxis_data01: [],
      // 数据
      keyword_data_value01: []
    }
  },
  created: function() {
    this.isFirstEnter = true
    // 只有第一次进入或者刷新页面后才会执行此钩子函数
    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
    // this.get_data_for_top_table()
    // this.get_data_12()
    // this.get_data_11()
    // this.get_data_column()

    this.$watch('activeName', function(newValue, oldValue) {
      this.get_data_for_top_table()
    })
    this.$watch('now_country', function(newValue, oldValue) {
      // console.log('当前国家发生变化，重新请求数据...')
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      this.get_data_for_top_table()

      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
    })
    this.$watch('$store.state.now_app_name', function(newValue, oldValue) {
      // console.log('当前国家发生变化，重新请求数据...')
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      this.get_data_for_top_table()
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
    })

    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      this.get_data_12()
      this.get_data_11()
      this.get_data_for_top_table()
      this.get_data_column()
    })
    this.$watch('radio1', function(newValue, oldValue) {
      this.get_data_column()
    })
    this.$watch('dateValue', function(newValue, oldValue) {
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      // console.log('当前国家发生变化，重新请求数据...')
      this.get_data_for_top_table()
      this.get_data_12()
      this.get_data_11()
    })
    // ===============弹出框=====================
    this.$watch('radio01_dialog', function(newValue, oldValue) {
      // 2.解决切换之后380天消失了的bug
      this.time_dialog = ''
      if (this.radio01_dialog == '按分钟') {
        this.radio02_dialog = '近24小时'
      } else if (this.radio01_dialog == '按小时') {
        this.radio02_dialog = '昨日'
      } else if (this.radio01_dialog == '按天') {
        this.radio02_dialog = '7天'
      }
      this.get_data_dialog()
    })
    this.$watch('radio02_dialog', function(newValue, oldValue) {
      this.get_data_dialog()
    })
    this.$watch('time_dialog', function(newValue, oldValue) {
      this.get_data_dialog()
    })
  },
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据

      this.equipmentValue = 'iPhone'
      this.dateValue = new Date()
      this.get_data_for_top_table()
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false
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

          that.get_data_11()
          console.log('yes11')
          that.get_data_12()
          console.log('yes12')
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
              console.log(
                'FindTodayJoinWord,it is me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
              )
              console.log(this.data_for_top_table)
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
              console.log(
                'FindWordInfo,it is me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
              )
              console.log(this.data_for_top_table02)
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
      this.db_number_is_same12++
      let is_excute_function = this.db_number_is_same12
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
            this.page12 +
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
              if (is_excute_function == this.db_number_is_same12) {
                this.response_data_for_ios12 = this.response_data_for_ios12.concat(
                  response.data.AppInfoList
                )
                this.page12 += 1
              }
              console.log(
                'ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12==ios12=='
              )
              console.log(response.data.AppInfoList)
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
      this.db_number_is_same11++
      let is_excute_function = this.db_number_is_same11
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
            this.page11 +
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
              if (is_excute_function == this.db_number_is_same11) {
                this.response_data_for_ios11 = this.response_data_for_ios11.concat(
                  response.data.AppInfoList
                )
                this.page11 += 1
              }
              console.log(
                'ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11==ios11=='
              )
              console.log(response.data.AppInfoList)
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
          let word = this.$store.state.now_app_name
          let url =
            '/Word/FindSearchRate?' +
            '&deviceType=' +
            deviceType +
            '&countryId=' +
            country_id +
            '&type=' +
            type +
            '&word=' +
            word
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              console.log(response)
              this.keyword_data01 = new Array()
              this.keyword_data_value01 = new Array()
              this.xAxis_data01 = new Array()
              let temp = response.data
              this.keyword_data_value01.push(temp.Yvalue)
              this.xAxis_data01 = temp.Xvalue
              this.keyword_data01.push('ios12')
              console.log(this.keyword_data_value01[0])

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
      myChart.setOption(
        {
          tooltip: {
            formatter: function(data) {
              let tr = ''
              data.forEach(element => {
                tr += `<tr>
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
            trigger: 'axis',
            formatter: function(data) {
              // console.log(data)
              return (
                data[0].axisValue +
                '<br/>' +
                data[0].marker +
                data[0].seriesName +
                '：' +
                data[0].value +
                '%'
              )
              //将小数转化为百分数显示
            }
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
          color: ['#3398DB'],

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
          xAxis: {
            axisLine: {
              show: true,
              lineStyle: {
                color: ['#666'],
                opacity: 0.5
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
            data: that.xAxis_data01,
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            axisLine: {
              show: true,
              lineStyle: {
                color: ['#666'],
                opacity: 0.5
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
            max: function(value) {
              let max_value = value.max
              if (max_value <= 5) {
                that.column_max = 5
              } else if (max_value <= 20) {
                that.column_max = 20
              } else if (max_value <= 50) {
                that.column_max = 50
              } else if (max_value <= 100) {
                that.column_max = 100
              } else if (max_value <= 500) {
                that.column_max = 500
              } else if (max_value <= 1000) {
                that.column_max = 1000
              } else if (max_value <= 1500) {
                that.column_max = 1500
              } else {
                that.column_max = max_value + 100
              }
              return that.column_max
            },
            min: function(value) {
              // alert(value.min)
              let min_value = value.min
              if (min_value <= 0 && min_value >= -9) {
                that.column_min = -10
              } else if (min_value <= -10 && min_value >= -19) {
                that.column_min = -20
              } else if (min_value <= -20 && min_value >= -49) {
                that.column_min = -50
              } else if (min_value <= -50 && min_value >= -99) {
                that.column_min = -100
              } else if (min_value >= -100) {
                that.column_min = min_value - 20
              }
              return that.column_min
            },
            // min: that.column_min,
            //设置Y轴百分比显示
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %'
            }
          },
          series: that.series_data01()
        },
        true
      )
    },
    // 便利keyword_data生成canvas的series数据
    series_data01: function() {
      let series_data_arr = new Array()
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'bar'
        // this.stack = '总量'
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
          let wordid = this.WordId
          let iosType
          if (this.activeName == 'first') {
            iosType = 12
          } else if (this.activeName == 'second') {
            iosType = 11
          } else if (this.activeName == 'third') {
            iosType = this.dialog_iosType
          }
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
            '&iosType=' +
            iosType
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              console.log(response)
              if (response.data.Code == 0) {
                this.no_data = false
                this.response_data_for_dialog = response.data
                console.log(this.response_data_for_dialog)

                this.keyword_data = new Array()
                this.keyword_data_value = new Array()
                this.xAxis_data = new Array()

                this.keyword_data_value.push(
                  this.response_data_for_dialog.Yvalue
                )
                this.xAxis_data = this.response_data_for_dialog.Xvalue
                this.keyword_data.push(this.word)
                console.log(this.xAxis_data)
                this.xAxis_data = this.xAxis_data.map(element => {
                  // console.log(1)
                  if (this.radio01_dialog == '按天') {
                    return timestamp(element, 'Y年M月D日')
                  } else if (this.radio01_dialog == '按小时') {
                    return timestamp(element, 'Y年M月D日 h点')
                  } else if (this.radio01_dialog == '按分钟') {
                    return timestamp(element, 'M月D日 h点m分')
                  }
                })
                this.drawLine_dialog()
              } else {
                this.no_data = true
              }
              // console.log(this.is_show_myChart_and_table)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    show_dialog(word, appid, WordId) {
      this.dialogVisible = true
      this.word = word
      this.appid = appid
      this.WordId = WordId
      // alert(this.WordId)
      this.get_data_dialog()
    },
    // 控制显示echarts还是table
    is_show_myChart_function() {
      this.is_show_myChart_and_table = true
    },
    is_show_table_function() {
      this.is_show_myChart_and_table = false
    },
    // 画canvas
    drawLine_dialog: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_result_dialog)
      // 绘制图表
      myChart.setOption(
        {
          tooltip: {
            formatter: function(data) {
              let tr = ''
              data.forEach(element => {
                tr += `<tr>
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

          legend: {
            data: that.keyword_data,
            y: 'bottom'
          },
          grid: {
            left: '3%',
            right: '5%',
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
                  that.radio01_dialog == '按分钟' &&
                  that.radio02_dialog != '7天'
                ) {
                  return '　　' + value.slice(3, 6) + '　　'
                } else if (
                  that.radio01_dialog == '按分钟' &&
                  that.radio02_dialog == '7天'
                ) {
                  return '　　' + value.slice(0, 6) + '　　'
                } else if (
                  that.radio01_dialog == '按小时' &&
                  that.radio02_dialog == '近24小时'
                ) {
                  return value.slice(-3)
                } else if (
                  that.radio01_dialog == '按小时' &&
                  that.radio02_dialog == '昨日'
                ) {
                  return value.slice(8)
                } else if (
                  that.radio01_dialog == '按小时' &&
                  that.radio02_dialog == '7天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.radio01_dialog == '按小时' &&
                  that.radio02_dialog == '30天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.radio01_dialog == '按小时' &&
                  that.radio02_dialog == ''
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.radio01_dialog == '按天' &&
                  that.radio02_dialog == '7天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.radio01_dialog == '按天' &&
                  that.radio02_dialog == '30天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.radio01_dialog == '按天' &&
                  that.radio02_dialog == '180天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.radio01_dialog == '按天' &&
                  that.radio02_dialog == '360天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.radio01_dialog == '按天' &&
                  that.radio02_dialog == ''
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
              if (max_value <= 5) {
                that.yAxis_max = 5
              } else if (max_value <= 20) {
                that.yAxis_max = 20
              } else if (max_value <= 50) {
                that.yAxis_max = 50
              } else if (max_value <= 100) {
                that.yAxis_max = 100
              } else if (max_value <= 500) {
                that.yAxis_max = 500
              } else if (max_value <= 1000) {
                that.yAxis_max = 1000
              } else if (max_value <= 1500) {
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
    // 点击单选按钮组件组件
    click_second_el_radio: function() {
      this.time_dialog = ''
    },
    // 点击日历组件
    click_second_el_date_picker: function() {
      this.radio02_dialog = ''
    },
    result_compare_iosType(parm) {
      this.dialog_iosType = parm
      // alert(this.dialog_iosType)
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
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_name = parm
    },
    go_to_page03(parm) {
      this.$router.push({
        path: '/trend_one'
      })
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_name = parm
    },
    go_to_page04(parm) {
      // console.log(parm)
      this.get_data_for_top_table()
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_name = parm
      this.$router.push({
        path: '/result'
      })
    },
    go_to_page05(parm, parm02) {
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_id = parm
      this.hand_save_vuex(this)
      let routerUrl = this.$router.resolve({
        path: '/now_ranking'
      })
      window.open(routerUrl.href, '_blank')
    },
    go_to_page06(parm, parm02) {
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_name = parm02
      this.$store.state.now_app_id = parm
      this.hand_save_vuex(this)
      let routerUrl = this.$router.resolve({
        path: '/data_table'
      })
      window.open(routerUrl.href, '_blank')
    }
  }
}
</script>
<style scoped>
.my_dialog tbody tr {
  border: solid 1px #f2f2f2;
}
.my_dialog tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: block;
  max-height: 366px;
  overflow-y: scroll;
}
.my_dialog thead tr {
  height: 40px;
}
.my_dialog thead tr span {
  margin-left: -26px;
}
.my_dialog td {
  width: 450px;
}
.my_dialog thead {
  width: 100%;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: table;
  width: 100%;
  table-layout: fixed;
}
.my_dialog table {
  border: solid 1px #f2f2f2;
  table-layout: fixed;
  text-align: center;
  width: 900px;
  margin: 0 auto;
}
.my_dialog .bottom_image_table img {
  margin-left: 5px;
}
.my_dialog .bottom_image_table {
  position: absolute;
  top: 20px;
  right: 66px;
}
.my_dialog .bottom_image {
  float: right;
  position: absolute;
  top: 169.5px;
  right: 66px;
}
.keywordContentTable_th {
  width: 25%;
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
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.my_dialog > img {
  position: absolute;
  top: 16px;
  right: 16px;
}
.footer__dialog > img {
  margin-right: 7px;
  vertical-align: -2px;
  margin-left: 46px;
  margin-top: 20px;
}

.footer__dialog {
  position: relative;
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
  width: 52px;
  text-align: left;
}
.second_div img {
  border: solid 1px #f2f2f2;
}
.third_div > div {
  width: 130px !important;
  text-align: left !important;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  height: 23px;
  overflow: hidden;
}
.first_div {
  width: 40px;
  text-align: center;
}

.myChart {
  width: 341px;
  height: 278px;
  text-align: center;
  color: #666;
  line-height: 300px;
  font-size: 50px;
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

.tabsContentTable .use img {
  width: 40px;
  height: 40px;
  border-radius: 10px;

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
  margin-left: 22px;
}
.options_02 {
  margin-left: 30px;
}
.margin_top_font {
  margin-top: 4px;
}
.options {
  margin: 22px 0;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 30px; */
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
.tabs tbody tr:nth-child(1) .use .first_div {
  color: #222222;
  font-weight: bold;
}
.tabs tbody tr:nth-child(2) .use .first_div {
  color: #222222;
  font-weight: bold;
}
.tabs tbody tr:nth-child(3) .use .first_div {
  color: #222222;
  font-weight: bold;
}
.th_width {
  width: 233px;
}
</style>
