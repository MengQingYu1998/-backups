 <template>
  <div id="ranking" class="content">
    <div class="title">搜索指数排名</div>
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
        <div>国家/地区</div>
        <div>
          <!-- 选择国家 -->
          <country @childFn="parentFn"></country>
        </div>
      </div>
      <div class="options_04 option">
        <div>类别</div>
        <!-- 选择总榜 -->
        <div>
          <div
            :class=" {'change_bg':change_bg_all,'radio_one':true}"
            @click="change_all_dateValue()"
          >总榜</div>
        </div>
        <!-- 选择应用 -->
        <el-popover placement="bottom" trigger="click" width="168">
          <div class="selected_popover">
            <div v-for="(item,index) in data_for_classify" :key="'classify'+index">{{item.name}}</div>
          </div>
          <div slot="reference">
            <div
              :class=" {'change_bg':change_bg_app,'radio_one':true}"
              @click="change_app_dateValue()"
            >
              应用
              <img src="../assets/keyword/arrows_down.png" alt v-show="!change_bg_app" />
              <img src="../assets/keyword/white_arrows_up.png" alt v-show="false" />
              <img src="../assets/keyword/white_arrows_down.png" alt v-show="change_bg_app" />
            </div>
          </div>
        </el-popover>
        <!-- 选择游戏 -->
        <el-popover placement="bottom" trigger="click">
          <div class="selected_popover">
            <div v-for="(item,index) in data_for_classify" :key="'classify'+index">{{item.name}}</div>
          </div>
          <div slot="reference">
            <div
              :class=" {'change_bg':change_bg_game,'radio_one':true}"
              @click="change_game_dateValue()"
            >
              游戏
              <img src="../assets/keyword/arrows_down.png" alt v-show="!change_bg_game" />
              <img src="../assets/keyword/white_arrows_up.png" alt v-show="false" />
              <img src="../assets/keyword/white_arrows_down.png" alt v-show="change_bg_game" />
            </div>
          </div>
        </el-popover>
      </div>
      <div class="options_03 option">
        <div>日期</div>
        <div class="date">
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker
            v-model="dateValue"
            type="date"
            placeholder="选择日期"
            clear-icon
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <div class="options">
      <div class="options_01 option">
        <div>搜索结果数</div>
        <div
          :class=" {'change_bg':change_bg_result,'radio_one':true,'change_something':true}"
          @click="result_all()"
        >全部</div>
        <div class="min_max" @click="change_bg_result_function">
          <div>
            <el-input v-model="result_min_input" placeholder="最小值" type="number" @blur="blur"></el-input>
          </div>
          <div>---</div>
          <div>
            <el-input v-model="result_max_input" placeholder="最大值" type="number" @blur="blur"></el-input>
          </div>
        </div>
      </div>
      <div class="options_02 option">
        <div>搜索指数</div>
        <div :class=" {'change_bg':change_bg_index_all,'radio_one':true }" @click="index_all()">全部</div>
        <div
          :class=" {'change_bg':change_bg_index_number,'radio_one':true,'change_something':true}"
          @click="index_number()"
        >>4605</div>
        <div class="min_max" @click="change_bg_index_function">
          <div>
            <el-input v-model="index_min_input" placeholder="最小值" type="number" @blur="blur"></el-input>
          </div>
          <div>---</div>
          <div>
            <el-input v-model="index_max_input" placeholder="最大值" type="number" @blur="blur"></el-input>
          </div>
        </div>
      </div>
      <div class="options_03 option">
        <div>搜索</div>
        <div class="keyword_input">
          <el-input v-model="keyword_input" placeholder="请输入搜索关键词" @blur="blur"></el-input>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>排名</th>
          <th>关键词</th>
          <th>搜索指数</th>
          <th>搜索结果数</th>
          <th>搜索结果排名第 1 的应用</th>
        </tr>
      </thead>
    </table>
    <div class="act_not">
      <table>
        <!-- <thead>
          <tr>
            <th>排名</th>
            <th>关键词</th>
            <th>搜索指数</th>
            <th>搜索结果数</th>
            <th>搜索结果排名第 1 的应用</th>
          </tr>
        </thead>-->
        <tbody v-if="data_for_table">
          <tr v-for="(item ,index) in data_for_table" :key="'table'+index">
            <td>
              <div>{{item.rowid}}</div>
            </td>
            <td class="table_font pointer">
              <div @click="$router.push('/result')">{{item.Word}}</div>
            </td>
            <td class="table_font pointer">
              <div @click="$router.push('/trend_many')">{{item.WordIdHint}}</div>
            </td>
            <!-- 给下一个页面传递参数 -->
            <td
              class="table_font pointer"
              @click="$router.push({path: '/trend_one?Word=' + item.Word+'&WordId=' + item.WordId});"
            >
              <div>{{item.SearchCount}}</div>
            </td>
            <td class="table_font pointer">
              <div @click="$router.push('/now_ranking')">{{item.app_name}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'
// 引入工具类
import { formatDate } from '../common/util.js'
export default {
  name: 'ranking',
  components: { country },
  data() {
    return {
      // 请求分页
      page: 1,
      // 请求的分类数据
      data_for_classify: null,
      // 请求的表格数据
      data_for_table: [],
      //以下几个变量模仿单选框
      change_bg_index_all: true,
      change_bg_index_number: false,
      change_bg_all: true,
      change_bg_app: false,
      change_bg_game: false,
      change_bg_result: true,
      change_bg_index: true,
      // 获取当前选中的国家
      now_country: '中国',
      //请输入搜索关键词
      keyword_input: '',
      // 搜索结果数最小值和最大值
      result_min_input: '',
      result_max_input: '',
      // 搜索指数最小值和最大值
      index_min_input: '',
      index_max_input: '',
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

      //日期选择
      dateValue: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      }
    }
  },
  created: function() {
    // 请求悬浮框的数据
    this.get_data_classify()
    this.get_data_table()
    // this.$watch('page', function(newValue, oldValue) {
    //   this.get_data_classify()
    //   this.get_data_table()
    // })
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.get_data_classify()
      this.data_for_table.length = 0
      this.page = 1
      this.get_data_table()
    })
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data_classify()
      this.data_for_table.length = 0
      this.page = 1
      this.get_data_table()
    })
    // this.$watch('index_min_input', function(newValue, oldValue) {
    //   this.get_data_classify()
    //   this.data_for_table.length = 0
    //   this.page = 1
    //   this.get_data_table()
    // })
    // this.$watch('index_max_input', function(newValue, oldValue) {
    //   this.get_data_classify()
    //   this.data_for_table.length = 0
    //   this.page = 1
    //   this.get_data_table()
    // })
    // this.$watch('result_min_input', function(newValue, oldValue) {
    //   this.get_data_classify()
    //   this.page = 1
    //   this.data_for_table.length = 0
    //   this.get_data_table()
    // })
    // this.$watch('result_max_input', function(newValue, oldValue) {
    //   this.get_data_classify()
    //   this.data_for_table.length = 0
    //   this.page = 1
    //   this.get_data_table()
    // })
    // this.$watch('keyword_input', function(newValue, oldValue) {
    //   this.get_data_classify()
    //   this.get_data_table()
    // })
    this.$watch('dateValue', function(newValue, oldValue) {
      this.get_data_classify()
      this.data_for_table.length = 0
      this.page = 1
      this.get_data_table()
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
        // console.log('===========================')
        // console.log(scrollTop)
        // console.log(windowHeight)
        // console.log(scrollHeight)
        // console.log('===========================')
        if (scrollTop + windowHeight == scrollHeight) {
          // 需要执行的代码
          that.page += 1
          that.get_data_table()
          console.log('yes')
        }
      }
    })
  },
  methods: {
    // 请求悬浮框的数据
    get_data_classify() {
      let genreID
      if (this.change_bg_all) {
        genreID = 36
      } else if (this.change_bg_app) {
        genreID = 5000
      } else if (this.change_bg_game) {
        genreID = 6014
      }
      // console.log(genreID)
      let url = 'http://39.97.234.11:8080/GetGenre?genreID=' + genreID
      // console.log(url)
      // 请求数据
      this.$axios
        .get(url)
        .then(response => {
          this.data_for_classify = response.data.Data

          // console.log(this.data_for_classify)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 请求表格数据
    get_data_table() {
      this.$axios
        .get('http://39.97.234.11:8080/GetCountry')
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
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let url =
            'http://39.97.234.11:8080/Word/FindWordRank?&page=' +
            this.page +
            '&deviceType=' +
            deviceType +
            '&countryId=' +
            country_id +
            '&minHint=' +
            this.index_min_input +
            '&maxHint=' +
            this.index_max_input +
            '&minResult=' +
            this.result_min_input +
            '&maxResult=' +
            this.result_max_input +
            '&word=' +
            this.keyword_input +
            '&time=' +
            formatDate(this.dateValue, 'yyyy-MM-dd')
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              console.log(this.data_for_table)
              console.log(response.data.Data)
              // let json01 = JSON.stringify(this.data_for_table)
              // let json02 = JSON.stringify(response.data.Data)
              // console.log(json01)
              // console.log(json02.slice(1, json02.length - 1))

              // console.log(
              //   json01.indexOf(json02.slice(1, json02.length - 1)) != -1
              // ) //包含

              // if (response.data.Data != null) {
              //   if (json01.indexOf(json02.slice(1, json02.length - 1)) == -1) {
              this.data_for_table = this.data_for_table.concat(
                response.data.Data
              )
              // } else {
              // this.data_for_table = response.data.Data
              // }
              console.log(this.data_for_table)
              // }
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 点击总榜按钮
    change_all_dateValue() {
      this.change_bg_all = true
      this.change_bg_app = false
      this.change_bg_game = false
      // 请求悬浮框的数据
      this.get_data_classify()
    },
    // 点击应用按钮
    change_app_dateValue() {
      this.change_bg_all = false
      this.change_bg_app = true
      this.change_bg_game = false
      // 请求悬浮框的数据
      this.get_data_classify()
    },
    // 点击游戏按钮
    change_game_dateValue() {
      this.change_bg_all = false
      this.change_bg_app = false
      this.change_bg_game = true
      // 请求悬浮框的数据
      this.get_data_classify()
    },
    // 点击搜索结果数的全部
    result_all() {
      this.result_min_input = ''
      this.result_max_input = ''
      this.change_bg_result = true
    },
    // 点击搜索结果数的min_mix
    change_bg_result_function() {
      this.change_bg_result = false
    },
    // 点击搜索指数的全部
    index_all() {
      this.index_min_input = ''
      this.index_max_input = ''
      this.change_bg_index_all = true
      this.change_bg_index_number = false
      this.page = 1
      this.data_for_table.length = 0
      this.get_data_table()
    },
    // 点击搜索指数的数字
    index_number() {
      this.index_min_input = '4605'
      this.index_max_input = ''
      this.change_bg_index_all = false
      this.change_bg_index_number = true
    },
    // 点击搜索指数的min_max
    change_bg_index_function() {
      this.change_bg_index_all = false
      this.change_bg_index_number = false
    },
    // 输入框失去焦点
    blur: function() {
      if (this.result_min_input == '' && this.result_max_input == '') {
        this.change_bg_result = true
      }
      if (this.index_min_input == '' && this.index_max_input == '') {
        this.change_bg_index = true
      }
      this.page = 1
      this.data_for_table.length = 0
      this.get_data_table()
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    }
  }
}
</script>
<style scoped>
thead th:nth-child(1) {
  width: 199px;
}

thead th:nth-child(2) {
  width: 223px;
}
thead th:nth-child(3) {
  width: 214px;
}
thead th:nth-child(4) {
  width: 234px;
}
thead th:nth-child(5) {
  width: 327px;
}

tbody td:nth-child(1) {
  width: 199px;
}
tbody td:nth-child(2) {
  width: 223px;
}
tbody td:nth-child(3) {
  width: 214px;
}
tbody td:nth-child(4) {
  width: 234px;
}
tbody td:nth-child(5) {
  width: 327px;
}
.min_max > div:nth-child(1) div,
.min_max > div:nth-child(3) div {
  width: 75px !important;
}
.change_something {
  margin-right: 0px !important;
}
.act_not {
  /* height: 650px;
  overflow-y: auto;
  margin-bottom: 38px; */
  margin-bottom: 38px;
}
.pointer {
  cursor: pointer;
}
.selected_popover > div {
  width: 65px;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.selected_popover {
  display: flex;
  align-items: center;
  width: 142px;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
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
  margin-right: 15px;
  margin-left: -6px;
  margin-top: 2px;
  display: inline-block;
}
.keyword_input div {
  width: 145px !important;
}
.table_font {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  padding: 35px 0;
  color: #009bef;
}

thead tr {
  height: 40px;
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
  /* position: absolute;
  left: 0;
  top: 0; */
}
table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
  /* margin-bottom: 78px; */
}
.table_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
}
.options_04 > div:nth-child(1) {
  margin-right: 20px !important;
}
.options_04 img {
  width: 8px;
}
.options_04 {
  margin-left: 70px !important;
}
.options_03 .date div {
  width: 114px !important;
}

.min_max > div:first-child {
  margin-right: 0 !important;
}
.min_max > div:nth-child(2) {
  width: 14px !important;
  margin-left: 2px;
  margin-right: 2px;
  color: #dfdfdf;
}

.options .min_max {
  margin-left: 10px;
  display: flex;
  width: auto !important;
}
.options_02 .tow {
  margin-left: 10px;
  margin-right: 0px !important;
}
.options .one {
  width: 48px !important;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
  margin-top: 2px;
}
.option > div:first-child {
  margin-right: 15px;
}
.options_01 div:last-child {
  width: 85px;
}
.options_03 div:last-child,
.options_02 div:last-child {
  width: 74px;
  height: 24px;
}
.option {
  display: flex;
  margin-left: 29px;
}
option:first-child {
  margin: 0;
}
.options .option:first-child {
  margin-left: 0 !important;
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
.title {
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
  padding-left: 9px;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
</style>
