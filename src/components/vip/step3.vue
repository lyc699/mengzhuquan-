<template>
    <div class="step_div">
        <div class="step">
            <img src="static/images/vip/3.png" alt="">
        </div>
        <p class="tip">以下为您对借款需求的偏好设置，我们将据此推荐符合您偏好的借款产品</p>
        <group>
            <popup-picker title="借款期限" :data="loanDeadlineList" v-model="loanDeadline" placeholder="请选择"></popup-picker>
            <popup-picker title="借款额度" :data="loanLimitList" v-model="loanLimit" placeholder="请选择"></popup-picker>
            <x-input v-model="params.highLimit" text-align='right' title="可接受最高月还款额度"></x-input>
        </group> 
        <x-button class="next_btn" @click.native="submit">提交申请</x-button>
    </div>
</template>
<script>
import {XInput, Group, PopupPicker, XButton} from 'vux'
import _ from 'underscore';
export default {
    data(){
        return{
            loanDeadlineList:[],
            loanLimitList:[],
            params:{
                phoneNo:localStorage.phoneNo,
                loanDeadline:'',
                loanLimit:'',
                highLimit:'',
                appType: APP_TYPE1,
            }, 
            loanDeadline:[],
            loanLimit:[],
            codeParam:{
                list: [              
                    {
                        type: "Borrow_Time_Limit"
                    },
                    {
                        type: "Borrow_Lines"
                    }                      
                ]
            }    
        }
    },
    components: {
        XInput, 
        Group, 
        PopupPicker,
        XButton
    },
    created(){
        this.getCodeList()
    },
    methods:{
        getCodeList(){
            this.$axios.post(this.$api.channelCode,{params:this.codeParam})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    let {Borrow_Time_Limit, Borrow_Lines} = result;
                    this.loanDeadlineList=[_.map(Borrow_Time_Limit,item=>{
                       return {name:item.valName,value:item.valName,code:item.valCode}
                    })]
                    this.loanLimitList=[_.map(Borrow_Lines,item=>{
                       return {name:item.valName,value:item.valName,code:item.valCode}
                    })]
                    if(localStorage.phoneNo){
                        this.getData()
                    }
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        },
        getData(){
            this.$axios.post(this.$api.queryUserAllInfo,{params:{phoneNo:localStorage.phoneNo,appType: APP_TYPE1}})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    this.loanDeadline = result[0].loanDeadline?[_.findWhere(this.loanDeadlineList[0],{code: result[0].loanDeadline}).name]:[]
                    this.loanLimit = result[0].loanLimit?[_.findWhere(this.loanLimitList[0],{code: result[0].loanLimit}).name]:[]
                    this.params.highLimit = result[0].highLimit===null?'':result[0].highLimit
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        },
        submit(){
            if(!this.loanDeadline.length){
                this.$vux.toast.text("请选择借款期限！")
                return false
            }
            if(!this.loanLimit.length){
                this.$vux.toast.text("请选择借款额度！")
                return false
            }
            if(!this.params.highLimit){
                this.$vux.toast.text("请输入还款额度！")
                return false
            }
            this.params.loanDeadline=_.findWhere(this.loanDeadlineList[0],{name: this.loanDeadline[0]}).code
            this.params.loanLimit=_.findWhere(this.loanLimitList[0],{name: this.loanLimit[0]}).code
            this.$axios.post(this.$api.saveOrEdit,{params:this.params})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    this.$axios.post(this.$api.userInfoPerfect,{params:{phoneNo:localStorage.phoneNo,infoPerfect:"100%",appType: APP_TYPE1}})
                    .then(res => {
                        if(res.code=="0000"){
                            localStorage.setItem('isVipSuccess',true)
                            this.$router.push({"path":"/vipSuccess"})
                        }
                    })
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        }
    }
}
</script>
