 <template>
  <div id="show_data_table" class="content">
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
          <el-select v-model="countryValue">
            <el-option v-for="item in  country " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_04 option">
        <div>类别</div>
        <div>
          <el-button type="primary">类别</el-button>
        </div>
        <div>
          <!-- 选择应用 -->
          <el-select v-model="appValue">
            <el-option v-for="item in  app " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
        <div>
          <!-- 选择游戏 -->
          <el-select v-model="gameValue">
            <el-option v-for="item in  game " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_03 option">
        <div>日期</div>
        <div class="date">
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" clear-icon></el-date-picker>
        </div>
      </div>
    </div>
    <div class="options">
      <div class="options_01 option">
        <div>搜索结果数</div>
        <div class="one">全部</div>
        <div class="min_max">
          <div>
            <el-input v-model="result_min_input" placeholder="最小值"></el-input>
          </div>
          <div>---</div>
          <div>
            <el-input v-model="result_max_input" placeholder="最大值"></el-input>
          </div>
        </div>
      </div>
      <div class="options_02 option">
        <div>搜索结果数</div>
        <div class="one">全部</div>
        <div class="one tow">>4545</div>
        <div class="min_max">
          <div>
            <el-input v-model="index_min_input" placeholder="最小值"></el-input>
          </div>
          <div>---</div>
          <div>
            <el-input v-model="index_max_input" placeholder="最大值"></el-input>
          </div>
        </div>
      </div>
      <div class="options_03 option">
        <div>搜索</div>
        <div class="keyword_input">
          <el-input v-model="keyword_input" placeholder="请输入搜索关键词"></el-input>
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
      <tbody>
        <tr>
          <td>
            <div>1</div>
          </td>
          <td class="table_font">
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>123156</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'show_data_table',
  data() {
    return {
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
          value: '安卓'
        },
        {
          value: 'iOS'
        }
      ],
      equipmentValue: '安卓',
      // 国家选择
      country: [
        {
          value: '中国'
        },
        {
          value: '美国'
        }
      ],
      countryValue: '中国',
      // 应用选择
      app: [
        {
          value: '应用'
        },
        {
          value: '快手'
        }
      ],
      appValue: '应用',
      // 游戏选择
      game: [
        {
          value: '游戏'
        },
        {
          value: '吃鸡'
        }
      ],
      gameValue: '游戏',
      //日期选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      dateValue: ''
    }
  }
}
</script>
<style scoped>
.keyword_input div {
  width: 145px !important;
}
.table_font {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
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
.options_04 div:nth-child(2) {
  margin-right: 10px;
}
.options_03 .date div {
  width: 114px !important;
}

.min_max > div:first-child {
  margin-right: 0 !important;
}
.min_max > div:nth-child(2) {
  width: 14px !important;
  margin-left: -12px;
  margin-right: 2px;
  color: #dfdfdf;
}

.options .min_max {
  margin-left: 10px;
  display: flex;
  width: auto !important;
}
.options_02 .tow {
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
  margin-right: 10px;
  margin-top: 2px;
}
.option div:first-child {
  margin-right: 15px;
}
.option div:last-child {
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
