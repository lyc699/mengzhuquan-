<template>
    <div class="dream">
        <img src="static/images/theme/bg1.png">
        <div>
            <p class="mt50">请输入一个您梦到的事物关键词</p>
            <x-input v-model="dreamName" name="dreamName" placeholder="请输入关键词，例如“飞翔”"></x-input>
            <x-button @click.native="submit" v-touch>查询</x-button>
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
            keys:['704bed939371c9b9923efb3fdf2bf3b4','0a328b887781b14b24bccb9cd4262417','0eb18b74b624903fac62aed89305e62c','173c0cf31b33ba7fb8f8e9b2d5e7c1b6']
        }
    },
    components: {
        XInput,
        XButton
    },
    methods:{
        submit(){
            if(this.dreamName){
                let data = {
                    q: this.dreamName,
                    cid:'',
                    full:'',
                    key: this.keys[Math.floor(Math.random()*4)]
                }
                this.$axios.get(`${this.$api.dream}?${qs.stringify(data)}`)
                .then(response => {
                    let data = {
                        name:this.dreamName,
                        reason:response.reason?response.reason:'',
                        result:response.result?response.result:'',
                        code:response.error_code
                    }
                    this.$router.push({path: '/dreamDetail',query:data})                    
                })
            }else{
                this.$vux.toast.text('请输入关键字')
            }
        }
    }
}
</script>

