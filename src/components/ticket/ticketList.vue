<template>
    <div class="ticket">
        <router-link :to="{path:`${item.lottery_id}`,query:{lottery_no:`${item.lottery_no}`}}" tag="div" v-for="(item,index) in list" :key="index">
            <group class="head-cell">
                <cell is-link>
                    <p slot="title" class="ticketName">{{item.lottery_name}}<span>第<b>{{item.lottery_no}}</b>期</span><span class="ticketDate">{{item.lottery_date}}</span></p>
                    <p slot="inline-desc" v-if="item.lottery_id==='ssq'||item.lottery_id==='qlc'">
                        <span :class="index1+1>=item.lottery_res.split(',').length?'num special':'num'" v-for="(item1, index1) in item.lottery_res.split(',')" :key="index1">{{item1}}</span>
                    </p>
                    <p slot="inline-desc" v-else-if="item.lottery_id==='dlt'">
                        <span :class="index1+2>=item.lottery_res.split(',').length?'num special':'num'" v-for="(item1, index1) in item.lottery_res.split(',')" :key="index1">{{item1}}</span>
                    </p>
                    <p slot="inline-desc" v-else>
                        <span class="num" v-for="(item1, index1) in item.lottery_res.split(',')" :key="index1">{{item1}}</span>
                    </p>
                    <img slot="icon" class="headImg"  style="display:block;margin-right:10px;width:40px;vertical-align:top" :src="`static/images/ticket/${item.lottery_id}.png`">
                </cell>
            </group>
        </router-link>
    </div>
</template>
<script>
import { Group, Cell } from 'vux'
import _ from 'underscore'
export default {
    data(){
        return {
            list:[]
        }
    },
    components: {
        Group,
        Cell
    },
    created(){
        this.getTicket()
    },
    methods:{
        getTicket(){
            this.$axios.post(this.$api.queryLotteryList,{})
    		.then(response => {
    			if(response.code === "0000") {
                    this.list = response.result
    			}else{
					this.$vux.toast.text(response.msg)
    			}
    		})
        }
    }
}
</script>
