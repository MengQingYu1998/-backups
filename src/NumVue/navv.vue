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
          <p class="borB" :class="{hovB:ishovB}"></p>
        </li>
        <li @mouseover="showAso()" @mouseout="hideAso()">
          <p v-bind:class="{up:isUpaso}" v-html="asoVal"></p>
          <img src="../assets/NumImg/down.png" class="down" v-if="downaso" />
          <img src="../assets/NumImg/shang.png" class="down" v-else />
          <p class="borB" :class="{hovaso:ishovaso}"></p>
        </li>
      </ul>
      <div class="searchDiv">
        <img src="../assets/NumImg/pingguo.png" class="ios" />

        <country @childFn="parentFn" :custom_country="this.$store.state.now_country_name"></country>
        <el-popover
          width="270"
          popper-class="nav_popover_class"
          :visible-arrow="false"
          placement="bottom"
          v-model="is_show_nav_popover"
          trigger="manual"
        >
          <div class="search_history" v-show="nav_input_value==''">搜索记录</div>
          <div
            v-show="nav_input_value!=''"
            class="pointer popver_for_input"
            v-for="(item,index) in response_data"
            :key="'nav_input02'+index"
            @click="go_to_page01(item.keyword)"
          >{{item.keyword}}</div>
          <div
            v-show="nav_input_value==''"
            class="pointer popver_for_input add_img"
            v-for="(item,index) in historyWord"
            :key="'nav_input01'+index"
            @click="go_to_page01(item)"
            @mouseover="add_active($event)"
            @mouseout="remove_active($event)"
          >
            {{item}}
            <img src="../assets/ios/close_nav.png" @click.stop="delete_item(index)" />
          </div>
          <input
            id="my_nav_input_value"
            slot="reference"
            @focus="is_show_nav_popover=(historyWord.length!=0)"
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
        <!-- <P>{{telnow}}</P> -->
      </div>
      <div class="Combox">
        <!-- app store监控下拉框 -->
        <div
          class="appstore"
          v-show="appstore"
          @mouseover="showAppstore()"
          @mouseout="hideAppstore()"
        >
          <div class="lie">
            <div>
              <p @click="closecli()">
                <router-link to="/bangdan" active-class="up">
                  <span class="iconicon-test5"></span>
                  <span>榜单实时排名</span>
                </router-link>
              </p>
            </div>
            <div>
              <p @click="closecli()">
                <router-link to="/monitor" active-class="up">
                  <span class="iconicon-test4"></span>
                  <span>榜单更新监测</span>
                </router-link>
              </p>
            </div>
            <div>
              <p @click="closecli()">
                <router-link to="/application" active-class="up">
                  <span class="iconicon-test"></span>
                  <span>APP Store上下架监控</span>
                </router-link>
              </p>
            </div>
            <div>
              <p @click="closecli()">
                <router-link to="/rank" active-class="up">
                  <span class="iconicon-test2"></span>
                  <span>排名上升/下降监控</span>
                </router-link>
              </p>
            </div>
            <div>
              <p @click="closecli()">
                <router-link to="/application1" active-class="up">
                  <span class="iconicon-test8"></span>
                  <span>清榜/清词监控</span>
                </router-link>
              </p>
            </div>
            <div>
              <p @click="closecli()">
                <router-link to="/recommend" active-class="up">
                  <span class="iconicon-test1"></span>
                  <span>APP Store精品推荐</span>
                </router-link>
              </p>
            </div>
          </div>
        </div>
        <!-- aso优化下拉框 -->
        <div class="aso" v-show="aso" @mouseover="showAso()" @mouseout="hideAso()">
          <div class="lie">
            <div>
              <p @click="closeclie()">
                <router-link to="/ranking" active-class="up">
                  <span class="icon_huaban8"></span>
                  <span>搜索指数排名</span>
                </router-link>
              </p>
            </div>
            <div>
              <p @click="closeclie()">
                <router-link to="/hot_search" active-class="up">
                  <span class="iconicon-test6"></span>
                  <span>实时热搜榜</span>
                </router-link>
              </p>
            </div>
          </div>
        </div>

        <!-- 个人中心下拉框 -->
        <div class="mine" v-show="mine" @mouseover="showMine()" @mouseout="hideMine()">
          <!-- <img src="../assets/NumImg/jiao.png" class="jiao" /> -->
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
      appVal: 'APP Store监控',
      asoVal: 'ASO优化',
      // app store监控
      apps: [
        { name: '榜单实时排名' },
        { name: '榜单更新监控' },
        { name: '排名上升/下降监控' },
        { name: 'App Store上下架监控' },
        { name: 'App Store精品推荐' }
        // { name: 'App Store数据统计'},
      ],
      // aso优化
      asos: [{ name: '搜索指数排名' }, { name: '实时热搜榜' }],
      // 个人中心
      mines: [{ name: '消息中心' }, { name: '账号设置' }, { name: '退出' }],
      // 获取当前选中的国家
      now_country: '中国',
      touxiang: require('../assets/NumImg/touxiang.png'),
      ishovB: false,
      ishovaso: false,
      nohover: -1,
      noasoh: -1
    }
  },

  watch: {
    $route(val, old) {
      if (val.path != '/result') {
        this.nav_input_value = ''
        this.is_show_nav_popover = false
      }
      // 上一个路由
    }
  },
  created() {
    // 第一步 localStorage的历史记录搜索
    this.historyWord = localStorage.getItem('searchWord')
    if (this.historyWord != null) {
      this.historyWord = this.historyWord.split(',') //将字符串转成数组
    }

    this.fun()
    this.$watch('nav_input_value', function(newValue, oldValue) {
      this.get_data_for_nav_input()
    })
    this.$watch('now_country', function(newValue, oldValue) {
      // document.getElementById('nav_input_value').focus()
      this.get_data_for_nav_input()
    })
  },

  methods: {
    closecli() {
      this.appstore = false
    },
    closeclie() {
      this.aso = false
    },
    // 获取当前选中的国家
    parentFn(payload) {
      // console.log(payload)
      this.now_country = payload
    },
    fun() {
      let userId = localStorage.getItem('userId') //获取userId

      this.uid = userId
      if (this.uid == '' || this.uid == null) {
        this.unlogin = true
      } else {
        this.unlogin = false
        this.$axios({
          method: 'get',
          url: 'GetAccount?accountId=' + this.uid
        })
          .then(res => {
            // console.log(res.data)
            this.uid = res.data.Data.id
            this.telnow = res.data.Data.Phone //当前手机号
            this.nowemail = res.data.Data.Email // 当前邮箱
            if (res.data.Data.Avatar != null) {
              this.touxiang = res.data.Data.Avatar //头像
            }

            if (this.nowemail == null) {
              this.unemail = true
            } else {
              this.unemail = false
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 显示app store监控下拉框
    showAppstore() {
      ;(this.appstore = true),
        (this.down = false),
        (this.isUp = true),
        (this.ishovB = true)
    },
    // 隐藏app store监控下拉框
    hideAppstore() {
      ;(this.appstore = false),
        (this.down = true),
        (this.isUp = false),
        (this.ishovB = false)
    },
    // 显示aso监控下拉框
    showAso() {
      ;(this.aso = true),
        (this.downaso = false),
        (this.isUpaso = true),
        (this.ishovaso = true)
    },
    // 隐藏aso监控下拉框
    hideAso() {
      ;(this.aso = false),
        (this.downaso = true),
        (this.isUpaso = false),
        (this.ishovaso = false)
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
      // this.nohover=index
      if (index == 0) {
        this.$router.push({ path: '/bangdan' })
      } else if (index == 1) {
        this.$router.push({ path: '/monitor' })
      } else if (index == 2) {
        this.$router.push({ path: '/rank' })
      } else if (index == 3) {
        this.$router.push({ path: '/application' })
      } else if (index == 4) {
        this.$router.push({ path: '/recommend' })
      }
      // else if(index==5){
      //   this.$router.push({ path: '/data_monitor' })
      // }
      this.appstore = false
    },
    overapp(index) {
      this.nohover = index
    },
    outapp(index) {
      this.nohover = -1
    },
    overaso(index) {
      this.noasoh = index
    },
    outaso(index) {
      this.noasoh = -1
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

          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              this.response_data = response.data.Data

              // 查找你要判断的文本框
              var myInput = document.getElementById('my_nav_input_value')
              // if (myInput == document.activeElement) {
              //   alert('获取焦点')
              // } else {
              //   alert('未获取焦点')
              // }
              if (
                this.$route.fullPath == '/result' &&
                myInput == document.activeElement
              ) {
                if (response.data.Data) {
                  this.is_show_nav_popover = true
                } else {
                  this.is_show_nav_popover = false
                }

                if (this.nav_input_value == '') {
                  this.is_show_nav_popover = true
                }
              }

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
    delete_item(parm) {
      this.historyWord.splice(parm, 1)
      localStorage.setItem('searchWord', this.historyWord)
    },
    remove_active(event) {
      event.currentTarget.className = 'pointer popver_for_input add_img'
    },
    add_active(event) {
      event.currentTarget.className =
        'pointer popver_for_input add_img img_active'
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
      this.nav_input_value = parm
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
          path:
            '/now_ranking?now_country_name=' +
            this.$store.state.now_country_name +
            '&now_app_id=' +
            this.$store.state.now_app_id
        })
        window.open(routerUrl.href, '_blank')
        return false
      }

      this.$store.state.now_app_name = parm
      this.$store.state.now_country_name = this.now_country

      this.hand_save_vuex(this)

      this.$router.push({
        path: '/result'
      })
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
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
}
/*#navv > .line {
  border-bottom: 1px solid #efefef;
    box-shadow: 0px 10px 0px 0px 
    rgba(0, 0, 0, 0.5);
}*/
.down {
  width: 8px;
  height: 8px;
}
.nav {
  width: 1200px;
  height: 70px;
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
  font-size: 16px;
  color: #222222;
  margin-left: 65px;
}
.nav ul li a {
  font-size: 16px;
  color: #222222;
}
.nav ul li a:active {
  text-decoration: none;
}
.nav ul li:hover,
.nav ul li a:hover {
  color: #009bef !important;
  cursor: pointer;
  text-decoration: none;
}
.nav ul li:first-child {
  margin-left: 40px;
}
.nav ul li p {
  display: inline-block;
  font-size: 15px;
  color: #222222;
}
.up {
  color: #009bef !important;
}
.nav .searchDiv {
  width: 320px;
  height: 34px;
  float: left;
  margin-left: 230px;
  margin-top: 17px;
  border: solid 1px #009bef;
  /*background-color: #f2f2f2;*/
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
  width: 118px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  color: #222222;
  vertical-align: top;
  margin-top: 3px;
  line-height: 30px;
}
.nav .searchDiv input::placeholder {
  color: #bfbfbf;
}
.nav .searchDiv > p {
  width: 50px;
  height: 34px;
  background-color: #009bef;
  border-radius: 0px 4px 4px 0px;
  float: right;
  margin-right: -2px;
  text-align: center;
}

.nav .searchDiv > p img {
  width: 18px;
  height: 18px;
  margin-top: 9px;
}
.nav .denglu,
.nav .zhuce {
  font-size: 14px;
  width: 50px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  float: left;
  margin-top: 27px;
  font-family: PingFangSC-Regular;
  color: #222222;
}
.nav .denglu a,
.nav .zhuce a {
  font-family: PingFangSC-Regular;
  color: #222222;
  font-size: 14px;
  text-decoration: none;
}
.nav .denglu {
  border-right: 1px solid #888888;
  margin-left: 20px;
  /*  border: solid 1px #009bef;
  color: #009bef;
  margin-left: 13px;*/
}
.nav .denglu a {
  /*color: #009bef;*/
}
/*.nav .zhuce {
  background-color: #009bef;
  color: #ffffff;
  margin-left: 13px;
}*/
.nav .zhuce a {
  /*color: #ffffff;*/
}
.nav .ldiv {
  width: 140px;
  height: 100%;
  margin-left: 1080px;
  text-align: center;
}
.nav .ldiv img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-top: 15px;
  border: 2px solid #fcfcfc;
}
.nav .ldiv p {
  font-size: 14px;
  color: #222;
  display: inline-block;
  vertical-align: top;
  margin-top: 25px;
}
.Combox {
  position: absolute;
  top: 69px;
  z-index: 1001;
  font-family: 'iconfont';
}
.Combox a:active,
.Combox a:link {
  text-decoration: none;
}
.Combox > div .jiao {
  width: 23px;
  height: 12px;
  margin-top: 4px;
}
.Combox > div {
  display: inline-block;
  text-align: center;
}
.Combox > div.appstore {
  margin-left: 119px;
}
.Combox > div.aso {
  margin-left: 370px;
}
.Combox > div.asm {
  margin-left: 420px;
}
.Combox > div.mine {
  margin-left: 1100px;
  margin-top: -2px;
}
.Combox > div.mine .lie p {
  width: 100px;
  text-align: center;
  margin: 0;
  margin-top: 10px;
}
.Combox > div.mine .lie p:nth-child(7) {
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

.Combox > div.appstore > div.lie,
.Combox > div.aso > div.lie {
  width: 393px;
  /*height: 229px;*/
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-bottom: 16px;
}
.Combox > div.appstore > div.lie div,
.Combox > div.aso > div.lie > div {
  width: 176px;
  height: 38px;
  border-radius: 4px;
  border: solid 1px #f2f2f2;
  display: inline-block;
  margin-top: 16px;
  margin-left: 12px;
}
.Combox > div.appstore > div.lie div p img,
.Combox > div.aso > div.lie div p img {
  width: 14px;
  height: 14px;
  vertical-align: top;
  margin-top: 11px;
  margin-left: 13px;
}
.Combox > div > div p {
  width: 100%;
}
.Combox > div > div p span {
  display: inline-block;
  line-height: 38px;
  margin-left: 10px;
}

.Combox > div.aso > div.lie {
  width: 204px;
}

.Combox > div > div p,
.Combox > div > div p a {
  font-size: 13px;
  color: #222;
  /*margin: 0 25px;*/
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
  /*margin-top: 15px;*/
}
.Combox > div > div p:last-child {
  /*margin-bottom: 15px;*/
}

.borB {
  display: block !important;
  width: 0px;
  height: 2px;
  position: relative;
  background: #009bef;
  left: -2px;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: width 0.2s ease;
  -moz-transition: width 0.2s ease; /* Firefox 4 */
  -webkit-transition: width 0.2s ease; /* Safari and Chrome */
  -o-transition: width 0.2s ease; /* Opera */
}
.hovB {
  width: 110px;
}
.hovaso {
  width: 74px;
}
.nav .denglu a:hover,
.nav .zhuce a:hover {
  color: #009bef;
}
.nav .ldiv:hover {
  cursor: pointer;
}
.popver_for_input {
  height: 36px;
  padding: 0 20px;
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

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef !important;
}
.add_img {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add_img img {
  display: none;
  width: 10px;
  height: 10px;
}
.img_active img {
  display: block !important;
  width: 10px;
  height: 10px;
}
.search_history {
  font-size: 12px;
  padding: 0 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #888888;
}
</style>