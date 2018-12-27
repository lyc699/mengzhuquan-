<template>
    <div class="money">
        <div>
            <div class="product_block" v-for="(item, index) in proList" :key="index">
                <img :src="item.prodPicUrl" alt="">
                <p>{{item.applyPoints}}</p>
                <x-circle
                    :percent="item.loanRate?item.loanRate*2/3:0"
                    :stroke-width="10"
                    :trail-width="10"
                    stroke-color="#ea5a57"
                    trail-color="#f4f4f5"
                    >
                    <p>目标年利率</p>
                    <p>{{item.loanRate?item.loanRate:0}}<span>%</span></p>
                </x-circle>
                <div class="intro_block">
                    <div>
                        <p>起投金额</p>
                        <p>{{item.minLoanLimit}}元</p>
                    </div>
                    <div>
                        <p>投资期限</p>
                        <p>{{item.deadlineInterval}}</p>
                    </div>
                </div>
                <button @click="toDetail(item.othVisitUrl, item.prodNo, item.prodName)">注册投资<span></span></button>
            </div>
        </div>
         <!-- <router-link to="/step1"> -->
            <img src="static/images/money/banner.png" alt="" @click="getProgress">
        <!-- </router-link> -->
    </div>
</template>
<script>
import { XCircle  } from 'vux'
import { recordScan} from '../common/common.js'
export default {
  components: {
    XCircle,
  },
  data () {
    return {
        newProJson:{
            pageNo: 1,//当前页码
            pageSize: 8,//当前页显示条数
            prodTwoType: "46800003",//理财
        },
        proList:[],//存放产品列表
        recordJson: {
            ip: localStorage.getItem("ip"),
            phoneNo: localStorage.getItem("phoneNo"),
            prodNo: '0005',
            pageId: "money",
            opType: '42100003',//产品列表PV:42100003
            sourceType: SOURCE_TYPE,  //表示微信
            chanNo: localStorage.getItem("mChanNo"),
            inviteCode: localStorage.getItem("qrCode"),
            userSource: USER_SOURCE,
            appType: APP_TYPE1,
            prodName: 'finance_product'
        }
    }
  },
  created(){
        //是否来自app
        if(this.$route.query.sourceType === 'app'){
            this.fromApp()
        }
        this.init()
  },
  methods:{
        /* 
        * 初始化
        */
        init(){
            this.getNewProList()
            this.countApply()//统计
        },
        /* 
        * 获取产品列表
        */
        getNewProList(){
            this.$axios.post(this.$api.productList, {"params": this.newProJson})
            .then(response => {
                if(response.code === "0000") {
                    this.proList = response.result
                }else{
                    this.$vux.toast.text(response.msg)
                }
            })
            .catch(function(response){
                
            })
        },
        /* 
        * 点击跳转按钮
        */
        toDetail(url, prodNo, prodName){
            if(localStorage.phoneNo){
                localStorage.setItem("isCrossOrigin",true)            
                this.recordJson.opType = '42100005'//42100005：进件用户
                this.recordJson.prodNo = prodNo,
                this.recordJson.prodName = prodName,
                this.countApply()
                window.location.href = url
            }else{
                let that = this
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
            }
        },
        /*
        * 来自客户端的处理
        */
        fromApp(){
            this.$store.commit('checkSourceType', 'app')
            this.$store.commit('showFooter', false)
        },
        /*
        * 统计
        */
        countApply(){
            recordScan(this.$api.record, this.recordJson)
        },
        getProgress(){
            if(!localStorage.phoneNo){
                this.$router.push({"path": "/vip"})
            }else{
                this.$axios.post(this.$api.userInfoPerfect,{params:{phoneNo:localStorage.phoneNo,appType: APP_TYPE1}})
                .then(res => {
                    let {code,msg,result} = res
                    if (code == "0000") {
                        switch(result.infoPerfect){
                            case '33%':
                                this.$router.push({"path": "/step2"})
                                break;
                            case '67%':
                                this.$router.push({"path": "/step3"})
                                break;
                            case '100%':
                                this.$router.push({"path": "/vipSuccess"})
                                break;
                            default:
                                this.$router.push({"path": "/vip"}) 
                                break; 
                        }
                    }else{
                        if(msg) this.$vux.toast.text(msg)
                    }
                })
            }
        }
  }
}
</script>
