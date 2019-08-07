<template>
  <div id="navv">
    <div class="nav">
      <img src="../assets/NumImg/logo.png" class="logo" />
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
        <input type="text" placeholder="应用名称或APPID" />
        <p>
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
              <router-link :to="{path:app.path}">{{app.name}}</router-link>
            </p>
          </div>
        </div>
        <div class="aso" v-show="aso" @mouseover="showAso()" @mouseout="hideAso()">
          <img src="../assets/NumImg/jiao.png" class="jiao" />
          <div class="lie">
            <p v-for="(aso,index) in asos" :key="index">{{aso.name}}</p>
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
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'
export default {
  components: { country },
  data() {
    return {
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
        { name: '榜单实时排名', path: '/bangdan' },
        { name: '榜单更新监控', path: '/monitor' },
        { name: '排名上升/下降监控', path: '/rank' },
        { name: 'App Store上下架监控', path: '/application' }
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
  methods: {
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      console.log(this.now_country)
    },
    fun(teval, coval) {
      console.log(teval)
      console.log(coval)
      this.telnow = teval
      console.log(this.telnow)
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
      // console.log(this.telnow)
    },
    // 隐藏个人中心下拉框
    hideMine() {
      this.mine = false
    },

    climsg(index) {
      this.mine = false

      if (index == 0 || index == 1) {
        this.$router.push({ path: '/message' })
      } else if (index == 2) {
        // this.uid=""
        // this.unlogin=true
        this.$router.push({ path: '/index' })
        // console.log(this.uid)
        // console.log(this.unlogin)
      }
    }
  },
  created() {
    console.log(this.touxiang)
    let userId = localStorage.getItem('userId') //获取userId
    let tel = window.localStorage.getItem('tel')
    console.log(localStorage.getItem('touxiang'))
    if (localStorage.getItem('touxiang') != null) {
      this.touxiang = localStorage.getItem('touxiang')
    }

    console.log(this.touxiang)
    this.telnow = tel
    this.uid = userId
    if (this.uid != '') {
      this.unlogin = false
    } else {
      this.unlogin = true
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
}
.nav .searchDiv input {
  width: 134px;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  color: #bfbfbf;
  vertical-align: top;
  margin-top: 7px;
  margin-left: 5px;
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
  z-index: 99;
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
</style>