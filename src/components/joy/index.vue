<template>
    <div class="joy">
        <div v-if="result.length">
            <ul>
                <li v-for="(item, index) in result" :key='index'>
                    <p v-html="item.content"></p>      
                    <p class="mt10">
                        <img v-if="item.isClick" src="static/images/theme/heart1.png" style="width:20px;margin-right:5px">
                        <img @click="add(index,item)" v-else src="static/images/theme/heart2.png" style="width:20px;margin-right:5px">
                        {{item.clickNum}}
                    </p>     
                </li>
            </ul>
            <p style="text-align:center;" @click="more" v-if="isHas">更多</p>
        </div>
        <div style="padding-top: 30%;text-align: center" v-else>
            <img src="static/images/theme/noData.png" style="width:200px;margin:0 auto;">  
            <p>没有找到哟~</p>   
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import _ from 'underscore'
export default {
    data() {
        return {
            result:[],
            params:{
                pageNo:1,
                pageSize:5
            },
            isHas:true
        }
    },
    created(){
        this.getJoy()
    },
    methods:{
        getJoy(){
            this.$axios.post(this.$api.joy,{params:this.params})
            .then(response => {
                if(response.code=='0000'){
                    if(response.result.length < this.params.pageSize){
                        this.isHas = false
                    }
                    this.result.push(...response.result)
                }
            })
        },
        add(index,item){            
            this.$axios.post(this.$api.likeTotal,{params:{id:item.id}})
            .then(response => {
                if(response.code=='0000'){
                    let data = item
                    data.isClick = true
                    ++data.clickNum
                    this.result.splice(index, 1, data)
                }
            })
            
        },
        more(){
            this.params.pageNo = this.params.pageNo + 1
            this.getJoy()
        }
    }
}
</script>

