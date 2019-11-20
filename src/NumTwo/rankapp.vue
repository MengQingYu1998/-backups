<template>
  <div class="box" id="rank">
    <div class="title" v-html="ranktitle"></div>
    <div class="content">
      <ul>
        <li
          v-for="(li,index) in lis"
          :class="{'select':isSelect==index}"
          @click="selectLei(index)"
          :key="index"
        >{{li.name}}</li>  
      </ul>
      
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
                <th>最新更新时间</th>
                <th>公司名称</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr,index) in zongsData.Data" :key="index">
                <th class="yingyong">
                  <p class="ranking">{{tr.index}}</p>
                  <img :src="tr.icon" class="logo" @click="go_to_page01(tr.appID,tr.appName)"/>
                  <div class="msg">
                    <p class="appname" @click="go_to_page01(tr.appID,tr.appName)">{{tr.appName}}</p>
                    <p class="company" v-if="tr.publisher">{{tr.publisher}}</p>
                    <p class="company" v-else>--</p>
                  </div>
                </th>
                <th class="zongrank" v-if="showup">
                  <span>{{tr.rank_id}}</span>
                  <img src="../assets/NumImg/up.png" class="dir right" v-show="tr.rankchange>0"/>
                  <img src="../assets/NumimgTwo/xia.png" class="dir right" v-show="tr.rankchange<0"/>
                  <span class="redB" v-if="tr.rankchange>0">{{tr.rankchange}}</span>
                  <span class="blueB" v-if="tr.rankchange<0">{{-(tr.rankchange)}}</span>
                  <p class="xinjin" v-show="xinjin">新进榜</p>
                </th>
                <th class="zongrank" v-else>落榜</th>
                <th>{{tr.LastReleaseDate}}</th>
                <th class="change" v-if="tr.company.name">{{tr.company.name}}</th>
                <th class="change" v-else>--</th>
              </tr>
            </tbody>
            
          </table>
          <!-- scroll -->
          <div v-show="contentShow" class="scrollDiv">
                  <div>
                    <p v-show="infiniteMsgShow" class="tips">
                      <i class="el-icon-loading"></i>
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
      // index:0,
      isSelect: 0, //排名上升下降加样式
      upfontval: '',
      upfont: true,
      isSelectfont: '', //榜单分类加样式
      index: 0, //榜单分类index
      // zongsData: [],
      zongsData:{
        Data:[]
      },
      ranktitle:'',//标题
      // page: 1,
      // pageSize: 20,
      contentShow: false,
      infiniteMsgShow: false,
      bomfont:'我是有底线的~',
      // 总分类
      lis: [{ name: '排名上升应用' }, { name: '排名下降应用' },{ name: '新进榜应用' },{ name: '落榜应用' }],
      showup:true,//是否显示落榜
      xinjin:false,// 新进榜字样
      scrollHeight: 0,
      total_number: 0 //修改排序错乱

    }
  },
  created() {
    
      if(this.$route.query.index==1){
        this.isSelect=0
      }else if(this.$route.query.index==2){
        this.isSelect=1
      }if(this.$route.query.index==3){
        this.isSelect=2
      }if(this.$route.query.index==4){
        this.isSelect=3
      }
      this.getData()
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     let that = this
  //     //当页面滚动的时候  加载  滚动加载
  //     window.onscroll = function() {
  //       //变量scrollTop是滚动条滚动时，距离顶部的距离
  //       var scrollTop =
  //         document.documentElement.scrollTop || document.body.scrollTop
  //       //变量windowHeight是可视区的高度
  //       var windowHeight =
  //         document.documentElement.clientHeight || document.body.clientHeight
  //       //变量scrollHeight是滚动条的总高度
  //       that.scrollHeight =
  //         document.documentElement.scrollHeight || document.body.scrollHeight //滚动条到底部的条件
  //       var int = Math.round(scrollTop + windowHeight)
  //       if (
  //         int == that.scrollHeight ||
  //         int + 1 == that.scrollHeight ||
  //         int - 1 == that.scrollHeight
  //       ) {
  //         // 请求数据
  //         // that.getData()
  //       }
  //     }
  //   })
  // },
  methods: {
    
    //请求数据
    getData(){
      this.contentShow=true
      this.infiniteMsgShow=true
      this.zongsData="";

      // 时间
      let time = this.$route.query.time.replace("T"," ") 
      // 选中哪个应用
      

      let option=""
      if(this.isSelect==0){
        option=1//上升
        this.xinjin=false
        this.showup=true
      }else if(this.isSelect==1){
        option=2//下降
        this.xinjin=false
        this.showup=true
      }else if(this.isSelect==2){
        option=3//新进
        this.xinjin=true
        this.showup=true
      }else if(this.isSelect==3){
        option=4//落榜
        this.xinjin=false
        this.showup=false
      }
      // 设备
      let device="";
      if(this.$route.query.device==1){
        device="iphone"
      }else{
        device="ipad"
      }
      // 类型
      let lei=""
      if(this.$route.query.brand==1){
        lei="免费榜"
      }else if(this.$route.query.brand==2){
        lei="付费榜"
      }else{
        lei="畅销榜"
      }
      // title
      this.ranktitle=time +'/中国-'+device +'-'+lei
      // 数据接口
          this.$axios({
            method:"post",
            url:"/PostRankSnapshotChange",
            data:{
              brand:this.$route.query.brand,
              device:this.$route.query.device,
              countryid:1,
              option:option,
              date:time,
              genreid:this.$route.query.gid,
              pid:this.$route.query.pid
            }
           })  
            .then(res=>{
              if(res.data.Code==0){
                this.contentShow=true
                this.infiniteMsgShow=false

                 this.zongsData=res.data
                 this.upfontval="对比前一榜单共有"+res.data.Data.length+"个排名上升应用"
                 if(this.isSelect==0){
                    this.upfontval="对比前一榜单共有"+res.data.Data.length+"个排名上升应用"//上升
                  }else if(this.isSelect==1){
                    this.upfontval="对比前一榜单共有"+res.data.Data.length+"个排名下降应用"//下降
                  }else if(this.isSelect==2){
                    this.upfontval="对比前一榜单共有"+res.data.Data.length+"个新进榜应用"//新进
                  }else if(this.isSelect==3){
                    this.upfontval="对比前一榜单共有"+res.data.Data.length+"个落榜应用"//落榜
                  }
              }
             
            })
            .catch(error=>{
              console.log(error)
            })
                        
        
       
    },
    //点击排名上升/下降
    selectLei(index) {
      this.isSelect = index
      // this.showApplication = false
      // this.showGame = false

      this.zongsData.length = 0
      this.getData()
      
    },
    go_to_page01(parm, parm02) {
     
      let that=this
      let coun="中国"
      let routerUrl = this.$router.resolve(
       {path: '/now_ranking', query: {now_country:coun,now_app_id:parm}})
      window.open(routerUrl.href, '_blank')
    },
  }
}
</script>



<style scoped>
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
.down {
  width: 8px;
  height: 8px;
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
  width: 116px;
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

.content .country > div {
  display: inline-block;
}
.content .lei > div:last-child {
  margin-left: 30px;
}
.content .country > div:nth-child(2) {
  margin-left: 11px;
}
.content .country > div:nth-child(3) {
  margin-left: 21px;
}
.content .country > div p {
  height: 24px;
  line-height: 25px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  font-size: 13px;
  color: #444444;
  display: inline-block;
  padding: 0 12px;
  margin-left: 10px;
}
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
.content .country > div p:first-child {
  font-weight: 600;
  color: #222222;
  border: none;
  padding: 0;
  margin-left: 0;
}
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
  height: 17px;
  background-color: #429ae8;
}
.content .zongbang .tit .font {
  font-weight: 600;
  font-size: 18px;
  color: #222222;
  vertical-align: top;
  margin-top: -4px;
  margin-left: 3px;
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
  width: 295px;
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
  color: #222;
  float: left;
  width: 40px;
  margin-left: 10px;
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
  margin-left: 10px;
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
  margin-top: 2px;

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
  margin-top: 5px;
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
table tbody tr th >.dir{
  margin-top: 17px;
  width: 8px;
  height: 8px;
  vertical-align: top;
}
table tbody tr th.zongrank > img {
 
  margin: 0px 5px;
  margin-top: 5px;
}
.redB{
    color: #f50202;
}
.blueB{
    color: #009bef;
}
.xinjin{
  font-size: 13px;
  color: #009bef;
  margin-top: 5px;
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
  /*font-family: SourceHanSansCN-Regular;*/
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