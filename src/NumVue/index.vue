<template>
	<div class="index">
		<v-navv v-show="shownav" :msg="msg" ></v-navv>
		<div class="content" @useidFn="getid()">
			<p>首页</p>
		</div>
		
	</div>

</template>

 

<script>
	import Navv from './navv'
	export default{
		components:{
			"v-navv":Navv
		},
		data(){
			return{
				shownav:false,
				userid:'',
				unlogin:'',
				msg:'',
			}
		},
		methods:{
			getid(id){
				if(id!=""){
					this.msg=false
				}else{
					this.msg=true
				}
			}
		},
		created(){
			let userId=localStorage.getItem("userId")//获取userId
			this.userid=userId
			this.getid(this.userid)

			// this.tel=this.$route.query.tel
			window.localStorage.setItem('tel',this.$route.query.tel)
			window.localStorage.setItem('code',this.$route.query.code)
		}

	}


</script>

<style scoped>
*{
	margin:0;
	padding: 0;
	list-style: none;
	text-decoration: none;
}
.content{
	width: 1200px;
	margin:0 auto;
	border:1px solid red;
	min-height: 600px;
}
	p{
		text-align: center;
		font-size: 40px;
	}
</style>