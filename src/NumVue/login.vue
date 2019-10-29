<template>
	<div class="box" id="login">
		<div class="left">
			<img src="../assets/NumImg/loginImg.png"/>
		</div>
		<div class="right">
			<p class="loginlogo">LOGIN</p>
			<div class="logindiv">
				<p class="logintit">登录</p>
				<div class="inpDiv">
					<div>
						<p class="tel">手机号/邮箱</p>
						<p class="telInp" :class="{'focInp':focinp,'wroInp':wroinp}">
							<input type="text" placeholder="请输入账号" @blur="blurState(telval)"  @focus="focusState()" v-model="telval" @keyup="nullInput()"/>
						</p>
						<p class="wrongTel" v-show="wrongTel" v-html="telFont"></p>
					</div>
					<div>
						<p class="code">密码</p>
						<p class="codeInp" :class="{'focInp':focCode,'wroInp':wrocode}">
							<input type="password" placeholder="请输入密码" @blur="blurCode(codeval)"  @focus="focusCode()"  v-model="codeval" @keyup="nullInput()" />
						</p>
						<p class="wrongCode" v-show="wrongCode" v-html="codeFont"></p>
					</div>
					<div class="veri" v-show="veri">
	                    <p class="Veri">验证码</p>
	                    <div class="VeriInp" :class="{'focInp':focveri,'wroInp':wroVeri}">
	                        <input type="text" @blur="blurVeri(verival)"  @focus="focusVeri()" v-model="verival"  placeholder="请输入您的验证码" maxlength="4" />
	                        <div class="login-code" @click="refreshCode">
					            <!--验证码组件-->
					            <s-identify :identifyCode="identifyCode"></s-identify>
				            </div>
						</div>
	                    <p class="wrongVeri" v-show="wrongVeri" v-html="VeriFont"></p>
	                </div>
				</div>
				<div class="goRegiste">
					<p>还没有账号，<span><router-link :to="{ path: '/register'}">立即注册</router-link></span></p>
					<p><router-link :to="{path: '/code'}">忘记密码</router-link></p>
				</div>
				<div class="loginBtn" :class="{'nokong':ishas}" >
					
						<el-button :plain="true" @click="loginBtn()">登录</el-button>
					
				</div>
				<!-- <div class="weixinLogin">
					<p><img src="../assets/NumImg/otherLogin.png"/></p>
					<p><img src="../assets/NumImg/WeChat.png"></p>
				</div> -->
			</div>
		</div>


	</div>
</template>


<script>
	import SIdentify  from './sidentify'
	export default{
		components: { SIdentify },
		data(){
			return{
				identifyCodes: "1234567890",
		        identifyCode: "",
				focinp:false,//账号输入框获取焦点边框变色
				focCode:false,//密码输入框获取焦点边框变色
				focveri:false,//验证码输入框获取焦点边框变色
				ishas:false,//输入框是否为空
				wrongTel:false,//是否提示账号错误
				wrongCode:false,//是否提示密码错误
				wrongVeri:false,//是否提示验证码错误
				telFont:'账号不能为空',//账号提示内容
				codeFont:'密码不能为空',//密码提示内容
				VeriFont:'验证码不能为空',//验证码提示内容
				wroinp:false,//账号错误边框颜色
				wrocode:false,//密码错误边框变色
				wroveri:false,//密码错误边框变色
				veri:false,//验证码div是否显示
				tel:'',//账号
				code:'',//密码
				islogin:false,
				userId:'',
				// input value
				telval:'',
				codeval:'',
				verival:'',
				wroVeri:'',
				wrongVeri:'',
			}
		},
		methods:{
			// 账号
			focusState(){
				this.focinp=true
				this.wrongTel=false
				this.wroinp=false
			},
			blurState(telval){
				this.tel=telval
				this.focinp=false
				// var reg=/^1(3|4|5|6|7|8|9)\d{9}$/;
				var reg=/^1(3|4|5|6|7|8|9)\d{9}|[1-9]\d{5,11}@qq\.com$/;
				if(this.telval==undefined||this.telval==""){
					this.wrongTel=true
					this.wroinp=true
					this.telFont="账号不能为空"
					return false;
				}else if(!reg.test(this.telval)){
					this.wrongTel=true
					this.wroinp=true
					this.telFont="账号输入错误"
					return false;
				}
			},
			// 密码
			focusCode(){
				this.focCode=true
				this.wrongCode=false
				this.wrocode=false
			},
			blurCode(codeval){
				this.code=codeval
				this.focCode=false
				var reg=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,15}$/
				if(this.codeval==undefined||this.codeval==""){
					this.wrongCode=true
					this.wrocode=true
					this.codeFont="密码不能为空"
				}else if(!reg.test(this.codeval)){
					this.wrongCode=true
					this.wrocode=true
					this.codeFont="密码输入错误"
				}
			},
			//验证码
			focusVeri(){
				this.focveri=true
				this.wrongVeri=false
				this.wroVeri=false
			},
			blurVeri(verival){
				this.focveri=false
				if(this.verival==undefined||this.verival==""){
					this.wrongVeri=true
					this.wroVeri=true
					this.VeriFont="验证码不能为空"
				}else if(this.identifyCode!==this.verival){
					this.wrongVeri=true
					this.wroVeri=true
					this.VeriFont="验证码输入错误"
				}
				
			},
			//登录
			loginBtn(){
				if(this.ishas==true){
					// 登录接口
					this.$axios({
						method:"post",
						url:"/PostLogin",
						data: {
							phone:this.tel,
							password:this.code					
						}
					})
					.then(res=>{
						if(res.data.Code==0){
							let that = this

							//登录成功弹窗
								this.$message({
							        message: '登录成功',
							        type: 'success',
							        iconClass:'successicon',
							        duration:1500,
							    });
							setTimeout(function(){
								
							    
							    let userid=res.data.Data
							    localStorage.setItem("userId",userid);//存储userId(用户id)
								localStorage.setItem("tel",that.tel);//存储手机号
								localStorage.setItem("code",that.code);//存储密码
								that.$router.push({
									path:'/index'
								})
								
							},1000)
							
						}else if(res.data.Code==-2){
							this.wrongCode=true
							this.wrocode=true
							this.codeFont="密码输入错误"
						}else if(res.data.Code==-1){
							this.wrongTel=true
							this.wroinp=true
							this.telFont="用户不存在"
						}
						
					})
					.catch(error=>{
						console.log(error)
					})
				}
				
				
			},
			
			


			nullInput(){
				if(this.telval.length>=1&&this.codeval.length>=1){
					this.ishas=true
				}
			},
			//随机验证码
	        randomNum(min, max) {
	            return Math.floor(Math.random() * (max - min) + min);
	        },
	              
	        refreshCode() {
	            this.identifyCode = "";
	            this.makeCode(this.identifyCodes, 4);
	        },
	        makeCode(o, l) {
	            for (let i = 0; i < l; i++) {
	                this.identifyCode += this.identifyCodes[
	                  this.randomNum(0, this.identifyCodes.length)
	                ];
	            }
	        },
		},
		//创建前设置
		beforeCreate () {
		      document.querySelector('body').setAttribute('style', 'background-color:#fafafa')
		},
		//销毁前清除
		beforeDestroy () {
		      document.querySelector('body').removeAttribute('style')
		},
		created(){
			//初始化验证码
        	this.refreshCode()
        	
		},
		mounted(){
	        this.identifyCode = "";
	        this.makeCode(this.identifyCodes, 4);
	    },

	}
</script>



<style scoped>
*{
	margin:0;
	padding:0;
	list-style: none;
	text-decoration: none;
}

.box{
	width: 1200px;
	margin:0 auto;
	min-height: 770px;
	clear: both;
}
.left,.right{
	display: inline-block;
}
.left{
	float: left;
	margin-left: 140px;
	margin-top: 130px;
}
.left,.left img{
	width: 528px;
	height: 528px;
}
.right{
	width: 382px;
	height: 590px;
	background-color: #ffffff;
	box-shadow: 0px 8px 18px 0px rgba(0, 85, 131, 0.08);
	border-radius: 4px;
	float: right;
	margin-top: 85px;
	position: relative;
	right: 165px;
	border-top: 1px solid transparent;
}
.right .loginlogo{
	font-size: 44px;
	color: #f5fbff;
	text-align: center;
	margin-top: 30px;
}
.right .logindiv{
	position: relative;
	bottom: 28px;
}
.right .logintit{
	font-weight: 600;
	font-size: 18px;
	color: #222222;
	text-align: center;
	letter-spacing: 1px;
}
.inpDiv, .goRegiste, .loginBtn, .weixinLogin{
	width: 306px;
	margin:0 auto;

}

.right .inpDiv>div{
	height: 88px;
	margin-top: 18px;
}
.right .inpDiv>div:first-child{
	margin-top: 50px;
}
.right .inpDiv .tel,
.right .inpDiv .code,
.right .inpDiv .Veri{
	font-size: 14px;
	color: #222222;
}
.right .inpDiv .telInp,
.right .inpDiv .codeInp,
.right .inpDiv .VeriInp{
	height: 42px;
	border-radius: 4px;
	border: solid 1px #f2f2f2;
	margin-top:4px;
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
.right .inpDiv .telInp input::placeholder,
.right .inpDiv .codeInp input::placeholder,
.right .inpDiv .VeriInp input::placeholder{
	font-size: 14px;
	color: #bfbfbf;
}

.right .inpDiv .telInp input,
.right .inpDiv .codeInp input,
.right .inpDiv .VeriInp input{
	width: 250px;
	padding-left: 10px;
	outline: none;
	border:none;
	margin-top: 12px;
	font-size: 14px;
	color: #222222;
}
.right .inpDiv .VeriInp input{
	width: 200px;
}
.right .inpDiv .wrongTel,
.right .inpDiv .wrongCode,
.right .inpDiv .wrongVeri{
	font-size: 12px;
	color: #f50202;
}
.right .goRegiste p{
	margin-top: 15px;
}
.right .goRegiste p:first-child{
	font-size: 13px;
	color: #888888;
	float: left;
}
.right .goRegiste p:first-child span a{
	font-size: 13px;
	color: #009bef;
}
.right .goRegiste p:last-child{
	font-size: 12px;
	color: #009bef;
	float: right;
}
.right .goRegiste p:last-child a{
	font-size: 12px;
	color: #009bef;
}
.right .goRegiste p:first-child span:hover,
.right .goRegiste p:last-child:hover{
	cursor: pointer;
}
.right .loginBtn{
	height: 42px;
	line-height: 42px;
	text-align: center;
	background-color: #dfdfdf;
	border-radius: 4px;
	font-size: 16px;
	color: #ffffff;
	margin-top: 52px;
	margin-top: 90px;
}
.right .loginBtn button{
	width: 100%;
	height: 100%;
	background-color: transparent;
	font-size: 16px;
	color: #ffffff!important;
}
.nokong{
	background-color: #009bef!important;
}
.right .weixinLogin p{
	text-align: center;
	margin-top: 13px;
}

/*验证码样式*/
.login-code{
	width: 84px;
	height: 40px;
	float: right;
}
.login-code canvas{
	width: 100%;
	height: 100%;
}
</style>