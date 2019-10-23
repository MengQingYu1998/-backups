<template>
	<div class="footer">
			<div class="top">
				<div class="intro">
					<p>公司介绍</p>
					<p>关于我们</p>
					<p>公司介绍</p>
				</div>
				<div class="callUs">
					<p>联系我们</p>
					<p>商务合作：hgeug@adzshd.com</p>
					<p>品牌合作：hgeug@adzshd.com</p>
				</div>
				<div class="erO">
					<img src="../assets/NumImg/mitan.png"/>
					<p>掌上密探</p>
				</div>
				<div class="erT">
					<img src="../assets/NumImg/chuanmei.png"/>
					<p>掌上互动传媒</p>
				</div>
			</div>
			<p></p>
			<div class="bom">
				<p>友情链接1</p>
				<p>友情链接2</p>
				<p>友情链接3</p>
				<p>友情链接4</p>
				<p>友情链接5</p>
				<p>友情链接6</p>
				<p>友情链接7</p>
			</div>
		</div>
</template>


<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style>
.footer{
	width: 100%;
	height: 260px;
	background-color: #06162c;
	color: #fff;
	clear:both;
}
.footer>div{
	width: 1200px;
	margin:0 auto;
	
}
.footer>p{
	width: 1200px;
	height: 1px;
	margin:0 auto;
	background-color: #f7f7f7;
	opacity:0.1;
}
.footer .top>div{
	display: inline-block;
	vertical-align: top;
	margin-top: 40px;
	margin-bottom: 18px;
}
.footer .top>div.intro{
	margin-left: 142px;
}
.footer .top>div.intro p,
.footer .top>div.callUs p{
	line-height: 30px;
}
.footer .top>div.callUs{
	margin-left: 193px;
}
.footer .top>div.erO{
	margin-left: 219px;
	text-align: center;
}
.footer .top>div.erO img,
.footer .top>div.erT img{
	width: 80px;
	height: 80px;
}
.footer .top>div.erO p,
.footer .top>div.erT p{
	font-size: 12px;
}
.footer .top>div.erT{
	margin-left: 79px;
	text-align: center;
}
.footer .top>div p{
	/*font-family: SourceHanSansCN-Regular;*/
	font-size: 13px;
	color: #ffffff;
	opacity: 0.5;
}
.footer .top>div p:first-child{
	/*font-family: SourceHanSansCN-Medium;*/
	font-weight: 600;
}
.footer .bom>p{
	display: inline-block;
	/*font-family: SourceHanSansCN-Regular;*/
	font-size: 12px;
	color: #ffffff;
	opacity: 0.5;
	margin-left: 55px;
	margin-top: 27px;
}
.footer .bom>p:first-child{
	margin-left: 184px;
}

</style>