<template>
  <div id="ios_header">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>{{this.$store.state.now_app_name}}</span>
    </div>
    <div class="wrap">
      <div class="header_img">
        <img v-if="response_data" :src="response_data.icon" alt />
      </div>
      <div class="app_description">
        <div v-if="response_data">{{response_data.appName}}</div>
        <div v-if="response_data">{{response_data.subtitle=='无'?'':response_data.subtitle}}</div>
      </div>
      <div class="app_field">
        <div>版本更新时间</div>
        <div v-if="response_data">{{time}}</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>分类</div>
        <div v-if="response_data">{{response_data.genreName}}</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>价格</div>
        <div v-if="response_data">{{response_data.price}}</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>APPID</div>
        <div>{{this.$store.state.now_app_id}}</div>
      </div>
      <div class="line"></div>
      <div class="app_field country" @mousemove="click">
        <div>国家/地区</div>
        <!-- 选择国家 -->
        <country @childFn="parentFn" :custom_country="this.$store.state.now_country_name"></country>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'
// 引入工具类
import { myTime } from '../common/util.js'
export default {
  name: 'ios_header',
  components: { country },
  data() {
    return {
      // is_show_header: true,
      now_country: '中国',
      response_data: null,
      time: ''
    }
  },

  created: function() {
    this.$store.state.now_app_name = ''
    this.get_data()
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      // alert(99999999999)
      this.click()
      this.get_data()
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

          let url =
            '/GetAppSynopsis?countryId=' +
            country_id +
            // '&appId=281736535'
            '&appId=' +
            this.$store.state.now_app_id
          // console.log(this.$store.state.now_app_id)
          // console.log(url)

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data = response.data.Data
              // console.log(22222222222222222222222)
              // console.log(this.response_data)
              this.$store.state.now_app_name = this.response_data.appName
              this.time = myTime(this.response_data.appUpdateTime)
              // this.is_show_header = false
              // this.$nextTick(() => {
              //   this.is_show_header = true
              // })
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
      // console.log('ios_header' + this.now_country)
    },
    // 把获取到的国家传递给父组件
    click: function() {
      this.$emit('childFn', this.now_country)
    }
  }
}
</script>
<style scoped>
.header_img {
  width: 68px;
}
.header_img img {
  border-radius: 10px;
  border: solid 1px #f2f2f2;

  width: 67px;
  height: 67px;
}
.country {
  height: 65px;
  width: 168px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.line {
  width: 1px;
  height: 20px;
  background-color: #f2f2f2;
  margin: 0 30px;
}
.app_field {
  padding: 0 9px;
}
.app_field div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
  /* text-align: center; */
}
.app_field div:first-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #888888;
}

.app_description div:first-child {
  font-family: SourceHanSansCN-Medium;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;

  width: 200px;
  height: 30px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.app_description div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #888888;

  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 200px;
}
.app_description {
  display: inline-block;
  margin-left: 19px;
  width: 190px;
  margin-right: 88px;
}

.wrap {
  display: flex;
  align-items: center;
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
</style>
