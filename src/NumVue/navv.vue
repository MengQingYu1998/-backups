<template>
  <div id="navv">
    <div class="nav">
      <img src="../assets/NumImg/logo.png" class="logo pointer" @click="$router.push('index')" />
      <ul>
        <li>
          <router-link :to="{path:'/index'}">首页</router-link>
        </li>
        <li @mouseover="showAppstore()" @mouseout="hideAppstore()">
          <p v-bind:class="{up:isUp}" v-html="appVal"></p>
          <img src="../assets/NumImg/down.png" class="down" v-if="down" />
          <img src="../assets/NumImg/shang.png" class="down" v-else />
        </li>
        <li @mouseover="showAso()" @mouseout="hideAso()">
          <p v-bind:class="{up:isUpaso}" v-html="asoVal"></p>
          <img src="../assets/NumImg/down.png" class="down" v-if="downaso" />
          <img src="../assets/NumImg/shang.png" class="down" v-else />
        </li>
      </ul>
      <div class="searchDiv">
        <img src="../assets/NumImg/pingguo.png" class="ios" />

        <country @childFn="parentFn"></country>
        <el-popover
          width="270"
          placement="bottom"
          :visible-arrow="false"
          v-model="is_show_nav_popover"
          trigger="manual"
        >
          <div
            v-show="nav_input_value!=''"
            class="pointer popver_for_input"
            v-for="(item,index) in response_data"
            :key="'nav_input02'+index"
            @click="go_to_page01(item.keyword)"
          >{{item.keyword}}</div>
          <div
            v-show="nav_input_value==''"
            class="pointer popver_for_input"
            v-for="(item,index) in historyWord"
            :key="'nav_input01'+index"
            @click="go_to_page01(item)"
          >{{item}}</div>
          <input
            slot="reference"
            @focus="is_show_nav_popover=true"
            @blur="is_show_nav_popover=false"
            type="text"
            placeholder="应用名称或APPID"
            v-model="nav_input_value"
            @keyup.enter="go_to_page01(nav_input_value)"
          />
        </el-popover>

        <p @click="go_to_page01(nav_input_value)" class="pointer">
          <img src="../assets/NumImg/search.png" />
        </p>
      </div>
      <!-- 未登录 -->
      <div v-if="unlogin">
        <div class="denglu">
          <router-link :to="{ path: '/login'}">登录</router-link>
        </div>
        <div class="zhuce">
          <router-link :to="{ path: '/register'}">注册</router-link>
        </div>
      </div>
      <!-- 登录 -->
      <div class="ldiv" v-else @mouseover="showMine()" @mouseout="hideMine()">
        <img :src="touxiang" />
        <P>{{telnow}}</P>
      </div>
      <div class="Combox">
        <!-- app store监控下拉框 -->
        <div
          class="appstore"
          v-show="appstore"
          @mouseover="showAppstore()"
          @mouseout="hideAppstore()"
        >
          <img src="../assets/NumImg/jiao.png" class="jiao" />
          <div class="lie">
            <p v-for="(app,index) in apps" :key="index">
              <!-- <router-link :to="{path:app.path}">{{app.name}}</router-link> -->
              <a @click="goapp(index)">{{app.name}}</a>
            </p>
          </div>
        </div>
        <div class="aso" v-show="aso" @mouseover="showAso()" @mouseout="hideAso()">
          <img src="../assets/NumImg/jiao.png" class="jiao" />
          <div class="lie">
            <p
              v-for="(aso,index) in asos"
              :key="index"
              @click="aso.name=='搜索指数排名'?$router.push('ranking'):$router.push('hot_search')"
            >{{aso.name}}</p>
          </div>
        </div>
        <!-- 个人中心下拉框 -->
        <div class="mine" v-show="mine" @mouseover="showMine()" @mouseout="hideMine()">
          <img src="../assets/NumImg/jiao.png" class="jiao" />
          <div class="lie">
            <p v-for="(mine,index) in mines" @click="climsg(index)" :key="'LY'+index">
              {{mine.name}}
              <!-- <router-link :to="{path:mine.path}">		
								
              </router-link>-->
            </p>
          </div>
        </div>
      </div>
    </div>
    <P class="line"></P>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'
// 引入工具类
import { formatDate } from '../common/util.js'
export default {
  components: { country },
  data() {
    return {
      historyWord: '',
      nav_input_value: '',
      is_show_nav_popover: false,
      response_data: null,
      unlogin: true, //未登录
      telnow: '', //当前手机号
      codnow: '', //当前密码
      uid: '', //用户id
      mine: false,
      appstore: false,
      aso: false,
      down: true,
      downaso: true,
      isUp: false,
      isUpaso: false,
      appVal: 'App Store监控',
      asoVal: 'ASO优化',
      // app store监控
      apps: [
        { name: '榜单实时排名' },
        { name: '榜单更新监控' },
        { name: '排名上升/下降监控' },
        { name: 'App Store上下架监控' }
      ],
      // aso优化
      asos: [{ name: '搜索指数排名' }, { name: '实时热搜榜' }],
      // 个人中心
      mines: [{ name: '消息中心' }, { name: '账号设置' }, { name: '退出' }],
      // 获取当前选中的国家
      now_country: '中国',
      touxiang: require('../assets/NumImg/touxiang.png')
    }
  },
  created() {
    // 第一步 localStorage的历史记录搜索
    this.historyWord = localStorage.getItem('searchWord')
    this.historyWord = this.historyWord.split(',') //将字符串转成数组
    // 第一步 localStorage的历史记录搜索

    this.nav_input_value = this.$store.state.nav_input_value

    this.fun()
    this.$watch('nav_input_value', function(newValue, oldValue) {
      this.$store.state.nav_input_value = this.nav_input_value

      this.get_data_for_nav_input()
    })
  },
  mounted: function() {
    // this.globalClick(() => {
    //   this.is_show_nav_popover = false
    // })
  },
  methods: {
    // 获取当前选中的国家
    parentFn(payload) {
      // console.log(payload)
      this.now_country = payload
    },
    fun() {
      let userId = localStorage.getItem('userId') //获取userId
      let tel = window.localStorage.getItem('tel')
      if (localStorage.getItem('touxiang') != null) {
        this.touxiang = localStorage.getItem('touxiang')
      }
      this.telnow = tel
      this.uid = userId
      if (this.uid == '' || this.uid == null) {
        this.unlogin = true
      } else {
        this.unlogin = false
      }
    },
    // 显示app store监控下拉框
    showAppstore() {
      ;(this.appstore = true), (this.down = false), (this.isUp = true)
    },
    // 隐藏app store监控下拉框
    hideAppstore() {
      ;(this.appstore = false), (this.down = true), (this.isUp = false)
    },
    // 显示aso监控下拉框
    showAso() {
      ;(this.aso = true), (this.downaso = false), (this.isUpaso = true)
    },
    // 隐藏aso监控下拉框
    hideAso() {
      ;(this.aso = false), (this.downaso = true), (this.isUpaso = false)
    },
    // 显示个人中心下拉框
    showMine() {
      this.mine = true
    },
    // 隐藏个人中心下拉框
    hideMine() {
      this.mine = false
    },
    // app store监控点击跳转
    goapp(index) {
      if (index == 0) {
        this.$router.push({ path: '/bangdan' })
      } else if (index == 1) {
        this.$router.push({ path: '/monitor' })
      } else if (index == 2) {
        this.$router.push({ path: '/rank' })
      } else if (index == 3) {
        this.$router.push({ path: '/application' })
      }
      this.appstore = false
    },
    climsg(index) {
      this.mine = false
      if (index == 0 || index == 1) {
        this.$router.push({ path: '/message' })
      } else if (index == 2) {
        this.unlogin = true
        localStorage.clear()
        this.$router.push({ path: '/index' })
      }
    },
    get_data_for_nav_input() {
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
          let deviceType = 1
          let iosType = 11
          let time = formatDate(new Date(), 'yyyy-MM-dd')
          let word = this.nav_input_value
          let url = '/Word/FindTodayJoinWord'
          let data = {
            deviceType: deviceType,
            countryId: country_id,
            sdate: time,
            word: word,
            iosType: iosType
          }
          // console.log(deviceType)
          // console.log(country_id)
          // console.log(word)
          // console.log(time)
          // console.log(iosType)
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              this.response_data = response.data.Data
              // console.log(this.response_data)
              // console.log('88888888888888888888888888888')
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 历史索索记录
    search_history(val) {
      let searchWord = localStorage.getItem('searchWord')
      if (searchWord == null) {
        localStorage.setItem('searchWord', val)
      } else {
        let arr = localStorage.getItem('searchWord')
        arr = arr.split(',')
        if (arr.indexOf(val) != -1) {
          arr = arr
        } else {
          arr.unshift(val)
        }
        this.historyWord = arr
        if (this.historyWord.length > 10) {
          this.historyWord.pop()
        }
        localStorage.setItem('searchWord', this.historyWord)
      }
    },
    go_to_page01(parm) {
      if (parm.trim() == '') {
        return false
      }
      this.is_show_nav_popover = false
      // 调用存储历史记录的方法
      this.search_history(this.nav_input_value)
      if (
        parseInt(this.nav_input_value) >= 10000 &&
        parseInt(this.nav_input_value) <= 999999999999
      ) {
        this.$store.state.now_country_name = this.now_country
        this.$store.state.now_app_id = parseInt(this.nav_input_value)
        this.hand_save_vuex(this)
        let routerUrl = this.$router.resolve({
          path: '/now_ranking'
        })
        window.open(routerUrl.href, '_blank')
        return false
      }

      // this.nav_input_value = ''
      this.$store.state.now_app_name = parm
      this.$store.state.now_country_name = this.now_country

      this.hand_save_vuex(this)
      let routerUrl = this.$router.resolve({
        path: '/result'
      })
      window.open(routerUrl.href, '_blank')
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
#navv {
  background-color: #fff;
  top: 0;
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 999;
}
#navv > .line {
  border-bottom: 1px solid #efefef;
}
.down {
  width: 8px;
  height: 8px;
}
.nav {
  width: 1200px;
  height: 66px;
  margin: 0 auto;
}
.nav .logo {
  width: 124px;
  height: 34px;
  float: left;
  margin-top: 16px;
}
.nav ul li {
  float: left;
  line-height: 66px;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  color: #222222;
  margin-left: 58px;
}
.nav ul li a {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  color: #222222;
}
.nav ul li:hover,
.nav ul li a:hover {
  color: #009bef !important;
  cursor: pointer;
}
.nav ul li:first-child {
  margin-left: 66px;
}
.nav ul li p {
  display: inline-block;
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  color: #222222;
}
.up {
  color: #009bef !important;
}
.nav .searchDiv {
  width: 331px;
  height: 36px;
  float: left;
  margin-left: 150px;
  margin-top: 15px;
  background-color: #f2f2f2;
  border-radius: 4px;
}
.nav .searchDiv > img {
  width: 18px;
  height: 20px;
  margin-left: 10px;
  vertical-align: top;
  margin-top: 7px;
}
.nav .searchDiv input {
  width: 134px;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  color: #222222;
  vertical-align: top;
  margin-top: 7px;
  margin-left: 5px;
}
.nav .searchDiv input::placeholder {
  color: #bfbfbf;
}
.nav .searchDiv > p {
  width: 50px;
  height: 36px;
  background-color: #009bef;
  border-radius: 0px 4px 4px 0px;
  float: right;
  text-align: center;
}
.nav .searchDiv > p img {
  width: 18px;
  height: 18px;
  margin-top: 9px;
}
.nav .denglu,
.nav .zhuce {
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  width: 70px;
  height: 36px;
  line-height: 37px;
  text-align: center;
  border-radius: 4px;
  float: left;
  margin-top: 15px;
}
.nav .denglu {
  border: solid 1px #009bef;
  color: #009bef;
  margin-left: 30px;
}
.nav .denglu a {
  color: #009bef;
}
.nav .zhuce {
  background-color: #009bef;
  color: #ffffff;
  margin-left: 16px;
}
.nav .zhuce a {
  color: #ffffff;
}
.nav .ldiv {
  height: 100%;
  margin-left: 1040px;
}
.nav .ldiv img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-top: 13px;
  border: 2px solid #fcfcfc;
}
.nav .ldiv p {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  color: #888888;
  display: inline-block;
  vertical-align: top;
  margin-top: 25px;
}
.Combox {
  position: absolute;
  top: 41px;
  z-index: 1001;
}
.Combox > div .jiao {
  width: 23px;
  height: 12px;
}
.Combox > div {
  display: inline-block;
  text-align: center;
}
.Combox > div.appstore {
  margin-left: 245px;
}
.Combox > div.aso {
  margin-left: 410px;
}
.Combox > div.mine {
  margin-left: 1010px;
  margin-top: 8px;
}
.Combox > div.mine .lie p {
  width: 100px;
  text-align: center;
  margin: 0;
  margin-top: 10px;
}
.Combox > div.mine .lie p:nth-child(2) {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 5px;
}
.Combox > div > div.lie {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.28);
  border-radius: 4px;
  border-top: 0.013rem solid transparent;
  text-align: left;
  padding-bottom: 1px;
}
.Combox > div > div p,
.Combox > div > div p a {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  color: #444444;
  margin: 0 25px;
  line-height: 30px;
}
.Combox > div > div p a {
  margin: 0;
}
.Combox > div > div p:hover,
.Combox > div > div p a:hover {
  color: #009bef;
  cursor: pointer;
}
.Combox > div > div p:first-child {
  margin-top: 15px;
}
.Combox > div > div p:last-child {
  margin-bottom: 15px;
}

.popver_for_input {
  height: 36px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 36px;
  letter-spacing: 0px;
  color: #444444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.popver_for_input:hover {
  background-color: rgba(0, 0, 0, 0.03);
  font-family: SourceHanSansCN-Regular;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef !important;
}
</style>