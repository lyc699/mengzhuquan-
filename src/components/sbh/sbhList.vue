<template>
	<div class="indexContainer">
		<!-- <div class="tag">
			<badge v-for="(item, index) in keywordsList" :key="index" :text="item.keywordDocument?item.keywordDocument:''" @click.native="onItemClick(item)" :style="item.active?{'backgroundColor':item.backgroundColor,'borderColor':item.borderColor,'fontColor':item.fontColor}:null"></badge>
		</div> -->
		<div class="sbh_top">
			<img src="static/images/sbh/tip.png" alt="">
			<div>
				<p>您暂不符合随便花借款要求</p>
				<p>您可以尝试以下贷款产品</p>
			</div>
		</div>
		<scroller style="top: 127px" :on-refresh="refresh" :on-infinite="infinite">
			<div class="newsFlash box advTip" v-if="newsList.length">
				<img src="static/images/index/Home_Microphone_News@2x.png" style="width:15px"/>
				<div class="flex-1">
					<ul :class="marquee">
						<li v-for="(item, index) in newsList" :key="index" @click="toAdv(item)">
							"<i>{{item.advertiseName}}</i>"{{item.advertiseDocument}}
						</li>
					</ul>
				</div>
			</div>
		   	<article>
	    		<div v-for="(item, index) in newProList" :key="index" @click="toDetail(item.prodNo)">
		    		<p class="box">
						<img :src="item.prodPicUrl" />
						<label class="flex-4">
							<b>{{item.prodName}}<span v-for="(item1, index) in item.prodTag" :key="index" :style="{'backgroundColor':item1.backgroundColor?item1.backgroundColor:'#fff','borderColor':item1.borderColor?item1.borderColor:'#adb2b9','fontColor':item1.fontColor?item1.fontColor:'#000'}">{{item1.keywordDocument}}</span></b>
							<span>{{item.slogan}}</span>
						</label>
					</p>
					<p class="box">
						<span>
							<i>最高额度</i>
							<strong>{{item.maxLoanLimit}}<span>额度(元)</span></strong>
						</span>
						<span class="flex-1">
							<i>日利率</i>
							<span><b>{{item.loanRate}}%</b></span>
						</span>
						<span>
							<i class="btn_bg" @click.self.stop="sendApply(item.othVisitUrl,item.prodNo,item.prodName)">立即申请</i>
							<span>已有<i>{{item.succApplyNum}}</i>人申请</span>
						</span>
					</p>
	    		</div>
			</article>
			<p class="noData" v-if="noData">暂无更多数据</p>
		</scroller>
	</div>
</template>

<script>
	import { Toast, Badge } from 'vux'
	import { getPhoneType } from '../../assets/js/dll.js'
	import _ from 'underscore'
	import { recordScan} from '../common/common.js'
	export default {
		components: {
			Toast,
			Badge
        },
	    data() {
	        return {
	        	hasData: false,
				noData: false,
				marquee: "",
				newsList:[],
				keywordsList:[],
	        	newProJson:{
					pageNo: 1,//当前页码
					pageSize: 5,//当前页显示条数
					prodTwoType: '',//现金贷
					prodTag:'',
					hotRecommend:'13900001'//是否是首页产品13900001：是，13900002：否
				},
				newProList: [],
				recordJson:{
					ip: localStorage.getItem("ip"),
					phoneNo: localStorage.getItem("phoneNo"),
					prodNo: "0000",
					pageId: "rejected_index",
					opType: "42100003",//42100010：信用卡列表PV
					sourceType: SOURCE_TYPE,  //表示微信
					chanNo: localStorage.getItem("mChanNo"),
					prodName: "rejected_Home",
					appType: APP_TYPE1,
				}
	        }
	    },
	    created() {
			this.countApply()
	    },
	    mounted() {
			
			this.getAdv()
			this.getKeyWord()
		},
	    methods: {
			//获取关键字
			getKeyWord(){
				let data = {
					params:{
						appType:'30500008'
					}
				}
				this.$axios.post(this.$api.keywordList,data)
				.then(response => {				
					if(response.code === "0000") {
						this.keywordsList = _.each(response.result, (item) => {
							if(item.keywordDocument === this.$route.query.tag){
							this.newProJson.prodTag = item.keywordNo
								item.active = true
							}else{
								item.active = false
							}
							}
						)
					}else{
						this.$vux.toast.text(response.msg)
					}
					this.getNewProList()
				})
			},
			//获取顶部广告
			getAdv(){
				let data = {
					params:{
						adType:'41500003',
						status:'13900001',
						applyApp:'30500008'
					}
				}
				setInterval(this.showMarquee, 3000)
				this.$axios.post(this.$api.queryAdvertiseInfo,data)
				.then(response => {				
					if(response.code === "0000") {
						this.newsList = response.result
					}else{
						this.$vux.toast.text(response.msg)
					}
				})
			},
			// 快讯信息滚动
			showMarquee() {
				this.marquee = "marquee_left"
				setTimeout(() => {
					this.newsList.push(this.newsList[0]);
					this.newsList.shift()
					this.marquee = ""
				},1000)
			},
			/*
			* 下拉刷新
			*/
	    	refresh (done) {
		        setTimeout(() => {
			    	this.getNewProList()
		            done()
		        }, 1500)
			},
			/*
			* 上拉加载
			*/
		    infinite (done) {
		    	if(!this.hasData){
		    		done()
		    		return
		    	}
		        setTimeout(() => {
					this.newProJson.pageNo++
				    this.$axios.post(this.$api.productList, {"params": this.newProJson})
		    		.then(response => {
		    			if(response.code === "0000") {
		    				let data = response.result
		    				done()
		    				if(data.length == 0){
		    					this.hasData = false
		    					this.noData = true
							}
							for(let i=0;i<data.length;i++){
								this.newProList.push(data[i])
							}
		    			}else{
							this.$vux.toast.text(response.msg)
		    			}
		    		})
		    		.catch(function(response){
		    			
		    		})
		        }, 1500)
			},
			/*
			* 获取产品列表
			*/
	    	getNewProList(){
				this.newProJson.pageNo = 1
	    		this.noData = false
	    		this.$axios.post(this.$api.productList, {params: this.newProJson})
	    		.then(response => {
	    			if(response.code === "0000") {
	    				let data = response.result
	    				if(data.length > 0){
	    					this.hasData = true
						}
	    				this.newProList = data
	    			}else{
						this.$vux.toast.text(response.msg)
	    			}
	    		})
	    		.catch(function(response){
	    			
	    		})
			},			
			/*
			* 跳转产品详情页面
			*/
	    	toDetail(prodNo){
				let that = this
				if(!localStorage.getItem("phoneNo")){
					that.$vux.toast.show({
						text: "请登录!",
						onHide() {
							if(that.$store.state.sourceType === "app"){
								var phonetype = getPhoneType();
								if (phonetype == "android") {
									myObj.goLogin("");
								} else {
									window.webkit.messageHandlers.goLogin.postMessage({body:""});
								}
							}else{
								that.$router.push({"path": "/login"})   
							}                           
						}
					});
					return false
				}
	        	that.$router.push({path: '/productDetail', query: {prodNo: prodNo}})
			},
			// 顶部广告跳转
			toAdv(item){
				let that = this
				that.recordJson.opType = '42100007'//顶部广告
				that.recordJson.prodNo = item.advertiseNo
				that.recordJson.prodName = item.advertiseName
				that.countApply()
				if(item.adUrl === RECOMMEND_URL){//如果是活动链接
					if(!localStorage.getItem("phoneNo")){//如果点击不是顶部广告
						that.$vux.toast.show({
							text: "请登录!",
							onHide() {
								if(that.$store.state.sourceType === "app"){
									var phonetype = getPhoneType();
									if (phonetype == "android") {
										myObj.goLogin("");
									} else {
										window.webkit.messageHandlers.goLogin.postMessage({body:""});
									}
								}else{
									that.$router.push({"path": "/login"})
								}
							}
						});
						return false
					}
					localStorage.setItem("isCrossOrigin",true)
					window.location.href = item.adUrl + `?phoneNo=${localStorage.getItem("phoneNo")}&sourceType=26600005&token=${localStorage.getItem("token")}`	
				}else{
					localStorage.setItem("isCrossOrigin",true)
					window.location.href = item.adUrl
				}
			},
			/*
			* 统计浏览量
			*/
			countApply(recordJson){
				recordScan(this.$api.record, recordJson?recordJson:this.recordJson)
			},
			//立即申请按钮
			sendApply(url,prodNo,prodName){
				let that = this
				if(!localStorage.phoneNo){
					that.$vux.toast.show({
						text: "请登录!",
						onHide() {
							if(that.$store.state.sourceType === "app"){
								var phonetype = getPhoneType();
								if (phonetype == "android") {
									myObj.goLogin("");
								} else {
									window.webkit.messageHandlers.goLogin.postMessage({body:""});
								}
							}else{
								that.$router.push({"path": "/login"})
							}
						}
					})
				}else{
					let recordJson = {
						ip: localStorage.getItem("ip"),
						phoneNo: localStorage.getItem("phoneNo"),
						prodNo: prodNo,
						pageId: "productDetail",
						opType: "42100011",//42100011：信用卡功能UV
						sourceType: SOURCE_TYPE,  //表示微信
						chanNo: localStorage.getItem("mChanNo"),
						inviteCode: localStorage.getItem("qrCode"),
						prodName: prodName,
						appType: APP_TYPE1,
						userSource: USER_SOURCE
					}
					this.countApply(recordJson)
					localStorage.setItem("isCrossOrigin",true)
					window.location.href = url
				}
			},
			
	    }
	}
</script>
