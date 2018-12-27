<template>
    <div class="vip_index pt20" style="padding-bottom:100px">
        <img src="static/images/vip/vip_banner.png" alt="">
        <div class="vip_block">
            <img src="static/images/vip/vip1.png" alt="">
            <img src="static/images/vip/vip2.png" alt="">
            <img src="static/images/vip/vip3.png" alt="">
        </div>
        <div @click='goUrl' style="position: fixed;bottom: 20px;width: 100%;">
            <img class="vip_btn" src="static/images/vip/vip_btn.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        goUrl(){
            if(localStorage.phoneNo){
                this.$router.push({"path": "/step1"})
            }else{
                this.$router.push({"path": "/login"})
            }
        }
    }
}
</script>
