<template>
  <div id="think_word" class="content">
    <div class="title">「网易云音乐」关键词搜索联想词</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div>日期</div>
        <div class="days">7天</div>
        <div>
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" clear-icon></el-date-picker>
        </div>
      </div>
      <div class="options_02 option">
        <div>系统</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-select v-model="equipmentValue">
            <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_03 option">
        <div>搜索</div>
        <div>
          <!-- 饿了么的input组件 -->
          <el-input v-model="input" placeholder="请输入关键词查询联想词"></el-input>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>2019-04-11</th>
          <th>2019-04-11</th>
          <th>2019-04-11</th>
          <th>2019-04-11</th>
          <th>2019-04-11</th>
          <th>2019-04-11</th>
          <th>2019-04-11</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td class="table_font">
            <div>抖音</div>
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>抖音</div>
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>抖音</div>
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>抖音</div>
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>抖音</div>
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>抖音</div>
            <div>123156</div>
          </td>
          <td class="table_font">
            <div>抖音</div>
            <div>123156</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'think_word',
  data() {
    return {
      //options 下面的input
      input: '',
      // 系统选择
      equipment: [
        {
          value: '安卓'
        },
        {
          value: 'iOS'
        }
      ],
      equipmentValue: '安卓',

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
.table_font div:first-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  line-height: 20px;
}
.table_font div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  line-height: 20px;
  color: #888888;
}
thead tr {
  height: 40px;
}
td,
th {
  border: 1px solid #f2f2f2;
}
tbody tr td:first-child {
  width: 59px;
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
.option .days {
  width: 48px;
  line-height: 22px;
  height: 22px;
  background-color: #f2f2f2;
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
  margin-right: 9px;
}
.options_01 div:last-child {
  width: 114px !important;
}
.options_03 div:last-child {
  width: 200px !important;
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
}
.content {
  width: 1200px;
  margin: 0 auto;
}
</style>
