<template>
  <div id="apple_history">
    <div class="content">
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
                <th v-show="false">排名</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="no_data_img">
                <td colspan="4">
                  <div class="no_data_img">
                    <img src="../assets/ios/null.png" alt />
                    <div>暂无相关数据</div>
                    <div>&nbsp;</div>
                    <div v-show="now_country!='中国'">该模块仅对中国地区开发</div>
                  </div>
                </td>
              </tr>
              <tr v-for="(item,index) in response_data" :key="'apple_history'+index">
                <td>{{item.Genre}}</td>
                <td>{{item.Name}}</td>
                <td class>{{item.Stime+'至'+item.Etime}}</td>
                <td class="td_width04" v-show="false">{{item.GenreId}}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
      response_data: null,
      no_data_img: false
    }
  },
  created: function() {
    this.get_data()
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data()
    })
  },
  methods: {
    // 请求数据
    get_data() {
      if (this.now_country != '中国') {
        this.no_data_img = true
        this.response_data = new Array()
        return false
      }
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
            'api/featuredrecord?countryId=' + country_id + '&appId=' + appId

          // console.log(url)
          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              console.log(55555555555555555)
              console.log(response)

              if (response.data.Code == 0) {
                this.response_data = response.data.Data
                this.no_data_img = false
              } else {
                this.no_data_img = true
              }
              if (response.data.Data.length == 0) {
                this.no_data_img = true
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

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    }
  }
}
</script>
<style scoped>
.td_width04 {
  width: 176px;
}
.td_width03 {
  width: 360px;
}
tbody tr {
  height: 60px;
  border-bottom: 1px solid #f2f2f2;

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
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
}
thead {
  width: 1200px;
  background-color: #f7f7f7;
  font-weight: 600 !important;
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
  width: 100%;
  background-color: #fff;
  margin-left: 14px;
  padding: 25px 20px;
  padding-bottom: 0;
  box-sizing: border-box;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
}
.right_nav {
  font-weight: 600 !important;
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
  margin-top: 14px;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
.no_data_img:hover {
  background-color: #fff;
}
.no_data_img img {
  width: 210px;
  margin-top: 153px;
}

.no_data_img {
  width: 100%;
  height: 556px;
  display: flex;
  align-items: center;
  flex-direction: column;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 13px;
  letter-spacing: 0px;
  color: #555555;
}
#apple_history {
  background-color: #f4f4f4;
  padding-bottom: 50px;
}.left {
  width: 231px;
  min-height: 621px;
}
</style>
