<template>
	<div id="msg">
		<p class="topLine"></p>
		<div class="message">
			<!-- 左导航 -->
			<mineleft @mineLeft="parentLeft()"></mineleft>
			<!-- 右内容 -->
			<div class="right msgDiv">
				<!-- 消息中心 -->
				<div v-if="masg">
					<ul>
						<li v-for="(msgFont,index) in msgFonts" :class="{'selectMsg':selectmsg==index}" @click="cliMsgF(index)" :key="'LY01'+index">{{msgFont.name}}</li>
						
					</ul>
					<div v-show="nomsg">
						<div v-for="msg in msgsno.data" @click="clinoread(msg)" :key="'LY02'+index" v-if="msg">
							<p>{{msg.Remark}}</p>
							<p class="time">{{msg.CreateTimeStr}}</p>
						</div>
						<div class="null">
							<img src="../assets/NumimgTwo/null.png"/>
							<p>暂无相关数据</p>
						</div>
					</div>
					<div v-show="readmsg">
						<div v-for="msg in msgsread.data" @click="cliread(msg)" :key="'LY03'+index" v-if="msg">
							<p>{{msg.Remark}}</p>
							<p class="time">{{msg.UpdateTimeStr}}</p>
						</div>
						<div class="null">
							<img src="../assets/NumimgTwo/null.png"/>
							<p>暂无相关数据</p>
						</div>
					</div>
					<div v-show="allmsg">
						<div v-for="msg in msgsall.data" @click="cliallmsg(msg)" :key="'LY04'+index" v-if="msg">
							<p>{{msg.Remark}}</p>
							<p class="time" v-if="msg.ReadType==0">{{msg.CreateTimeStr}}</p>
							<p class="time" v-if="msg.ReadType==1">{{msg.UpdateTimeStr}}</p>
						</div>
						<div class="null">
							<img src="../assets/null.png" />
							<p>暂无相关数据</p>
						</div>
					</div>
				</div>
				<!-- 消息详情 -->
				<div v-else class="msgDetail">
					<p class="listmsg">
						<span @click="climsg()">消息中心</span>
						<span>>消息详情</span>
					</p>
					<p class="titmsg">{{msgDes.MessageTitle}}</p>
					<p class="timemsg">{{msgDes.UpdateTimeStr}}</p>
					<p class="content">
						{{msgDes.Remark}}
					</p>
				</div>
			</div>
			
		</div>
		
	</div>
	

</template>


<script>
	import mineleft from '../NumTwo/mineleft'
	export default{
		components: { mineleft },
		data(){
			return{
				telnow:'12345612345',//当前手机号
				focinp:false,//点击手机号时输入框样式
				wroinp:false,//手机号错误时输入框样式
				focveri:false,//点击验证码时输入框样式
				wroveri:false,//验证码错误时输入框样式
				focEmail:false,//点击邮箱时输入框样式
				wroemail:false,//邮箱错误时输入框样式
				focold:false,//点击旧密码时输入框样式
				wrold:false,//旧密码错误时输入框样式
				focnew:false,//点击新密码时输入框样式
				wronew:false,//新密码错误时输入框样式
				focsure:false,//点击确认密码时输入框样式
				wrosure:false,//确认密码错误时输入框样式
				telFont:'手机号不能为空',//手机号提示内容
				veriFont:'验证码不能为空',//验证码提示内容
				codeBtn:'获取验证码',//获取验证码按钮
				emailFont:'邮箱不能为空',//邮箱提示内容
				oldFont:'旧密码不能为空',//旧密码提示内容
				newFont:'新密码不能为空',//旧密码提示内容
				sureFont:'确认密码不能为空',//旧密码提示内容
				wrongTel:false,//是否提示手机号错误
				wrongVeri:false,//是否提示验证码错误
				wrongEmail:false,//是否提示邮箱错误
				wrongold:false,//是否提示旧密码错误
				wrongnew:false,//是否提示新密码错误
				wrongsure:false,//是否提示确认密码错误
				tel:'',//手机号
				veri:'',//验证码
				nowemail:'',//当前邮箱地址
				nomsg:true,//未读消息div
				readmsg:false,//已读消息div
				allmsg:false,//全部消息div
				allmsgtime:'',//全部消息时间
				uid:'',//用户id
				msgFonts:[
					{name:'未读消息'},
					{name:'已读消息'},
					{name:'全部消息'},
				],
				setFonts:[
					{name:'账号设置'},
					{name:'修改密码'},
				],
				isSelectm:true,
				isSelects:false,
				msgImg:false,
				selectmsg:'',
				selectset:'',
				index:0,
				telMask:false,
				isfixed:false,
				unwexin:true,
				unemail:true,
				emailMask:false,
				weixinMask:false,
				shownum:true,
				masg:true,
				uid:'',//用户id
				email:'',//邮箱
				product:'',//产品名称
				code:'',//旧密码
				newV:'',//新密码
				// input value
				telval:'',
				emailval:'',
				verival:'',
				proval:'',
				oldval:'',
				newval:'',
				sureval:'',
				telhas:false,
				disabled:false,
				ishas:false,
				isemail:false,
				iscodebtn:false,
				iscom:false,//新旧密码相同
				// oldcode:'',//旧密码
				// surecode:'',//确认密码
				//未读data
				msgsno:{
					data:{
						noReadMessage:[]
					}
				},
				//已读data
				msgsread:{
					data:{
						readedMessage:[]
					}
				},
				//全部data
				msgsall:{
					data:{
						allMessage:[]
					}
				},
				// 消息详情
				msgDes:{

				},
				showMsgdiv:true,
				touxiang:require('../assets/NumImg/touxiang.png')
			}
			
		},
		methods:{
			// 获取用户详细信息接口
			getallmsg(){
				let userId=localStorage.getItem("userId")//获取userId
				this.uid=userId
				this.$axios({
					method:"get",
					url:'GetAccount?accountId='+this.uid
				})
				.then(res=>{
					this.uid=res.data.Data.id
					this.telnow=res.data.Data.Phone//当前手机号
					this.nowemail=res.data.Data.Email// 当前邮箱
					// console.log(this.nowemail)
					if(res.data.Data.Avatar!=null){
						this.touxiang=res.data.Data.Avatar//头像
					}
					if(res.data.Data.AppName!=null){
						this.proval=res.data.Data.AppName//产品名称
					}
					if(this.nowemail==null){
						this.unemail=true
					}else{
						this.unemail=false
					}

				})
				.catch(error=>{
					console.log(error)
				})
			},
			//获取消息接口
			getMsg(){
				this.$axios({
					method:"get",
					url:'GetMessage?AccountId='+this.uid
						
				})
				.then(res=>{
					if(res.data.Code==0){
						this.msgsno.data=res.data.Data.noReadMessage
						this.msgsread.data=res.data.Data.readedMessage
						this.msgsall.data=res.data.Data.allMessage
						
					}
				})
				.catch(error=>{
					console.log(error)
				})
			},
			// 点击消息详情页的消息中心
			climsg(){
				this.masg=true
				window.location.reload()
			},
			// 点击消息中心
			cliMsg(){
				this.isSelectm=true
				this.isSelects=false
				this.msgImg=false
				this.showMsgdiv=true
				// 获取消息接口
				this.getMsg()
			},
			getMsgdes(m){
				this.$axios({
					method:"get",
					url:'GetMessageById?id='+m
				})
				.then(res=>{
					this.msgDes=res.data.Data
				})
				.catch(error=>{
					console.log(error)
				})
			},
			// 点击未读消息
			clinoread(msg){
				// 修改消息状态接口
				this.$axios({
					method:"get",
					url:'UptReadType?id='+msg.id
						
				})
				.then(res=>{
					if(res.data.Code==1){
						// 已读成功
						this.masg=false
						this.getMsgdes(msg.id)
					}
				})
				.catch(error=>{
					console.log(error)
				})
			},
			// 点击已读
			cliread(msg){
				this.masg=false
				this.getMsgdes(msg.id)
			},
			// 点击全部消息
			cliallmsg(msg){
				this.masg=false
				this.getMsgdes(msg.id)
			},
			// 点击账号设置
			cliSet(){
				this.isSelectm=false
				this.isSelects=true
				this.msgImg=true
				this.showMsgdiv=false
			},
			// 点击消息中心里的不同消息
			cliMsgF(index){
				this.selectmsg=index
				if(index==0){
					this.nomsg=true
					this.readmsg=false
					this.allmsg=false
				}else if(index==1){
					this.nomsg=false
					this.readmsg=true
					this.allmsg=false
				}else{
					this.nomsg=false
					this.readmsg=false
					this.allmsg=true
				}
			},
			
	        parentLeft(){
				
			},

		},
		created(){
			this.getallmsg()
			this.getMsg()
		}	
	}
</script>



<style scoped>
	#msg{
		width: 100%;
		height: 100%;
		padding-bottom: 40px;
		background-color: #F4F4F4;
	}
	.topLine{
		width: 100%;
		height: 1px ;
	}
	.message{
		width: 1200px;
		margin: 0 auto;
		min-height: 700px;
		clear: both;
		margin-top: 30px;
		margin-bottom: 32px;
	}
	.message>p{
		width: 1px;
		height: 692px;
		background-color: #efefef;
		display: inline-block;
		float: left;
		margin-left: 66px;
	}
	.message>div{
		display: inline-block;
		float: left;	
		background-color: #fff;
	}
	
	.selected p{
		color: #009bef!important;
	}
	.message .right{
		width: 995px;
		min-height: 690px;
		float: right;
		background-color:#ffffff;
	}
	.message .right ul{
		width: 956px;
		margin:0 auto;
		height: 52px;
		border-bottom: 1px solid #d6d6d6;
		background-color: #fff;
	}
	.message .right ul li{
		width: 96px;
		height: 41px;
		line-height: 41px;
		text-align: center;
		float: left;
		font-weight: 600;
		font-size: 16px;
		color: #222;
		margin-left: 47px;
		margin-top: 10px;
		background-color: #fff;
	}
	.message .right ul li:hover{
		cursor: pointer;
	}
	.selectMsg{
		border-bottom:2px solid #009bef!important;
	}
	.message .right ul li:first-child{
		margin-left: 0;
	}

	.message .msgDiv>div>div>div{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #efefef;
		background-color: #fff;
	}
	.message .msgDiv .msgDetail .listmsg,
	.message .msgDiv .msgDetail .timemsg{
		font-size: 13px;
		color: #888888;
	}
	.message .msgDiv .msgDetail .listmsg span:first-child{
		color: #009bef;
	}
	.message .msgDiv .msgDetail .titmsg{
		font-weight: 600;
		font-size: 18px;
		color: #222222;
		margin-top: 15px;
	}
	.message .msgDiv .msgDetail .timemsg{
		font-size: 14px;
		margin-top: 10px;
	}
	.message .msgDiv .msgDetail .content{
		font-size: 14px;
		color: #444444;
		margin-top: 14px;
	}


	.message .msgDiv>div>div p{
		display: inline-block;
	}
	.message .msgDiv>div>div p:first-child{
		width: 800px;
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.message .msgDiv>div>div p.time{
		float: right;
	}

	
	
	/*暂无数据*/
.null{
	width: 100%;
	height:606px!important;
	text-align: center;
	margin:0 auto;
	border:none!important;
}
.null img{
	width: 210px;
	height:162px;
	margin:0 auto;
	margin-top: 190px;
	background-color: #fff;
}
.null p{
	font-size: 13px;
	color: #555555;
	display: block!important;
	background-color: #fff;
}

.nokong{
	background-color: #009bef!important;
}
</style>