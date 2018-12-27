<template>
    <div class="detail">
        <tab>
            <tab-item :selected="isSel" @on-item-click="tabItem">本期详情</tab-item>
            <tab-item :selected="!isSel" @on-item-click="tabItem">全部期次</tab-item>
        </tab>
        <div v-if="isShowFirst" class="ticket">
            <group class="head-cell">
                <cell>
                    <p slot="title" class="ticketName">双色球<span>第<b>{{baiscInfo.lottery_no}}</b>期</span><span class="ticketDate">{{baiscInfo.lottery_date}}</span></p>
                    <p slot="inline-desc">
                        <span :class="index+1===baiscInfo.lottery_res.length?'num special':'num'" v-for="(item, index) in baiscInfo.lottery_res" :key="index">{{item}}</span>
                    </p>
                </cell>
                <div class="flex">
                    <div>
                        <p>本期销量<span>(元)</span></p>
                        <h1>￥{{baiscInfo.lottery_sale_amount?baiscInfo.lottery_sale_amount:0}}</h1>
                    </div>
                    <div>
                        <p>奖池奖金<span>(元)</span></p>
                        <h1>￥{{baiscInfo.lottery_pool_amount?baiscInfo.lottery_pool_amount:0}}</h1>
                    </div>
                </div>
            </group>
            <div style="position:relative">
                <img src="static/images/ticket/title.png" alt="">
                <table>
                    <thead>
                        <tr>
                            <td>奖项</td>
                            <td>中奖注数</td>
                            <td>每注金额<span>(元)</span></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in baiscInfo.lottery_prize" :key="index">
                            <td v-if="index!=0&&index!=1&&index!=2">{{item.prize_name}}</td>
                            <td v-else><img :src="`static/images/ticket/${index+1}.png`" alt="" style="width:20px"></td>
                            <td>{{item.prize_num}}</td>
                            <td>{{item.prize_amount}}</td>
                        </tr>  
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else class="ticket allHistory">
            <group class="head-cell" v-for="(item,index) in lotteryResList" :key="index" @click.native="queryDetail(item.lottery_no)">
                <cell is-link>
                    <p slot="title" class="ticketName"><span>第<b>{{item.lottery_no}}</b>期</span><span class="ticketDate mr10" style="position: inherit;">{{item.lottery_date}}</span></p>
                    <p slot="inline-desc">
                        <span :class="index+1===baiscInfo.lottery_res.length?'num special':'num'" v-for="(item1,index) in item.lottery_res.split(',')" :key="index" class="num">{{item1}}</span>
                    </p>
                </cell>
            </group>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem, Group, Cell } from 'vux'
import _ from 'underscore'
export default {
    data(){
        return {
            isShowFirst:true,
            baiscInfo:{},
            lotteryResList:[],
            isSel:true
        }
    },
    components: {
        Tab,
        TabItem,
        Group,
        Cell
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail(lottery_no){
            this.$axios.post(this.$api.queryLotteryInfo, {params:{lottery_id: 'ssq',lottery_no:lottery_no?lottery_no:this.$route.query.lottery_no}})
    		.then(response => {
    			if(response.code === "0000") {
                    this.baiscInfo = response.result
                    this.baiscInfo.lottery_res = response.result.lottery_res.split(',')
                    if(!lottery_no){
                        this.getList()
                    }
    			}else{
					this.$vux.toast.text(response.msg)
    			}
    		})
        },
        getList(){
            this.$axios.post(this.$api.queryLotteryHistory, {params:{"lottery_id": 'ssq'}})
    		.then(response => {
    			if(response.code === "0000") {
                    this.lotteryResList = response.result
    			}else{
					this.$vux.toast.text(response.msg)
    			}
    		})
        },
        tabItem(index){
            if(index===0){
                this.isSel = true
                this.isShowFirst = true
            }else{
                this.isSel = false
                this.isShowFirst = false
            }
        },
        queryDetail(lottery_no){
            this.getDetail(lottery_no)
            this.tabItem(0)
        }
    }
}
</script>
