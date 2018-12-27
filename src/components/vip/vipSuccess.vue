<template>
    <div class="step_success">
        <img src="static/images/vip/meng.png" alt="" style="position:absolute;z-index:-1">
        <div>
            <img src="static/images/vip/vip.png" alt="" class="icon">
            <h1>欢迎加入VIP</h1>
            <p>已为您分配客服微信号，识别下方二维码关注公众号后留言申领优酷会员激活码</p>
            <img src="static/images/vip/qrcode.jpg" alt="" class="qrcode">
        </div>
        <x-button class="share_btn" @click.native="submit">分享好友</x-button>
        <router-link to="index" tag="button" class="back_btn weui-btn back_btn weui-btn_default">回到首页</router-link>
        <div class="shade" v-if='isShare' @click="isShare=false">
            <img src="static/images/vip/point.png" alt="">
        </div>
    </div>
</template>
<script>
import {XButton} from 'vux'
import {isWeiXin} from '../common/common.js'
import {GetShare} from "../common/mixin/GetShare"
import sha1 from 'js-sha1'
export default {
    components: {
        XButton
    },
    data(){
        return{
            params:{
                appId:'',
                timestamp:'',
                nonceStr:'',
                signature:''
            },
            isShare:false
        }
    },
    beforeRouteEnter(to, from, next){
        if(localStorage.isVipSuccess=='true'||from.name==='step3'){
            next()
        }else{
            next(vm=>{
                vm.$router.push({"path": "/vip"})
            })
        }
    },
    mixins:[GetShare],
    methods:{
        submit(){
            this.isShare = true
            //微信分享配置
            if(isWeiXin()){
                let data = {
                    link: `${SHARE_URL}/index.html#/vip`,
                    title: '【助贷实力平台】下款才是王道！戳我立即申请',
                    desc: '内部邀约放款通道，利息更低放款更快',
                    imgUrl: `${SHARE_URL}/static/images/yq365.png`
                }
                this.getSignature(data) 
            }  
        }
    }
}
</script>
