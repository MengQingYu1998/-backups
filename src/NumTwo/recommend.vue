<template>
	<!-- App Store精品推荐 -->
<div class="recommend" id="recommend">
	<div class="title">App Store精品推荐</div>
	<div class="content">
		<div class="top">
			<div class="country">
				<p>国家/地区</p>
				<!-- 选择国家 -->
          		<country @childFn="parentFn" v-if="todayshow"></country>
          		<div class="coun" v-else>中国</div>
			</div>
			<div class="lei">
				<p class="category">类别</p>
				<p class="font" v-bind:class="{selectFont:isFontZ}" @click="showZ()">Today</p>
				<p class="font" @click.stop="showY()" id="myPanel" v-bind:class="{selectFont:isFont}">
					<span class="valY" v-html="valueY"></span>
					<img src="../assets/NumImg/down.png" class="down" v-show="downL"/>
					<img src="../assets/NumImg/downW.png" class="down" v-show="downWL"/>
					<!-- <img src="../assets/NumImg/upW.png" class="down" v-show="upWL"/> -->
				</p>
				<p class="font" @click.stop="showG()" v-bind:class="{selectFont:isFontG}">
					<span class="valG" v-html="valueG"></span>
					<img src="../assets/NumImg/down.png" class="down" v-show="downG"/>
					<img src="../assets/NumImg/downW.png" class="down" v-show="downWG"/>
					<!-- <img src="../assets/NumImg/upW.png" class="down" v-show="upWG"/> -->
				</p>
			</div>
			
			<div class="date" id="dateValue01">
				<p>日期</p>
				<!-- element日期组件 -->
				<el-date-picker
				            :picker-options="pickerOptions2"
				            v-model="dateV"
				            type="date"
				            placeholder="选择日期"
				            clear-icon
				            @focus="dateValue_focus01()" @blur="dateValue_blur01()" prefix-icon="el-icon-caret-bottom"
				></el-date-picker>
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
		<!-- today -->
		<div class="bodyDiv" v-show="bodyDiv">
			<div class="loading" v-show="load">
				<i class="el-icon-loading"></i>
				<!-- <img src="../assets/NumimgTwo/loading.gif"/> -->
			</div>
				            	
			<div v-show="!load">
				<div v-if="tod" class="all">
					<div v-for="(today,index) in todaydata.Data" :key="'ly'+index" >
						<div class="Titdiv">
							<p class="line"></p>
							<p class="font">{{today.CreateDate}}</p>
						</div>
						<div class="lidiv" v-for="div in today.TodayInfo"  :class="{'div1':div.DisplayStyle=='Media','div2':div.DisplayStyle=='Branded','div3':div.DisplayStyle=='Content'&&div.CardDisplayStyle=='List','div4':div.DisplayStyle=='Content'&&div.CardDisplayStyle=='River','div5':div.DisplayStyle=='Content'&&div.CardDisplayStyle=='ShortImage','div6':div.DisplayStyle=='Content'&&div.CardDisplayStyle=='SingleApp'}">
							<!-- div1 -->
							<div class="left" v-show="div.DisplayStyle=='Media'" :style="{backgroundImage:'url(' + div.PicUrl + ')'}">
								<p class="name">{{div.Label}}</p>
								<p class="font">{{div.Title}}</p>
								<p class="des">{{div.ShortContent}}</p>
							</div>
							<!-- div2 -->
							<div class="left" v-show="div.DisplayStyle=='Branded'" :style="{backgroundImage:'url(' + div.PicUrl + ')'}">
								<p>{{div.Label}}</p>
								<div v-if="div.AppList[0]">
									<img :src="div.AppList[0].IconUrl"/>
									<div class="prodiv">
										<p>{{div.AppList[0].AppName}}</p>
										<p>{{div.AppList[0].DeveloperName}}</p>
									</div>
									<div class="huoqu">
										<p v-if="div.AppList[0].Price=='免费'">获取</p>
										<p v-else>¥{{div.AppList[0].Price}}</p>
										<p>App内购买项目</p>
									</div>
								</div>
							</div>
							<!-- div3 -->
							<div class="left" v-show="div.DisplayStyle=='Content'&&div.CardDisplayStyle=='List'" :style="{backgroundImage:'url(' + div.PicUrl + ')'}">
								<p class="name">{{div.Label}}</p>
								<p class="des">{{div.Title}}</p>
								<div class="pro">
									<div v-if="div.AppList[0]">
										<img :src="div.AppList[0].IconUrl" />
										<div class="prodiv">
											<p>{{div.AppList[0].AppName}}</p>
											<p>{{div.AppList[0].SubTitle}}</p>
										</div>
										<div class="huoqudiv">
											<p v-if="div.AppList[0].Price=='免费'">获取</p>
											<p v-else>¥{{div.AppList[0].Price}}</p>
											<p>App内购买项目</p>
										</div>
									</div>
									<div v-if="div.AppList[1]" >
										<img :src="div.AppList[1].IconUrl" />
										<div class="prodiv">
											<p>{{div.AppList[1].AppName}}</p>
											<p>{{div.AppList[1].SubTitle}}</p>
										</div>
										<div class="huoqudiv">
											<p v-if="div.AppList[1].Price=='免费'">获取</p>
											<p v-else>¥{{div.AppList[1].Price}}</p>
											<p>App内购买项目</p>
										</div>
									</div>
									<div v-if="div.AppList[2]">
										<img :src="div.AppList[2].IconUrl"/>
										<div class="prodiv">
											<p>{{div.AppList[2].AppName}}</p>
											<p>{{div.AppList[2].SubTitle}}</p>
										</div>
										<div class="huoqudiv">
											<p v-if="div.AppList[2].Price=='免费'">获取</p>
											<p v-else>¥{{div.AppList[2].Price}}</p>
											<p>App内购买项目</p>
										</div>
									</div> 
								</div>
								
							</div>
							<!-- div4 -->
							<div class="left" v-show="div.DisplayStyle=='Content'&&div.CardDisplayStyle=='River'" :style="{backgroundImage:'url(' + div.PicUrl + ')'}">
								<p class="name">{{div.Label}}</p>
								<p class="des">{{div.Title}}</p>
								<div>
									<ul>
							            <li v-for="ite in 100"><img :src="item.IconUrl" v-if="item.IconUrl" v-for="item in div.AppList"><img src="" v-else/></li>
							            
							        </ul>
								</div>
								
							</div>
							<!-- div5 -->
							<div class="left" v-show="div.DisplayStyle=='Content'&&div.CardDisplayStyle=='ShortImage'" :style="{backgroundImage:'url(' + div.PicUrl + ')'}">
								<p class="name">{{div.Label}}</p>
								<p class="font">{{div.Title}}</p>
								<div v-if="div.AppList[0]" >
									<img :src="div.AppList[0].IconUrl" />
									<div class="prodiv">
										<p>{{div.AppList[0].AppName}}</p>
										<p>{{div.AppList[0].DeveloperName}}</p>
									</div>
									<div class="huoqu" v-if="div.AppList[0].Price=='免费'">获取</div>
									<div class="huoqu" v-else>¥{{div.AppList[0].Price}}</div>
								</div>
							</div>
							<!-- div6 -->
							<div class="left" v-show="div.DisplayStyle=='Content'&&div.CardDisplayStyle=='SingleApp'">
								<p class="name">{{div.Label}}</p>
								<p class="font">{{div.Title}}</p>
								<div v-if="div.AppList[0]" >
									<img :src="div.AppList[0].IconUrl" />
									<div class="prodiv">
										<p>{{div.AppList[0].AppName}}</p>
										<p>{{div.AppList[0].SubTitle}}</p>
									</div>
									<div class="huoqudiv">
											<p v-if="div.AppList[0].Price=='免费'">获取</p>
											<p v-else>¥{{div.AppList[0].Price}}</p>
											<p>App内购买项目</p>
									</div>
								</div>
							</div>
							<div class="right">
								<p>{{div.Label}}</p>
								<div>
									<div class="product" v-for="i in div.AppList">
										<img :src="i.IconUrl" @click="go_to_page04(i.AppId,i.AppName)"/>
										<div>
											<p @click="go_to_page04(i.AppId,i.AppName)">{{i.AppName}}</p>
											<p>{{i.DeveloperName}}</p>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="nullA" v-else>
					<img src="../assets/NumimgTwo/null.png"/>
					<p>暂无相关数据</p>
				</div>
			</div>
			
		</div>
		
		<!-- 应用,游戏 -->
		<div class="appDiv" v-show="appDiv">
			<div class="loading" v-show="load">
				<i class="el-icon-loading"></i>
				<!-- <img src="../assets/NumimgTwo/loading.gif"/> -->
			</div>
			<div c-show="!load">
				<div class="nowDiv">
					<div class="Titdiv">
						<p class="line"></p>
						<p class="font" v-html="showfont"></p>
					</div>
					<div class="null" v-if="tuijiandata.Data==''">
						暂无数据
					</div>
					<div class="leiDiv" v-else>
						<div v-for="item in tuijiandata.Data">
							<div class="time">
								<p>{{item.DesignBadge}}</p>
								<p>{{item.Time}}</p>
							</div>
							<div class="name">{{item.TagLine}}</div>
							<div class="imgD"><img :src="item.Img"/></div>
							<div class="pro">
								<img :src="item.AppList.IconUrl" @click="go_to_page04(item.AppList.AppId,item.AppList.AppName)"/>
								<div>
									<p @click="go_to_page04(item.AppList.AppId,item.AppList.AppName)">{{item.AppList.AppName}}</p>
									<p>{{item.AppList.DeveloperName}}</p>
								</div>
							</div>
						</div>
					</div>
					
				</div>
				<div class="otherDiv" v-for="item in otherdata.Data">
					<div>
						<div class="Titdiv">
							<p class="line"></p>
							<p class="font">{{item.Name}}（{{item.Time}}）</p>
						</div>
						<div>
							<ul>
								<li v-for="i in item.AppList">
									<img :src="i.IconUrl" @click="go_to_page04(i.AppId,i.AppName)"/>
									<div>
										<div class="namDiv">
											<p @click="go_to_page04(i.AppId,i.AppName)">{{i.AppName}}</p>
											<p>{{i.SubTitle}}</p>
										</div>
										<div>{{i.Price}}</div>
										<div>{{i.DeveloperName}}</div>
										<div>{{i.GenreId}}</div>
									</div>
								</li>
							</ul>
						</div>
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
			// 获取当前选中的国家
      		now_country: '中国',
      		// 应用
      		valueY:'应用',
      		// 游戏
      		valueG:'游戏',
      		// 选中today
      		isFontZ:true,
      		// 选中应用
      		isFont:false,
      		// 选中游戏
      		isFontG:false,
      		// 应用下拉三角
      		downL:true,
      		downWL:false,
      		// upWL:false,

      		// 游戏下拉三角
      		downG:true,
      		downWG:false,
      		// upWG:false,

      		// 当前选中日期
			dateV: new Date(),
			pickerOptions2: {
			    disabledDate(time) {
			        return time.getTime() > Date.now()
			        // 这里就是设置当天后的日期不能被点击
			    }
			},
			// today数据
			todaydata:{
				Data:[
					
				]
			},
			// 应用，游戏推荐数据
			tuijiandata:{
				Data:[

				]
			},
			// 应用，游戏其他推荐数据
			otherdata:{
				Data:[

				]
			},
			tdate:'',//是否显示today
			bodyDiv:true,
			appDiv:false,
			// 子分类
      		sons:{
        		Data:[]
      		},
      		showson:false,
      		isSons:0,
			
			showfont:'',//选中类别
			todayshow:true,//国家组件
			tod:true,
			load:true
		}
		
	},
	created(){
		this.gettodayData()
		this.$watch('dateV',function(Value, oldValue) {
		    // 当前日期发生变化，重新请求数据
		    if(this.isFontZ==true){
		    	this.todaydata.length=0
		    	this.gettodayData()
		    }else if(this.isFont==true||this.isFontG==true){
		    	this.tuijiandata.length=0
		    	this.gettuijianData()
				this.otherdata.length=0
		    	this.getotherData()
		    }
		    
		    
		})
		this.$watch('now_country', function(newValue, oldValue) {
			// 当前国家发生变化，重新请求数据...
			this.todaydata.length=0
		    this.gettodayData()
		})
	},
	mounted(){
		// 点击其他地方弹窗消失
		let that = this
	    document.getElementById('app').onclick = function() {
		   that.showApplication = false
		   that.showGame = false
		}
	},
	methods:{
		// 控制时间组件旋转
		// 1.给日期组件的父类添加一个新的id
		// 2.添加两个事件
		// 3.复制以下代码
		dateValue_blur01(){
			// console.log('失去焦点')
			time_reset("#dateValue01")
		},
		dateValue_focus01(){
		   // console.log('得到焦点1')   
			time_rotate('#dateValue01') 
			
		},
		// 获取当前选中的国家
		parentFn(payload) {
			this.now_country = payload
		},
		// 获取Today数据
		gettodayData(){
			this.load=true
			// 传给后台的date值
			let newDataB=formatDate(this.dateV,'yyyy-MM-dd')
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
					this.$axios({
						method:"get",
						url:'/api/today',
						params:{
							countryId:country_id,
							time:newDataB
						}
					})
					.then(res=>{
						if(res.data.Code==0){
							this.load=false
							this.bodyDiv=true
							if(res.data.Data==""){
								this.tod=false
							}else{
								this.tod=true
							}
							this.todaydata=res.data
							for(var i=0;i<res.data.Data.length;i++){
								var b=res.data.Data[i].TodayInfo.length
								for(var j=0;j<b;j++){
									if(res.data.Data[i].TodayInfo[j].DisplayStyle=="Branded"){
										this.div2=true
									}else if(res.data.Data[i].TodayInfo[j].DisplayStyle=="Content"){
										this.div4=true
									}else if(res.data.Data[i].TodayInfo[j].DisplayStyle=="Media"){
										this.div1=true
									}
								}
							}
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
		// 获取应用，游戏的推荐数据
		gettuijianData(){
			this.load=true

			// 传给后台的date值
			let newDataB=formatDate(this.dateV,'yyyy-MM-dd')
			// 传给后台的pid
			let pidV=5000
			let geid=""
			if(this.isFont==true){
				// 点击应用榜
				pidV=5000
				this.valueG='游戏'
			}else if(this.isFontG==true){
				// 点击游戏榜
				pidV=6014
				this.valueY='应用'
			}
			this.$axios({
				method:"get",
				url:'/GetGenre?genreID='+pidV
			})
			.then(res=>{
				// console.log(res.data.Code)
				if (res.data.Code == 0) {
					this.load=false
					this.sons=res.data
					for(var i=0;i<res.data.Data.length;i++){
							if(this.now_Application==res.data.Data[i].name){
								geid = res.data.Data[i].id
							}
						}
					if(this.isFont==true&&geid==""){
						geid=5000
					}else if(this.isFontG==true&&geid==""){
						geid=6014
					}
					// 获取推荐数据
					this.$axios({
						method:"get",
						url:'/api/recommend',
						params:{
							genreId:geid,
							time:newDataB
						}
					})
					.then(res=>{
						// console.log(res.data.Code)
						if(res.data.Code==0){
							// console.log(res.data.Data)
							this.load=false
							this.tuijiandata=res.data
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
		// 获取应用，游戏的其他推荐数据
		getotherData(){
			// 传给后台的date值
			let newDataB=formatDate(this.dateV,'yyyy-MM-dd')
			// 传给后台的pid
			let pidV=5000
			let geid=""
			if(this.isFont==true){
				// 点击应用榜
				pidV=5000
				this.valueG='游戏'
			}else if(this.isFontG==true){
				// 点击游戏榜
				pidV=6014
				this.valueY='应用'
			}
			this.$axios({
				method:"get",
				url:'/GetGenre?genreID='+pidV
			})
			.then(res=>{
				
				if (res.data.Code == 0) {
					// console.log(res.data.Data)
					this.sons=res.data
					for(var i=0;i<res.data.Data.length;i++){
						if(this.now_Application==res.data.Data[i].name){
							geid = res.data.Data[i].id
						}
					}
					if(this.isFont==true&&geid==""){
						geid=5000
					}else if(this.isFontG==true&&geid==""){
						geid=6014
					}
					// 获取其他推荐数据
					this.$axios({
						method:"get",
						url:'/api/otherRecommend',
						params:{
							genreId:geid,
							time:newDataB
						}
					})
					.then(res=>{
						// console.log("其他推荐"+res.data.Data)
						if(res.data.Code==0){
							this.otherdata=res.data
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
		// 点击today
		showZ(){
			this.showson=false//子分类
			this.appDiv=false//应用div隐藏
			this.bodyDiv=true//Today显示
			this.tod=true
			// 小三角
	        this.downWG=false
	        this.downG=true
	        this.downL=true
	        this.downWL=false
		    this.todayshow=true//国家组件
		    // Today
		    this.isFontZ=true
      		// 选中应用
      		this.isFont=false
      		// 选中游戏
      		this.isFontG=false
      		

      		this.todaydata.length=0
		    this.gettodayData()
		},
		// 点击应用
		showY(){
			this.isSons=0
			this.showson=true//子分类
			this.now_Application="全部应用"
			this.showfont="全部应用"
			// 小三角
	        this.downWG=false
	        this.downG=true
	        this.downL=false
	        this.downWL=true

			this.appDiv=true//应用div显示
			this.bodyDiv=false//Today隐藏
			this.todayshow=false//国家组件
			this.valueG="游戏"
		    // Today
		    this.isFontZ=false
      		// 选中应用
      		this.isFont=true
      		// 选中游戏
      		this.isFontG=false
      		this.showGame=false
      		this.tuijiandata.length=0
		    this.gettuijianData()
		    this.otherdata.length=0
		    this.getotherData()
		},
		// 点击游戏
		showG(){
			this.isSons=0
			this.showson=true//子分类
			this.now_Application="全部游戏"
			this.showfont="全部应用"
			// 小三角
	        this.downWG=true
	        this.downG=false
	        this.downL=true
	        this.downWL=false
			this.appDiv=true//应用div显示
			this.bodyDiv=false//Today隐藏
			this.todayshow=false//国家组件
			
			// Today
		    this.isFontZ=false
      		// 选中应用
      		this.isFont=false
      		// 选中游戏
      		this.isFontG=true
      		
			this.tuijiandata.length=0
		    this.gettuijianData()
		    this.otherdata.length=0
		    this.getotherData()
		},
		// 点击子分类
		cliLie(Application,index){
			this.isSons=index
			
			this.now_Application=Application.name
			this.showfont=Application.name
			this.tuijiandata.length=0
		    this.gettuijianData()
		    this.otherdata.length=0
		    this.getotherData()	
		},
		go_to_page04(parm, parm02) {
	      let that=this
	      let routerUrl = this.$router.resolve(
	       {path: '/now_ranking', query: {now_country: that.now_country,now_app_id:parm}})
	      window.open(routerUrl.href, '_blank')
	    },
	}
}

</script>



<style scoped>
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
}	
.content{
	min-height: 570px;
	width: 1200px;
	margin:0 auto;
}

.top>div{
	display: inline-block;
	margin-top: 23px;
}
.top .lei p{
	height: 24px;
	line-height: 24px;
	padding:0 11px;
	border-radius: 4px;
	border: solid 1px #d6d6d6;
	display: inline-block;
	font-size: 13px;
	color: #444444;
	margin-left: 10px;
}
.top .lei p:nth-child(2){
	margin-left: 5px;
}
.top .country p,
.top .lei .category,
.top .date p{
	font-weight: 600;
	font-size: 13px;
	color: #222222;
	float: left;
	border:none;
}
.top .country p,
.top .date p{
	margin-right: 8px;
	margin-top: 4px;
}
.top .lei .category{
	margin-left: 10px;
}
.top .date p{
	margin-left: 30px;
}
.selectFont{
    background-color: #009bef;
    color: #fff!important;
    border: 1px solid #009bef!important;
}
.country{
	width: 150px;
}

.bodyDiv>div{
	width: 1200px;
	
}
.bodyDiv .all>div{
	background-color: #ffffff;
	box-shadow: 0px 0px 26px 0px 
		rgba(0, 0, 0, 0.04);
	margin-top: 30px;
	padding-bottom: 30px;
	border:1px solid transparent;
}
.bodyDiv>div:last-child{
	margin-bottom: 100px;
}
.bodyDiv>div .Titdiv{
	margin-top: 30px;
	margin-left: 19px;
}
.bodyDiv>div .Titdiv .line,
.appDiv>div .Titdiv .line,
.otherDiv>div .Titdiv .line{
	width: 2px;
	height: 16px;
	background-color: #009bef;
	display: inline-block;
	vertical-align: top;
}
.bodyDiv>div .Titdiv .font,
.appDiv>div .Titdiv .font,
.otherDiv>div .Titdiv .font{
	font-weight: 600;
	font-size: 18px;
	color: #222222;
	display: inline-block;
	vertical-align: top;
	margin-top: -1px;
	line-height: 16px;
	border:1px solid transparent;
}
.appDiv>div .Titdiv .font{
	/*margin-top: -3px;*/
}
.bodyDiv>div .lidiv{
	width: 556px;
	height: 281px;
	border: solid 1px #d6d6d6;
	margin-top: 30px;
	margin-left: 29px;
	display: inline-block;
}
.bodyDiv>div .lidiv>div{
	display: inline-block;
	vertical-align: top;
}
.bodyDiv>div .lidiv .left{
	width: 230px;
	height: 281px;
	background-image: url('../assets/NumimgTwo/test.png');
	background-size: cover;
	background-repeat: no-repeat;
}
.bodyDiv>div .lidiv .right{
	margin-left: 35px;

}
.bodyDiv>div .lidiv .right .product{
	clear: both;
	height:40px;
	margin-top: 28px;
}
.bodyDiv>div .lidiv .right .product:first-child{
	margin-top: 0;
}
.bodyDiv>div .lidiv .right .product img{
	width: 40px;
	height: 40px;
	border-radius: 10px;
	border: solid 1px #f2f2f2;
	float: left;
}
.bodyDiv>div .lidiv .right .product img:hover,
.appDiv .nowDiv .pro>img,
.top .lei p:hover{
	cursor: pointer;
}
.bodyDiv>div .lidiv .right .product div{
	margin-left: 47px;
}
.bodyDiv>div .lidiv .right>p{
	font-weight: 600;
	font-size: 18px;
	color: #222;
	margin-top: 26px;
}
.bodyDiv>div .lidiv .right>div{
	width: 280px;
	height:180px;
	overflow-y: auto;
	margin-top: 24px;
}

.bodyDiv>div .lidiv .right>div::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;   /*高宽分别对应横竖滚动条的尺寸*/
}
.bodyDiv>div .lidiv .right>div::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.bodyDiv>div .lidiv .right>div::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    background: rgba(0,0,0,0.1);
}


.bodyDiv>div .lidiv .right>div p:first-child{
	font-size: 14px;
	color: #222222;
	width: 122px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.bodyDiv>div .lidiv .right>div p:first-child:hover,
.appDiv .nowDiv .pro>div p:first-child:hover{
	cursor: pointer;
	color: #009bef;
}
.bodyDiv>div .lidiv .right>div p:last-child{
	font-size: 13px;
	color: #888888;
	width: 204px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-top: 6px;
}
/*第一种*/
.bodyDiv>div .div1 .left p,
.bodyDiv>div .div5 .left>p{
	color: #ffffff;
	width: 210px;
	margin:0 auto;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.bodyDiv>div .div1 p.name,
.bodyDiv>div .div5 p.name{
	font-size: 14px;
	margin-top: 10px;
}
.bodyDiv>div .div1 p.font,
.bodyDiv>div .div5 p.font{
	font-weight: 600;
	font-size: 18px;
	margin-top: 10px;
	height:50px;
}
.bodyDiv>div .div1 p.des{
	font-size: 13px;
	margin-top: 160px;
}

/*第二种*/
.bodyDiv>div .div2 .left>p{
	font-weight: 600;
	font-size: 26px;
	color: #ffffff;
	width: 210px;
    margin: 0 auto;
	margin-top: 148px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	/*margin-left: 10px;*/
}
.bodyDiv>div .div2 .left>div,
.bodyDiv>div .div5 .left>div{
	width: 229px;
	height: 68px;
	background-color: rgba(0,0,0,.26);
	margin-top: 32px;
}
.bodyDiv>div .div5 .left>div{
	margin-top: 122px;
}
.bodyDiv>div .div2 .left>div>img,
.bodyDiv>div .div5 .left>div>img{
	width: 40px;
	height: 40px;
	border-radius: 10px;
	float: left;
	margin-top: 14px;
	margin-left: 10px;
}
.bodyDiv>div .div2 .left>div>div.prodiv,
.bodyDiv>div .div3 .left .pro>div .prodiv,
.bodyDiv>div .div5 .left>div>div.prodiv{
	float: left;
	margin-left: 7px;
}
.bodyDiv>div .div2 .left>div>div.prodiv,
.bodyDiv>div .div5 .left>div>div.prodiv{
	margin-top: 14px;
	
}
.bodyDiv>div .div2 .left>div>div.prodiv p:first-child,
.bodyDiv>div .div3 .left .pro>div .prodiv p:first-child,
.bodyDiv>div .div5 .left>div>div.prodiv p:first-child{
	font-size: 14px;
	color: #ffffff;
	width: 75px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.bodyDiv>div .div2 .left>div>div.prodiv p:last-child,
.bodyDiv>div .div3 .left .pro>div .prodiv p:last-child,
.bodyDiv>div .div5 .left>div>div.prodiv p:last-child{
	font-size: 13px;
	color: #ffffff;
	width: 62px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-top: 6px;
}
.bodyDiv>div .div2 .left>div>div.huoqu{
	float: right;
	text-align: center;
	margin-right: 10px;
	margin-top: 15px;
}
.bodyDiv>div .div2 .left>div>div.huoqu p:first-child,
.bodyDiv>div .div5 .left>div>div.huoqu{
	width: 56px;
	height: 24px;
	line-height: 24px;
	text-align: center;
	background-color: #ffffff;
	border-radius: 4px;
	font-weight: 600;
	font-size: 13px;
	color: #009bef;
	margin:0 auto;
}
.bodyDiv>div .div5 .left>div>div.huoqu{
	float: right;
	margin-top: 20px;
	margin-right: 20px;
}
.bodyDiv>div .div2 .left>div>div.huoqu p:last-child{
	font-size: 10px;
	color: #ffffff;
	margin-top: 2px;
}
/*第三种*/
.bodyDiv>div .div3 .left >p,
.bodyDiv>div .div4 .left >p,
.bodyDiv>div .div6 .left >p{
	width: 210px;
	margin:0 auto;
}
.bodyDiv>div .div3 .left .name,
.bodyDiv>div .div4 .left .name,
.bodyDiv>div .div6 .left .name{
	font-size: 14px;
	color: #888888;
	margin-top: 10px;
}
.bodyDiv>div .div3 .left .des,
.bodyDiv>div .div4 .left .des,
.bodyDiv>div .div6 .left .font{
	font-weight: 600;
	font-size: 18px;
	color: #222222;
	height:50px;
	line-height: 35px;
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.bodyDiv>div .div3 .left .pro>div{
	clear: both;
	width: 210px;
	margin:0 auto;
	height:40px;
	margin-top: 18px;
}
.bodyDiv>div .div3 .left .pro>div img{
	width: 40px;
	height: 40px;
	border-radius: 10px;
	float: left;
	border:1px solid #f2f2f2;
}
.bodyDiv>div .div3 .left .pro>div .prodiv p{
	color:#222!important;
}
.bodyDiv>div .div3 .left .pro>div .prodiv p:last-child{
	color: #888888!important;
}
.bodyDiv>div .div3 .left .pro>div .huoqudiv{
	float: right;	
}
.bodyDiv>div .div3 .left .pro>div .huoqudiv p:first-child{
	width: 56px;
	height: 24px;
	line-height: 24px;
	text-align: center;
	background-color: #f2f2f2;
	border-radius: 4px;
	font-weight: 600;
	font-size: 13px;
	color: #009bef;
	margin:0 auto;
}
.bodyDiv>div .div3 .left .pro>div .huoqudiv p:last-child{
	font-size: 10px;
	color: #bfbfbf;

}
.bodyDiv>div .div3 .left,
.bodyDiv>div .div4 .left,
.bodyDiv>div .div6 .left{
	background-image: none;
	border-right:1px solid #d6d6d6;
}
/*第四种*/
.div4 ul {
    list-style: none;
}
.div4 .left>div {
    width: 230px;
    height: 170px;
    overflow: hidden;
}
.div4 ul {
	width: 200%;
	height: 100%;
	animation: picmove 40s linear infinite forwards;
	overflow:hidden;
	margin-top: 5px;
}

@keyframes picmove {
    from {
        transform: translate(0px);
    }
    to {
        transform: translate(-300px);
    }
}
.div4 .left img {
    width: 44px;
	height: 44px;
	border-radius: 10px;
	border: solid 1px #f2f2f2;
    float: left;
    margin-left: 7px;
    margin-top: 7px;
}
/*第六种*/	
.bodyDiv>div .div6 .left>div img{
	width: 90px;
	height: 90px;
	margin-left:70px;
	margin-top: 10px;
	border-radius: 20px;
	border: solid 1px #f2f2f2;
}
.bodyDiv>div .div6 .left>div>div{
	margin-top: 50px;
}
.bodyDiv>div .div6 .left>div>div.prodiv{
	float: left;
	margin-left: 17px;
}
.bodyDiv>div .div6 .left>div>div.prodiv p{
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.bodyDiv>div .div6 .left>div>div.prodiv p:first-child{
	font-weight: 600;
	font-size: 14px;
	color: #222222;
	width: 100px;
}
.bodyDiv>div .div6 .left>div>div.prodiv p:last-child{
	width: 114px;
	font-family: PingFangSC-Regular;
	font-size: 13px;
	color: #888888;
	margin-top: 5px;
}
.bodyDiv>div .div6 .left>div>div.huoqudiv{
	float: right;
	margin-right: 10px;
}
.bodyDiv>div .div6 .left>div>div.huoqudiv p:first-child{
	width: 56px;
	height: 26px;
	line-height: 26px;
	background-color: #f2f2f2;
	border-radius: 4px;
	font-weight: 600;
	font-size: 13px;
	color: #009bef;
	text-align: center;
	margin:0 auto;
}
.bodyDiv>div .div6 .left>div>div.huoqudiv p:last-child{
	font-family: PingFangSC-Regular;
	font-size: 10px;
	color: #bfbfbf;
}


/*应用*/
.appDiv .nowDiv,
.appDiv .otherDiv{
	width: 100%;
	background-color: #ffffff;
	box-shadow: 0px 0px 26px 0px 
		rgba(0, 0, 0, 0.04);
	border:1px solid transparent;
	padding-bottom: 30px;
	margin-top: 23px;
}

.appDiv .otherDiv:last-child{
	margin-bottom: 95px;
}
.appDiv .nowDiv .Titdiv,
.appDiv .otherDiv .Titdiv{
	margin-top: 30px;
	margin-left: 20px;
}
.appDiv .nowDiv .leiDiv>div{
	width: 360px;
	height: 360px;
	border: solid 1px #f2f2f2;
	margin-left:30px;
	margin-top: 20px; 
	display: inline-block;
}
.appDiv .nowDiv .leiDiv>div .time,
.appDiv .nowDiv .leiDiv>div .name{
	width: 310px;
	margin:0 auto;
}
.appDiv .nowDiv .leiDiv>div .time p{
	font-size: 13px;
	color: #888888;
	float: left;
	margin-top: 20px;
	height:13px;
}
.appDiv .nowDiv .leiDiv>div .time p:last-child{
	float: right;
}
.appDiv .nowDiv .leiDiv>div .name{
	clear: both;
	font-weight: 600;
	font-size: 16px;
	color: #444444;
	margin-left: 25px;
	margin-top: 50px;
}
.appDiv .nowDiv .imgD img{
	width: 360px;
	height: 197px;
	margin-top: 15px;
	border-bottom: 1px solid #f2f2f2;
	object-fit:cover;
}
.appDiv .nowDiv .pro>img{
	width: 40px;
	height: 40px;
	border-radius: 10px;
	border: solid 1px #f2f2f2;
	margin-left: 25px;
	vertical-align: top;
	margin-top: 15.5px;
}
.appDiv .nowDiv .pro>div{
	display: inline-block;
	margin-left: 7px;
	margin-top: 17px;
	vertical-align: top;
}
.appDiv .nowDiv .pro>div p:first-child{
	font-size: 14px;
	color: #222222;
	width: 230px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.appDiv .nowDiv .pro>div p:last-child{
	font-size: 13px;
	color: #888888;
	width: 260px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-top: 7px;
}
.appDiv .otherDiv {
	padding-bottom: 0;
}
.appDiv .otherDiv ul li{
	margin-top: 25px;
}
.appDiv .otherDiv ul li>img{
	width: 40px;
	height: 40px;
	border-radius: 10px;
	border: solid 1px #f2f2f2;
	float: left;
	margin-left: 27px;
	display: inline-block;
	
}
.appDiv .otherDiv ul li>img:hover{
	cursor: pointer;
}
.appDiv .otherDiv ul li>div{
	width: 1080px;
	border-bottom: 1px solid #f2f2f2;
	margin-left: 78px;
	padding-bottom: 27px;

}
.appDiv .otherDiv ul li:last-child>div{
	border-bottom: none;
}
.appDiv .otherDiv ul li>div div{
	font-size: 14px;
	color: #444444;
	display: inline-block;
	vertical-align: top;
	width: 220px;
	text-align: center;
	margin-left: 57px;
	
}

.appDiv .otherDiv ul li>div div:nth-child(3){
	text-align: left;
	line-height: 30px;
}
.appDiv .otherDiv ul li>div div:nth-child(even){
	line-height: 40px;
}
.appDiv .otherDiv ul li>div div.namDiv{
	margin-left: 0;
}
.appDiv .otherDiv ul li>div div.namDiv p{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: left;
}
.appDiv .otherDiv ul li>div div.namDiv p:first-child{
	font-size: 14px;
	color: #222222;
	width: 130px;
	margin-top: 2px;
}
.appDiv .otherDiv ul li>div div.namDiv p:first-child:hover{
	cursor: pointer;
	color: #009bef;
}
.appDiv .otherDiv ul li>div div.namDiv p:last-child{
	font-size: 13px;
	color: #888888;
	width: 190px;
	margin-top: 6px;
}
/*应用和游戏下拉框*/
.Leibox{
	position: absolute;
	top:41px;
	z-index: 99;
}
.Leibox{
	top:180px;
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
	margin-left: -180px;
}
.Leibox >div.game{
	margin-left: -120px;
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
.down{
	margin-left: 4px;
    vertical-align: top;
    margin-top: 8px;
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
  margin-left: 10px;
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
	font-weight: 600;
	font-size: 14px;
	color: #bfbfbf;
	text-align: center;
	line-height: 50px;
}
.nullA{
	width: 100%;
	height:606px;
	text-align: center;
	margin:0 auto;
}
.nullA img{
	width: 210px;
	height:162px;
	margin:0 auto;
	margin-top: 190px;
}
.nullA p{
	font-size: 13px;
	color: #555555;
}
.coun{
	width: 73px;
    height: 25px;
    border-radius: 4px;
    border: solid 1px #dfdfdf;
    font-size: 13px;
    line-height: 25px;
    color: #444444;
    display: inline-block;
    text-align: center;
}
/*加载中*/
.loading {
	text-align: center;
}
.loading i{
	font-size: 30px;
	color: #bfbfbf;
	margin-top: 200px;
}
</style>