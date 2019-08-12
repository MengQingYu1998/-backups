<template>
	<div class="box" id="Application">
		
		
		<div class="title">App Store上下架监控
		</div>
		<div class="content">
			<ul>
				<li v-for="(li,index) in lis" :class="{'select':isSelect==index}"  @click="selectLei(index)" :key="index">{{li.name}}</li>
			</ul>
			<div class="lei">
				<div>
					<p class="category">类别</p>
					<p class="font" v-bind:class="{selectFont:isFontZ}" @click="showZ()">总榜</p>
					<p class="font" @click="showY()" id="myPanel" v-bind:class="{selectFont:isFont}">
						<span class="valY" v-html="valueY"></span>
						<img src="../assets/NumImg/down.png" class="down" v-show="downL"/>
						<img src="../assets/NumImg/downW.png" class="down" v-show="downWL"/>
						<img src="../assets/NumImg/upW.png" class="down" v-show="upWL"/>
					</p>
					<p class="font" @click="showG()" v-bind:class="{selectFont:isFontG}">
						<span class="valG" v-html="valueG"></span>
						<img src="../assets/NumImg/down.png" class="down" v-show="downG"/>
						<img src="../assets/NumImg/downW.png" class="down" v-show="downWG"/>
						<img src="../assets/NumImg/upW.png" class="down" v-show="upWG"/>
					</p>
				</div>
				<div>
					<p>国家/地区</p>
					<!-- 选择国家 -->
          			<country @childFn="parentFn"></country>
				</div>
				<div>
					<p>日期</p>
					<!-- element日期组件 -->
					<el-date-picker
				            :picker-options="pickerOptions2"
				            v-model="dateV"
				            type="date"
				            placeholder="选择日期"
				            
				    ></el-date-picker>
				</div>
				<div>
					<p>搜索</p>
					<input type="text" placeholder="请输入搜索应用名称" v-model="searval" @keyup="getsearchVal(searval)"/>
					<button class="search" @click="search()">搜索</button>
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
			<div class="zongbang">
				<div class="tit">
					<p class="line"></p>
					<p class="font" v-show="shangjiatF">共<span v-html="onlinFont"></span>个上架应用</p>
					<p class="font" v-show="xiajiatF">共<span v-html="onlinFont"></span>个下架应用</p>
					<p class="font" v-show="qingbangF">共<span v-html="onlinFontB"></span>个清榜应用</p>
					<p class="font" v-show="qingciF">共<span v-html="onlinFontC">9</span>个清词应用</p>
				</div>
				<div>
					<!-- 上下架应用table -->
					<table v-show="shangjiaF">
						<thead>
							<tr>
								<th class="yingyong">应用</th>
								<th>价格</th>
								<th>分类</th>
								<th v-if="shangT">上架时间</th>
								<th v-else>下架时间</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(tr,index) in zongsdataList" :key="index">
								<th class="yingyong" @click="go_to_page01(tr.appID,tr.appName)">
									<p class="ranking" >{{tr.index}}</p>
									<img :src="tr.icon" class="logo" />
									<div class="msg">
										<p class="appname">{{tr.appName}}</p>
										<p class="company">{{tr.publisher}}</p>
									</div>
								</th>
								<th>{{tr.price}}</th>
								<th>{{tr.genreName}}</th>
								<th>{{tr.date}}</th>
								
							</tr>
						</tbody>
					</table>
					
					<!-- 清榜应用table -->
					<table class="qingbang" v-show="qingbangF" >
						<thead>
							<tr>
								<th class="yingyong">应用</th>
								<th>清榜前应用/游戏排名</th>
								<th>清榜前分类榜排名</th>
								<th>价格</th>
								<th>评论数</th>
								<th>清榜时间</th>
								<th>上架时间</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(tr,index) in zongsBList" :key="index">
								<th class="yingyong" @click="go_to_page01(tr.appID,tr.appName)">
									<p class="ranking" >{{tr.index}}</p>
									<img :src="tr.icon" class="logo" />
									<div class="msg">
										<p class="appname">{{tr.appName}}</p>
										<p class="company">{{tr.publisher}}</p>
									</div>
								</th>
								<th>
									<div v-if="tr.rank_a">
										<p>{{tr.rank_a.rankID}}</p>
										<p>{{tr.rank_a.genreName}}</p>
									</div>
								</th>
								<th>
									<div v-if="tr.rank_b">
										<p>{{tr.rank_b.rankID}}</p>
										<p>{{tr.rank_b.genreName}}</p>
									</div>
								</th>
								<th>{{tr.price}}</th>
								<th>{{tr.comment.num}}</th>
								<th>{{tr.clearTime}}时</th>
								<th>{{tr.isOnlineTime}}</th>
							</tr>
							<tr>
								
							</tr>
						</tbody>
						<!-- <tbody v-else>暂无数据 </tbody> -->
					</table>
					
			        <!-- scroll -->

					<!-- 清词应用table -->
					<table class="qingci" v-if="qingciF">
						<thead>
							<tr>
								<th class="yingyong">应用</th>
								<th>清词前覆盖数</th>
								<th>清词后覆盖数</th>
								<th>分类榜排名</th>
								<th>分类</th>
								<th>价格</th>
								<th>评论数</th>
								<th>清榜时间</th>
								<th>上架时间</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(tr,index) in cidataList" :key="index">
								<th class="yingyong" @click="go_to_page01(tr.appID,tr.appName)">
									<p class="ranking" >{{tr.num}}</p>
									<img src="../assets/NumImg/testIcon.png" class="logo" />
									<div class="msg">
										<p class="appname">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
										<p class="company">啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>
									</div>
								</th>
								<th>200</th>
								<th>
									<span>1</span>
									<img src="../assets/NumImg/xia.png" class="dir right" />
									<span>0</span>
								</th>
								<th>
									<div>
										<p>1</p>
										<p>总榜(免费)</p>
									</div>
								</th>
								<th>角色扮演</th>
								<th>免费</th>
								<th>30756</th>
								<th>2019-02-01 11时</th>
								<th>2019-02-01</th>
							</tr>
						</tbody>
					</table>
					<div class="scrollDiv aaaaa" v-show="contentShow">
			            <div>
			            <p v-show="infiniteMsgShow" class="tips"><!-- 加载更多ing --></p>
			            <p v-show="!infiniteMsgShow" class="tips"> <!-- 没有更多数据 --></p>
			            </div>
			        </div>
					<!-- scroll -->
			       <!--  <div class="scrollDiv bbbbb" v-show="contentShow2">
			            <div>
			            <p v-show="infiniteMsgShow2" class="tips">加载更多ing</p>
			            <p v-show="!infiniteMsgShow2" class="tips"> 没有更多数据</p>
			            </div>
			        </div> -->
				</div>
			</div>
			
		</div>
		
	</div>

</template>


<script>
	// 引入国家选择组件
	import country from '../common/country_select/country'
	import { formatDate } from '../common/util.js'
	export default{
		components: { country },
		data(){
			return{
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
				index:0,//选中应用index
				isSelect:'',//选中应用字体样式
				shangjiatF:true,//上架标题
				xiajiatF:false,//下架标题
				shangjiaF:true,//上下架表格
				qingbangF:false,//清榜标题
				qingciF:false,//清词标题
				shangT:true,//上架时间显示
				now_Application:'',//当前选中类别
				// hasNum:true,//是否有数据
				hasNumB:true,//清榜是否有数据
				onlinFont:'0',//上下架应用数
				onlinFontB:'0',//清榜应用数
				onlinFontC:'0',//清词应用数
				// showci:true,//清词div
				// 获取当前选中的国家
      			now_country: '中国',
				// 当前选中日期
				dateV: new Date(),
			    pickerOptions2: {
			        disabledDate(time) {
			          return time.getTime() > Date.now()
			          // 这里就是设置当天后的日期不能被点击
			        }
			    },
			    // 上下架tbody
				zongsdataList:[],
				page:1,
				pageSize:20,
				contentShow:false,
				infiniteMsgShow:false,
				// 清榜tbody
				zongsBList:[],
				page2:1,
				pageSize2:20,
				// contentShow2:false,
				// infiniteMsgShow2:false,
				// 清词tbody
				cidataList:[],
				// 总分类
				lis:[
					{name:'上架应用'},{name:'下架应用'},{name:'清榜应用'},{name:'清词应用'}
				],
				// 应用
				Applications:{
					Data:[]
				},
				// 游戏
				games:{
					Data:[]
				},
				searval:'',//v-model搜索词
				searchval:'',// 搜索关键词
				canscroll:false
			}
		},
		mounted(){
			this.$nextTick(() => {
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
		          // 需要执行的代码
		          if(that.canscroll){
		            that.page++;  //滚动之后加载第二页
					that.page2++;  //滚动之后加载第二页
					that.getDataB();
					that.getData();
		          }
		            
		          
		        }
		      }
		    })
		},
		
		created(){
			this.getData()
			
			this.$watch('dateV',function(Value, oldValue) {
		      // 当前日期发生变化，重新请求数据
		      // alert(8)
		      this.zongsdataList.length=0
		      this.zongsBList.length=0
		      this.page=1
		      this.page2=1
		      this.getDataci()
		      this.getDataB()
		      this.getData()
		      
		      
		    })
		    this.$watch('now_country', function(newValue, oldValue) {
		      // 当前国家发生变化，重新请求数据...
		      this.zongsdataList.length=0
		      this.page=1
		      this.getData()
		      this.zongsBList.length=0
		      this.page2=1
		      this.getDataci()
		      this.getDataB()
		      
		    })
		},
		methods:{
			// 获取搜索关键词
			getsearchVal(searval){
				this.searchval=searval
				// this.getData()
			},
			// 点击搜索
			search(){
				this.getDataci()
				this.getDataB()
				this.getData()
				
				
			},
			// 上下架应用接口
			getData(){
				
				//传给后台的pid值
				let pidV=36
				if(this.isFontZ==true){
					pidV=36
				}else if(this.isFont==true){
					pidV=5000
				}else if(this.isFontG==true){
					pidV=6014
				}

				// 传给后台的IsOnline值
				let IsOnlineV=1
				if(this.shangT==false){
					IsOnlineV=0
				}else{
					IsOnlineV=1
				}

				// 传给后台的日期值
				let newData=formatDate(this.dateV, 'yyyy-MM-dd')


				//传给后台的countryid值
				let country_id=1
				this.$axios({
					method:"get",
					url:'GetCountry'
						
				})
				.then(res=>{
					if(res.data.Code==0){
				        let arr_country = res.data.Data
				        arr_country.forEach(element => {
				            if (element.name == this.now_country) {
				              country_id = element.id
				              return false
				            }
				        })
				        // 获取genreid
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
							    // 获取应用接口
							  	this.$axios({
									method:"post",
									url:"/PostAppIsOnline",
									data: {
										countryid:country_id,
										genreid:geid,
										date:newData,
										IsOnline:IsOnlineV,
										appKey:this.searchval,
										pageIndex:this.page,
										pageSize:this.pageSize
									}
								})
								.then(res=>{
									// console.log(res.data)
									if(res.data.Code==0){
										// console.log(res.data.Data)
										this.canscroll=true
										this.onlinFont=res.data.pageCount
										// this.contentShow2 = false
										// console.log("上下架："+this.infiniteMsgShow)
										if(this.onlinFont>0){
											this.contentShow = true
											this.infiniteMsgShow = true//加载更多
											
										}else{
											// console.log("上下架："+this.infiniteMsgShow)
											this.contentShow = true
											this.infiniteMsgShow = false//没有更多
											
										}
										if(res.data.Data==""){
											// this.contentShow2 = false
											// console.log("上下架："+this.infiniteMsgShow)
											this.contentShow = true
											this.infiniteMsgShow = false//没有更多
										}
								        this.zongsdataList=this.zongsdataList.concat(res.data.Data)
								        let DownloadTotal=(this.pageSize+1)*this.page
								        let pageC=Math.ceil(this.onlinFont/this.pageSize)
								        // console.log(this.page)
								        // console.log(pageC)
									        if(this.page>=pageC){
									        	// console.log("上下架："+this.infiniteMsgShow)
									        	this.contentShow2 = false
									        	this.contentShow = true
									            this.infiniteMsgShow = false // 没有更多数据
									        }
								       
									}else{
										// this.contentShow2 = false
										// console.log("上下架："+this.infiniteMsgShow)
										this.contentShow = true
									    this.infiniteMsgShow = false//没有更多
									}
									
								})
								.catch(error=>{
									console.log(error)
									// this.contentShow2 = false
									// console.log("上下架："+this.infiniteMsgShow)
									this.contentShow = true
									this.infiniteMsgShow = false
								})
							} 
						})
						.catch(error => {
							console.log(error)
						})



					}
				})
				.catch(error=>{
					console.log(error)
				})


			},
			// 获取当前选中的国家
			parentFn(payload) {
				this.now_country = payload
			},
			  
			// 清榜应用接口
			getDataB(){
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
				let newDataB=formatDate(this.dateV, 'yyyy-MM-dd')

				//传给后台的countryid值
				let country_id=1
				this.$axios({
					method:"get",
					url:'GetCountry'
						
				})
				.then(res=>{
					
					if(res.data.Code==0){
				        let arr_country = res.data.Data
				        arr_country.forEach(element => {
				            if (element.name == this.now_country) {
				              country_id = element.id
				              return false
				            }
				        })
				        // 获取genreid
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
							    // 获取清榜接口
							  	this.$axios({
									method:"post",
									url:"/PostRankClear",
									data: {
										device:1,
										countryid:country_id,
										genreid:geid,
										pid:pidV,
										date:newDataB,
										appKey:this.searchval,
										pageIndex:this.page2,
										pageSize:this.pageSize2
									}
								})
								.then(res=>{
									if(res.data.Code==0){
										this.canscroll=true
										this.onlinFontB=res.data.pageCount
										// this.contentShow = false
										if(this.onlinFontB>0){
											// console.log("清榜："+this.infiniteMsgShow)
											this.contentShow = true
											this.infiniteMsgShow = true//加载更多
								        } else {
								        	// console.log("清榜："+this.infiniteMsgShow)
								            this.contentShow = true
								            this.infiniteMsgShow = false//没有更多
								        }

								        this.zongsBList=this.zongsBList.concat(res.data.Data)
								        let DownloadTotal=(this.pageSize2+1)*this.page2
								        let total=res.data.pageCount
								        
									}
									
									
								})
								.catch(error=>{
									console.log(error)
									// this.contentShow = false
									// console.log("清榜："+this.infiniteMsgShow)
									this.contentShow = true
									this.infiniteMsgShow = false
								})
							} 
						})
						.catch(error => {
							console.log(error)
						})
					}
				})
				.catch(error=>{
					console.log(error)
				})
				

			},
			   
			// 清词应用接口
			getDataci(){
				//传给后台的pid值
				let pidV=36
				if(this.isFontZ==true){
					pidV=36
				}else if(this.isFont==true){
					pidV=5000
				}else if(this.isFontG==true){
					pidV=6014
				}

				//传给后台的countryid值
				let country_id=1
				this.$axios({
					method:"get",
					url:'GetCountry'
						
				})
				.then(res=>{
					if(res.data.Code==0){
				        let arr_country = res.data.Data
				        arr_country.forEach(element => {
				            if (element.name == this.now_country) {
				              country_id = element.id
				              return false
				            }
				        })
				        
					}
				})
				.catch(error=>{
					console.log(error)
				})
				// 传给后台的日期值
				let newDataB=formatDate(this.dateV, 'yyyy-MM-dd')
				// 获取genreid
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

					    // 获取清词接口
					  	this.$axios({
							method:'post',
							url:'/PostKeyClear',
							data:{
								countryid:country_id,
								date:newDataB,
								genreid:geid,
								pid:pidV,
								appname:this.searchval
							}
						})
						.then(res => {
							// console.log(res.data.Data)
							if(res.data.Data==""){
								this.canscroll=true
								this.onlinFontC=0
								// console.log("清词："+this.infiniteMsgShow)
								this.contentShow = true
								this.infiniteMsgShow = false//没有更多
							}

							//有用的 this.onlinFontC=res.data.pageCount
							// this.cidataList=res.data.Data
						 
						})
						.catch(error=>{
							console.log(error)
							// console.log("清词："+this.infiniteMsgShow)
								this.contentShow = true
								this.infiniteMsgShow = false//没有更多
						})
					} 
				})
				.catch(error=>{
					console.log(error)
				})

			},
			// 点击总榜
			showZ(){
				this.downG=true
				this.downWG=false
				this.downL=true
				this.downWL=false
				this.isFontZ=true
				this.isFont=false
				this.isFontG=false
				this.upWG=false
				this.upWL=false
				this.showApplication = false
				this.showGame=false
				this.zongsdataList.length=0
		        this.page=1
		      	this.zongsBList.length=0
				this.page2=1
				this.getData()
				this.getDataB()
				this.getDataci()
			},
			// 点击应用榜
			showY(){
				this.showApplication = true;
				this.showGame=false;
				this.isFont=true
				this.upWL=true
				this.downL=false
				this.downWL=false
				this.isFontZ=false
				this.isFontG=false
				this.downG=true
				this.downWG=false
				this.upWG=false
				this.getData()
				this.getDataB()
				this.getDataci()
			},
			// 点击游戏榜
			showG(){
				this.showGame=true
				this.showApplication=false
				this.isFontZ=false
				this.isFontG=true
				this.isFont=false
				this.downL=true
				this.downWL=false
				this.upWL=false
				this.upWG=true
				this.downG=false
				this.downWG=false
				this.getData()
				this.getDataB()
				this.getDataci()
			},
			// 点击应用option
			cliLie(Application){
				this.valueY=Application.name
				this.showApplication=false
				this.upWL=false
				this.downWL=true
				this.now_Application=Application.name
				this.zongsdataList.length=0
		      	this.page=1
		      	this.zongsBList.length=0
				this.page2=1
				this.getData()
				this.getDataB()
				this.getDataci()
			},
			cliGame(game){
				this.valueG=game.name
				this.showGame=false
				this.upWG=false
				this.downWG=true
				this.now_Application=game.name
				this.zongsdataList.length=0
		        this.page=1
		      	this.zongsBList.length=0
				this.page2=1
				this.getData()
				this.getDataB()
				this.getDataci()
			},
			// 判断显示上架应用还是下架应用
			selectLei(index){
				this.isSelect=index
				if(this.isSelect==0){
					// 上架应用
					this.shangjiatF=true//上架标题
					this.xiajiatF=false//下架标题
					
					this.shangjiaF=true//上下架表格
					this.qingbangF=false//清榜表格
					this.qingciF=false//清词表格
					this.shangT=true//表格上架时间显示

					// this.contentShow2=false//清榜的滑动加载

					this.zongsdataList.length=0
		      		this.page=1
		      		this.getData()
				}else if(this.isSelect==1){
					//下架应用
					this.shangjiatF=false//上架标题
					this.xiajiatF=true//下架标题
					
					this.shangjiaF=true//上下架表格
					this.qingbangF=false//清榜表格
					this.qingciF=false//清词表格
					this.shangT=false//表格下架时间显示

					// this.contentShow2=false//清榜的滑动加载

					this.zongsdataList.length=0
		      		this.page=1
					this.getData()
				}
				
				else if(this.isSelect==2){
					this.shangjiatF=false//上架标题
					this.xiajiatF=false//下架标题
					
					this.shangjiaF=false//上下架表格
					this.qingbangF=true//清榜标题
					this.qingciF=false//清词标题

					// this.contentShow2=true//清榜的滑动加载

					this.zongsBList.length=0
				    this.page2=1
					this.getDataB()
				}else{
					this.shangjiatF=false//上架标题
					this.xiajiatF=false//下架标题
					
					this.shangjiaF=false//上下架表格
					this.qingbangF=false//清榜标题
					this.qingciF=true//清词标题
					this.getDataci()
				}
			},
			go_to_page01(parm,parm02) {
		      let routerUrl=this.$router.resolve({
		          path:'/now_ranking?now_app_id='+parm+'&now_app_name='+parm02
		        })
		        window.open(routerUrl .href,'_blank')
		    }
		}
	}

</script>



<style scoped>
.content{
	min-height: 600px;
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
}
.Leibox >div{
	display: inline-block;
	text-align: center;
}
.Leibox >div.ying{
	margin-left: 50px;
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
	margin-top: -4px;
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
  line-height: 86px;
  text-align: center;
}
.down{
  width: 8px;
  height: 8px;
}
.content{
  width: 1200px;
  margin:0 auto;
}
.content ul{
	width: 100%;
	height: 45px;
	border-bottom: 1px solid #f2f2f2;
}
.content ul li{
	width: 80px;
	height: 33px;
	line-height: 33px;
	text-align: center;
	font-family: SourceHanSansCN-Regular;
	font-size: 14px;
	color: #888888;
	float: left;
	margin-top:12px;
	margin-left: 27px;
}
.content ul li:hover{
	color: #009bef;
	cursor:pointer;
}
.content ul li:first-child{
	margin-left: 0;
}
.select{
	font-family: SourceHanSansCN-Medium!important;
	color: #222222!important;
	border-bottom: 1px solid #009bef;
}


.content > div {
	margin-top: 28px;
}
.content > div.zongbang {
	margin-top: -225px;
}
.content .lei>div,
.content .country>div{
	display: inline-block;
}
.content .lei>div:nth-child(2),
.content .lei>div:nth-child(3),
.content .lei>div:last-child{
	margin-left: 30px;
}
.content .country>div:nth-child(2){
	margin-left: 11px;
}
.content .country>div:nth-child(3){
	margin-left: 21px;
}
.content .lei>div:last-child input{
	width: 145px;
	height: 24px;
	border-radius: 4px;
	border: solid 1px #dfdfdf;
}
.content .lei>div:last-child input::placeholder{
	font-family: SourceHanSansCN-Normal;
	font-size: 13px;
	color: #bfbfbf;
}
.content .lei>div:last-child input{
	font-family: SourceHanSansCN-Normal;
	font-size: 13px;
	color: #444444;
	padding-left: 10px;
}
.content .lei>div:last-child button{
	width: 48px!important;
    height: 24px;
    background-color: #009bef;
    border-radius: 4px;
    font-family: SourceHanSansCN-Normal;
    font-size: 13px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0;
    color: #fff;
    text-align: center;
    border:none;
}
.content .lei>div p,
.content .country>div p{
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
	font-family: SourceHanSansCN-Medium;
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
	margin-left: -4px;
	margin-right: -4px;
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
	font-family: SourceHanSansCN-Medium;
	font-size: 18px;
	color: #222222;
}
.content .zongbang>div table{
	width: 1200px;
	height: 100%;
	border: solid 1px #f2f2f2;
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
	font-family: SourceHanSansCN-Medium;
	font-size: 13px;
	color: #222222;
	line-height: 40px;
}
th{
	font-weight: inherit!important;
}
table tbody tr{
	height: 100px;
	display: inline-table;
	border-top: 1px solid #f2f2f2;
}
table tr th{
	width: 298px;
}
table.qingbang tr th{
	width: 147px;
}
table.qingci tr th{
	width: 109px;
}
table tr th.yingyong{
	width: 321px;
}
table tr th.change span{
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	line-height: 30px;
	color: #f50202;
}
table tbody tr th{
	height: 100px;
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	color: #444444;
}
table.qingbang tbody tr th>div p{
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	color: #444444;
}
table.qingbang tbody tr th>div p:last-child{
	color: #888;
}
table.qingci tbody tr th>div p{
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	color: #444444;
}
table.qingci tbody tr th>div p:last-child{
	color: #888;
}
table tbody tr th .shejiao{
	color: #888;
	font-size: 13px;
}
table tbody tr th .ranking{
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	color: #888888;
	float: left;
	margin-left: 24px;
	margin-top: 10px;
}
table tbody tr:first-child th .ranking p,
table tbody tr:nth-child(2) th .ranking p,
table tbody tr:nth-child(3) th .ranking p{
	color: red;
}
table tbody tr th .logo{
	width: 40px;
	height: 40px;
	border-radius: 10px;
	border: solid 1px #f2f2f2;
	float: left;
	margin-left: 22px;
}
table tbody tr th .msg{
	font-family: SourceHanSansCN-Regular;
	font-size: 14px;
	color: #888888;
	float: left;
	margin-left: 9px;
}
table tbody tr th .msg .appname{
	width: 122px;
	font-family: SourceHanSansCN-Regular;
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
	font-family: SourceHanSansCN-Normal;
	font-size: 13px;
	color: #888888;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
	text-align: left;
}
table tbody tr th .now,
table tbody tr th .before{
	display: inline-block;
}
table tbody tr th .before,
table tbody tr th .right{
	vertical-align: top;
	margin-top: 12px;
	margin-left: 3px;
	margin-right: 3px;
}
table tbody tr th>.dir{
	margin-top: 6px;
	width: 8px;
	height: 8px;
	vertical-align: top;
}
table tbody tr th span:last-child{
	color: #009bef;
}
table tbody tr th.zongrank>img{
	margin-top: 5px;
	margin-left: 0;
}


</style>