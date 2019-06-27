<template>
  <div id="result" class="content">
    <div class="title">实时热搜</div>
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
          <el-select v-model="countryValue">
            <el-option v-for="item in  country " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_03 option">
        <div>日期</div>
        <div class="date">
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" clear-icon></el-date-picker>
        </div>
        <div class="font_block">昨日</div>
        <div class="font_block">本周</div>
      </div>
      <div class="options_04 option">
        <div>搜索</div>
        <div class="search">
          <el-input v-model="search_input" placeholder="请输入搜索关键词"></el-input>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>更新时间</th>
          <th>热门搜索关键词</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="table_font">
              <div>2019-02-20 12:56</div>
              <div>--</div>
              <div>2019-02-20 12:56</div>
            </div>
          </td>
          <td>
            <div class="table_font">
              <div>王者</div>
              <div>都应</div>
              <div>都应</div>
              <div>都应</div>
              <div>阿斯顿居</div>
              <div>阿斯顿发生的</div>
              <div>阿斯蒂芬</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'result',
  data() {
    return {
      // 请输入搜索关键词
      search_input: '',
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
  },
  methods: {}
}
</script>
<style scoped>
thead tr {
  height: 40px;
}
td,
th {
  border: 1px solid #f2f2f2;
}
.table_font {
  display: flex;
  justify-content: space-around;
}
tbody > tr > td:first-child {
  width: 325px;
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
.font_block {
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
.options_04 .search div {
  width: 145px !important;
}
.options_03 .date div {
  width: 114px !important;
}
.option div:first-child {
  margin-right: 15px;
}
.option div:last-child {
  width: 72px;
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
