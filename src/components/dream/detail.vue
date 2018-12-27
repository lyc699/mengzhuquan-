<template>
    <div>
        <div style="padding-top: 30%;text-align: center" v-if="code==0&&!result.length">
            <img src="static/images/theme/noData.png" style="width:200px;margin:0 auto;">  
            <p>没有找到哟~</p>    
            <router-link to="/dreamQuery" tag="p" style="margin-top:20px;color:blue;font-size:14px">
                返回
            </router-link>     
        </div>
        <div class="dream" v-if="result.length">
            <img src="static/images/theme/bg2.png">
            <div>
                <h1>{{name}}</h1>
                <p>梦到{{name}}可能有以下解释：</p>
                <ul>
                    <li v-for="(item,index) in result" :key="index" >{{item.des}}</li>
                </ul>
            </div>
        </div>
        <div style="padding-top: 30%;text-align: center" v-if="code!=0">
            <img src="static/images/theme/noWifi.png" style="width:200px;margin:0 auto;">  
            <p>网络不给力~</p> 
            <p style="margin-top:10px;color:gray;font-size:14px">世界上最遥远的距离，莫过于网络不给力</p>   
            <router-link to="/dreamQuery" tag="p" class="mt30" style="color:blue">
                返回
            </router-link>     
        </div>
    </div>
</template>
<script>
import { XInput, XButton } from 'vux'
import qs from 'qs'
export default {
    data() {
        return {
            dreamName:"",
            code: this.$route.query.code,
            result: this.$route.query.result,
            name: this.$route.query.name
        }
    },
    components: {
        XInput,
        XButton
    }
}
</script>

