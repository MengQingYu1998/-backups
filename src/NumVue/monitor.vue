<template>
	<div class="box" id="monitor">
		<div class="title">App Store榜单更新监测
		</div>
		<div class="content">
			<div class="lei">
				<div>
					<p class="category">类别</p>
					<p class="font" v-bind:class="{selectFont:isFontZ}" @click="showZ()">总榜</p>
					<p class="font" @click.stop="showY()" id="myPanel" v-bind:class="{selectFont:isFont}">
						<span class="valY" v-html="valueY"></span>
						<img src="../assets/NumImg/down.png" class="down" v-show="downL"/> 
						<img src="../assets/NumImg/downW.png" class="down" v-show="downWL"/>
						<img src="../assets/NumImg/upW.png" class="down" v-show="upWL"/>
					</p>
					<p class="font" @click.stop="showG()" v-bind:class="{selectFont:isFontG}">
						<span class="valG" v-html="valueG"></span>
						<img src="../assets/NumImg/down.png" class="down" v-show="downG"/>
						<img src="../assets/NumImg/downW.png" class="down" v-show="downWG"/>
						<img src="../assets/NumImg/upW.png" class="down" v-show="upWG"/>
					</p>
				</div>
				<div>
					<p class="fenlei">榜单分类</p>
					<p class="font" v-for="(brankLei,index) in brands" :class="{'selectFont':isSelectfont==index}"  @click="clibLei(index)" :key="index">{{brankLei.name}}</p>
				</div>
				
				<div>
					<p>日期</p>
					<!-- element日期选择插件 -->
					<el-date-picker
				        :picker-options="pickerOptions2"
				        v-model="dateV"
				        type="date"
				        placeholder="选择日期"
								clear-icon
				    ></el-date-picker>
				</div>
			</div>
			<div class="Leibox">
				<!-- 应用下拉框 -->
				<div class="ying" v-if="showApplication" >
					<img src="../assets/NumImg/jiao.png" class="jiao" />
					<div class="lie">
						<span v-for="Application in Applications.Data" v-html="Application.name" @click="cliLie(Application)" :key="Application.id"></span>
					</div>
				</div>
				<!-- 游戏下拉框 -->
				<div class="game" v-show="showGame">
					<img src="../assets/NumImg/jiao.png" class="jiao" />
					<div class="lie">
						<span v-for="game in games.Data" v-html="game.name" @click="cliGame(game)" :key="game.id"></span>
					</div>
				</div>
			</div>
			
			<div class="dataTable">
				<div>
					<div class="thead">
						<p v-html="nowDate"></p>	
					</div>
					<div class="dataCon" v-for="(tr1,index) in trs1.RankMonitorList" :key="index">
						<div class="time" v-if="tr1.UpNum==0&&tr1.DownNum==0&&tr1.NewNum==0&&tr1.DropNum==0">
							{{tr1.HHmm}}
						</div>
						<div class="trend" v-on:click="goDetail()" v-else>
								<p>{{tr1.HHmm}}</p>
								<div>
									<p>
										<span>上升{{tr1.UpNum}}</span>
										<span>下降{{tr1.DownNum}}</span>
									</p>
									<p>
										<span>新进{{tr1.NewNum}}</span>
										<span>落榜{{tr1.DropNum}}</span>
									</p>
								</div>
						</div>
					</div>
				</div>

				<div>
					<div class="thead">
						<p v-html="nowDateY"></p>	
					</div>
					<div class="dataCon" v-for="(tr2,index) in trs2.RankMonitorList" :key="index">
						<div class="time" v-if="tr2.UpNum==0&&tr2.DownNum==0&&tr2.NewNum==0&&tr2.DropNum==0">
								{{tr2.HHmm}}
						</div>
						<div class="trend" v-on:click="goDetail()" v-else>
								<p>{{tr2.HHmm}}</p>
								<div>
									<p>
										<span>上升{{tr2.UpNum}}</span>
										<span>下降{{tr2.DownNum}}</span>
									</p>
									<p>
										<span>新进{{tr2.NewNum}}</span>
										<span>落榜{{tr2.DropNum}}</span>
									</p>
								</div>
						</div>
					</div>
				</div>
				
				<div>
					<div class="thead">
						<p v-html="nowDateE"></p>	
					</div>
					<div class="dataCon" v-for="(tr3,index) in trs3.RankMonitorList" :key="index">
						<div class="time" v-if="tr3.UpNum==0&&tr3.DownNum==0&&tr3.NewNum==0&&tr3.DropNum==0">
								{{tr3.HHmm}}
						</div>
						<div class="trend" v-on:click="goDetail()" v-else>
								<p>{{tr3.HHmm}}</p>
								<div>
									<p>
										<span>上升{{tr3.UpNum}}</span>
										<span>下降{{tr3.DownNum}}</span>
									</p>
									<p>
										<span>新进{{tr3.NewNum}}</span>
										<span>落榜{{tr3.DropNum}}</span>
									</p>
								</div>
						</div>
					</div>
				</div>
				
				<div>
					<div class="thead">
						<p v-html="nowDateS"></p>	
					</div>
					<div class="dataCon" v-for="(tr4,index) in trs4.RankMonitorList" :key="index">
						<div class="time" v-if="tr4.UpNum==0&&tr4.DownNum==0&&tr4.NewNum==0&&tr4.DropNum==0">
								{{tr4.HHmm}}
						</div>
						<div class="trend" v-on:click="goDetail()" v-else>
								<p>{{tr4.HHmm}}</p>
								<div>
									<p>
										<span>上升{{tr4.UpNum}}</span>
										<span>下降{{tr4.DownNum}}</span>
									</p>
									<p>
										<span>新进{{tr4.NewNum}}</span>
										<span>落榜{{tr4.DropNum}}</span>
									</p>
								</div>
						</div>
					</div>
				</div>
				
				<div>
					<div class="thead">
						<p v-html="nowDateF"></p>	
					</div>
					<div class="dataCon" v-for="(tr5,index) in trs5.RankMonitorList" :key="index">
						<div class="time" v-if="tr5.UpNum==0&&tr5.DownNum==0&&tr5.NewNum==0&&tr5.DropNum==0">
								{{tr5.HHmm}}
						</div>
						<div class="trend" v-on:click="goDetail()" v-else>
								<p>{{tr5.HHmm}}</p>
								<div>
									<p>
										<span>上升{{tr5.UpNum}}</span>
										<span>下降{{tr5.DownNum}}</span>
									</p>
									<p>
										<span>新进{{tr5.NewNum}}</span>
										<span>落榜{{tr5.DropNum}}</span>
									</p>
								</div>
						</div>
					</div>
				</div>
				
				<div>
					<div class="thead">
						<p v-html="nowDateW"></p>	
					</div>
					<div class="dataCon" v-for="(tr6,index) in trs6.RankMonitorList" :key="index">
						<div class="time" v-if="tr6.UpNum==0&&tr6.DownNum==0&&tr6.NewNum==0&&tr6.DropNum==0">
								{{tr6.HHmm}}
						</div>
						<div class="trend" v-on:click="goDetail()" v-else>
								<p>{{tr6.HHmm}}</p>
								<div>
									<p>
										<span>上升{{tr6.UpNum}}</span>
										<span>下降{{tr6.DownNum}}</span>
									</p>
									<p>
										<span>新进{{tr6.NewNum}}</span>
										<span>落榜{{tr6.DropNum}}</span>
									</p>
								</div>
						</div>
					</div>
				</div>
				
				<div>
					<div class="thead">
						<p v-html="nowDateL"></p>	
					</div>
					<div class="dataCon" v-for="(tr7,index) in trs7.RankMonitorList" :key="index">
						<div class="time" v-if="tr7.UpNum==0&&tr7.DownNum==0&&tr7.NewNum==0&&tr7.DropNum==0">
								{{tr7.HHmm}}
						</div>
						<div class="trend" v-on:click="goDetail()" v-else>
								<p>{{tr7.HHmm}}</p>
								<div>
									<p>
										<span>上升{{tr7.UpNum}}</span>
										<span>下降{{tr7.DownNum}}</span>
									</p>
									<p>
										<span>新进{{tr7.NewNum}}</span>
										<span>落榜{{tr7.DropNum}}</span>
									</p>
								</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>

</template>


<script>
	import { formatDate } from '../common/util.js'
	export default{
		data(){
			return{
				// showtime:false,
				showApplication:false,
				showGame:false,
				valueY:'应用',
				valueG:'游戏',
				isFontZ:true,
				isFont:false,
				isFontG:false,
				downL:true,
				downWL:false,
				upWL:false,
				downG:true,
				downWG:false,
				upWG:false,
				// 榜单分类样式
				isSelectfont:'',
				index:0,
				nowDateY:'',//前一天
				nowDateE:'',//前二天
				nowDateS:'',//前三天
				nowDateF:'',//前四天
				nowDateW:'',//前五天
				nowDateL:'',//前六天
				//当前选中的日期
				nowDate:new Date(),
			    dateV: new Date(),
			    pickerOptions2: {
			        disabledDate(time) {
			          return time.getTime() > Date.now()
			          // 这里就是设置当天后的日期不能被点击
			        }
			    },
				now_Application:'应用',
				// 榜单分类
				brands:[
					{name:'免费'},
					{name:'付费'},
					{name:'畅销'}
				],
				// 应用
				Applications:{
					Data:[]
				},
				// 游戏
				games:{
					Data:[]
				},
				fontTimeY:true,
				// 表格
				// trs:[]
				clockInfoList:[],
				trs1:{
					RankMonitorList:[]
				},
				trs2:{
					RankMonitorList:[]
				},
				trs3:{
					RankMonitorList:[]
				},
				trs4:{
					RankMonitorList:[]
				},
				trs5:{
					RankMonitorList:[]
				},
				trs6:{
					RankMonitorList:[]
				},
				trs7:{
					RankMonitorList:[]
				}
			}
		},
		mounted(){
			let that = this
			// 点击其他地方弹窗消失
		    that.globalClick(() => {
		      that.showApplication= false
		      that.showGame = false
		    })
		},
		methods:{
			
			//请求数据
			getData(){
				// 传给后台的brand值
				let brandV=1
				if(this.isSelectfont==0){
					brandV=1
				}else if(this.isSelectfont==1){
					brandV=2
				}else{
					brandV=3
				}
				//传给后台的pid值
				let pidV=36
				if(this.isFontZ==true){
					pidV=36
				}else if(this.isFont==true){
					pidV=5000
				}else if(this.isFontG==true){
					pidV=6014
				}
				// 传给后台的日期值
				let newDate=formatDate(this.dateV, 'yyyy-MM-dd')
				// 当前选择日期
				this.nowDate=newDate
				
				//分类数据
				//传给后台的分类id(genreid)值
				let geid=36
				this.$axios({
					method:"get",
					url:'/GetGenre?genreID='+pidV
						
				})
				.then(res => {
					if (res.data.Code == 0) {
						this.Applications=res.data
						this.games=res.data
						if(pidV==36){
					        geid=36	
					    }else{
					        for(var i=0;i<res.data.Data.length;i++){
						        if(this.now_Application==res.data.Data[i].name){
									geid = res.data.Data[i].id
						 		}
						    }
					    }
					    //表格数据
						this.$axios({
							method:"post",
							url:"/PostRankMonitor",
							data: {
								brand:brandV,
								device:1,
								countryid:1,
								genreid:geid,
								date:newDate
							}
						})
						.then(res => {
							if (res.data.Code == 0) {
								//获取当前日期的前七天日期 
								this.nowDateY=res.data.Data[5].Date
								this.nowDateE=res.data.Data[4].Date
								this.nowDateS=res.data.Data[3].Date
								this.nowDateF=res.data.Data[2].Date
								this.nowDateW=res.data.Data[1].Date
								this.nowDateL=res.data.Data[0].Date
								
								this.trs1=res.data.Data[6]
								this.trs2=res.data.Data[5]
								this.trs3=res.data.Data[4]
								this.trs4=res.data.Data[3]
								this.trs5=res.data.Data[2]
								this.trs6=res.data.Data[1]
								this.trs7=res.data.Data[0]
								var a=this.trs2.RankMonitorList.length
								// for(var j=0;j<a;j++){
								// 	console.log(this.trs2[j].UpNum)
								// }
							}
						})
						.catch(error => {
							console.log(error)
						})
					}
				})
				.catch(error => {
					console.log(error)
				})
				
			},
			// 点击总榜
			showZ(){
				// 应用小三角
				this.upWL=false
				this.downL=true
				this.downWL=false
				//游戏小三角
				this.upWG=false
				this.downG=true
				this.downWG=false

				this.isFontZ=true
				this.isFont=false
				this.isFontG=false
				this.showApplication = false;
				this.showGame=false;
				this.valueY="应用"
				this.valueG="游戏"
				this.getData()
			},
			// 点击应用榜
			showY(){
				this.now_Application="全部应用"
				if(this.showApplication==false){
					this.showApplication = true
					// 应用小三角
					this.upWL=true
					this.downL=false
					this.downWL=false
				}else{
					this.showApplication = false
					
					// 应用小三角
					this.upWL=false
					this.downL=false
					this.downWL=true
				}
				this.showGame=false
				this.isFont=true
				this.isFontZ=false
				this.isFontG=false
				
				//游戏小三角
				this.upWG=false
				this.downG=true
				this.downWG=false

				this.valueG="游戏"
				this.getData()
			},
			// 点击游戏榜
			showG(){
				this.now_Application="全部游戏"
				if(this.showGame==true){
					this.showGame=false
					//游戏小三角
					this.upWG=false
					this.downG=false
					this.downWG=true
				}else{
					this.showGame=true
					//游戏小三角
					this.upWG=true
					this.downG=false
					this.downWG=false
				}
				
				this.showApplication=false
				this.isFontZ=false
				this.isFontG=true
				this.isFont=false
				// 应用小三角
				this.upWL=false
				this.downL=true
				this.downWL=false
				
				this.valueY="应用"
				this.getData()
			},
			// 点击应用option
			cliLie(Application){
				this.valueY=Application.name
				this.showApplication=false
				this.upWL=false
				this.downWL=true
				this.now_Application=Application.name
				this.getData()
			},
			cliGame(game){
				this.valueG=game.name
				this.showGame=false
				this.upWG=false
				this.downWG=true
				this.now_Application=game.name
				this.getData()
			},
			//点击榜单分类
			clibLei(index){
				this.isSelectfont=index
				this.showApplication = false;
				this.showGame=false;
				this.getData()
			},
			// 跳转到榜单更新检测的排名页面
			goDetail(){
				this.$router.push({ path: '/rankapp' })
			}
		},
		created(){
			this.getData()
			this.$watch('dateV',function(Value, oldValue) {
		      // 当前日期发生变化，重新请求数据
		      this.getData()
		    })
		}
	}

</script>



<style scoped>
.Leibox{
	position: absolute;
	top:41px;
	z-index: 99;
}
.Leibox{
	top:197px;
}
.Leibox >div .jiao{
	width: 23px;
	height: 12px;
}
.Leibox >div{
	display: inline-block;
	text-align: center;
}
.Leibox >div.ying{
	margin-left: 60px;
}
.Leibox >div.game{
	margin-left: 130px;
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
	font-family: SourceHanSansCN-Normal;
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
  font-family: SourceHanSansCN-Medium;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  line-height: 86px;
}
.down{
  width: 8px;
  height: 8px;
}
.content{
  width: 1200px;
  min-height: 400px;
  margin:0 auto;
}
.content .lei{
	margin-top: 22px;
}
.content .lei>div{
	display: inline-block;
}
.content .lei>div:nth-child(2),
.content .lei>div:last-child{
	margin-left: 30px;
}

.content .lei>div p{
	height: 24px;
	line-height: 25px;
	text-align: center;
	border-radius: 4px;
	border: solid 1px #dfdfdf;
	font-family: SourceHanSansCN-Normal;
	font-size: 13px;
	color: #444444;
	display: inline-block;
	padding: 0 12px;
	margin-left: 10px;
}
.content .lei>div p:hover{
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
.content .lei>div p:first-child{
	font-family: SourceHanSansCN-Medium;
	color: #222222;
	border:none;
	padding: 0;
	margin-left: 0;
}
.content .lei>div p:first-child:hover{
	background-color: transparent;
	color: #222222!important;
	border: none!important;
	cursor: inherit;
}

.dataTable{
	width: 100%;
	border: solid 1px #f2f2f2;
	margin-top: 64px;
	margin-bottom: 55px;
	border-collapse:collapse;
	display: flex;
    align-items: center;
}
.dataTable>div{
	width: 171.28px;
	display: inline-block;
	border-left: solid 1px #f2f2f2;
}
.dataTable>div:first-child{
	border-left: none;
}
.dataTable>div .dataCon{
	height: 82px;
	border-bottom: 1px solid #f2f2f2;
}
.dataTable>div .dataCon:last-child{
	border-bottom:none;
}
.dataTable .thead{
	text-align: center;
	background-color: #f7f7f7;
}
.dataTable .thead p{
	font-family: SourceHanSansCN-Medium;
	font-size: 13px;
	color: #222222;
}
.thead p{
	height: 40px;
	line-height: 40px;
}
.time{
	width:100%;
	height: 100%;
	line-height: 80px;
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	color: #444444;
	text-align: center;
}
.trend{
	width: 100%;
	height: 100%;
	background-color: #f0faff;
	/*border-top: 1px solid transparent;*/
}
.trend:hover{
	cursor: pointer;
	background-color: #e2f5ff;
}
.trend>p{
	font-family: SourceHanSansCN-Medium;
	font-size: 14px;
	line-height: 30px;
	color: #009bef;
	padding-top: 3px;
	text-align: center;
}
.trend>div p{
	text-align: left;
	margin-left: 22px;
	margin-top: -7px;
}
.trend>div p span{
	font-family: SourceHanSansCN-Normal;
	font-size: 13px;
	line-height: 30px;
	color: #888888;
	width:65px;
	display: inline-block;
}

</style>