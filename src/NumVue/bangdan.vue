<template>
	<div class="bangdan" id="bangdan">
		
		<div class="title">
			ios榜单实时排名—<span v-html="countryname"></span>
		</div>
		<div class="content">
			<ul>
				<li v-for="(li,index) in lis" :key="'LY06'+index" :class="{'select':isSelect==index}"  @click="selectLei(index)">{{li.name}}</li>
			</ul>
			<div class="lei">
				<div>
					<p class="fenlei">榜单分类</p> 
					<p class="font" v-for="(genre,index) in genres" :key="'LY07'+index" :class="{'selectFont':selefont==index}" @click="cligenre(index)">{{genre.name}}</p>
				</div>
				<div>
					<p>国家/地区</p>
					<!-- 选择国家 -->
          			<country @childFn="parentFn"></country>
				</div>
				<div>
					<p>设备</p>
					<el-select v-model="equipmentValue">
				        <el-option v-for="item in  equipment" :key="item.B"  :value="item.value">
				        </el-option>
				    </el-select>

				</div>
				<div class="date" id="dateValue01">
					<p>日期</p>
					<!-- element日期组件 -->
					<el-date-picker :picker-options="pickerOptions2"
				    v-model="dateV" type="date" placeholder="选择日期"clear-icon @focus="dateValue_focus01()" @blur="dateValue_blur01()" prefix-icon="el-icon-caret-bottom"
				    ></el-date-picker>
				    
				</div>
			</div>
			

			<div class="sonlei" v-show="showson">
				<div>
					<p>子分类</p>
					<div>
						<p v-for="(Application,index) in sons.Data" v-bind:class="{'selectFont':isFont==index}" :key="Application.id" @click="cliLie(Application,index)">{{Application.name}}</p>
					</div>
					
				</div>
				
			</div>
			<div class="kuaizhao" v-show="kuaizhao">
				<p>榜单快照</p>
				<div>
					<div v-for="tim in timezs.Data" :key="tim.index" >
						<el-popover  trigger="hover" placement="bottom">

							<div>
								<p @click="goDetail(tim.Brand,tim.DeviceType,tim.AddTime,tim.GenreID,tim.pid,1)">上升应用<span>{{tim.UpNum}}</span></p>
								<p @click="goDetail(tim.Brand,tim.DeviceType,tim.AddTime,tim.GenreID,tim.pid,2)">下降应用<span>{{tim.DownNum}}</span></p>
								<p @click="goDetail(tim.Brand,tim.DeviceType,tim.AddTime,tim.GenreID,tim.pid,3)">新进榜应用<span>{{tim.NewNum}}</span></p>
								<p @click="goDetail(tim.Brand,tim.DeviceType,tim.AddTime,tim.GenreID,tim.pid,4)">落榜应用<span>{{tim.DropNum}}</span></p>
							</div>

						    <p slot="reference" v-html="gettim(tim.AddTime)" :class="{'has':tim.UpNum!=0||tim.DownNum!=0||tim.NewNum!=0||tim.DropNum!=0}" @click="clitim(tim)"></p>
						</el-popover>
					  	<img src="../assets/NumImg/dash.png"/>
					</div>
				</div>
				
			</div>
			<div class="zongbang">
				<div class="tit">
					<p class="line"></p>
					<p class="font" v-html="fenFont"></p>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th class="yingyong">应用</th>
								<th v-html="rankfont"></th>
								<th>分类榜排名</th>
								<th>关键词覆盖</th>
								<th>评分统计</th>
								<th>最新版本</th>
								<th class="company">公司名称</th>
							</tr>
						</thead>
						<tbody v-if="hasbangdata">
							<tr v-for="tr in zongsData" :key="tr.index">
								<th class="yingyong" @click="go_to_page01(tr.appID,tr.appName)">
									<p class="ranking">{{tr.index}}</p>
									<img :src="tr.icon" class="logo" />
									<div class="msg">
										<p class="appname">{{tr.appName}}</p>
										<p class="company">{{tr.publisher}}</p>
									</div>
								</th>
								<th class="zongrank" v-if="tr.rank_a">
									<span >{{tr.rank_a.rankID}}</span>
									<img src="../assets/NumImg/right.png" class="dir right" v-show="tr.rank_a.rankChange==0"/>
									<img src="../assets/NumImg/up.png" class="dir right" v-show="tr.rank_a.rankChange>0"/>
									<img src="../assets/NumImg/xia.png" class="dir right" v-show="tr.rank_a.rankChange<0"/>
									<span v-if='tr.rank_a.rankChange>0' class="redB">{{tr.rank_a.rankChange}}</span>
									<span v-if='tr.rank_a.rankChange==0'>{{tr.rank_a.rankChange}}</span>
									<span v-if='tr.rank_a.rankChange<0' class="blueB">{{-(tr.rank_a.rankChange)}}</span>
								</th>
								<th v-else>--</th>
								<th v-if="tr.rank_b">
									<div class="now" v-if="tr.rank_b">
										<p>{{tr.rank_b.rankID}}</p>
										<p class="shejiao" >{{tr.rank_b.genreName}}</p>
									</div>
									<img src="../assets/NumImg/right.png" class="dir right" v-show="tr.rank_b.rankChange==0"/>
									<img src="../assets/NumImg/up.png" class="dir right" v-show="tr.rank_b.rankChange>0"/>
									<img src="../assets/NumImg/xia.png" class="dir right" v-show="tr.rank_b.rankChange<0"/>
								
									<span v-if='tr.rank_b.rankChange>0' class="before redB">{{tr.rank_b.rankChange}}</span>
									<span v-if='tr.rank_b.rankChange==0' class="before">{{tr.rank_b.rankChange}}</span>
									<span v-if='tr.rank_b.rankChange<0' class="before blueB">{{-(tr.rank_b.rankChange)}}</span>
								</th>
								<th v-else>--</th>
								<th>{{tr.keywordCover}}</th>
								<th>{{tr.comment.num}}</th>
								<th>{{tr.LastReleaseDate}}</th>
								<th class="company" v-if="tr.company.name">{{tr.company.name}}</th>
								<th class="company companyb" v-else>--</th>
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
	// 引入国家选择组件
	import country from '../common/country_select/country'
	import { formatDate,time_rotate,time_reset } from '../common/util.js'
	
	export default{
		components: { country },
		data(){
			
			return{
				rankfont:'应用榜排名',//排名文字
				countryname:'中国',//导航条上面的国家
				isFont:0,
				isSelect:0,
				selefont:'',
				hasNum:true,//是否有数据
				timnow:'',//最接近当前时间榜单快照
				kuaizTim:'',//点击的榜单快照时间
				fenFont:'应用总榜',//总分类文字
				// 当前选中日期
				dateV: new Date(),
			    pickerOptions2: {
			        disabledDate(time) {
			          return time.getTime() > Date.now()
			          // 这里就是设置当天后的日期不能被点击
			        }
			    },
			    // 当前选中类别
			    now_Application:'全部应用',
			    equipmentValue: 'iPhone',
			    // 获取当前选中的国家
      			 now_country: '中国',
			    // 设备选择
			   	equipment: [
			        {
			          value: 'iPhone'
			        },
			        {
			          value: 'iPad'
			        }
			    ],
			    // table数据
				zongsData:[],
				page:1,
				pageSize:20,
				contentShow:true,
				infiniteMsgShow:true,
				bomfont:'我是有底线的~',
				// 总分类
				lis:[
					{name:'应用总榜'},{name:'游戏总榜'},{name:'iOS10总榜'}
				],
				// 榜单分类
				genres:[
					{name:'免费'},
					{name:'付费'},
					{name:'畅销'},
				],
				
				// 榜单快照
				timezs:{
					Data:[]
				},
				// 子分类
				sons:{
					Data:[]

				},
				showson:true,
			    //当前时间font
				timFont:'当前时间',
				scrollHeight:0,
				// canscroll:false,
				total_number:0,//修改排序错乱
				// 榜单快照
				kuaizhao:false,
				// 是否有数据
				hasbangdata:true,
				can_execute_scorll: true,//是否可以执行滚动
			}
		},
		created(){
			this.scrollHeight=0
			this.getData()
			this.$watch('dateV',function(Value, oldValue) {
		      // 当前日期发生变化，重新请求数据
		      this.kuaizTim='';
		      this.zongsData.length=0
			  this.page=1
		      this.getData()
		    })
		    this.$watch('equipmentValue',function(Value, oldValue) {
		    	// 设备
		    	this.zongsData.length=0
				this.page=1
		        this.getData()
		    })
		    this.$watch('now_country', function(newValue, oldValue) {

		      // 当前国家发生变化，重新请求数据...
		        this.zongsData.length=0
				this.page=1
		        this.getData()
		    })

		},
		mounted() {

			let that = this
			// 点击其他地方弹窗消失
		    that.globalClick(() => {
		      that.showApplication = false
		      that.showGame = false
		    })

		    that.$nextTick(() => {
		      let that = this
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
		        var int=Math.round(scrollTop + windowHeight)

		        if (int == that.scrollHeight||int+1 == that.scrollHeight||int-1 == that.scrollHeight) {
		          // 调用请求数据接口
		          	
		        
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
		methods:{
			// 跳转到榜单更新检测的排名页面
			goDetail(parm01,parm02,parm03,parm04,parm05,parm06){
				this.$router.push({path:'/rankapp',query:{brand:parm01,device:parm02,time:parm03,gid:parm04,pid:parm05,index:parm06} })
			} ,
		    // 获取当前选中的国家
			parentFn(payload) {
				this.now_country = payload
			},
			// 控制时间组件旋转
		    // 1.给日期组件的父类添加一个新的id
		    // 2.添加两个事件
		    // 3.复制以下代码
		    dateValue_blur01(){
				// console.log('失去焦点')
				time_reset("#dateValue01")
		       
		    },
		    dateValue_focus01(){
		        //console.log('得到焦点1')     
				time_rotate("#dateValue01")    
			
		    },
		
			// 获取数据
			getData(){

				this.can_execute_scorll = false
				this.contentShow=true
                this.infiniteMsgShow=true
				
				// this.kuaizTim=""
				this.total_number+=1
				let number=this.total_number
				// this.kuaizhao=true
				// 传给后台的brand值
				let brandV=1
				if(this.selefont==0){
					brandV=1
				}else if(this.selefont==1){
					brandV=2
				}else{
					brandV=3
				}

				// 传给后台的pid
				let pidV=5000
				let geid=''

				if(this.isSelect==0){
					
					// 点击应用榜
					pidV=5000
				}else if(this.isSelect==1){
					// 点击游戏榜
					pidV=6014
				}else if(this.isSelect==2){
					// 点击总榜
					pidV=36
				}
				
				// 传给后台的date值
				let newDataB=formatDate(this.dateV,'yyyy-MM-dd')

				// 传给后台的device值
				let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
				// 传给后台的genreid
				// let geid=36
				this.$axios({
					method:"get",
					url:'/GetGenre?genreID='+pidV
				})
				.then(res => {
					if (res.data.Code == 0) {

						this.sons=res.data
						if(pidV==36){
					        geid=36	
					    }else{
					    		for(var i=0;i<res.data.Data.length;i++){
									if(this.now_Application==res.data.Data[i].name){
										geid = res.data.Data[i].id
							 		}
							    }
					    }

					    //传给后台的countryid值
						let country_id=1
						this.$axios({
							method:"get",
							url:'GetCountry'
								
						})
						.then(res=>{
							if(res.data.Code==0){
								this.countryname=this.now_country
								
								for(var i=0;i<res.data.Data.length;i++){
									if (res.data.Data[i].name == this.now_country) {
						              country_id = res.data.Data[i].id
						            }
								}

								if(country_id==1){
									this.kuaizhao=true
								}else{
									this.kuaizhao=false
								}
								// console.log("brandV:"+brandV)
								// console.log("deviceType:"+deviceType)
								// console.log("country_id:"+country_id)
								// console.log("newDataB:"+newDataB)
								// console.log("geid:"+geid)
							    // 榜单快照数据
							    this.$axios({
									method:"post",
									url:"/PostRankSnapshot",
									data: {
										brand:brandV,
										device:deviceType,
										countryid:country_id,
										date:newDataB,
										genreid:geid,
													
									}
								})
								.then(res=>{
									if (res.data.Code == 0&&res.data.Data!=""){


										this.timezs=res.data
							            for(var i=0;i<this.timezs.Data.length;i++){
							              	var miao=this.timezs.Data[this.timezs.Data.length-1].AddTime
							              	this.timnow=miao.slice(11,19)
							            }
							            // 传给后台的snapshot值
							           	let tim=''
							            if(this.kuaizTim==""){
							            	tim=this.timnow
							            }else{
							            	tim=this.kuaizTim.slice(11,19)
							            }
							          	// console.log("brandV:"+brandV)
							          	// console.log("deviceType:"+deviceType)
							          	// console.log("country_id:"+country_id)
							          	// console.log("tim:"+tim)
							          	// console.log("newDataB:"+newDataB)
							          	// console.log("geid:"+geid)
							          	// console.log("pidV:"+pidV)
							          	// console.log("pageindex:"+this.page)
							          	// console.log("pagesize:"+this.pageSize)
							          	
							            // 获取榜单数据
									    this.$axios({
											method:"post",
											url:"/PostAppRank",
											data: {
												brand:brandV,
												device:deviceType,
												countryid:country_id,
												snapshot:tim,
												date:newDataB +' '+ tim,
												genreid:geid,
												pid:pidV,
												pageIndex:this.page,
												pageSize:this.pageSize
												
											}
										})
										.then(res=>{
											if(res.data.Code==0){
												let onlinFont=res.data.pageCount
												if(onlinFont>0&&onlinFont<21){
													this.contentShow = true
													this.infiniteMsgShow = false // 没有更多
													this.bomfont="我是有底线的~"
													this.hasbangdata=true
										        }else if(onlinFont>20){
										        	this.contentShow = true
													this.infiniteMsgShow = false // 加载更多
													this.bomfont="下拉加载更多"
													this.hasbangdata=true
													this.can_execute_scorll = true//是否可以执行滚动

										        }else if(onlinFont==0) {
										            this.contentShow = false
										            this.hasbangdata=false
										        }
										    
											    if(this.total_number==number){
											       		this.zongsData=this.zongsData.concat(res.data.Data)
											       		this.page+=1
											    }
										       
										      
										        
										        let DownloadTotal=(this.pageSize+1)*this.page
										        let pageC=Math.ceil(onlinFont/this.pageSize)
										       
										        if(this.page==pageC+1){
										        	this.can_execute_scorll =false
										        	this.contentShow = true
										            this.infiniteMsgShow = false // 没有更多数据
										            this.bomfont="我是有底线的~"
										            
										        }
										        
											}else{
												this.contentShow = true
										        this.infiniteMsgShow = false // 没有更多数据
											}
											
									       

										})
										.catch(error=>{
											console.log(error)
											this.contentShow = false
										})


									}else{
										this.hasbangdata=false
										this.contentShow = false
									}
														
								})
								.catch(error=>{
									console.log(error)
								})

						        
							}
						})
						.catch(error=>{
							console.log(error)
						})


					    
					}
				})	
				.catch(error=>{
					console.log(error)
				})

			},
			// 榜单快照html
			gettim(parm){
		        var str;
		        for(var i=0;i<parm.length;i++){
		            str = parm.slice(11,16);
					return str;
				}
				
			},
			//点击时间快照
			clitim(tim){

				this.kuaizTim=tim.AddTime
				this.zongsData.length=0
				this.page=1
				this.getData()
			},
			
			// 点击应用子分类
			cliLie(Application,index){
				this.isFont=index
				this.now_Application=Application.name
				// console.log(this.now_Application)
				this.zongsData.length=0
				this.page=1
				this.getData()
			},
			
			// 点击总分类
			selectLei(index){
				this.kuaizTim=""
				this.isSelect=index
				this.isFont=0
				if(this.isSelect==0){
					this.rankfont="应用榜排名"
					this.fenFont='应用总榜'
					this.showson=true
					this.now_Application="全部应用"
					this.zongsData.length=0
					this.page=1
					this.getData()
				}else if(this.isSelect==1){
					this.rankfont="游戏榜排名"
					this.fenFont='游戏总榜'
					this.now_Application="全部游戏"
					this.showson=true
					this.zongsData.length=0
					this.page=1
					this.getData()
				}else{
					this.rankfont="应用/游戏榜排名"
					this.fenFont='IOS10总榜'
					
					// this.now_Application="全部游戏"
					this.showson=false
					this.zongsData.length=0
					this.page=1
					this.getData()
				}
				
			},
			// 点击榜单分类
			cligenre(index){
				this.selefont=index
				this.showGame=false
				this.showApplication=false
				this.zongsData.length=0
				this.page=1
				this.getData()
			},
			go_to_page01(parm, parm02) {
		      let that=this
		console.log(that.now_country)
		      let routerUrl = this.$router.resolve(
		       {path: '/now_ranking', query: {now_country:that.now_country,now_app_id:parm}})
		      window.open(routerUrl.href, '_blank')
		    },
		}
	
	}

</script>



<style scoped>
.el-popover>div{
	width: 120px;
	margin:0 auto;
}
.el-popover p{
  line-height: 30px;
  padding: 0 7px;
}
.el-popover p:hover{
	cursor: pointer;
	background-color: #e9f7ff;
}
.el-popover p span{
  float: right;
  color: #009bef;
}

.blueB{
	color: #009bef;
}
.redB{
	color: #f50202;
}
.Leibox{
	position: absolute;
	top:41px;
	z-index: 99;
}
.Leibox{
	top:222px;
}
.Leibox >div .jiao{
	width: 23px;
	height: 12px;
	margin-top: 4px;
}
.Leibox >div{
	display: inline-block;
	text-align: center;
}
.Leibox >div.ying{
	margin-left: 345px;
}
.Leibox >div.game{
	margin-left: 420px;
}
.Leibox >div >div.lie{
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	box-shadow: 0px 0px 4px 0px 
		rgba(0, 0, 0, 0.28);
	border-radius: 4px;
	border-top: 0.013rem solid transparent;
	text-align: left;
}
.Leibox >div >div.lie{
	width: 168px;
	padding: 7px 0;
}
.Leibox >div >div span{
	margin-left: 15px;
    width: 65px;
	font-size: 13px;
	color: #444444;
	line-height: 30px;
	display: inline-block;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.Leibox >div >div span:hover{
	color: #009bef;
	cursor: pointer;
}
.title{
  width: 100%;
  height:86px;
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
.down{
  width: 8px;
  height: 8px;
  vertical-align: top;
  margin-top: 9px;
  margin-left: 2px;
}
.content{
  width: 1200px;
  margin:0 auto;
}
.content ul{
	width: 100%;
	height: 52px;
	border-bottom: 1px solid #d6d6d6;
}
.content ul li{
	width: 96px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 16px;
	color: #222;
	float: left;
	margin-top:12px;
	margin-left: 27px;
	font-weight: 600;
}
.content ul li:hover{
	color: #009bef;
	cursor:pointer;
}
.content ul li:first-child{
	margin-left: 0;
}
.select{
	border-bottom: 2px solid #009bef;
}


.content > div {
	margin-top: 16px;
}
.content .lei>div,
.content .country>div{
	display: inline-block;
	margin-left: 20px;
}
.content .lei>div:first-child{
	margin-left: 0;
}
.content .lei>div:last-child{
	margin-left: 30px;
}
.content .country>div:nth-child(2){
	margin-left: 11px;
}
.content .country>div:nth-child(3){
	margin-left: 21px;
}
.content .lei>div p,
.content .country>div p{
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
.content .lei>div p:hover,
.content .country>div p:hover{
	background-color: #f2f2f2;
	color: #444;
	cursor: pointer;
	border: solid 1px #dfdfdf;
}
.selectFont{
	background-color: #009bef;
	color: #ffffff!important;
	border: 1px solid #009bef!important;
}
.selectFont:hover{
	background-color: #38aded!important;
	border: 1px solid #38aded!important;
}
.content .country>div p{
	margin-left: 5px;
}
.content .country>div p.date{
	margin-left: 11px;
}
.content .lei>div p:first-child,
.content .country>div p:first-child{
	font-weight: 600;
	color: #222222;
	border:none;
	padding: 0;
	margin-left: 0;
}
.content .lei>div p:first-child:hover,
.content .country>div p:first-child:hover{
	background-color: transparent;
	color: #222222!important;
	border: none!important;
	cursor: inherit;
}
.content .kuaizhao>p{
	height: 24px;
	line-height: 24px;
	font-weight: 600;
	font-size: 13px;
	color: #222222;
	float: left;
}
.has{
	background-color: #e9f7ff!important;
	border: solid 1px #009bef!important;
	color: #009bef!important;
}
.has:hover,.has:active{
	background-color: #e9f7ff!important;
	border: solid 1px #009bef!important;
	color: #009bef!important;
}
.content .kuaizhao>div{
	margin-left: 66px;
}
.content .kuaizhao>div>div{
	display: inline-block;
}

.content .kuaizhao>div>div:nth-child(12){
	margin-right: 64px;
}
.content .kuaizhao>div>div:nth-child(12) img,
.content .kuaizhao>div>div:last-child img{
	display: none;
}
.content .kuaizhao>div>div:nth-child(13),
.content .kuaizhao>div>div:nth-child(14),
.content .kuaizhao>div>div:nth-child(15),
.content .kuaizhao>div>div:nth-child(16),
.content .kuaizhao>div>div:nth-child(17),
.content .kuaizhao>div>div:nth-child(18),
.content .kuaizhao>div>div:nth-child(19),
.content .kuaizhao>div>div:nth-child(20),
.content .kuaizhao>div>div:nth-child(21),
.content .kuaizhao>div>div:nth-child(22),
.content .kuaizhao>div>div:nth-child(23),
.content .kuaizhao>div>div:nth-child(24){
	margin-top: 15px;
}
.content .kuaizhao>div p{
	height: 24px;
	line-height: 25px;
	text-align: center;
	border-radius: 4px;
	border: solid 1px #d6d6d6;
	font-size: 13px;
	color: #888888;
	display: inline-block;
	padding: 0 9px;
}
.content .kuaizhao>div p:hover{
	background-color: #e9f7ff;
	border: solid 1px #009bef;
	color: #009bef!important;
	cursor: pointer;
}
.nowTim{
	background-color: #009bef;
	color: #fff!important;
	border: solid 1px #009bef;
}
.content .kuaizhao>div img{
	width: 38px;
	height: 1px;
	vertical-align: top;
	margin-top: 12px;
	margin-left: -2px;
    margin-right: -3px;
}
.content .zongbang .tit>p{
	display: inline-block;
}
.content .zongbang .tit .line{
	width: 2px;
	height: 17px;
	background-color: #429ae8;
}
.content .zongbang .tit .font{
    font-weight: 600;
    font-size: 16px;
    color: #222222;
    vertical-align: top;
    margin-top: -1px;
    margin-left: 3px;
    letter-spacing: 1px;
}

.content .zongbang>div table{
	width: 1200px;
	height: 100%;
	border: solid 1px #d6d6d6;
	margin-bottom: 12px;
	margin-top: 12px;
	border-collapse: collapse;
}
table thead{
	width: 1200px;
	height: 40px;
	background-color: #f7f7f7;
}
table thead tr{
	display: -webkit-box;
	height: 40px;
}
table thead tr th{
	font-weight: 600!important;
	font-size: 13px;
	color: #222222;
	line-height: 40px;
}
th{
	font-weight: inherit!important;
}
table tbody tr{
	height: 76px;
	display: inline-table;
	border-top: 1px solid #d6d6d6;
}
table tr th{
	width: 141px;
}
table tr th.yingyong{
	width: 321px;
}
table tr th.company{
	width: 166px;
}
table tbody tr th.company{
	text-align: left;
	padding-left: 8px;
	color: #888;
}
table tbody tr th.companyb{
	text-align: center;
}
table tbody tr th{
	height: 76px;
	font-size: 14px;
	color: #444444;
}
table tbody tr th .shejiao{
	color: #888;
	font-size: 13px;
}
table tbody tr th .ranking{
	font-size: 14px;
	color: #222;
	float: left;
	width: 40px;
	margin-left: 10px;
	margin-top: 15px;
}
table tbody tr:first-child th .ranking p,
table tbody tr:nth-child(2) th .ranking p,
table tbody tr:nth-child(3) th .ranking p{
	color: red;
}
table tbody tr th .logo{
	width: 48px;
	height: 48px;
	border-radius: 10px;
	border: solid 1px #f2f2f2;
	float: left;
	margin-left: 10px;
}
table tbody tr th .msg{
	font-size: 14px;
	color: #888888;
	float: left;
	margin-left: 9px;
	margin-top: 5px;
}
table tbody tr th .msg .appname{
	width: 122px;
	font-size: 14px;
	color: #222222;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
	text-align: left;
}
table tbody tr th .msg .appname:hover{
	color: #009bef;
	cursor: pointer;
}
table tbody tr th .msg .company{
	width: 166px;
	font-size: 13px;
	color: #888888;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
	text-align: left;
	margin-top: 7px;
}
table tbody tr th .now,
table tbody tr th .before{
	display: inline-block;
}
table tbody tr th .before,
table tbody tr th .right{
	vertical-align: top;
	margin-top: 12px;
	margin-left: 5px;
}
table tbody tr th>.dir{
	margin-top: 17px;
	width: 8px;
	height: 8px;
	vertical-align: top;
}
table tbody tr th.zongrank>img{
	margin-top: 5px;
	margin-left: 5px;
	margin-right: 5px;
}
table tbody tr th.zongrank span{
	width: 30px;
	display: inline-block;
	/*border:1px solid red;*/
}
table tbody tr th.zongrank span:first-child{
	text-align: right;
}
table tbody tr th.zongrank span:last-child{
	text-align: left;
}
/*子分类*/
.sonlei>div>div p{
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
}
.sonlei>div>div p:hover{
	cursor: pointer;
}
.sonlei div div{
	display: inline-block;
	margin-left: 12px;
	line-height: 38px;
	width: 1144px;
}
.sonlei>div>p{
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