<template>
	<footer class="footer" v-if="this.$store.getters.getShowFooter">
        <tabbar>
            <tabbar-item :selected="this.$route.name === 'index'" :link="link">         
                <img slot="icon" src="static/images/Home_Icon_Loan_Default@2x1.png">
                <img slot="icon-active" src="static/images/Home_Icon_Loan_Activate@2x1.png">
                <span slot="label">热门贷款</span>
            </tabbar-item>
            <tabbar-item link="/theme" :selected="this.$route.name === 'theme'"> 
                <img slot="icon" src="static/images/Home_Icon_Money_Default@2x1.png">
                <img slot="icon-active" src="static/images/Home_Icon_Money_Activate@2x1.png">
                <span slot="label">查拒贷</span>
            </tabbar-item>
            <tabbar-item  @click.native="isLogin" :selected="this.$route.name === 'xjd'">                
                <img slot="icon" src="static/images/Home_Icon_CreditCard_Default@2x1.png">
                <img slot="icon-active" src="static/images/Home_Icon_CreditCard_Activate@2x1.png">
                <span slot="label">信用卡</span>
            </tabbar-item>
            <tabbar-item link="/my" :selected="this.$route.name === 'my'"> 
                <img slot="icon" src="static/images/Home_Icon_Mine_Default@2x1.png">
                <img slot="icon-active" src="static/images/Home_Icon_Mine_Activate@2x1.png">
                <span slot="label">个人中心</span>
            </tabbar-item>
        </tabbar>
	</footer>
</template>
<script>
import { Tabbar, TabbarItem} from 'vux'
import { recordScan} from './common.js'
export default {
    data(){
        return{
            link: "/index", //首页的path 
        }
    },
    components: {
        Tabbar,
        TabbarItem
    },
    created(){
        //有渠道，将码值加在首页path之后
        this.link = localStorage.mChanVal?this.link+"?mChanNo="+localStorage.mChanVal:this.link        
    },
    methods:{
        isLogin(){
            // let that = this
			// if(!localStorage.getItem("phoneNo")){
			// 	that.$vux.toast.show({
			// 		text: "请登录!",
			// 		onHide() {
			// 			that.$router.push({"path": "/login"})                                
			// 		}
            //     });
            //     return false
            // }	
            this.countApply()
            // that.$vux.toast.text("敬请期待~~~")	
        },
        countApply(){
            let recordJson = {
                ip: localStorage.getItem("ip"),
                phoneNo: localStorage.getItem("phoneNo"),
                pageId: 'xyk_index',
                opType: "42100003",//招财猫VIP页面PV：42100003；
                sourceType: SOURCE_TYPE,  //表示微信
                chanNo: localStorage.getItem("mChanNo"),
                inviteCode: localStorage.getItem("qrCode")?localStorage.getItem("qrCode"):'',
                userSource: USER_SOURCE,
                appType: APP_TYPE1,
                prodName: "XYK"
            }
            recordScan(this.$api.record, recordJson)//统计
            this.$router.push({"path": "/xjd"})
        }
    }
}
</script>