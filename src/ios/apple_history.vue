<template>
  <div id="apple_history" class="content">
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <div class="right_nav">苹果历史推荐</div>
        <div class="line"></div>

        <table>
          <thead>
            <tr>
              <th>推荐位置</th>
              <th>推荐主题</th>
              <th>开始/结束时间</th>
              <th>排名</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>asdfasd</td>
              <td>asdfasdf</td>
              <td>asdfasdfasdfasdfasdf</td>
              <td>asdfasdf</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'apple_history',
  components: { ios_header, left_nav },
  data() {
    return {
      now_country: '中国',
      response_data: null
    }
  },
  created: function() {
    // this.get_data()
    this.$watch('now_country', function(newValue, oldValue) {
      // this.get_data()
    })
  },
  methods: {
    // 请求数据
    get_data() {
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
          // console.log(country_id)
          let appId = this.$store.state.now_app_id
          let url =
            '/GetSameDevApps?countryId=' +
            country_id +
            '&deviceType=1' +
            '&appId=' +
            appId
          // &appId=291322250
          console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data = response.data.Data
              console.log(55555555555555555)
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
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
tbody tr {
  height: 60px;
  border-bottom: 1px solid #f2f2f2;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
}
thead tr {
  height: 40px;
}
tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
}
thead {
  width: 1200px;
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
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-bottom: 50px;
}
.right {
  padding-left: 57px;
  position: relative;
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
