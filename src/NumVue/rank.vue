<template>
  <div class="box" id="rank">
    <div class="title" v-html="ranktit"></div>
    <div class="content">
      <ul>
        <li
          v-for="(li,index) in lis"
          :class="{'select':isSelect==index}"
          @click="selectLei(index)"
          :key="index"
        >{{li.name}}</li>
      </ul>
      <div class="lei">
        <div>
          <p class="category">类别</p>
          <p class="font" v-bind:class="{selectFont:isFontZ}" @click="showZ()">总榜</p>
          <p class="font" @click.stop="showY()" id="myPanel" v-bind:class="{selectFont:isFont}">
            <span class="valY" v-html="valueY"></span>
            <img src="../assets/NumImg/down.png" class="down" v-show="downL" />
            <img src="../assets/NumImg/downW.png" class="down" v-show="downWL" />
            <!-- <img src="../assets/NumImg/upW.png" class="down" v-show="upWL" /> -->
          </p>
          <p class="font" @click.stop="showG()" v-bind:class="{selectFont:isFontG}">
            <span class="valG" v-html="valueG"></span>
            <img src="../assets/NumImg/down.png" class="down" v-show="downG" />
            <img src="../assets/NumImg/downW.png" class="down" v-show="downWG" />
            <!-- <img src="../assets/NumImg/upW.png" class="down" v-show="upWG" /> -->
          </p>
        </div>
        <div>
          <p class="fenlei">榜单分类</p>
          <p
            class="font"
            v-for="(brankLei,index) in brands"
            :class="{'selectFont':isSelectfont==index}"
            @click="clibLei(index)"
            :key="index"
          >{{brankLei.name}}</p>
        </div>
        <div>
          <p>日期</p>
          <!-- element下拉菜单组件 -->
          <p @click="cliDate(index)" :class="{'selectFont':isSelectdate==index}" v-for="(item,index) in timDs">
            {{item.name}}
          </p>
        </div>
      </div>
      <div class="sonlei" v-show="showson">
        <div>
          <p>子分类</p>
          <div>
            <p v-for="(Application,index) in sons.Data" v-bind:class="{'selectFont':isSons==index}" :key="Application.id" @click="cliLie(Application,index)">{{Application.name}}</p>
          </div>
            
        </div>
          
      </div>
      <div class="zongbang">
        <div class="tit">
          <p class="line"></p>
          <p class="font" v-html="upfontval"></p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th class="yingyong">应用</th>
                <th>总榜排名</th>
                <th>分类榜排名</th>
                <th>排名变动</th>
                <th>最新更新时间</th>
              </tr>
            </thead>
            <tbody v-if="hasrankdata">
              <tr v-for="(tr,index) in zongsData" :key="index">
                <th class="yingyong" @click="go_to_page01(tr.appID,tr.appName)">
                  <p class="ranking">{{tr.index}}</p>
                  <img :src="tr.icon" class="logo" />
                  <div class="msg">
                    <p class="appname">{{tr.appName}}</p>
                    <p class="company">{{tr.publisher}}</p>
                  </div>
                </th>
                <th class="zongrank">
                  <span v-if="tr.rank_a">{{tr.rank_a.rankID}}</span>
                  <span v-else>--</span>
                </th>
                <th>
                  <div class="now" v-if="tr.rank_b">
                    <p>{{tr.rank_b.rankID}}</p>
                    <p class="shejiao">{{tr.rank_b.genreName}}</p>
                  </div>
                  <div v-else>--</div>
                </th>
                <th class="change">
                  <div>
                    <img src="../assets/NumImg/up.png" class="down" v-if="tr.rankChange>=0" />
                    <img src="../assets/NumImg/downred.png" class="down" v-if="tr.rankChange<0" />
                    <span v-if="tr.rankChange>=0">{{tr.rankChange}}</span>
                    <span v-if="tr.rankChange<0">{{-(tr.rankChange)}}</span>
                  </div>
                </th>
                <th>{{tr.LastReleaseDate}}</th>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="null">
                <img src="../assets/NumimgTwo/null.png"/>
                <p>暂无相关数据</p>
              </tr>
            </tbody>
          </table>
          <!-- scroll -->
          <div v-show="contentShow" class="scrollDiv">
            <div>
              <p v-show="infiniteMsgShow" class="tips">
                <i class="el-icon-loading"></i>
                <!-- <img src="../assets/NumimgTwo/loading.gif"/> -->
              </p>
              <p v-show="!infiniteMsgShow" class="tips" v-html="bomfont"> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      // 标题
      ranktit:'排名上升监控',
      valueY: '应用', //应用html
      valueG: '游戏', //游戏html
      isFontZ: true, //总榜样式
      isFont: false, //应用榜样式
      isFontG: false, //游戏榜样式
      downL: true,
      downWL: false,
      downG: true,
      downWG: false,
      
      isSelectdate:0,//日期
      isSelect: 0, //排名上升下降加样式
      upfontval: '24小时内上升榜',
      upfont: true,
      isSelectfont: 0, //榜单分类加样式
      now_Application: '',
      zongsData: [],
      page: 1,
      pageSize: 20,
      contentShow: true,
      infiniteMsgShow: true,
      bomfont:"我是有底线的~",
      // 总分类
      lis: [{ name: '排名上升榜' }, { name: '排名下降榜' }],
      // 榜单分类
      brands: [{ name: '免费' }, { name: '付费' }, { name: '畅销' }],
      
      // 日期
      timDs: [
        { name: '24小时内' },
        { name: '3天内' },
        { name: '7天内' }
      ],
      // 子分类
      sons:{
        Data:[]
      },
      showson:false,
      isSons:0,
      // 是否有数据
      hasrankdata:true,

      scrollHeight: 0,
      total_number: 0, //修改排序错乱


      can_execute_scorll: true,//是否可以执行滚动
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    let that = this
  // 点击其他地方弹窗消失
        that.globalClick(() => {
          that.showApplication = false
          that.showGame = false
        })

    that.$nextTick(() => {
      
      //当页面滚动的时候  加载  滚动加载
      window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        that.scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight //滚动条到底部的条件
        var int = Math.round(scrollTop + windowHeight)
        if (int == that.scrollHeight||int+1 == that.scrollHeight||int-1 == that.scrollHeight) {
          // 请求数据
          
          if (that.can_execute_scorll) {
                 document.documentElement.scrollTop=document.documentElement.scrollHeight-document.documentElement.clientHeight-1
                that.contentShow=true
                that.infiniteMsgShow=true
                that.getData() 
             }
        }
      }
    })
  },
  methods: {
    //请求数据
    getData() {
      this.can_execute_scorll=false
      this.contentShow=true
      this.infiniteMsgShow=true
      this.hasrankdata=true
      // console.log( this.infiniteMsgShow)
      // console.log(this.hasrankdata)
      this.total_number += 1
      let number = this.total_number
      //传给后台的sort值
      let sortV = 'desc'
      if (this.upfont == true) {
        sortV = 'desc'
      } else {
        sortV = 'asc'
      }

      // 传给后台的pid值
      let pidV = 36
      if (this.isFontZ == true) {
        pidV = 36
      } else if (this.isFont == true) {
        pidV = 5000
      } else if (this.isFontG == true) {
        pidV = 6014
      }
      // 传给后台的brand值
      let brandV = 1
      if (this.isSelectfont == 0) {
        brandV = 1
      } else if (this.isSelectfont == 1) {
        brandV = 2
      } else {
        brandV = 3
      }
      // 传给后台的dayNum值
      let dayNumV = 1
      if (this.isSelectdate == 0) {
        dayNumV = 1
      } else if (this.isSelectdate == 1) {
        dayNumV = 3
      } else if (this.isSelectdate == 2) {
        dayNumV = 7
      }

      // 判断标题显示html
      if (this.isSelect == 0 && this.isSelectdate == 0) {
        this.upfontval = '24小时内上升榜'
      } else if (this.isSelect == 0 && this.isSelectdate == 1) {
        this.upfontval = '3天内上升榜'
      } else if (this.isSelect == 0 && this.isSelectdate == 2) {
        this.upfontval = '7天内上升榜'
      }else if (this.isSelect == 1 && this.isSelectdate == 0) {
        this.upfontval = '24小时内下降榜'
      } else if (this.isSelect == 1 && this.isSelectdate == 1) {
        this.upfontval = '3天内下降榜'
      } else if (this.isSelect == 1 && this.isSelectdate == 2) {
        this.upfontval = '7天内下降榜'
      } 

      // 获取分类id
      let apliId = ''
      this.$axios({
        method: 'get',
        url: '/GetGenre?genreID=' + pidV
      })
        .then(res => {
          if (res.data.Code == 0) {
            this.sons=res.data
            if (pidV == 36) {
              apliId = 36
            } else {
              for (var i = 0; i < res.data.Data.length; i++) {
                if (this.now_Application == res.data.Data[i].name) {
                  apliId = res.data.Data[i].id
                }
              }
            }
              if(this.isFont==true&&apliId==""){
                  apliId=5000 
              }else if(this.isFontG==true&&apliId==""){
                  apliId=6014 
              }
            //             console.log("brandV:"+brandV)
            //             console.log("dayNumV:"+dayNumV)
            //             console.log("sortV:"+sortV)
                        // console.log("apliId:"+apliId)
                        // console.log("pidV:"+pidV)
            // console.log(111111111111111111111)
            this.$axios({
              method: 'post',
              url: '/PostAppRankChanage',
              data: {
                brand: brandV,
                device: 1,
                countryid: 1,
                dayNum: dayNumV,
                sort: sortV,
                genreid: apliId,
                pid: pidV,
                pageIndex: this.page,
                pageSize: this.pageSize
              }
            })
              .then(res => {
                if (res.data.Code == 0) {
                    let total = res.data.pageCount
                    
                    if (this.total_number == number) {
                      this.zongsData = this.zongsData.concat(res.data.Data)
                      this.page++
                      if(total>20){
                        this.contentShow = true
                        this.infiniteMsgShow = false//加载更多
                        this.hasrankdata=true
                        this.bomfont="下拉加载更多"
                        this.can_execute_scorll=true
                      }
                    }

                    if(total>0&&total<21){
                        this.contentShow = true
                        this.infiniteMsgShow = false//没有更多
                        this.hasrankdata=true
                        this.bomfont="我是有底线的~"
                      }else if(total==0){
                        this.contentShow = false
                        this.hasrankdata=false
                      }

                  
                    

                    let pageC=Math.ceil(total/this.pageSize)
                    // console.log(this.page)
                    // console.log(pageC)
                    if(this.page==pageC+1){
                      this.can_execute_scorll =false
                      this.contentShow=true
                      this.infiniteMsgShow=false // 没有更多数据
                      this.bomfont="我是有底线的~"
                    }

                    if(pageC==0){
                      this.contentShow = false
                    }
                 
                  
                  
                }else{
                  this.contentShow = false
                  this.hasrankdata=false
                }
              })
              .catch(error => {
                console.log(error)
                this.contentShow = false
              })
          }else{
            this.contentShow = false
            this.hasrankdata=false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 点击总榜
    showZ() {
      this.showson=false
      // 小三角
        this.downWG=false
        this.downG=true
        this.downL=true
        this.downWL=false

      this.isFontZ = true
      this.isFont = false
      this.isFontG = false
      
      this.showdate = false
      this.zongsData.length = 0
      this.page = 1
      this.getData()
    },
    // 点击应用榜
    showY() {
      this.isSons=0
      this.showson=true
      this.now_Application="全部应用"
      // 小三角
        this.downWG=false
        this.downG=true
        this.downL=false
        this.downWL=true

      this.isFont = true
      this.isFontZ = false
      this.isFontG = false
      
      this.zongsData.length = 0
      this.page = 1
      this.getData()
    },
    // 点击游戏榜
    showG() {
      this.isSons=0
      this.showson=true
      this.now_Application="全部游戏"

      // 小三角
        this.downWG=true
        this.downG=false
        this.downL=true
        this.downWL=false
        
      this.isFontZ = false
      this.isFontG = true
      this.isFont = false
      
      this.zongsData.length = 0
      this.page = 1
      this.getData()
    },
    // 点击子分类
    cliLie(Application,index) {
      this.isSons=index
      
      this.now_Application = Application.name
      this.zongsData.length = 0
      this.page = 1
      this.getData()
    },
    
    //点击排名上升/下降
    selectLei(index) {
      this.isSelect = index
      this.showApplication = false
      this.showGame = false
      this.showdate = false
      // this.zongsData.length=0
      if (this.isSelect == 0) {
        this.upfont = true
        this.ranktit='排名上升监控'
      } else {
        this.upfont = false
        this.ranktit='排名下降监控'
      }
      this.page = 1
      this.zongsData.length = 0

      this.getData()
    },
    //点击榜单分类
    clibLei(index) {
      this.showdate = false
      this.isSelectfont = index
      this.showApplication = false
      this.showGame = false
      this.zongsData.length = 0
      this.page = 1
      this.getData()
    },
    // 点击日期
    cliDate(index) {
      this.isSelectdate=index
      this.zongsData.length = 0
      this.page = 1
      this.getData()
    },
   
    go_to_page01(parm, parm02) {
      this.$store.state.now_country_name = this.now_country
      this.$store.state.now_app_name = parm02
      this.$store.state.now_app_id = parm
      this.hand_save_vuex(this)
      let routerUrl = this.$router.resolve({
        // path: '/now_ranking'
        path:'/now_ranking?now_country_name=' +
              this.$store.state.now_country_name +
              '&now_app_id=' +
              this.$store.state.now_app_id
      })
      window.open(routerUrl.href, '_blank')
    }
  }
}
</script>



<style scoped>
.Leibox {
  position: absolute;
  top: 41px;
  z-index: 99;
}
.Leibox {
  top: 222px;
}
.Leibox > div .jiao {
  width: 23px;
  height: 12px;
  margin-top: 4px;
}
.Leibox > div {
  display: inline-block;
  text-align: center;
}
.Leibox > div.ying {
  margin-left: 50px;
}
.Leibox > div.game {
  margin-left: 130px;
}
.Leibox > div.date {
  margin-left: 620px;
}
.Leibox > div > div.lie {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.28);
  border-radius: 4px;
  border-top: 0.013rem solid transparent;
  text-align: left;
}
.Leibox > div > div.lie {
  width: 168px;
  padding: 7px 0;
}
.Leibox > div.date > div.lie {
  width: 80px;
  padding: 7px 0;
}
.Leibox > div > div span {
  margin-left: 15px;
  width: 65px;
  font-size: 13px;
  color: #444444;
  line-height: 30px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Leibox > div > div span:hover {
  color: #009bef;
  cursor: pointer;
}
.title {
  width: 100%;
  height: 86px;
  background-image: url('../assets/NumImg/tit.png');
  background-size: 100% 86px;
  background-repeat: no-repeat;
  font-weight: 600;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  line-height: 86px;
  letter-spacing: 1px;
}
.font .down{
  margin-top: 9px;
}
.down {
  width: 8px;
  height: 8px;
  vertical-align: top;
  margin-top: 11px;
  margin-left: 2px;
  /*margin-right: 5px;*/
}
.content {
  width: 1200px;
  margin: 0 auto;
  min-height: 500px;
}
.content ul {
  width: 100%;
  height: 52px;
  border-bottom: 1px solid #d6d6d6;
}
.content ul li {
  width: 96px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #222;
  float: left;
  margin-top: 12px;
  margin-left: 27px;
  font-weight: 600;
}
.content ul li:hover {
  color: #009bef;
  cursor: pointer;
}
.content ul li:first-child {
  margin-left: 0;
}
.select {
  border-bottom: 2px solid #009bef;
}

.content > div {
  margin-top: 28px;
}

.content .lei > div,
.content .country > div {
  display: inline-block;
}
.content .lei > div:nth-child(2),
.content .lei > div:last-child {
  margin-left: 30px;
}
.content .country > div:nth-child(2) {
  margin-left: 11px;
}
.content .country > div:nth-child(3) {
  margin-left: 21px;
}
.content .lei > div p,
.content .country > div p {
  height: 24px;
  line-height: 25px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #d6d6d6;
  font-size: 13px;
  color: #444444;
  display: inline-block;
  padding: 0 12px;
  margin-left: 10px;
}
.content .lei > div:last-child p span {
  font-size: 13px;
  color: #444444;
}
.content .lei > div:last-child p img {
  width: 8px;
  height: 8px;
}
.content .lei > div p:hover,
.content .country > div p:hover {
  background-color: #f2f2f2;
  color: #444;
  cursor: pointer;
  border: solid 1px #dfdfdf;
}
.selectFont {
  background-color: #009bef;
  color: #ffffff !important;
  border: 1px solid #009bef !important;
}
.selectFont:hover {
  background-color: #38aded !important;
  border: 1px solid #38aded !important;
}
.content .country > div p {
  margin-left: 5px;
}
.content .country > div p.date {
  margin-left: 11px;
}
.content .lei > div p:first-child,
.content .country > div p:first-child {
  font-weight: 600;
  color: #222222;
  border: none;
  padding: 0;
  margin-left: 0;
}
.content .lei > div p:first-child:hover,
.content .country > div p:first-child:hover {
  background-color: transparent;
  color: #222222 !important;
  border: none !important;
  cursor: inherit;
}

.nowTim {
  background-color: #009bef;
  color: #fff !important;
  border: solid 1px #009bef;
}
.content .kuaizhao > div img {
  width: 38px;
  height: 1px;
  vertical-align: top;
  margin-top: 12px;
  margin-left: -4px;
  margin-right: -4px;
}
.content .zongbang .tit > p {
  display: inline-block;
}
.content .zongbang .tit .line {
  width: 2px;
  height: 16px;
  background-color: #429ae8;
}
.content .zongbang .tit .font {
    font-weight: 600;
    font-size: 16px;
    color: #222222;
    vertical-align: top;
    margin-top: -2px;
    margin-left: 3px;
    letter-spacing: 1px;
}
.content .zongbang > div table {
  width: 1200px;
  height: 100%;
  border: solid 1px #d6d6d6;
  margin-bottom: 12px;
  margin-top: 12px;
  border-collapse: collapse;
}
table thead {
  width: 1200px;
  height: 40px;
  background-color: #f7f7f7;
}
table thead tr {
  display: -webkit-box;
  height: 40px;
}
table thead tr th {
  font-weight: 600!important;
  font-size: 13px;
  color: #222222;
  line-height: 40px;
}
th {
  font-weight: inherit !important;
}
table tbody tr {
  height: 76px;
  display: inline-table;
  border-top: 1px solid #d6d6d6;
}
table tr th {
  width: 220px;
}
table tr th.yingyong {
  width: 321px;
}
table tr th.change span {
  font-size: 14px;
  line-height: 30px;
  color: #f50202;
}
table tbody tr th {
  height: 76px;
  font-size: 14px;
  color: #444444;
}
table tbody tr th .shejiao {
  color: #888;
  font-size: 13px;
}
table tbody tr th .ranking {
  font-size: 14px;
  color: #888888;
  float: left;
  margin-left: 24px;
  margin-top: 15px;
}
table tbody tr:first-child th .ranking p,
table tbody tr:nth-child(2) th .ranking p,
table tbody tr:nth-child(3) th .ranking p {
  color: red;
}
table tbody tr th .logo {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  border: solid 1px #f2f2f2;
  float: left;
  margin-left: 22px;
}
table tbody tr th .msg {
  font-size: 14px;
  color: #888888;
  float: left;
  margin-left: 9px;
  margin-top: 5px;
}
table tbody tr th .msg .appname {
  width: 122px;
  font-size: 14px;
  color: #222222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
table tbody tr th .msg .appname:hover {
  color: #009bef;
  cursor: pointer;
}
table tbody tr th .msg .company {
  width: 166px;
  font-size: 13px;
  color: #888888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin-top: 7px;
}
table tbody tr th .now,
table tbody tr th .before {
  display: inline-block;
}
table tbody tr th .before,
table tbody tr th .right {
  vertical-align: top;
  margin-top: 12px;
  margin-left: 5px;
}
table tbody tr th > .dir {
  margin-top: 17px;
  width: 8px;
  height: 8px;
  vertical-align: top;
}
table tbody tr th.zongrank > img {
  margin-top: 5px;
  margin-left: 0;
}
/*子分类*/
.content .sonlei{
  margin-left: 0!important;
  margin-top: 10px;
}
.content .sonlei>div>div p{
  height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    font-size: 13px;
    color: #444444;
    display: inline-block;
    padding: 0 12px;
    margin-left: 10px;
    font-weight: inherit;
}
.sonlei>div>div p:hover{
  cursor: pointer;
}
.sonlei div div{
  display: inline-block;
  margin-left: 2px;
  line-height: 38px;
  width: 1144px;
}
.content .sonlei>div>p{
  height: 24px;
    line-height: 25px;
    text-align: center;
    font-size: 13px;
    display: inline-block;
  font-weight: 600;
    color: #222222;
    vertical-align: top;
    margin-top: 6px;
}

/*暂无数据*/
.null{
  width: 100%;
  height:606px;
  text-align: center;
  margin:0 auto;
}
.null img{
  width: 210px;
  height:162px;
  margin:0 auto;
  margin-top: 190px;
}
.null p{
  font-size: 13px;
  color: #555555;
}
/*加载中*/
.tips img{
  width: 50px;
  height:50px;
}
.tips{
  font-size: 14px;
  color: #bfbfbf;
}
.tips:first-child{
  font-size: 30px;
}
</style>