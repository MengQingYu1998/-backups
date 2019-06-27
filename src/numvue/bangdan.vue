<template>
	<div class="box">
		<div class="nav">
			<img src="../assets/NumImg/logo.png" class="logo" />
			<ul>
				<li>首页</li>
				<li @mouseover="showAppstore()" @mouseout="hideAppstore()">
					<p v-bind:class="{up:isUp}" v-html="appVal"></p>
					<img src="../assets/NumImg/down.png" class="down" v-if="down">
					<img src="../assets/NumImg/shang.png" class="down" v-else>
				</li>
				<li @mouseover="showAso()" @mouseout="hideAso()">
					<p v-bind:class="{up:isUpaso}" v-html="asoVal"></p>
					<img src="../assets/NumImg/down.png" class="down" v-if="downaso">
					<img src="../assets/NumImg/shang.png" class="down" v-else>
				</li>
			</ul>
			
			<div class="searchDiv">
				<img src="../assets/NumImg/pingguo.png" class="ios" />
				<select name="country" class="fastbannerform__country">
			        <option value="ASA" title="AA" >美国</option>
		            <option value="AND" title="AD" >安道尔</option>
		            <option value="ARE" title="AE" >阿拉伯联合酋长国</option>
		            <option value="AFG" title="AF" >阿富汗</option>
		            <option value="ATG" title="AG" >安提瓜和巴布达</option>
		            <option value="ALB" title="AL" >阿尔巴尼亚</option>
		            <option value="ARM" title="AM" >亚美</option>
		            <option value="AGO" title="AO" >安哥拉</option>
		            <option value="ARG" title="AR" >阿根廷</option>
		            <option value="AUT" title="AT" >奥地利</option>
		            <option value="AUS" title="AU" >澳大利亚</option>
		           	<option value="ABW" title="AW" >阿鲁巴</option>
		            <option value="AZE" title="AZ" >阿塞拜疆</option>
		            <option value="BIH" title="BA" >波斯尼亚和黑塞哥维那</option>
		            <option value="BRB" title="BB" >巴巴多斯</option>
		            <option value="BGD" title="BD" >孟加拉</option>
		            <option value="BEL" title="BE" >比利时</option>
		            <option value="BFA" title="BF" >布基纳法索</option>
		            <option value="BGR" title="BG" >保加利亚</option>
		            <option value="BHR" title="BH" >巴林</option>
		            <option value="BDI" title="BI" >布隆迪</option>
		            <option value="BEN" title="BJ" >贝宁</option>
		            <option value="BMU" title="BM" >百慕大</option>
		            <option value="BRN" title="BN" >文莱</option>
		            <option value="BOL" title="BO" >玻利维亚</option>
		            <option value="BRA" title="BR" >巴西</option>
		            <option value="BHS" title="BS" >巴哈马</option>
		            <option value="BTN" title="BT" >不丹</option>
		            <option value="BWA" title="BW" >博茨瓦纳</option>
		            <option value="BLR" title="BY" >白俄罗斯</option>
		            <option value="BLZ" title="BZ" >伯利兹</option>
		            <option value="CAN" title="CA" >加拿大</option>
			        <option value="COD" title="CD" >刚果共和国</option>
			        <option value="CAF" title="CF" >中非</option>
			        <option value="COG" title="CG" >刚果共和国</option>
			        <option value="CHE" title="CH" >瑞士</option>
			        <option value="CHL" title="CL" >智利</option>
			        <option value="CMR" title="CM" >喀麦隆</option>
			        <option value="CHN" title="CN" selected="selected">中国</option>
			        <option value="COL" title="CO" >哥伦比亚</option>
			        <option value="CRI" title="CR" >哥斯达黎加</option>
			        <option value="CUB" title="CU" >古巴</option>
			        <option value="CPV" title="CV" >佛得角</option>
			        <option value="CYP" title="CY" >塞浦路斯</option>
			        <option value="CZE" title="CZ" >捷克共和国</option>
			        <option value="DEU" title="DE" >德国</option>
			        <option value="DJI" title="DJ" >吉布提</option>
			        <option value="DNK" title="DK" >丹麦</option>
			        <option value="DMA" title="DM" >多米尼加</option>
			        <option value="DOM" title="DO" >多米尼加共和国</option>
			        <option value="DZA" title="DZ" >阿尔及利亚</option>
			        <option value="ECU" title="EC" >厄瓜多尔</option>
			        <option value="EST" title="EE" >爱沙尼亚</option>
			        <option value="EGY" title="EG" >埃及</option>
			        <option value="ERI" title="ER" >厄立特里亚</option>
			        <option value="ESP" title="ES" >西班牙</option>
			        <option value="ETH" title="ET" >埃塞俄比亚</option>
			        <option value="FIN" title="FI" >芬兰</option>
			        <option value="FJI" title="FJ" >斐济</option>
			        <option value="FLK" title="FK" >法罗群岛</option>
			        <option value="FSM" title="FM" >马来西亚</option>
			        <option value="FRO" title="FO" >法罗群岛</option>
			        <option value="FRA" title="FR" >法国</option>
			        <option value="GAB" title="GA" >加蓬</option>
			        <option value="GBR" title="GB" >英国</option>
			        <option value="GRD" title="GD" >格林纳达</option>
			        <option value="GEO" title="GE" >格鲁吉亚</option>
			        <option value="GHA" title="GH" >加纳</option>
			        <option value="GIB" title="GI" >直布罗陀</option>
			        <option value="GMB" title="GM" >冈比亚</option>
			        <option value="GIN" title="GN" >几内亚</option>
			        <option value="GNQ" title="GQ" >赤道几内亚</option>
			        <option value="GRC" title="GR" >希腊</option>
			        <option value="GTM" title="GT" >危地马拉</option>
			        <option value="GNB" title="GW" >几内亚比绍</option>
			        <option value="GUY" title="GY" >圭亚那</option>
			        <option value="HKG" title="HK" >香港</option>
			        <option value="HND" title="HN" >洪都拉斯</option>
			        <option value="HRV" title="HR" >克罗地亚</option>
			        <option value="HTI" title="HT" >海地</option>
			        <option value="HUN" title="HU" >匈牙利</option>
			        <option value="IDN" title="ID" >印度尼西亚</option>
			        <option value="IRL" title="IE" >爱尔兰</option>
			        <option value="ISR" title="IL" >以色列</option>
			        <option value="IND" title="IN" >印度</option>
			        <option value="IRQ" title="IQ" >伊拉克</option>
			        <option value="IRN" title="IR" >伊朗</option>
			        <option value="ISL" title="IS" >冰岛</option>
			        <option value="ITA" title="IT" >意大利</option>
			        <option value="JAM" title="JM" >牙买加</option>
			        <option value="JOR" title="JO" >约旦</option>
			        <option value="JPN" title="JP" >日本</option>
			        <option value="KEN" title="KE" >肯尼亚</option>
			        <option value="KGZ" title="KG" >吉尔吉斯斯坦</option>
			        <option value="KHM" title="KH" >柬埔寨</option>
			        <option value="KIR" title="KI" >基里巴斯</option>
			        <option value="COM" title="KM" >科摩罗</option>
			        <option value="KNA" title="KN" >圣基茨和尼维斯</option>
			        <option value="PRK" title="KP" >朝鲜</option>
			        <option value="KOR" title="KR" >韩国</option>
			        <option value="KWT" title="KW" >科威特</option>
			        <option value="CYM" title="KY" >开曼群岛</option>
			        <option value="KAZ" title="KZ" >哈萨克斯坦</option>
			        <option value="LAO" title="LA" >老挝</option>
			        <option value="LBN" title="LB" >黎巴嫩</option>
			        <option value="LCA" title="LC" >圣卢西亚</option>
			        <option value="LIE" title="LI" >列支敦士登</option>
			        <option value="LKA" title="LK" >斯里兰卡</option>
			        <option value="LBR" title="LR" >利比里亚</option>
			        <option value="LSO" title="LS" >莱索托</option>
			        <option value="LTU" title="LT" >立陶宛</option>
			        <option value="LUX" title="LU" >卢森堡</option>
			        <option value="LVA" title="LV" >拉脱维亚</option>
			        <option value="LBY" title="LY" >利比亚</option>
			        <option value="MAR" title="MA" >摩洛哥</option>
			        <option value="MCO" title="MC" >摩纳哥</option>
			        <option value="MDA" title="MD" >摩尔多瓦</option>
			        <option value="MNE" title="ME" >黑山</option>
			        <option value="MDG" title="MG" >马达加斯加</option>
			        <option value="MKD" title="MK" >马其顿</option>
			        <option value="MLI" title="ML" >马里</option>
			        <option value="MMR" title="MM" >缅甸</option>
			        <option value="MNG" title="MN" >蒙古</option>
			        <option value="MAC" title="MO" >澳门</option>
			        <option value="MRT" title="MR" >毛里塔尼亚</option>
			        <option value="MLT" title="MT" >马耳他</option>
			        <option value="MUS" title="MU" >毛里求斯</option>
			        <option value="MDV" title="MV" >马尔代夫</option>
			        <option value="MWI" title="MW" >马拉维</option>
			        <option value="MEX" title="MX" >墨西哥</option>
			        <option value="MYS" title="MY" >马来西亚</option>
			        <option value="MOZ" title="MZ" >莫桑比克</option>
			        <option value="NAM" title="NA" >纳米比亚</option>
			        <option value="NER" title="NE" >尼日尔</option>
			        <option value="NGA" title="NG" >尼日利亚</option>
			        <option value="NIC" title="NI" >尼加拉瓜</option>
			        <option value="NLD" title="NL" >荷兰</option>
			        <option value="NOR" title="NO" >挪威</option>
			        <option value="NPL" title="NP" >尼泊尔</option>
			        <option value="NRU" title="NR" >瑙鲁</option>
			        <option value="NZL" title="NZ" >新西兰</option>
			        <option value="OMN" title="OM" >阿曼</option>
			        <option value="PAN" title="PA" >巴拿马</option>
			        <option value="PER" title="PE" >秘鲁</option>
			        <option value="PNG" title="PG" >巴布亚新几内亚</option>
			        <option value="PHL" title="PH" >菲律宾</option>
			        <option value="PAK" title="PK" >巴基斯坦</option>
			        <option value="POL" title="PL" >波兰</option>
			        <option value="PRI" title="PR" >波多黎各</option>
			        <option value="PSE" title="PS" >巴勒斯坦</option>
			        <option value="PRT" title="PT" >葡萄牙</option>
			        <option value="PLW" title="PW" >帕劳</option>
			        <option value="PRY" title="PY" >巴拉圭</option>
			        <option value="QAT" title="QA" >卡塔尔</option>
			        <option value="ROU" title="RO" >罗马尼亚</option>
			        <option value="SRB" title="RS" >塞尔维亚</option>
			        <option value="RUS" title="RU" >俄罗斯</option>
			        <option value="RWA" title="RW" >卢旺达</option>
			        <option value="SAU" title="SA" >沙特阿拉伯</option>
			        <option value="SLB" title="SB" >所罗门群岛</option>
			        <option value="SYC" title="SC" >塞舌尔</option>
			        <option value="SDN" title="SD" >苏丹</option>
			        <option value="SWE" title="SE" >瑞典</option>
			        <option value="SGP" title="SG" >新加坡</option>
			        <option value="SVN" title="SI" >斯洛文尼亚</option>
			        <option value="SVK" title="SK" >斯洛伐克共和国</option>
			        <option value="SLE" title="SL" >塞拉利昂</option>
			        <option value="SMR" title="SM" >圣马力诺</option>
			        <option value="SEN" title="SN" >塞内加尔</option>
			        <option value="SOM" title="SO" >索马里</option>
			        <option value="SUR" title="SR" >苏里南</option>
			        <option value="STP" title="ST" >圣多美和普林西比</option>
			        <option value="SLV" title="SV" >萨尔瓦多</option>
			        <option value="SYR" title="SY" >叙利亚</option>
			        <option value="SWZ" title="SZ" >斯威士兰</option>
			        <option value="TCD" title="TD" >乍得</option>
			        <option value="TGO" title="TG" >多哥</option>
			        <option value="THA" title="TH" >泰国</option>
			        <option value="TJK" title="TJ" >塔吉克斯坦</option>
			        <option value="TKM" title="TM" >土库曼斯坦</option>
			        <option value="TUN" title="TN" >突尼斯</option>
			        <option value="TON" title="TO" >汤加</option>
			        <option value="TUR" title="TR" >土耳其</option>
			        <option value="TTO" title="TT" >特立尼达和多巴哥</option>
			        <option value="TUV" title="TV" >图瓦卢</option>
			        <option value="TWN" title="TW" >台湾</option>
			        <option value="TZA" title="TZ" >坦桑尼亚</option>
			        <option value="UKR" title="UA" >乌克兰</option>
			        <option value="UGA" title="UG" >乌干达</option>
			        <option value="URY" title="UY" >乌拉圭</option>
			        <option value="UZB" title="UZ" >乌兹别克斯坦</option>
			        <option value="VCT" title="VC" >圣文森特和格林纳丁</option>
			        <option value="VEN" title="VE" >委内瑞拉</option>
			        <option value="VGB" title="VG" >英属维尔京群岛</option>
			        <option value="VNM" title="VN" >越南</option>
			        <option value="VUT" title="VU" >瓦努阿图</option>
			        <option value="WLF" title="WF" >瓦利斯和富图纳</option>
			        <option value="WSM" title="WS" >西萨摩亚</option>
			        <option value="YEM" title="YE" >也门</option>
			        <option value="ZAF" title="ZA" >南非</option>
			        <option value="ZMB" title="ZM" >赞比亚</option>
			        <option value="ZWE" title="ZW" >津巴布韦</option>
			    </select>
			    <input type="text" placeholder="应用名称或APPID" >
			    <p><img src="../assets/NumImg/search.png"/></p>
			</div>
			<div class="denglu">登录</div>
			<div class="zhuce">注册</div>
			<div class="Combox">
			<!-- app store监控下拉框 -->
				<div class="appstore" v-show="appstore" @mouseover="showAppstore()" @mouseout="hideAppstore()">
					<img src="../assets/NumImg/jiao.png" class="jiao" />
					<div class="lie">
						<p v-for="app in apps">{{app.name}}</p>
					</div>
				</div>
				<div class="aso" v-show="aso" @mouseover="showAso()" @mouseout="hideAso()">
					<img src="../assets/NumImg/jiao.png" class="jiao" />
					<div class="lie">
						<p v-for="aso in asos">{{aso.name}}</p>
					</div>
				</div>
			</div>
		</div>
		
		<div class="title">
			ios榜单实时排名—<span>中国</span>
		</div>
		<div class="content">
			<ul>
				<li v-for="(li,index) in lis" :class="{'select':isSelect==index}"  @click="selectLei(index)">{{li.name}}</li>
			</ul>
			<div class="lei">
				<div>
					<p class="fenlei">榜单分类</p>
					<p class="font selectFont">免费</p>
					<p class="font">付费</p>
					<p class="font">畅销</p>
				</div>
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
			</div>
			<div class="Leibox">
				<!-- 应用下拉框 -->
				<div class="ying" v-if="showApplication" >
					<img src="../assets/NumImg/jiao.png" class="jiao" />
					<div class="lie">
						<span v-for="Application in Applications"v-html="Application.name" @click="cliLie(Application)"></span>
					</div>
				</div>
				<!-- 游戏下拉框 -->
				<div class="game" v-show="showGame">
					<img src="../assets/NumImg/jiao.png" class="jiao" />
					<div class="lie">
						<span v-for="game in games" v-html="game.name" @click="cliGame(game)"></span>
					</div>
				</div>
			</div>

			<div class="country">
				<div>
					<p>国家/地区</p>
					<p>
						<span>中国</span>
						<img src="../assets/NumImg/down.png" class="down"/>
					</p>
				</div>
				<div>
					<p>设备</p>
					<p>
						<span>iphone</span>
						<img src="../assets/NumImg/down.png" class="down"/>
					</p>

				</div>
				<div>
					<p>日期</p>
					<p class="date">
						<span>2019-06-18</span>
						<img src="../assets/NumImg/down.png" class="down"/>
					</p>
				</div>
			</div>
			<div class="kuaizhao">
				<p>榜单快照</p>
				<div>
					<p>00:00</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p class="nowTim">01:57 当前时间</p>
				</div>
				<div>
					<p>00:00</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
					<img src="../assets/NumImg/dash.png"/>
					<p>01:57</p>
				</div>
			</div>
			<div class="zongbang">
				<div class="tit">
					<p class="line"></p>
					<p class="font">总榜</p>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th class="yingyong">应用</th>
								<th>总榜排名</th>
								<th>分类榜排名</th>
								<th>关键词覆盖</th>
								<th>评分统计</th>
								<th>最新版本</th>
								<th class="company">公司名称</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="tr in zongs">
								<th class="yingyong">
									<p class="ranking" >{{tr.num}}</p>
									<img src="../assets/NumImg/logo.png" class="logo" />
									<div class="msg">
										<p class="appname">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
										<p class="company">啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>
									</div>
								</th>
								<th class="zongrank">
									<span>1</span>
									<img src="../assets/NumImg/right.png" class="dir right" />
									<span>0</span>
								</th>
								<th>
									<div class="now">
										<p>1</p>
										<p class="shejiao">社交</p>
									</div>
									<img src="../assets/NumImg/right.png" class="dir right" />
									<p class="before">0</p>
								</th>
								<th>10000</th>
								<th>10000</th>
								<th>2019-02-01</th>
								<th class="company">深圳市腾讯计算机系统有限公司北京分公司哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
		</div>
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
					<img src=""/>
					<p>掌上密探</p>
				</div>
				<div class="erT">
					<img src=""/>
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
	</div>

</template>


<script>
	export default{
		data(){
			return{
				appstore:false,
				aso:false,
				down:true,
				downaso:true,
				isUp:false,
				isUpaso:false,
				showApplication:false,
				showGame:false,
				valueY:'应用',
				valueG:'游戏',
				appVal:'App Store监控',
				asoVal:'ASO优化',
				isFontZ:true,
				isFont:false,
				isFontG:false,
				downL:true,
				downWL:false,
				upWL:false,
				downG:true,
				downWG:false,
				upWG:false,
				index:0,
				isSelect:'',
				zongs:[
					{num:1},
					{num:2},
					{num:3},
					{num:4},
					{num:5}
				],
				// app store监控
				apps:[
					{name:'榜单实时排名'},{name:'榜单更新监控'},{name:'排名上升/下降监控'},{name:'App Store上下架监控'},
				],
				// aso优化
				asos:[
					{name:'搜索指数排名'},{name:'实时热搜榜'},
				],
				// 总分类
				lis:[
					{name:'总榜'},{name:'应用榜'},{name:'游戏榜'}
				],
				// 应用
				Applications:[
					{name:'全部应用'},{name:'商务'},{name:'导航'},{name:'天气'},{name:'音乐'},
					{name:'工具'},{name:'生活'},{name:'旅游'},{name:'健康健美'},
					{name:'体育'},{name:'财务'},{name:'社交'},{name:'娱乐'},
					{name:'参考'},{name:'教育'},{name:'效率'},{name:'图书'},
					{name:'摄影与录像'},{name:'医疗'},{name:'新闻'},{name:'报刊杂志'},
					{name:'美食佳饮'},{name:'购物'}
				],
				// 游戏
				games:[
					{name:'全部游戏'},{name:'动作游戏'},{name:'音乐'},{name:'冒险游戏'},{name:'益智解谜'},
					{name:'街机游戏'},{name:'竞速游戏'},{name:'桌面游戏'},{name:'角色扮演'},
					{name:'卡牌游戏'},{name:'模拟游戏'},{name:'娱乐场游戏'},{name:'体育'},
					{name:'骰子游戏'},{name:'策略游戏'},{name:'教育游戏'},{name:'问答游戏'},{name:'聚会游戏'},{name:'文字游戏'}
				]
				
			}
		},
		methods:{
			// 显示app store监控下拉框
			showAppstore(){
				this.appstore=true,
				this.down=false,
				this.isUp=true
			},
			// 隐藏app store监控下拉框
			hideAppstore(){
				this.appstore=false,
				this.down=true,
				this.isUp=false
			},
			// 显示aso监控下拉框
			showAso(){
				this.aso=true,
				this.downaso=false,
				this.isUpaso=true
			},
			// 隐藏aso监控下拉框
			hideAso(){
				this.aso=false,
				this.downaso=true,
				this.isUpaso=false
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
				this.upWG=true
				this.downG=false
				this.downWG=false
			},
			// 点击应用option
			cliLie(Application){
				this.valueY=Application.name
				this.showApplication=false
				this.upWL=false
				this.downWL=true
			},
			cliGame(game){
				this.valueG=game.name
				this.showGame=false
				this.upWG=false
				this.downWG=true
			},
			selectLei(index){
				this.isSelect=index
			},
			selected(index){
				
			}
		}
	}

</script>



<style>
.Combox,.Leibox{
	position: absolute;
	top:41px;
	z-index: 99;
}
.Leibox{
	top:222px;
}
.Combox >div .jiao,
.Leibox >div .jiao{
	width: 23px;
	height: 12px;
}
.Combox >div,
.Leibox >div{
	display: inline-block;
	text-align: center;
}
.Combox >div.appstore{
	margin-left:245px;
}
.Combox >div.aso{
	margin-left:410px;
}
.Leibox >div.ying{
	margin-left: 345px;
}
.Leibox >div.game{
	margin-left: 420px;
}
.Combox >div >div.lie,
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
.Combox >div >div p{
	font-family: SourceHanSansCN-Normal;
	font-size: 13px;
	color: #444444;
	margin:0 25px;
	line-height: 30px;
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
.Combox >div >div p:hover,
.Leibox >div >div span:hover{
	color: #009bef;
	cursor: pointer;
}
.Combox >div >div p:first-child{
	margin-top: 15px;
}
.Combox >div >div p:last-child{
	margin-bottom: 15px;
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
	margin-top: 16px;
}

.content .lei>div,
.content .country>div{
	display: inline-block;
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
	/*color: #ffffff!important;*/
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
.content .kuaizhao>p{
	height: 24px;
	line-height: 24px;
	font-family: SourceHanSansCN-Medium;
	font-size: 13px;
	color: #222222;
	float: left;
}
.content .kuaizhao>div{
	margin-left: 66px;
	/*float: right;*/
}
.content .kuaizhao>div:last-child{
	margin-top: 12px;
}
.content .kuaizhao>div p{
	/*width: 48px;*/
	height: 24px;
	line-height: 25px;
	text-align: center;
	border-radius: 4px;
	border: solid 1px #dfdfdf;
	font-family: SourceHanSansCN-Normal;
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
	width: 135px;
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
table tbody tr th{
	height: 100px;
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	color: #444444;
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
	margin-left: 0;
}
.footer{
	width: 100%;
	height: 260px;
	background-color: #06162c;
	color: #fff;
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
	/*margin-top: 40px;*/
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
	/*margin-top: 40px;*/
}
.footer .top>div p{
	font-family: SourceHanSansCN-Regular;
	font-size: 13px;
	color: #ffffff;
	opacity: 0.5;
}
.footer .top>div p:first-child{
	font-family: SourceHanSansCN-Medium;
}
.footer .bom>p{
	display: inline-block;
	font-family: SourceHanSansCN-Regular;
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