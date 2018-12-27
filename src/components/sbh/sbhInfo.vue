<template>
    <div class="step_div sbnInfo">
        <p class="tip">请填写个人基础资料</p>
        <group>
            <x-input v-model="params.userName" title="本人姓名" :max="5" name="userName" placeholder="请输入真实姓名"></x-input>
            <x-input v-model="params.certNo" title="身份证号" :max="20" name="certNo" placeholder="请输入真身份证号码"></x-input>
            <x-input  title="最高学历" disabled>
                <checker slot="right-full-height" v-model="educationLever" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                    <checker-item :value="item" v-for="(item, index) in educationList" :key="index">{{item.name}}</checker-item>
                </checker>  
            </x-input>
            <x-input  title="婚姻状态" disabled>
                <checker slot="right-full-height" v-model="isMarried" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                    <checker-item :value="item" v-for="(item, index) in marriageList" :key="index">{{item.name}}</checker-item>
                </checker>  
            </x-input>
            <popup-picker title="期望额度" :data="loanLimitList" v-model="loanLimit" placeholder="请选择"></popup-picker>
            <x-switch title="是否有车" v-model="isCar" @on-change="changeCar"></x-switch>
            <x-switch title="是否有信用卡" v-model="isCreditCard" @on-change="changeCard"></x-switch>
        </group> 
        <p class="tip">本人名下信用卡、车辆信息有助于提高贷款速度和金额</p>
        <x-button class="next_btn" @click.native="submit">下一步</x-button>
        <div class="shade" v-if="isShade"></div>
    </div>
</template>
<script>
import {Checker, CheckerItem,XInput, Group, PopupPicker, XButton, XSwitch} from 'vux'
import _ from 'underscore';
export default {
    data(){
        return{
            loanLimitList:[],
            isCarList:[],
            params:{
                phoneNo:localStorage.phoneNo,
                userName:'',
                certNo:'',
                educationLever:'',
                loanLimit:'',
                isCar:"",
                isCreditCard:"",
                appType: APP_TYPE1,
                isMarried:''
            },           
            loanLimit:[],
            isCar:false,
            isMarried:{},
            educationLever:{},
            isCreditCard:false,
            codeParam:{
                list: [   
                    {
                        type: "Borrow_Lines"
                    }             
                ]
            },
            isShade:true,
            educationList: [{
                value: '49200001',
                name: '大专以下'
            }, {
                value: '49200002',
                name: '大专'
            }, {
                value: '49200003',
                name: '本科以上'
            }],
            marriageList:[{
                value: '13900001',
                name: '已婚'
            }, {
                value: '13900002',
                name: '未婚'
            },]
        }
    },
    components: {
        XInput, 
        Group, 
        PopupPicker,
        XButton,
        XSwitch,
        Checker,
        CheckerItem
    },
    created(){
        this.getCodeList()
    },
    methods:{
        changeCard(val){
            this.params.isCreditCard = val?'13900001':'13900002'
        },
        changeCar(val){
            this.params.isCar = val?'13900001':'13900002'
        },
        getCodeList(){
            this.$axios.post(this.$api.channelCode,{params:this.codeParam})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    let {  Borrow_Lines} = result;
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
                    this.params.userName = result[0].userName===null?'':result[0].userName
                    this.params.certNo = result[0].certNo===null?'':result[0].certNo
                    this.educationLever = result[0].educationLever?{value:result[0].educationLever,name:_.findWhere(this.educationList,{value: result[0].educationLever}).name}:{}
                    this.isMarried = result[0].isMarried?{value:result[0].isMarried,name:_.findWhere(this.marriageList,{value: result[0].isMarried}).name}:{}
                    this.loanLimit = result[0].loanLimit?[_.findWhere(this.loanLimitList[0],{code: result[0].loanLimit}).name]:[]
                    this.isCar = result[0].isCar==='13900001'?true:false
                    this.isCreditCard = result[0].isCreditCard==='13900001'?true:false
                    this.isShade = false
               }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        },
        submit(){
            if(!this.params.userName){
                this.$vux.toast.text("请输入姓名！")
                return false
            }
            if(!this.params.certNo){
                this.$vux.toast.text("请输入身份证号！")
                return false
            }
            if(!this.educationLever.name){
                this.$vux.toast.text("请选择教育程度！")
                return false
            }
            if(!this.loanLimit.length){
                this.$vux.toast.text("请选择借款额度！")
                return false
            }
            this.params.educationLever=this.educationLever.value
            this.params.isMarried=this.isMarried.value
            this.params.loanLimit=_.findWhere(this.loanLimitList[0],{name: this.loanLimit[0]}).code
            this.$axios.post(this.$api.userInfoPerfect,{params:this.params})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    this.$router.push({"path":"/sbhList"})
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        }
    }
}
</script>
