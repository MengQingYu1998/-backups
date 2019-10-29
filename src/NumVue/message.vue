<template>
	<div id="msg">
		<p class="topLine"></p>
		<div class="message">
			<!-- 左导航 -->
			<div class="left">
				<div :class="{'selected':isSelectm}" @click="cliMsg()">
					<img src="../assets/NumImg/msg.png" v-if="msgImg"/>
					<img src="../assets/NumImg/msgS.png" v-else/>
					<p>消息中心</p>
				</div>
				<div :class="{'selected':isSelects}" @click="cliSet()">
					<img src="../assets/NumImg/setS.png" v-if="msgImg"/>
					<img src="../assets/NumImg/set.png" v-else/>
					
					<p>账号设置</p> 
				</div>
			</div>
			<!-- 分割线 -->
			<p></p>
			<!-- 右内容 -->
			<div class="right msgDiv" v-if="showMsgdiv">
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
							<img src="../assets/NumimgTwo/null.png"/>
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
			<div class="right setDiv" v-else>
				
				<ul>
					<li v-for="(setFont,index) in setFonts" :class="{'selectMsg':selectset==index}" @click="clisetF(index)" :key="'LY05'+index">{{setFont.name}}</li>	
				</ul>
				<!-- 账号设置 -->
				<div v-if="shownum">
					<!-- 头像 -->
					<div>
						<p class="tit">头像</p>
						<img :src="touxiang" class="touxiang" />
						<a href="javascript:;" class="file">修改
						    <input type="file" class="input-file" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png"/>
						</a>
					</div>
					<!-- 手机号 -->
					<div>
						<p class="tit">手机号</p>
						<p v-html="telnow"></p>
						<p class="correct cf" @click="corTel()">修改</p>
					</div>
					<!-- 微信 -->
					<div>
						<p class="tit">微信</p>
						<p class="correct " v-if="unwexin" @click="weixin()">绑定微信</p>
						<p v-else>
							<span>哈哈哈哈哈哈</span>
							<span class="correct">取消绑定</span>
						</p>	
					</div>
					<!-- 邮箱 -->
					<div>
						<p class="tit">邮箱</p>
						<p class="correct" v-if="unemail" @click="cliemail()">绑定邮箱</p>
						<p v-else>
							<span v-html="nowemail"></span>
							<span class="correct" @click="cancelemail()">取消绑定</span>
						</p>
					</div>
					<!-- 产品名称 -->
					<div>
						<p class="tit">产品名称</p>
						<p>
							<input type="text" @blur="blurpro(proval)" v-model="proval" placeholder="请输入您的产品名称" class="inpro">
						</p>
					</div>
					<div class="preserve setbtn" @click="setsave()">保存</div>
				</div>
				<!-- 修改密码 -->
				<div class="codeDiv" v-else>
					<p>温馨提示：密码修改成功后，需重新登录新密码生效。</p>
					<div>
						<p>旧密码</p>
						<p class="telInp" :class="{'focInp':focold,'wroInp':wrold}">
							<input type="Password" placeholder="请输入您的旧密码" @blur="blurold(oldval)" @keyup="codeInput()" @focus="focusold()" v-model="oldval" />
						</p>
						<p class="wrongold" v-show="wrongold" v-html="oldFont"></p>
					</div>
					<div>
						<p>新密码</p>
						<p class="telInp" :class="{'focInp':focnew,'wroInp':wronew}">
							<input type="Password" placeholder="请输入您的新密码" @blur="blurnew(newval)" @keyup="codeInput()" @focus="focusnew()" v-model="newval" />
						</p>
						
						<p class="des">密码需包含字母、数字、符号中的两种，位数为6-15位</p>
						<p class="wrongnew" v-show="wrongnew" v-html="newFont"></p>
					</div>
					<div>
						<p>确认密码</p>
						<p class="telInp" :class="{'focInp':focsure,'wroInp':wrosure}">
							<input type="Password" placeholder="请输入确认密码" @blur="blursure(sureval)" @keyup="codeInput()" @focus="focusure()" v-model="sureval"  />
						</p>
						<p class="wrongsure" v-show="wrongsure" v-html="sureFont"></p>
					</div>
					<div class="preserve" @click="savecode()" :class="{'nokong':iscodebtn}">保存</div>
				</div>
			</div>
		</div>
		<!-- 弹窗 -->
		<div>
			<!-- 修改手机号 -->
			<div class="mask" v-show="telMask">
				<div class="aDiv">
					<p class="tit">
						<span>修改手机号</span>
						<img src="../assets/NumImg/closeMask.png" @click="closeTel()"/>
					</p>
					<p class="nowTel">
						<span>当前手机号</span>
						<span v-html="telnow"></span>
					</p>
					<div class="telnum">
						<p>
							<input class="telInp" :class="{'focInp':focinp,'wroInp':wroinp}" type="text" placeholder="请输入您的新手机号" @blur="blurState(telval)"  @focus="focusState()" v-model="telval"/>
							<el-button v-html="codeBtn" :plain="true" @click="huoqu()" @keyup="telInput()" :disabled="disabled"></el-button>
						</p>
						<p class="wrongTel" v-show="wrongTel" v-html="telFont"></p>
					</div>
					<div>
						<p>
						<input class="telInp veriInp" :class="{'focInp':focveri,'wroInp':wroveri}" type="text" placeholder="请输入短信验证码" @blur="blurVeri(verival)"  @focus="focusVeri()" v-model="verival" @keyup="telInput()" maxlength="6" />
						
						</p>
						<p class="wrongVeri" v-show="wrongVeri" v-html="veriFont"></p>
					</div>
					<p class="sureBtn" @click="changetel()" :class="{'nokong':ishas}">确认修改</p>
				</div>
			</div>
			<!-- 绑定邮箱 -->
			<div class="mask" v-show="emailMask">
				<div class="aDiv">
					<p class="tit">
						<span>绑定邮箱</span>
						<img src="../assets/NumImg/closeMask.png" @click="closeEmail()"/>
					</p>
					<div>
						<p class="emailInp" >
							<input :class="{'focInp':focEmail,'wroInp':wroemail}" type="text" placeholder="请输入您的邮箱" @blur="blurEmail(emailval)"  @focus="focusEmail()"  v-model="emailval" @keyup="emailInput()"/>
						</p>
						<p class="wrongEmail" v-show="wrongEmail" v-html="emailFont"></p>
					</div>
					<p class="des">
						确认绑定邮箱后将收到激活邮件，点击激活邮件里的链接验证邮箱成功。
					</p>
					<p class="sureBtn" @click="bindemail()" :class="{'nokong':isemail}">确认绑定</p>
				</div>
			</div>
			<!-- 绑定微信 -->
			<div class="mask" v-show="weixinMask">
				<div class="aDiv">
					<p class="tit">
						<span>绑定微信</span>
						<img src="../assets/NumImg/closeMask.png" @click="closeWeixin()"/>
					</p>
					<p class="erweima" >
						<img src="" />
					</p>
					<p class="sao">微信扫一扫 绑定微信</p>
					
				</div>
			</div>
		</div>
	</div>
	

</template>


<script>
	export default{
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
					console.log(this.nowemail)
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
				// let tel=window.localStorage.getItem('tel')
				// let code=window.localStorage.getItem('code')
				// let email = window.localStorage.getItem('email')
				// this.code=code
				
				
				// if(localStorage.getItem('touxiang')!=null){
				// 	this.touxiang=localStorage.getItem('touxiang')
				// }
				
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
			// 点击账号设置
			clisetF(index){
				this.selectset=index
				if(this.selectset==0){
					this.shownum=true
				}else{
					this.shownum=false
				}
			},
			// 修改头像接口
			changeTou(touX){
				this.$axios({
	                method:'post',
	                url:'/UptAvatar',
	                data:{
	                	accountId:this.uid,
	                	avatar:this.touxiang
	                }
	            })
	            .then(res=>{
	                console.log(res.data.Code)
	            })
	            .catch(error=>{
	                console.log(error)
	            })
			},
			// 修改头像
			changeImage: function(e){
	            let file = e.target.files[0];
	            if(file) {
	                this.file = file
	                
	                let reader = new FileReader()
	                let that = this
	                reader.readAsDataURL(file)
	                reader.onload= function(e){
	                    // 这里的this 指向reader
	                    that.touxiang=this.result
	                    // 调用上传头像接口
	                    that.changeTou(this.result)
	                    // localStorage.setItem("touxiang",this.result);//存储密码
	                }
	                
	                
	            }
	        },
	        // 账号
			focusState(){
				this.focinp=true
				this.wrongTel=false
				this.wroinp=false
			},
			blurState(telval){
				this.focinp=false
				this.tel=this.telval
				
				var reg=/^1(3|4|5|6|7|8|9)\d{9}$/;
				if(this.telval==undefined||this.telval==""){
					this.wrongTel=true
					this.wroinp=true
					this.telFont="手机号不能为空"
					return false;
				}else if(!reg.test(this.telval)){
					this.wrongTel=true
					this.wroinp=true
					this.telFont="手机号输入错误"
					return false;
				}
			},
			// 验证码
			focusVeri(){
				this.focveri=true
				this.wrongVeri=false
				this.wroveri=false
			},
			blurVeri(verival){
				// this.veri=verival
				this.focveri=false
				var reg=/^\d{6}$/;
				if(this.verival==undefined||this.verival==""){
					this.wrongVeri=true
					this.wroveri=true
					this.veriFont="验证码不能为空"
					return false;
				}else if(!reg.test(this.verival)){
					this.wrongVeri=true
					this.wroveri=true
					this.veriFont="验证码输入错误"
					return false;
				}else if(this.verival!=this.veri){
					this.wrongVeri=true
					this.wroveri=true
					this.veriFont="验证码输入错误"
				}
			},
			// 手机号修改
			telInput(){
				var reg=/^1(3|4|5|6|7|8|9)\d{9}$/;
				if(reg.test(this.telval)&&this.verival==this.veri){
					this.ishas=true
				}
				
			},
			// 获取验证码
			huoqu(){
				var reg=/^1(3|4|5|6|7|8|9)\d{9}$/;
				if(this.tel==undefined||this.tel==""){
					this.wrongTel=true
					this.wroinp=true
					this.telFont="手机号不能为空"
					return false;
				}else if(!reg.test(this.tel)){
					this.wrongTel=true
					this.wroinp=true
					this.telFont="手机号输入错误"
					return false;
				}else{
					this.telhas=true
					// 获取验证码接口
					this.$axios({
						method:"get",
						url:"/GetAuthCode?phone="+this.tel,
						
					})
					.then(res=>{
						this.veri=res.data.Data
						//倒计时
					    let time = 60;
					    let timer = setInterval(() => {
						    if(time == 0) {
							    clearInterval(timer);
							    this.codeBtn = "重新获取";
							    this.disabled=false
						    } else {
							    this.codeBtn =time + '秒';
							    time--
							    this.disabled=true
						    }

					  	},1000)
					  	
					})
					.catch(error=>{
						console.log(error)
					})



					
				}
			},
	        // 修改手机号接口
	        changetel(){
	        	var reg=/^1(3|4|5|6|7|8|9)\d{9}$/;
	        	if(reg.test(this.telval)&&this.verival==this.veri){
	        		this.$axios({
		        		method:'post',
		        		url:'/UptPhone',
		        		data:{
		        			accountId:this.uid,//用户id
		        			newPhone:this.telval
		        		}
		        	})
		        	.then(res=>{
		        		if(res.data.Code==0){
		        			this.telMask=false
		        			this.telnow=this.telval
			        		
			        		document.getElementsByTagName('body')[0].setAttribute('style', 'position:fixed; width:100%;')
		        		}
		        		
		        	})
		        	.catch(error=>{
		        		console.log(error)
		        	})
	        	}
	        	
	        },
	        // 修改手机号
	        corTel(){
	        	this.telMask=true
	        	document.getElementsByTagName('body')[0].setAttribute('style', 'position:fixed; width:100%;')
	        },
	        //关闭修改手机号弹窗 
	        closeTel(){
	        	this.telMask=false
	        	document.getElementsByTagName('body')[0].setAttribute('style', 'position:relative;')
	        },
	        // 绑定微信
	        weixin(){
	        	this.weixinMask=true
	        	document.getElementsByTagName('body')[0].setAttribute('style', 'position:fixed; width:100%;')
	        },
	        // 邮箱
	        focusEmail(){
	        	this.focEmail=true
				this.wrongEmail=false
				this.wroemail=false
	        },
	        blurEmail(emailval){
	        	this.email=emailval
				this.focEmail=false
				this.wrongEmail=false
				var reg=/^[1-9]\d{5,11}@qq\.com$/;
				if(this.emailval==undefined||this.emailval==""){
					this.wrongEmail=true
					this.wroemail=true
					this.emailFont="邮箱不能为空"
					return false;
				}else if(!reg.test(this.emailval)){
					this.wrongEmail=true
					this.wroemail=true
					this.emailFont="邮箱输入错误"
					return false;
				}
	        },
	        // 绑定邮箱输入框
	        emailInput(){
	        	var reg=/^[1-9]\d{5,11}@qq\.com$/;
	        	if(reg.test(this.emailval)){
	        		this.isemail=true
	        	}
	        },
	        // 绑定邮箱接口
	        bindemail(){
	        	var reg=/^[1-9]\d{5,11}@qq\.com$/;
	        	
	        	if(reg.test(this.emailval)){
	        		this.$axios({
		        		method:'post',
		        		url:'/SendEmail',  
		        		data:{
		        			phone:this.telnow,
		        			email:this.email
		        		}
		        	})
		        	.then(res=>{
		        		if(res.data.Code==0){
		        			this.emailMask=false
			        		document.getElementsByTagName('body')[0].setAttribute('style', 'position:relative;')
			        		alert("验证信息已发送您的邮箱")
		        		}
		        		
		        		
		        	})
		        	.catch(error=>{
		        		console.log(error)
		        	})
	        	}
	        	
	        },
	        // 取消绑定邮箱
	        cancelemail(){
	        	
	        	this.$axios({
	        		method:'post',
	        		url:'/CancleBind',
	        		data:{
		        		accountId:this.uid,
		        		type:2
		        	}
	        	})
	        	.then(res=>{
	        		if(res.data.Code==0){
	        			this.unemail=true
	        			window.localStorage.removeItem('email')
	        			// this.nowemail=''
	        		}
	        	})
	        	.catch(error=>{
	        		console.log(error)
	        	})
	        	
	        },
	        // 绑定邮箱
	        cliemail(){
	        	this.emailMask=true
	        	document.getElementsByTagName('body')[0].setAttribute('style', 'position:fixed; width:100%;')
	        },
	        //关闭绑定邮箱弹窗 
	        closeEmail(){
	        	this.emailMask=false
	        	document.getElementsByTagName('body')[0].setAttribute('style', 'position:relative;')
	        },
	        //关闭绑定微信弹窗 
	        closeWeixin(){
	        	this.weixinMask=false
	        	document.getElementsByTagName('body')[0].setAttribute('style', 'position:relative;')
	        },
	        // 产品名称失去焦点
	        blurpro(proval){
	        	this.product=proval
	        },
	        // 账号设置的保存按钮
	        setsave(){
	        	this.$axios({
		        	method:'post',
		        	url:'/ProductName',
		        	data:{
		        		accountId:this.uid,
		        		productName:this.product,
		        	}
		        })
		        .then(res=>{
		        	let routerUrl=this.$router.resolve({
						path:'/index'
					})
					window.open(routerUrl .href,'_blank')
					window.close();
		        })
		        .catch(error=>{
		        	console.log(error)
		        })
	        
	        	
	        },
	        // 修改密码
	        // 旧密码
	        focusold(){
	        	this.focold=true
	        	this.wrold=false
	        	this.wrongold=false
	        },
	        blurold(oldval){
	        	this.focold=false
	        
	        	if(this.oldval==""||this.oldval==undefined){
	        		this.wrongold=true
	        		this.wrold=true
	        		this.oldFont="旧密码不能为空"
	        	}
	        	
	        	this.$axios({
	        		method:'post',
		        		url:'/VerifyOldPwd',
		        		data:{
		        			id:this.uid,
							Password:this.oldval
		        		}
	        	})
	        	.then(res=>{
	        		if(res.data.Code==0){
	        			this.wrold=false
	        			this.iscom=true
	        		}else{
	        			this.wrold=true
	        			this.wrongold=true
	        			this.oldFont="旧密码错误"
	        		}
	        	})
	        	.catch(error=>{
	        		console.log(error)
	        	})
	        },
	        // 新密码
	        focusnew(){
	        	this.focnew=true
	        	this.wronew=false
	        	this.wrongnew=false
	        },
	        blurnew(newval){
	        	this.focnew=false
	        	// this.wronew=true
	        	this.newV=this.newval
	        	var reg=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,15}$/
	        	if(this.newval==""||this.newval==undefined){
	        		this.wronew=true
	        		this.wrongnew=true
	        		this.newFont="密码不能为空"
	        	}else if(!reg.test(this.newval)){
					this.wrongnew=true
					this.wronew=true
					this.newFont="密码格式错误"
				}
	        },
	        // 点击确认密码
	        focusure(){
	        	this.focsure=true
	        	this.wrosure=false
	        	this.wrongsure=false
	        },
	        blursure(sureval){
	        	this.focsure=false
	        	// this.wrosure=false
	        	// this.surecode=this.sureval
	        	if(this.sureval==""||this.sureval==undefined){
	        		this.wrosure=true
	        		this.wrongsure=true
	        		this.sureFont="确认密码不能为空"
	        	}else if(this.newV!=this.sureval){
	        		this.wrosure=true
					this.wrongsure=true
					this.sureFont="确认密码需和新密码保持一致"
				}
	        },
	        codeInput(){
	        	var reg=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,15}$/;
	        	
	        	if(this.iscom==true&&reg.test(this.newval)&&this.newval!=""&&this.newval==this.sureval){
		        		this.iscodebtn=true
		        }
	        	
	        },
	        // 点击修改密码的保存
	        savecode(){
	        	var reg=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,15}$/;
	        	if(this.iscom==true&&reg.test(this.newval)&&this.newval!=""&&this.newval==this.sureval){
	        		this.$axios({
		        		method:'post',
		        		url:'/PostUpdatePassword',
		        		data:{
		        			passwordOld:this.oldval,
		        			passwordNew:this.newval,
		        			accountId:this.uid
		        		}
		        	})
		        	.then(res=>{
		        		if(res.data.Code==0){
		        			alert("密码修改成功")
		        		}
		        	})
		        	.catch(error=>{
		        		console.log(error)
		        	})
	        	}
	        	
	        }

		},
		created(){
			this.getallmsg()
			this.getMsg()
		}	
	}
</script>



<style scoped>
	.topLine{
		width: 100%;
		height: 1px ;
		/*background-color: #efefef;*/
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
	}
	.message .left>div{
		margin-top: 40px;
	}
	.message .left>div:hover{
		cursor: pointer;
	}
	.message .left>div:first-child{
		margin-top: 0;
	}
	.message .left>div img{
		width: 16px;
		height: 16px;
		margin-left: 5px;
	}
	.message .left>div p{
		line-height: 16px;
		display: inline-block;
		font-weight: 600;
		font-size: 14px;
		color: #222222;
		vertical-align: top;
		margin-left: 10px;
		margin-top: 1px;
	}
	.selected p{
		color: #009bef!important;
	}
	.message .right{
		width: 985px;
		float: right;
	}
	.message .right ul{
		height: 24px;
		border-bottom: 1px solid #efefef;
	}
	.message .right ul li{
		width: 88px;
		height: 24px;
		text-align: center;
		float: left;
		font-weight: 600;
		font-size: 14px;
		color: #888888;
		margin-left: 47px;
	}
	.message .right ul li:hover{
		cursor: pointer;
	}
	.selectMsg{
		color: #222222!important;
		border-bottom:1px solid #009bef!important;
	}
	.message .right ul li:first-child{
		margin-left: 0;
	}

	.message .msgDiv>div>div>div{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #efefef;
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

	.message .setDiv>div>div.preserve{
		width: 100px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		background-color: #dfdfdf;
		border-radius: 4px;
		font-size: 15px;
		color: #ffffff;
		margin-top: 50px;
		margin-left: 98px;
	}
	.message .setDiv>div>div.setbtn{
		background-color: #009bef;
	}
	.message .setDiv>div>div.preserve:hover,
	.mask .aDiv .tit img:hover,
	.mask .aDiv p.sureBtn:hover,
	.mask .aDiv p span.codeBtn:hover{
		cursor: pointer;
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
	.message .setDiv>div>div{
		margin-top: 24px;
	}
	.message .setDiv>div>div p,
	.message .setDiv>div>div p span{
		font-size: 14px;
		color: #888;
		display: inline-block;
	}
	.message .setDiv>div>div .touxiang{
		width: 62px;
		height: 62px;
		border-radius: 50%;
		border: solid 1px #f2f2f2;
		margin-left: 34px;
	}
	.message .setDiv>div>div p:nth-child(2){
		margin-left: 34px;
	}
	.message .setDiv>div>div p.tit{
		width: 56px;
		color: #444444;
		
	}
	.message .setDiv>div>div:first-child p.tit{
		vertical-align: top;
		margin-top: 23px;
	}
	.message .setDiv>div>div p.correct,
	.message .setDiv>div>div p span.correct{
		color: #009bef;
		margin-left: 32px;
	}
	.message .setDiv>div>div p.correct:hover{
		cursor: pointer;
	}
	.message .setDiv>div>div p.cf{
		margin-left: 34px;
	}
	.file {
	    font-size: 14px;
	    position: relative;
	    color: #009bef;
	    text-indent: 0;
	    margin-left: 32px;
	    vertical-align: top;
	    margin-top: 23px;
	    display: inline-block;
	}
	.file input {
		width: 30px;
		height: 20px;
	    position: absolute;
	    font-size: 100px;
	    right: 0;
	    top: 0;
	    opacity: 0;
	}
	.file input,
	.input-file:hover{
		cursor: pointer;
	}
	.inpro{
		width: 219px;
		height: 32px;
		border: solid 1px #f2f2f2;
		font-size: 14px;
		color: #009bef;
		outline: none;
		padding-left:13px; 
	}
	.inpro::placeholder{
		font-size: 14px;
		color: #bfbfbf;
	}

	.message .setDiv .codeDiv>p{
		font-size: 14px;
		color: #009bef;
		margin-top: 34px;
	}
	.message .setDiv .codeDiv>div>p{
		width: 56px;
		font-size: 14px;
		color: #444444;
	}
	.message .setDiv>div.codeDiv>div p.wrongold,
	.message .setDiv>div>div p.wrongnew,
	.message .setDiv>div>div p.wrongsure{
	    display: block;
	    width: 216px;
	    font-size: 12px;
	    color: #f50202;
	    margin-left: 95px;
	}
	.message .setDiv .codeDiv>div>p:nth-child(2){
		width: 209px;
		height: 36px;
		border: solid 1px #f2f2f2;
		margin-left: 34px;
	}
	.message .setDiv .codeDiv>div>p.des{
		width: 288px;
		font-size: 12px;
		color: #bfbfbf;
		margin-left: 15px;
	}
	.message .setDiv .codeDiv>div>p input::placeholder{
		font-size: 14px;
		color: #bfbfbf;
	}
	.message .setDiv .codeDiv>div>p input{
		font-size: 14px;
		color: #009bef;
		margin-top: 8px;
	    outline: none;
	    border: none;
	    padding-left: 10px;
	}
	.mask{
		width:100%;
		height: 100%;
		background-color:rgba(6,22,24,.5);
		position: absolute;
		top:0;
		left:0;
		z-index: 99;
	}
	.mask .aDiv{
		width: 400px;
		height: 311px;
		background-color: #ffffff;
		border-radius: 10px;
		margin:0 auto;
		margin-top: 200px;
		border: 1px solid transparent;
	}
	.mask .aDiv .tit{
		margin-top: 24px;
	}
	.mask .aDiv .tit span{
		font-weight: 600;
		font-size: 18px;
		color: #222222;
	}
	.mask .aDiv .nowTel{
		margin-top: 30px;
	}
	.mask .aDiv .tit span,
	.mask .aDiv .nowTel span:first-child{
		margin-left: 24px;
	}
	.mask .aDiv .tit img{
		width: 22px;
		height: 22px;
		float: right;
		margin-right: 16px;
	}
	.mask .aDiv .nowTel span{
		font-size: 14px;
		color: #888888;
	}
	.focInp{
		border:solid 1px #009bef!important;
	}
	.focInp input{
		color: #009bef!important;
	}
	.wroInp{
		border:solid 1px #f50202!important;
	}
	.mask .aDiv p.wrongEmail{
	    font-size: 12px;
	    color: #f50202;
	    margin-left: 24px;
	}
	.mask .aDiv p input{
		width: 232px;
		height: 32px;
		font-size: 14px;
		color: #009bef;
		outline: none;
		border: solid 1px #f2f2f2;
		padding-left: 10px;
		margin-left: 24px;
		margin-top: 20px;
	}
	.focInp{
		border:solid 1px #009bef!important;
		color: #009bef!important;
	}
	.mask .aDiv .wrongTel,
	.mask .aDiv .wrongVeri{
		height: 10px;
		font-size: 12px;
		color: #f50202;
		margin-left: 24px;
	}

	.mask .aDiv p input::placeholder{
		font-size: 14px;
		color: #bfbfbf;
	}
	.mask .aDiv p.sureBtn{
		width: 100px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		background-color: #dfdfdf;
		border-radius: 4px;
		font-size: 15px;
		color: #ffffff;
		margin:0 auto;
		margin-top: 30px;
	}
	.mask .aDiv p span.codeBtn{
		font-size: 14px;
		color: #009bef;
		margin-left: 24px;
	}

	.mask .aDiv p.des{
		width: 350px;
		line-height: 30px;
		margin:0 auto;
		font-size: 14px;
		color: #888888;
		margin-top: 15px;
	}
	.mask .aDiv p.erweima{
		width: 110px;
		height: 110px;
		margin:0 auto;
		text-align: center;
		border: 1px solid #f2f2f2;
		margin-top: 54px;
	}
	.mask .aDiv p.sao{
		font-size: 14px;
		color: #888888;
		text-align: center;
		margin-top: 13px;
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
}
.null p{
	font-size: 13px;
	color: #555555;
	display: block!important;
}

.nokong{
	background-color: #009bef!important;
}
</style>