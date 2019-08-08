<template>
	<div class="index">
		<!-- <v-navv v-show="shownav" :msg="msg" ></v-navv> -->
		<div class="content" >
			<p>首页</p>
		</div>
		
	</div>

</template>

 

<script>
	// import Navv from './navv'
	export default{
		// components:{
		// 	"v-navv":Navv
		// },
		data(){
			return{
				// shownav:false,
				// msg:'',
				// userid:''
			}
		},
		created(){
			// location.reload()
			// let userId=localStorage.getItem("userId")//获取userId
			// this.userid=userId
			// this.getid(this.userid)
		},
		methods:{
			init(){
				
			}
			// getid(id){
			// 	if(id==""||id==null){
			// 		this.msg=true
			// 	}else{
			// 		this.msg=false
			// 	}
			// }
		},
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
	min-height: 600px;
}
	p{
		text-align: center;
		font-size: 40px;
	}
</style>