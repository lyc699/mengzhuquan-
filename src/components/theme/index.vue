<style lang='less' scoped>
    .content{
        padding: 20px;
        div{
            margin-bottom: 20px;
        }
    }
</style>

<template>
   <div class="content">
       <div @click='toUrl'>
            <img src="static/images/theme/theme1.png">
        </div>
        <router-link to="/ticketList" tag="div">
            <img src="static/images/theme/theme2.png">
        </router-link>
        <router-link to="/joy" tag="div">
            <img src="static/images/theme/theme3.png">
        </router-link>
        <router-link to="/dreamQuery" tag="div">
            <img src="static/images/theme/theme4.png">
        </router-link>
   </div>
</template>
<script>
export default {
    methods:{
        toUrl(){
            localStorage.setItem("isCrossOrigin",true)
            window.location.href = zcm_URL
        }
    }
}
</script>

