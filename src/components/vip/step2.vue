<template>
    <div class="step_div">
        <div class="step">
            <img src="static/images/vip/2.png" alt="">
        </div>
        <p class="tip">为匹配您的借款资质，请认真填写以下信息</p>
        <group>
            <popup-picker title="芝麻信用分" :data="sesamePointsList" v-model="sesamePoints" placeholder="请选择"></popup-picker>
            <popup-picker title="自己名下是否有车" :data="isCarList" v-model="isCar" placeholder="请选择"></popup-picker>
            <popup-picker title="手机实名时限" :data="phoneRealTimeList" v-model="phoneRealTime" placeholder="请选择"></popup-picker>
            <x-switch title="是否有信用卡" v-model="isCreditCard" @on-change="changeCard"></x-switch>
            <x-switch title="是否有社保" v-model="isSocialSecurity" @on-change="changeSecurity"></x-switch>
            <x-switch title="是否有公积金" v-model="isAccFund" @on-change="changeFund"></x-switch>
        </group> 
        <x-button class="next_btn" @click.native="submit">下一步</x-button>
    </div>
</template>
<script>
import {XInput, Group, PopupPicker, XButton, XSwitch} from 'vux'
import _ from 'underscore';
export default {
    data(){
        return{
            sesamePointsList:[],
            isCarList:[],
            phoneRealTimeList:[],
            params:{
                phoneNo:localStorage.phoneNo,
                sesamePoints:'',
                isCar:'',
                infoPerfect:"67%",
                isAccFund:'',
                isSocialSecurity:'',
                isCreditCard:'',
                phoneRealTime:'',
                appType: APP_TYPE1
            }, 
            sesamePoints:[],
            isCar:[],
            phoneRealTime:[],
            isAccFund:false,
            isSocialSecurity:false,
            isCreditCard:false,
            codeParam:{
                list: [              
                    {
                        type: "Sesame_Points"
                    },
                    {
                        type: "Car_Information"
                    },
                    {
                        type:"Mobile_Real_Time_Limit"
                    }                        
                ]
            }            
        }
    },
    components: {
        Group, 
        PopupPicker,
        XButton,
        XSwitch,
        XInput
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
                    let {Sesame_Points, Car_Information,Mobile_Real_Time_Limit} = result;
                    this.sesamePointsList=[_.map(Sesame_Points,item=>{
                       return {name:item.valName,value:item.valName,code:item.valCode}
                    })]
                    this.isCarList=[_.map(Car_Information,item=>{
                       return {name:item.valName,value:item.valName,code:item.valCode}
                    })]
                    this.phoneRealTimeList=[_.map(Mobile_Real_Time_Limit,item=>{
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
            this.$axios.post(this.$api.userInfoPerfect,{params:{phoneNo:localStorage.phoneNo,appType: APP_TYPE1}})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    this.sesamePoints = result.sesamePoints?[_.findWhere(this.sesamePointsList[0],{code: result.sesamePoints}).name]:[]
                    this.isCar = result.isCar?[_.findWhere(this.isCarList[0],{code: result.isCar}).name]:[]
                    this.phoneRealTime = result.phoneRealTime?[_.findWhere(this.phoneRealTimeList[0],{code: result.phoneRealTime}).name]:[]
                    this.isAccFund = result.isAccFund==='13900001'?true:false
                    this.isSocialSecurity = result.isSocialSecurity==='13900001'?true:false
                    this.isCreditCard = result.isCreditCard==='13900001'?true:false
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        },
        changeCard(val){
            this.params.isCreditCard = val?'13900001':'13900002'
        },
        changeSecurity(val){
            this.params.isSocialSecurity = val?'13900001':'13900002'
        },
        changeFund(val){
            this.params.isAccFund = val?'13900001':'13900002'
        },
        submit(){
            if(!this.sesamePoints.length){
                this.$vux.toast.text("请选择芝麻信用分！")
                return false
            }
            if(!this.isCar.length){
                this.$vux.toast.text("请选择名下是否有车！")
                return false
            }
            if(!this.phoneRealTime.length){
                this.$vux.toast.text("请选择手机实名时限！")
                return false
            }
            this.params.sesamePoints=_.findWhere(this.sesamePointsList[0],{name: this.sesamePoints[0]}).code
            this.params.isCar=_.findWhere(this.isCarList[0],{name: this.isCar[0]}).code
            this.params.phoneRealTime=_.findWhere(this.phoneRealTimeList[0],{name: this.phoneRealTime[0]}).code
            this.$axios.post(this.$api.userInfoPerfect,{params:this.params})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    localStorage.setItem('isVipSuccess',false)
                    this.$router.push({"path":"/step3"})
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        }
    }
}
</script>
