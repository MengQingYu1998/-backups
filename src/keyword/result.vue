<template>
  <div id="result" class="content">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <!-- ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果 -->
        <el-tab-pane label="iOS13/12搜索结果" name="first">
          <div class="options">
            <div class="options_01 option">
              <div class="margin_top_font">设备</div>
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
            <div class="options_02 option">
              <div class="margin_top_font">地区</div>
              <div>
                <!-- 选择国家 -->
                <country
                  v-if="is_show_country_component"
                  @childFn="parentFn"
                  :custom_country="this.$store.state.now_country_name"
                ></country>
              </div>
            </div>
            <div class="options_03 option">
              <div class="margin_top_font">日期</div>
              <div id="dateValue01">
                <el-radio-group class="my_el_radio_group" v-model="date_button" size="mini">
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                </el-radio-group>
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="dateValue"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  prefix-icon="fasle"
                  :picker-options="pickerOptions2"
                  @blur="dateValue_blur01"
                  @focus="dateValue_focus01"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="keywordContentTable">
            <div>
              <div>{{this.$store.state.now_app_name}}</div>
              <div>搜索关键词</div>
            </div>
            <div>
              <div v-if="data_for_top_table02">
                {{data_for_top_table02.Hint}}
                <img
                  src="../assets/keyword/keyword01.png"
                  class="pointer"
                  @click="go_to_page02(data_for_top_table02.Word)"
                  alt
                />
              </div>
              <div v-else>--</div>
              <div>搜索指数</div>
            </div>
            <div>
              <div v-if="data_for_top_table02">
                {{data_for_top_table02.SearchCount12}}
                <img
                  src="../assets/keyword/keyword01.png"
                  class="pointer"
                  @click="go_to_page03(data_for_top_table02.Word)"
                  alt
                />
              </div>
              <div v-else>--</div>
              <div>搜索结果数</div>
            </div>
            <div id="data_for_top_table_keyword01">
              <span
                class="pointer active_line"
                @click="go_to_page04(item_son.keyword)"
                v-for="(item_son, index_son) in data_for_top_table"
                :key="'data_for_top_tablesss'+index_son"
              >{{item_son.keyword}}</span>
              <span
                v-show="!data_for_top_table"
                style="margin-left:90px;line-height: 50px;"
              >暂无更多搜索联想词</span>
              <span
                v-show="data_for_top_table"
                @click="go_to_page01(data_for_top_table02.Word)"
                :class="{ 'active_line':true,'pointer':true, 'see_more':see_more, 'see_more01':see_more01}"
              >更多>></span>
            </div>
          </div>
          <div class="result_title">「{{this.$store.state.now_app_name}}」搜索结果</div>
          <div class="result_title_line"></div>

          <div class="left_and_right">
            <div class="left tabsContentTable">
              <table :class="{'fitst_left':now_country=='中国'}">
                <thead>
                  <tr>
                    <th class="th_width">应用</th>
                    <th>搜索排名变动</th>
                    <th>总榜排名</th>
                    <th>分类榜排名</th>
                    <th class="th_width_555">关键词覆盖数/top3</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="response_data_for_ios12">
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
                          <div
                            :class="{'third_div':true,'third_div_padding':item.app_name=='无'||item.subtitle=='无'||item.developer_name==null}"
                          >
                            <div
                              :class="{'app_name':true,'pointer':true} "
                              @click="go_to_page05(item.AppStoreId,item.app_name)"
                            >{{item.app_name}}</div>

                            <div class="app_subtitle" v-show="item.subtitle!='无'">{{item.subtitle}}</div>
                            <div
                              class="new_add_field"
                              v-show="item.developer_name"
                            >{{item.developer_name}}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="rankingChange">
                          <img
                            class="arrowsImg_0"
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
                            :class="{'font_size_15':true ,'pointer':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                          >{{Math.abs(item.Change)}}</div>
                          <img
                            src="../assets/keyword/keyword01.png"
                            class="pointer img_width"
                            @click="show_dialog(item.app_name,item.AppStoreId,item.WordId,item.rowid)"
                            alt
                          />
                        </div>
                      </td>
                      <td>
                        <div
                          class="font_size_15"
                          v-if="!(item.ranking.rank_class=='-'&&item.ranking.rank_all=='-'&&item.ranking.genre_allprice=='-')"
                        >{{item.ranking.rank_class}}</div>
                        <div
                          v-if="!(item.ranking.rank_class=='-'&&item.ranking.rank_all=='-'&&item.ranking.genre_allprice=='-')"
                          class="rankingChangeFontColor"
                        >{{item.ranking.rank_all+item.ranking.genre_allprice}}</div>

                        <div
                          v-if="item.ranking.rank_class=='-'&&item.ranking.rank_all=='-'&&item.ranking.genre_allprice=='-'"
                        >--</div>
                      </td>
                      <td>
                        <div
                          class="font_size_15"
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                        >{{item.ranking.genre_class}}</div>
                        <div
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                          class="rankingChangeFontColor"
                        >{{item.ranking.genre_all+item.ranking.genre_classprice}}</div>
                        <div
                          v-if="item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-'"
                        >--</div>
                      </td>
                      <td
                        class="pointer"
                        @click="go_to_page06(item.AppStoreId,item.app_name)"
                      >{{item.Cover+' / '+item.Top3}}</td>
                    </tr>
                  </template>
                  <tr class="disable_hover" v-show="!loading_12&&response_data_for_ios12.length==0">
                    <td colspan="6">暂无相关数据</td>
                  </tr>
                </tbody>
              </table>
              <div :class="{'loading':true,'margin_left':now_country=='中国'}" v-show="loading_12">
                <img src="../assets/ios/loading.gif" alt />
              </div>
              <div
                :class="{'it_is_over':true,'margin_left':now_country=='中国'}"
                v-show="it_is_over_12&&response_data_for_ios12.length!=0"
              >我是有底线的～</div>
              <div
                :class="{'it_is_over':true,'margin_left':now_country=='中国'}"
                v-show="!it_is_over_12&&response_data_for_ios12.length!=0&&!loading_12"
              >下拉加载更多</div>
            </div>
            <div :class="{'right':true,'position_fixed':position_fixed} " v-if="now_country=='中国'">
              <div class="right_title">关键词搜索结果变化率</div>
              <div class="right_btn">
                <div>
                  <el-radio-group v-model="radio1" size="mini">
                    <el-radio-button label="top10"></el-radio-button>
                    <el-radio-button label="all"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div ref="myChart_result12" class="myChart"></div>
            </div>
          </div>
        </el-tab-pane>
        <!-- ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果 -->
        <el-tab-pane label="iOS11搜索结果" name="second">
          <div class="options">
            <div class="options_01 option">
              <div class="margin_top_font">设备</div>
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
            <div class="options_02 option">
              <div class="margin_top_font">地区</div>
              <div>
                <!-- 选择国家 -->
                <country
                  v-if="is_show_country_component"
                  @childFn="parentFn"
                  :custom_country="this.$store.state.now_country_name"
                ></country>
              </div>
            </div>
            <div class="options_03 option">
              <div class="margin_top_font">日期</div>
              <div id="dateValue02">
                <el-radio-group class="my_el_radio_group" v-model="date_button" size="mini">
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                </el-radio-group>
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="dateValue"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  prefix-icon="fasle"
                  :picker-options="pickerOptions2"
                  @blur="dateValue_blur02"
                  @focus="dateValue_focus02"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="keywordContentTable">
            <div>
              <div>{{this.$store.state.now_app_name}}</div>
              <div>搜索关键词</div>
            </div>
            <div>
              <div v-if="data_for_top_table02">
                {{data_for_top_table02.Hint}}
                <img
                  src="../assets/keyword/keyword01.png"
                  class="pointer"
                  @click="go_to_page02(data_for_top_table02.Word)"
                  alt
                />
              </div>
              <div v-else>--</div>
              <div>搜索指数</div>
            </div>
            <div>
              <div v-if="data_for_top_table02">
                {{data_for_top_table02.SearchCount11}}
                <img
                  src="../assets/keyword/keyword01.png"
                  class="pointer"
                  @click="go_to_page03(data_for_top_table02.Word)"
                  alt
                />
              </div>
              <div v-else>--</div>
              <div>搜索结果数</div>
            </div>
            <div id="data_for_top_table_keyword02">
              <span
                class="pointer active_line"
                @click="go_to_page04(item_son.keyword)"
                v-for="(item_son, index_son) in data_for_top_table"
                :key="'data_for_top_tablesss'+index_son"
              >{{item_son.keyword}}</span>
              <span
                v-show="!data_for_top_table"
                style="margin-left:90px;line-height: 50px;"
              >暂无更多搜索联想词</span>
              <span
                v-show="data_for_top_table"
                :class="{ 'active_line':true,'pointer':true, 'another_see_more':another_see_more, 'another_see_more01':another_see_more01}"
              >更多>></span>
            </div>
          </div>
          <div class="result_title">「{{this.$store.state.now_app_name}}」搜索结果</div>
          <div class="result_title_line"></div>
          <div class="left_and_right">
            <div class="left tabsContentTable">
              <table>
                <thead>
                  <tr>
                    <th class="th_width">应用</th>
                    <th>搜索排名变动</th>
                    <th>总榜排名</th>
                    <th>分类榜排名</th>
                    <th>关键词覆盖数/top3</th>
                  </tr>
                </thead>
                <tbody class="use_father">
                  <template v-if="response_data_for_ios11">
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
                          <div
                            :class="{'third_div':true,'third_div_padding':item.app_name=='无'||item.subtitle=='无'||item.developer_name==null}"
                          >
                            <div
                              :class="{'app_name':true,'pointer':true} "
                              @click="go_to_page05(item.AppStoreId,item.app_name)"
                            >{{item.app_name}}</div>

                            <div class="app_subtitle" v-show="item.subtitle!='无'">{{item.subtitle}}</div>
                            <div
                              class="new_add_field"
                              v-show="item.developer_name"
                            >{{item.developer_name}}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="rankingChange">
                          <img
                            class="arrowsImg_0"
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
                            :class="{'pointer':true ,'font_size_15':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                          >{{Math.abs(item.Change)}}</div>
                          <img
                            src="../assets/keyword/keyword01.png"
                            class="pointer img_width"
                            @click="show_dialog(item.app_name,item.AppStoreId,item.WordId,item.rowid)"
                            alt
                          />
                        </div>
                      </td>
                      <td>
                        <div
                          class="font_size_15"
                          v-if="!(item.ranking.rank_class=='-'&&item.ranking.rank_all=='-'&&item.ranking.genre_allprice=='-')"
                        >{{item.ranking.rank_class}}</div>
                        <div
                          v-if="!(item.ranking.rank_class=='-'&&item.ranking.rank_all=='-'&&item.ranking.genre_allprice=='-')"
                          class="rankingChangeFontColor"
                        >{{item.ranking.rank_all+item.ranking.genre_allprice}}</div>

                        <div
                          v-if="item.ranking.rank_class=='-'&&item.ranking.rank_all=='-'&&item.ranking.genre_allprice=='-'"
                        >--</div>
                      </td>
                      <td>
                        <div
                          class="font_size_15"
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                        >{{item.ranking.genre_class}}</div>
                        <div
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                          class="rankingChangeFontColor"
                        >{{item.ranking.genre_all+item.ranking.genre_classprice}}</div>

                        <div
                          v-if="item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-'"
                        >--</div>
                      </td>
                      <td
                        class="pointer"
                        @click="go_to_page06(item.AppStoreId)"
                      >{{item.Cover+' / '+item.Top3}}</td>
                    </tr>
                  </template>
                  <tr class="disable_hover" v-show="!loading_11&&response_data_for_ios11.length==0">
                    <td colspan="6">暂无相关数据</td>
                  </tr>
                </tbody>
              </table>
              <div class="loading" v-show="loading_11">
                <img src="../assets/ios/loading.gif" alt />
              </div>
              <div
                class="it_is_over"
                v-show="it_is_over_11&&response_data_for_ios11.length!=0"
              >我是有底线的～</div>
              <div
                class="it_is_over"
                v-show="!it_is_over_11&&response_data_for_ios11.length!=0&&!loading_11"
              >下拉加载更多</div>
            </div>
          </div>
        </el-tab-pane>
        <!-- 搜索结果对比  搜索结果对比   搜索结果对比  搜索结果对比  搜索结果对比  搜索结果对比  搜索结果对比   -->
        <el-tab-pane label="搜索结果对比" name="third">
          <div class="options">
            <div class="options_01 option">
              <div class="margin_top_font">设备</div>
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
            <div class="options_02 option">
              <div class="margin_top_font">地区</div>
              <div>
                <!-- 选择国家 -->
                <country
                  v-if="is_show_country_component"
                  @childFn="parentFn"
                  :custom_country="this.$store.state.now_country_name"
                ></country>
              </div>
            </div>
            <div class="options_03 option">
              <div class="margin_top_font">日期</div>
              <div id="dateValue03">
                <el-radio-group class="my_el_radio_group" v-model="date_button" size="mini">
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                </el-radio-group>
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="dateValue"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  prefix-icon="fasle"
                  :picker-options="pickerOptions2"
                  @blur="dateValue_blur03"
                  @focus="dateValue_focus03"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="keywordContentTable">
            <div class="keywordContentTable_width01">
              <div>{{this.$store.state.now_app_name}}</div>
              <div>搜索关键词</div>
            </div>
            <div class="keywordContentTable_width02">
              <div v-if="data_for_top_table02">
                {{data_for_top_table02.Hint}}
                <img
                  src="../assets/keyword/keyword01.png"
                  class="pointer"
                  @click="go_to_page02(data_for_top_table02.Word)"
                  alt
                />
              </div>
              <div v-else>--</div>
              <div>搜索指数</div>
            </div>
            <div class="keywordContentTable_width03">
              <div v-if="data_for_top_table02">
                {{data_for_top_table02&&data_for_top_table02.SearchCount11}}
                <img
                  src="../assets/keyword/keyword01.png"
                  class="pointer"
                  @click="go_to_page03(data_for_top_table02.Word)"
                  alt
                />
              </div>
              <div v-else>--</div>
              <div>iOS11搜索结果数</div>
            </div>
            <div class="same keywordContentTable_width04">
              <div v-if="data_for_top_table02">
                {{data_for_top_table02.SearchCount12}}
                <img
                  src="../assets/keyword/keyword01.png"
                  class="pointer"
                  @click="go_to_page03(data_for_top_table02.Word)"
                  alt
                />
              </div>
              <div v-else>--</div>
              <div>iOS12搜索结果数</div>
            </div>
          </div>
          <div class="result_title">「{{this.$store.state.now_app_name}}」搜索结果</div>
          <div class="result_title_line"></div>
          <div class="flex-row">
            <div class="compare_iOS tabsContentTable" @click="result_compare_iosType(12)">
              <div>
                <span>iOS13/12搜索结果&nbsp;</span>
                <span v-if="response_data_for_ios12">更新时间 {{SearchDate_12}}</span>
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
                <tbody>
                  <template v-if="response_data_for_ios12">
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
                          <div
                            :class="{'third_div':true,'third_div_padding':item.app_name=='无'||item.subtitle=='无'||item.developer_name==null}"
                          >
                            <div
                              :class="{'app_name':true,'pointer':true} "
                              @click="go_to_page05(item.AppStoreId,item.app_name)"
                            >{{item.app_name}}</div>

                            <div class="app_subtitle" v-show="item.subtitle!='无'">{{item.subtitle}}</div>
                            <div
                              class="new_add_field"
                              v-show="item.developer_name"
                            >{{item.developer_name}}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div
                          class="font_size_15"
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                        >{{item.ranking.genre_class}}</div>
                        <div
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                          class="rankingChangeFontColor"
                        >{{item.ranking.genre_all+item.ranking.genre_classprice}}</div>
                        <!-- <div
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                          class="rankingChangeFontColor"
                        >{{}}</div>-->
                        <div
                          v-if="item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-'"
                        >--</div>
                      </td>
                      <td>
                        <div class="rankingChange">
                          <img
                            class="arrowsImg_0"
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
                            :class="{'pointer':true ,'font_size_15':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                          >{{Math.abs(item.Change)}}</div>
                          <img
                            src="../assets/keyword/keyword01.png"
                            class="pointer img_width"
                            @click="show_dialog(item.app_name,item.AppStoreId,item.WordId,item.rowid)"
                            alt
                          />
                        </div>
                      </td>
                      <td class="pointer" @click="go_to_page06(item.AppStoreId)">{{item.Cover}}</td>
                      <td>{{item.rating_count}}</td>
                    </tr>
                  </template>
                  <tr class="disable_hover" v-show="!loading_12&&response_data_for_ios12.length==0">
                    <td colspan="5">暂无相关数据</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="compare_iOS tabsContentTable" @click="result_compare_iosType(11)">
              <div>
                <span>iOS11&nbsp;</span>
                <span v-if="response_data_for_ios11">更新时间 {{SearchDate_11}}</span>
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
                <tbody>
                  <template v-if="response_data_for_ios11">
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
                          <div
                            :class="{'third_div':true,'third_div_padding':item.app_name=='无'||item.subtitle=='无'||item.developer_name==null}"
                          >
                            <div
                              :class="{'app_name':true,'pointer':true} "
                              @click="go_to_page05(item.AppStoreId,item.app_name)"
                            >{{item.app_name}}</div>

                            <div class="app_subtitle" v-show="item.subtitle!='无'">{{item.subtitle}}</div>
                            <div
                              class="new_add_field"
                              v-show="item.developer_name"
                            >{{item.developer_name}}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div
                          class="font_size_15"
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                        >{{item.ranking.genre_class}}</div>
                        <div
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                          class="rankingChangeFontColor"
                        >{{item.ranking.genre_all+item.ranking.genre_classprice}}</div>
                        <!-- <div
                          v-if="!(item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-')"
                          class="rankingChangeFontColor"
                        >{{}}</div>-->
                        <div
                          v-if="item.ranking.genre_class=='-'&&item.ranking.genre_all=='-'&&item.ranking.genre_classprice=='-'"
                        >--</div>
                      </td>
                      <td>
                        <div class="rankingChange">
                          <img
                            class="arrowsImg_0"
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
                            :class="{'pointer':true ,'font_size_15':true , 'gray':item.Change==0 , 'blue':item.Change<0 , 'red':item.Change>0}"
                          >{{Math.abs(item.Change)}}</div>
                          <img
                            src="../assets/keyword/keyword01.png"
                            class="pointer img_width"
                            @click="show_dialog(item.app_name,item.AppStoreId,item.WordId,item.rowid)"
                            alt
                          />
                        </div>
                      </td>
                      <td class="pointer" @click="go_to_page06(item.AppStoreId)">{{item.Cover}}</td>
                      <td>{{item.rating_count}}</td>
                    </tr>
                  </template>
                  <tr class="disable_hover" v-show="!loading_11&&response_data_for_ios11.length==0">
                    <td colspan="5">暂无相关数据</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="loading" v-show="loading_11||loading_12">
            <img src="../assets/ios/loading.gif" alt />
          </div>
          <div
            class="it_is_over"
            v-show="it_is_over_11&&it_is_over_12&&(response_data_for_ios12.length!=0||response_data_for_ios11.length!=0)"
          >我是有底线的～</div>
          <div
            class="it_is_over"
            v-show="!it_is_over_11&&!it_is_over_12&&(response_data_for_ios12.length!=0||response_data_for_ios11.length!=0)&&!(loading_11||loading_12)"
          >下拉加载更多</div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- element的弹窗 -->
    <div class="my_dialog_wraper" v-show="dialogVisible">
      <div class="my_dialog">
        <img src="../assets/keyword/dialog_02.png" alt @click="dialogVisible=false" />
        <div
          class="result_title"
        >【{{replace_some_chart_wrap(word)}}】在【{{replace_some_chart_wrap(this.$store.state.now_app_name)}}】搜索结果中排名趋势</div>

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
            <div>
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
            <div id="dateValue04" @click="dateValue04_click">
              <el-date-picker
                v-model="time_dialog"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                clear-icon
                @blur="dateValue_blur04"
                @focus="dateValue_focus04"
                prefix-icon="fasle"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div>
          <div
            ref="myChart_result_dialog"
            class="myChart_dialog"
            v-show="is_show_myChart_and_table&&!no_data"
          ></div>
          <div class="myChart_dialog" v-show="no_data">暂无数据</div>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入国家选择组件
import country from '../common/country_select/country'
// 引入工具类
import {
  formatDate,
  timestamp,
  replace_some_chart,
  time_inactive,
  time_active,
  time_reset,
  time_rotate
} from '../common/util.js'
export default {
  name: 'result',
  components: {
    country
  },
  beforeRouteEnter(to, from, next) {
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
    next(vm => {
      // 通过 `vm` 访问组件实例
      // console.log(from)
      // if (from.name == 'ranking') {
      //   vm.equipmentValue = vm.$store.state.ranking_to_result_equipmentValue
      // }
    })
  },
  data() {
    let that = this
    return {
      is_show_country_component: true, //强制刷新国家组件
      loading_first: false,
      can_execute_scorll: true, //是否可以执行滚动
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
      db_number_is_same: 0, //修复用户输入过快的bug
      dialog_iosType: '',
      no_data: false,
      word: '',
      appid: '',
      WordId: '',
      rankId: '',
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
      position_fixed: false,
      another_see_more: false,
      another_see_more01: false,
      see_more: false,
      see_more01: false,
      SearchDate_11: '',
      SearchDate_12: '',
      it_is_over_12: false,
      it_is_over_11: false,
      loading_12: false,
      loading_11: false,
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
      date_button: '今日',
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
    // alert(this.$store.state.now_country_name)
    // 与上一页面的参数保持一致
    if (this.$route.query.equipmentValue_from_ranking) {
      this.equipmentValue = this.$route.query.equipmentValue_from_ranking
    }
    if (this.$route.query.dateValue_from_ranking) {
      this.dateValue = new Date(
        Date.parse(this.$route.query.dateValue_from_ranking.replace(/-/g, '/'))
      )
    }
    // 与上一页面的参数保持一致
    this.get_data_for_top_table()
    this.get_data_12()
    this.get_data_11()
    this.get_data_column()
    this.$watch('activeName', function(newValue, oldValue) {
      // if (newValue == 'third') {
      this.page11 = 1
      this.page12 = 1
      this.response_data_for_ios12.length = 0
      this.response_data_for_ios11.length = 0
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
      // }
      this.get_data_for_top_table()
    })
    this.$watch('now_country', function(newValue, oldValue) {
      // 保证切换的时候，国家统一
      this.$store.state.now_country_name = this.now_country
      this.is_show_country_component = false
      this.$nextTick(() => {
        this.is_show_country_component = true
      })
    })
    this.$watch('$store.state.now_country_name', function(newValue, oldValue) {
      // 保证切换的时候，国家统一
      this.is_show_country_component = false
      this.$nextTick(() => {
        this.is_show_country_component = true
      })
      // 保证切换的时候，国家统一
      // console.log('当前国家发生变化，重新请求数据...')
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      this.get_data_for_top_table()
      // alert('$store.state.now_app_name')
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
    })
    this.$watch('$store.state.now_app_name', function(newValue, oldValue) {
      // 保证切换的时候，国家统一
      this.is_show_country_component = false
      this.$nextTick(() => {
        this.is_show_country_component = true
      })
      // 保证切换的时候，国家统一
      // console.log('当前国家发生变化，重新请求数据...')
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      this.get_data_for_top_table()
      // alert('$store.state.now_app_name')
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      // alert('equipmentValue')
      this.get_data_12()
      this.get_data_11()
      this.get_data_for_top_table()
      this.get_data_column()
    })
    this.$watch('radio1', function(newValue, oldValue) {
      this.get_data_column()
    })
    this.$watch('date_button', function(newValue, oldValue) {
      switch (newValue) {
        case '今日':
          this.dateValue = new Date()

          break
        case '昨日':
          let time02 = new Date()
          this.dateValue = new Date(
            new Date().setTime(time02.getTime() - 24 * 60 * 60 * 1000)
          )
          break
        default:
          break
      }
    })
    this.$watch('dateValue', function(newValue, oldValue) {
      switch (timestamp(newValue.getTime() / 1000, 'Y年M月D日')) {
        case timestamp(new Date().getTime() / 1000, 'Y年M月D日'):
          this.date_button = '今日'
          // 非选中状态下的时间组件的样式
          time_inactive('#dateValue01')
          time_inactive('#dateValue02')
          time_inactive('#dateValue03')
          // 非选中状态下的时间组件的样式

          break
        case timestamp(
          (new Date().getTime() - 24 * 60 * 60 * 1000) / 1000,
          'Y年M月D日'
        ):
          this.date_button = '昨日'
          // 非选中状态下的时间组件的样式
          time_inactive('#dateValue01')
          time_inactive('#dateValue02')
          time_inactive('#dateValue03')
          // 非选中状态下的时间组件的样式
          break
        default:
          this.date_button = ''
          // 选中状态下的时间组件的样式
          time_active('#dateValue01')
          time_active('#dateValue02')
          time_active('#dateValue03')
          // 选中状态下的时间组件的样式

          break
      }
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      // console.log('当前国家发生变化，重新请求数据...')
      this.get_data_for_top_table()
      // alert('dateValue')
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
      if (newValue != '') {
        time_inactive('#dateValue04')
      }
      this.get_data_dialog()
    })
    this.$watch('time_dialog', function(newValue, oldValue) {
      if (newValue != '') {
        this.radio02_dialog = ''
        time_active('#dateValue04')
      }
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
        var int = Math.round(scrollTop + windowHeight)
        // 这个if是让柱状图固定到某一个位置
        if (scrollTop > 340) {
          that.position_fixed = true
        } else {
          that.position_fixed = false
        }
        if (
          int == scrollHeight ||
          int + 1 == scrollHeight ||
          int - 1 == scrollHeight
        ) {
          if (that.can_execute_scorll) {
            document.documentElement.scrollTop =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight -
              1
            // 需要执行的代码
            if (that.activeName == 'first') {
              that.get_data_12()
              // console.log('yes12')
            } else if (that.activeName == 'second') {
              that.get_data_11()
              // console.log('yes11')
            } else if (that.activeName == 'third') {
              that.get_data_12()
              // console.log('yes12')
              that.get_data_11()
              // console.log('yes11')
            }
          }
        }
      }
    })
  },
  methods: {
    dateValue04_click() {
      if (this.time_dialog) {
        time_active('#dateValue04')
        this.radio02_dialog = ''
        this.get_data_dialog()
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

    // 控制时间组件旋转

    // =============================顶部table============================
    // =============================顶部table============================
    // =============================顶部table============================
    get_data_for_top_table() {
      this.loading_first = true
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
          let word = this.$store.state.now_app_name.trim()
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
              if (response.data.Code == 1) {
                this.data_for_top_table = false
              }
              if (response.data.Code == 0) {
                this.data_for_top_table = response.data.Data
                // console.log(8888888888888888)
                // console.log(this.data_for_top_table)
                this.$nextTick(() => {
                  switch (this.activeName) {
                    case 'first':
                      if (
                        parseInt(
                          window
                            .getComputedStyle(
                              document.getElementById(
                                'data_for_top_table_keyword01'
                              ),
                              null
                            )
                            .getPropertyValue('height')
                        ) >= 40
                      ) {
                        // 两行
                        this.see_more = true
                        this.see_more01 = false
                      } else {
                        // 一行
                        this.see_more = false
                        this.see_more01 = true
                      }
                      break
                    case 'second':
                      if (
                        parseInt(
                          window
                            .getComputedStyle(
                              document.getElementById(
                                'data_for_top_table_keyword02'
                              ),
                              null
                            )
                            .getPropertyValue('height')
                        ) >= 40
                      ) {
                        // 两行
                        this.another_see_more = true
                        this.another_see_more01 = false
                      } else {
                        // 一行
                        this.another_see_more = false
                        this.another_see_more01 = true
                      }
                      break
                    default:
                      break
                  }
                })
              }
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
              this.loading_first = false
              if (response.data.Code == 1) {
                this.data_for_top_table02 = false
              }
              if (response.data.Code == 0) {
                // console.log('this.data_for_top_table')
                // console.log(response.data.Data)
                this.data_for_top_table02 = response.data.Data
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
    // =============================tab可切换部分============================
    // =============================tab可切换部分============================
    // =============================tab可切换部分============================
    // 请求数据  ios12 ios12 ios12
    get_data_12() {
      this.can_execute_scorll = false
      this.loading_12 = true
      this.it_is_over_12 = false
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
          let word = this.$store.state.now_app_name.trim()
          let that = this
          let url = '/Word/FindSearch'
          let data = {
            deviceType: deviceType,
            countryId: country_id,
            word: word,
            time: time,
            iosType: 12,
            page: that.page12
          }
          // console.log(url)
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              // console.log(data)
              // console.log(response)
              this.loading_12 = false
              this.can_execute_scorll = true //是否可以执行滚动
              if (response.data.Code == 1) {
                this.it_is_over_12 = true
                return false
              }
              if (is_excute_function == this.db_number_is_same12) {
                this.SearchDate_12 = response.data.SearchDate
                this.response_data_for_ios12 = this.response_data_for_ios12.concat(
                  response.data.AppInfoList
                )
                this.page12 += 1
                // if (response.data.AppInfoList > 0) {
                this.it_is_over_12 =
                  response.data.AppInfoList.length < 10 &&
                  response.data.AppInfoList.length >= 0
              }
              // console.log(this.it_is_over_12)
              // console.log(response.data.AppInfoList)
              // console.log(this.response_data_for_ios12)
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
      this.loading_11 = true
      this.can_execute_scorll = false //是否可以执行滚动
      this.it_is_over_11 = false
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
          let word = this.$store.state.now_app_name.trim()
          let that = this
          let url = '/Word/FindSearch'
          let data = {
            deviceType: deviceType,
            countryId: country_id,
            word: word,
            time: time,
            iosType: 11,
            page: that.page11
          }
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              // console.log(data)
              // console.log(response)
              this.loading_11 = false
              this.can_execute_scorll = true //是否可以执行滚动
              if (response.data.Code == 1) {
                this.it_is_over_11 = true
                return false
              }
              if (is_excute_function == this.db_number_is_same11) {
                this.SearchDate_11 = response.data.SearchDate
                this.response_data_for_ios11 = this.response_data_for_ios11.concat(
                  response.data.AppInfoList
                )
                this.page11 += 1
                this.it_is_over_11 =
                  response.data.AppInfoList.length < 10 &&
                  response.data.AppInfoList.length >= 0
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
          let word = this.$store.state.now_app_name.trim()
          let url =
            '/Word/FindSearchRate?' +
            '&deviceType=' +
            deviceType +
            '&countryId=' +
            country_id +
            '&type=' +
            type +
            '&word=' +
            encodeURIComponent(word)
          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              // console.log(response)
              this.keyword_data01 = new Array()
              this.keyword_data_value01 = new Array()
              this.xAxis_data01 = new Array()
              this.keyword_data_value01.push(response.data.Yvalue)
              this.xAxis_data01 = response.data.Xvalue
              this.keyword_data01.push('搜索结果变化率')
              // console.log(this.keyword_data_value01[0])
              if (this.now_country == '中国') {
                this.drawLine12()
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
    drawLine12: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      // console.log(this.$refs.myChart_result12)
      if (!this.$refs.myChart_result12) {
        return false
      }

      let myChart = this.$echarts.init(this.$refs.myChart_result12)
      // 绘制图表
      myChart.setOption(
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
                  <td>${element.value == 0.0 ? '--' : element.value + '%'}</td>
                  </tr>`
              })
              let str = `<p>${timestamp(
                new Date(data[0].axisValue + ':00:00').getTime() / 1000,
                'Y年M月D日 h点'
              )}</p><table><tbody>${tr}</tbody></table>`
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
            data: that.keyword_data01,
            y: 'bottom',
            textStyle: {
              fontSize: 13,
              padding: [3, 0, 0, 0]
            },
            itemWidth: 12,
            itemHeight: 12,
            icon: 'rect'
          },
          grid: {
            top: '2%',
            left: '14%',
            right: '5%',
            bottom: '20%'
          },
          xAxis: {
            axisLine: {
              show: true,
              onZero: false,
              lineStyle: {
                color: '#d6d6d6'
              }
            },
            axisLabel: {
              color: '#222',
              formatter: function(value, index) {
                return value.slice(-5).replace(' ', '日') + '点'
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
            data: that.xAxis_data01
          },
          yAxis: {
            //设置Y轴百分比显示
            axisLabel: {
              color: '#222',
              show: true,
              interval: 'auto',
              formatter: '{value} %'
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
            max: function(value) {
              let max_value = value.max
              if (max_value < 10) {
                that.column_max = 10
              } else if (max_value < 20) {
                that.column_max = 20
              } else if (max_value < 50) {
                that.column_max = 50
              } else if (max_value < 100) {
                that.column_max = 100
              } else if (max_value < 200) {
                that.column_max = 200
              } else if (max_value < 300) {
                that.column_max = 300
              } else if (max_value < 400) {
                that.column_max = 400
              } else if (max_value < 500) {
                that.column_max = 500
              } else if (max_value < 600) {
                that.column_max = 600
              } else if (max_value < 700) {
                that.column_max = 700
              } else if (max_value < 800) {
                that.column_max = 800
              } else if (max_value < 900) {
                that.column_max = 900
              } else if (max_value < 1000) {
                that.column_max = 1000
              } else if (max_value < 2000) {
                that.column_max = 2000
              }
              return that.column_max
            },
            min: 0
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
      this.db_number_is_same++
      let is_excute_function = this.db_number_is_same
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.myChart_result_dialog)
      this.myChart.showLoading({
        text: '',
        color: '#D3D3D3'
      })
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
          let sdate, edate
          switch (this.radio02_dialog) {
            case '':
              sdate = formatDate(this.time_dialog[0], 'yyyy-MM-dd')
              edate = formatDate(this.time_dialog[1], 'yyyy-MM-dd')
              break
            case '近24小时':
              edate = formatDate(new Date(), 'yyyy-MM-dd')
              sdate = formatDate(new Date(), 'yyyy-MM-dd')
              break
            case '7天':
              edate = formatDate(new Date(), 'yyyy-MM-dd')
              let time02 = new Date()
              time02.setTime(time02.getTime() - 24 * 60 * 60 * 1000 * 7)
              sdate = formatDate(time02, 'yyyy-MM-dd')
              break
            case '30天':
              edate = formatDate(new Date(), 'yyyy-MM-dd')
              let time03 = new Date()
              time03.setTime(time03.getTime() - 24 * 60 * 60 * 1000 * 30)
              sdate = formatDate(time03, 'yyyy-MM-dd')
              break
            case '昨日':
              let time04 = new Date()
              time04.setTime(time04.getTime() - 24 * 60 * 60 * 1000 * 1)
              sdate = formatDate(time04, 'yyyy-MM-dd')
              edate = sdate
              break
            default:
              break
          }

          let showType
          if (this.radio01_dialog == '按分钟') {
            showType = 2
          } else if (this.radio01_dialog == '按小时') {
            showType = 0
          } else if (this.radio01_dialog == '按天') {
            showType = 1
          }
          let appid = this.appid
          let wordid = this.WordId
          let rankId = this.rankId
          let iosType
          if (this.activeName == 'first') {
            iosType = 12
          } else if (this.activeName == 'second') {
            iosType = 11
          } else if (this.activeName == 'third') {
            iosType = this.dialog_iosType
          }
          let url = '/Word/FindHistory'
          let that = this
          let data = {
            page: 1,
            deviceType: deviceType,
            countryId: country_id,
            word: that.$store.state.now_app_name,
            wordid: wordid,
            edate: edate,
            sdate: sdate,
            appid: appid,
            day: showType,
            iosType: iosType,
            rankid: rankId
          }
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              if (is_excute_function == this.db_number_is_same) {
                // console.log(response)
                if (response.data.Code == 0) {
                  this.no_data = false
                  this.response_data_for_dialog = response.data
                  // console.log(this.response_data_for_dialog)
                  this.keyword_data = new Array()
                  this.keyword_data_value = new Array()
                  this.xAxis_data = new Array()
                  this.keyword_data_value.push(
                    this.response_data_for_dialog.Yvalue
                  )
                  this.xAxis_data = this.response_data_for_dialog.Xvalue
                  this.keyword_data.push(this.word)
                  // console.log(this.xAxis_data)
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
                  this.myChart.hideLoading()
                } else {
                  this.no_data = true
                }
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
    show_dialog(word, appid, WordId, rankId) {
      //  radio01_dialog: '按小时',
      // radio02_dialog: '近24小时',
      // time_dialog: '',
      this.radio01_dialog = '按小时'
      this.radio02_dialog = '近24小时'
      this.time_dialog = ''
      this.dialogVisible = true
      this.word = word
      this.appid = appid
      this.WordId = WordId
      this.rankId = rankId
      // alert(this.WordId)
      this.is_show_myChart_and_table = true
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
            left: '3%',
            right: '2%',
            bottom: '20%',
            top: '20%'
          },
          toolbox: {
            feature: {
              saveAsImage: {
                title: '保存',
                iconStyle: {
                  opacity: 1,
                  borderWidth: 1.7,
                  borderColor: '#444'
                },
                emphasis: {
                  iconStyle: {
                    opacity: 1,
                    borderWidth: 1.7,
                    borderColor: '#009bef'
                  }
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
                  return '　　' + value.slice(-3) + '　　'
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
    // 点击单选按钮组件组件

    // 点击日历组件
    // click_second_el_date_picker: function() {
    //   this.radio02_dialog = ''
    // },
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
    replace_some_chart_wrap(parm) {
      return replace_some_chart(parm)
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
    },
    go_to_page01(parm) {
      // this.get_data_12()
      // this.get_data_11()
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
      this.response_data_for_ios11.length = 0
      this.response_data_for_ios12.length = 0
      this.page11 = 1
      this.page12 = 1
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_name = parm
      this.$router.push({
        path: '/result'
      })
      this.get_data_12()
      this.get_data_11()
      this.get_data_column()
    },
    go_to_page05(parm, parm02) {
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_id = parm
      this.hand_save_vuex(this)
      let routerUrl = this.$router.resolve({
        path:
          '/now_ranking?now_country_name=' +
          this.$store.state.now_country_name +
          '&now_app_id=' +
          this.$store.state.now_app_id
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
.keywordContentTable_width01 {
  width: 300px !important;
}
.keywordContentTable_width02 {
  width: 300px !important;
}
.keywordContentTable_width03 {
  width: 300px !important;
}
.keywordContentTable_width04 {
  width: 300px !important;
}
.fitst_left {
  width: 878px !important;
}
.position_fixed {
  position: fixed;
  margin-left: 878px;
  margin-top: -340px;
  background-color: #fff;
}
.font_size_15 {
  font-size: 15px !important;
}
.active_line:hover {
  text-decoration: underline;
}
.arrowsImg_0 {
  width: 5px;
  height: 11px;
}
.arrowsImg {
  width: 11px;
  height: 5px;
}
.img_width {
  width: 15px;
  height: 14px;
}

.my_dialog tbody tr {
  border-bottom: solid 1px #f2f2f2;
}
.my_dialog tbody {
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
.my_dialog table {
  border: solid 1px #eaeaea;
  table-layout: fixed;
  text-align: center;
  width: 900px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 45px;
}

.my_dialog .bottom_image img {
  margin-left: 10px;
  width: 17px;
  height: 16px;
}
.my_dialog .bottom_image {
  float: right;
  position: absolute;
  top: 81px;
  right: 74px;
}

.same div:first-child {
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #009bef;
}
.same div:last-child {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
}
.same {
  width: auto !important;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.keywordContentTable {
  position: relative;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #d6d6d6;
  margin-bottom: 40px;
}
.keywordContentTable > div:nth-child(4) span {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 25px;
  letter-spacing: 0px;
  margin-right: 14px;
}
.keywordContentTable > div:nth-child(4) {
  width: 330px;
  height: 50px;
  margin-left: 60px;

  overflow: hidden;
  word-break: break-all;
  color: #009bef;
}
.keywordContentTable > div:nth-child(3) > div:first-child {
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #009bef;
}
.keywordContentTable > div:nth-child(3) > div:last-child {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
}
.keywordContentTable > div:nth-child(3) {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  border-right: 1px solid #d6d6d6;
}
.keywordContentTable > div:nth-child(2) > div:first-child {
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #009bef;
}
.keywordContentTable > div:nth-child(2) > div:last-child {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
}
.keywordContentTable > div:nth-child(2) {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  border-right: 1px solid #d6d6d6;
}
.keywordContentTable > div:nth-child(1) > div:first-child {
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  height: 30px;
  letter-spacing: 0px;
  color: #009bef;
  max-width: 180px;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.keywordContentTable > div:nth-child(1) > div:last-child {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
}
.keywordContentTable > div:nth-child(1) {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #d6d6d6;
  width: 300px;
}
.keywordContentTable img {
  width: 15px;
  height: 14px;
  vertical-align: 1px;
}
.another_see_more01 {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 54px;
  right: 43px;
}
.another_see_more {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 54px;
  right: 43px;
}
.see_more01 {
  display: block;
  background-color: #ffffff !important;
  position: absolute;
  top: 54px;
  right: 43px;
}
.see_more {
  display: block;
  background-color: #ffffff !important;
  position: absolute;
  top: 54px;
  right: 43px;
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

.data_for_top_table_span {
  width: 524px;
  padding: 0 66px;
}
.data_for_top_table_span span {
  margin-left: 13px;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #009bef;
}
.app_name:hover {
  color: #009bef;
}
.app_name {
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #222222;
}

.new_add_field {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 12px;
  letter-spacing: 0px;
  color: #888888;
}
.app_subtitle {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 12px;
  letter-spacing: 0px;
  color: #888888;
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
  top: -15px;
  right: -30px;
  width: 23px;
  height: 23px;
}
.footer__dialog > img {
  margin-right: 7px;
  vertical-align: -2px;
  margin-left: 20px;
  width: 15px;
}

.footer__dialog {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  margin-top: -22px;
}
.bottom_time {
  margin-left: 40px !important;
}
.btn_group {
  display: flex;
  align-items: center;
  margin-top: 30px;
  position: relative;
  width: 80%;
  z-index: 9999;
}
.classify > div:nth-child(2) {
  margin-left: 10px;
  margin-right: 10px;
}
.classify > div:nth-child(3) {
  width: 89px;
}
.classify {
  font-weight: 600 !important;
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
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 37px;
  padding-right: 37px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.myChart_dialog {
  width: 986px;
  height: 350px;
  margin: 0 auto;
  text-align: center;
  color: #bfbfbf;
  margin-top: -30px;
  line-height: 350px;
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
.third_div_padding {
  padding: 8px 0;
}
.third_div {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 60px;
  box-sizing: border-box;
}
.third_div > div {
  width: 145px !important;
  text-align: left !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 12px;
}
.first_div {
  width: 50px;
  text-align: center;
}

.myChart {
  width: 300px;
  height: 350px;
  text-align: center;
  color: #bfbfbf;
  line-height: 300px;
  font-size: 25px;
}
.flex-row {
  display: flex;
}
.compare_iOS > div:first-child span:first-child {
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #009bef;
}
.compare_iOS > div:first-child span:last-child {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #888888;
  vertical-align: 2px;
}
.compare_iOS > div:first-child {
  width: 100%;
  line-height: 68px;
  border: solid 1px #d6d6d6;
  border-bottom: none;
  padding-left: 46px;
  box-sizing: border-box;
}
.compare_iOS {
  width: 100%;
}
.right_btn div:first-child {
  padding-left: 7px;
}
.right_btn {
  margin: 21px 0;
}

.right_title {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #429ae8;
  padding-left: 11px;
  line-height: 16px;
}
.left {
  width: 100%;
}
.right {
  width: 340px;
  padding-left: 22px;
}
.left_and_right {
  display: flex;
  position: relative;
}
.rankingChangeFontColor {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #888888;
  margin-top: 5px;
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
  width: 52px;
  height: 52px;
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
  border-bottom: 1px solid #eaeaea;
}
td {
  padding: 12px 0;
}
.tabsContentTable tbody {
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
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.tabsContentTable table {
  width: 100%;
  height: 121px;
  border: solid 1px #eaeaea;
  text-align: center;
}
.flex-row .tabsContentTable:first-child {
  margin-right: 22px;
}
.tabs {
  margin-top: 30px;
}

.option > div:first-child {
  font-weight: 600 !important;
  margin-right: 12px;
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
.option {
  margin-right: 29px;
}

.margin_top_font {
  margin-top: 4px;
}
.options {
  margin: 24px 0;
  margin-top: 9px;
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
.result_title_line {
  height: 1px;
  width: 1200px;
  margin-bottom: 25px;
  background: #eaeaea;
}
.result_title {
  font-weight: 600 !important;
  height: 18px;
  line-height: 18px;
  font-size: 16px;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #429ae8;
  margin-bottom: 17px;
}
.content {
  width: 1200px;
  margin: 0 auto;
}

.th_width {
  width: 233px;
}
.th_width_555 {
  width: 170px;
}
.margin_left {
  text-align: left !important;
  margin-left: 400px !important;
}
.it_is_over {
  text-align: center;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 74px;
  letter-spacing: 0px;
  color: #bfbfbf;
  margin-bottom: -30px;
}
.loading {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.loading > img {
  width: 50px;
  height: 50px;
}
#result {
  margin-bottom: 30px;
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
.my_el_radio_group {
  margin-top: -3px;
  margin-right: 9px;
}
</style>
