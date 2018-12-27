<template>
    <div class="step_div">
        <div class="step">
            <img src="static/images/vip/1.png" alt="">
        </div>
        <p class="tip">为保证您顺利通过审核，请如实填写以下信息</p>
        <group>
            <x-input v-model="params.userName" text-align='right' title="姓名" :max="5" name="userName" placeholder="请输入真实姓名"></x-input>
            <x-input v-model="params.certNo" text-align='right' title="身份证号码" :max="20" name="certNo" placeholder="请输入真身份证号码"></x-input>
            <popup-picker title="职业类别" :data="professionList" v-model="profession" placeholder="请选择"></popup-picker>
            <popup-picker title="教育程度" :data="educationList" v-model="educationLever" placeholder="请选择"></popup-picker>
            <popup-picker title="月收入额" :data="monthIncomeList" v-model="monthIncome" placeholder="请选择"></popup-picker>
        </group> 
        <x-button class="next_btn" @click.native="submit">下一步</x-button>
        <div class="shade" v-if="isShade"></div>
    </div>
</template>
<script>
import {XInput, Group, PopupPicker, XButton} from 'vux'
import _ from 'underscore';
export default {
    data(){
        return{
            professionList:[],
            monthIncomeList:[],
            educationList:[],
            params:{
                phoneNo:localStorage.phoneNo,
                userName:'',
                certNo:'',
                profession:'',
                monthIncome:'',
                educationLever:'',
                infoPerfect:"33%",
                appType: APP_TYPE1
            },           
            profession:[],
            monthIncome:[],
            educationLever:[],
            codeParam:{
                list: [              
                    {
                        type: "Job_Type"
                    },
                    {
                        type: "Degree_Of_Education"
                    },
                    {
                        type: "Month_Income"
                    }                          
                ]
            },
            isShade:true
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
                    let {Job_Type, Degree_Of_Education, Month_Income} = result;
                    this.professionList=[_.map(Job_Type,item=>{
                       return {name:item.valName,value:item.valName,code:item.valCode}
                    })]
                    this.monthIncomeList=[_.map(Month_Income,item=>{
                       return {name:item.valName,value:item.valName,code:item.valCode}
                    })]
                    this.educationList=[_.map(Degree_Of_Education,item=>{
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
                    this.params.userName = result.userName===null?'':result.userName
                    this.params.certNo = result.certNo===null?'':result.certNo
                    this.profession = result.profession?[_.findWhere(this.professionList[0],{code: result.profession}).name]:[]
                    this.monthIncome = result.monthIncome?[_.findWhere(this.monthIncomeList[0],{code: result.monthIncome}).name]:[]
                    this.educationLever = result.educationLever?[_.findWhere(this.educationList[0],{code: result.educationLever}).name]:[]
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
            if(!this.profession.length){
                this.$vux.toast.text("请选择职业类别！")
                return false
            }
            if(!this.educationLever.length){
                this.$vux.toast.text("请选择教育程度！")
                return false
            }
            if(!this.monthIncome.length){
                this.$vux.toast.text("请选择月收入额！")
                return false
            }
            this.params.profession=_.findWhere(this.professionList[0],{name: this.profession[0]}).code
            this.params.educationLever=_.findWhere(this.educationList[0],{name: this.educationLever[0]}).code
            this.params.monthIncome=_.findWhere(this.monthIncomeList[0],{name: this.monthIncome[0]}).code
            this.$axios.post(this.$api.userInfoPerfect,{params:this.params})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    localStorage.setItem('isVipSuccess',false)
                    this.$router.push({"path":"/step2"})
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        }
    }
}
</script>
