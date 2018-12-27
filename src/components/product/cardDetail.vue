<template>
    <div class="cardDetail">
        <scroller style="top: 0px" :on-refresh="refresh" :on-infinite="infinite">
            <img src="static/images/card/banner.png" alt="" class="banner">
            <article>  
                <group>
                    <div v-for="(item, index) in newProList" :key="index">
                        <cell :title="item.prodName" isLink :inline-desc="item.prodAdvantage" @click.native="toDetail(item.prodNo, item.prodName, item.othVisitUrl)">
                            <img slot="icon" class="icon" width="20" style="display:block;margin-right:5px;" :src="item.prodPicUrl">
                            <a>立即申请</a>
                        </cell>
                    </div>
                </group>
            </article>
            <p class="noData" v-if="noData">暂无更多数据</p>
        </scroller>
    </div>
</template>
<script>
import { Group, Cell} from 'vux'
import { getQueryString, recordScan} from '../common/common.js'
export default {
    components: {
        Group,
        Cell
    },
    data(){
        return {
            hasData: false,
            noData: false,
            newProJson:{
                pageNo: 1,//当前页码
                pageSize: 12,//当前页显示条数
                compSort:"41400001,41400002,41400003,41400004,41400005,41400006",
                loanType:"41300001",
                prodTwoType: '46800002'
            },
            newProList: [],
        	recordJson:{
                ip: localStorage.getItem("ip"),
                phoneNo: '',
                prodNo: "",
                pageId: "cardDetail",
                opType: "42100003",//42100003：产品列表PV
                sourceType: SOURCE_TYPE,  //表示微信
                chanNo: '46300004',
                prodName: "cardDetail",
                appType: APP_TYPE1
            }
        }
    },
    created() {
        this.recordJson.phoneNo = getQueryString("phoneNo")||this.$route.query.phoneNo
        this.countApply()
    },
    mounted: function() {
        this.getNewProList()
    },
    methods: {
        /*
        * 下拉刷新
        */
        refresh (done) {
            setTimeout(() => {
                this.getNewProList()
                done()
            }, 1500)
        },
        /*
        * 上拉加载
        */
        infinite (done) {
            if(!this.hasData){
                done()
                return
            }
            setTimeout(() => {
                this.newProJson.pageNo++
                this.$axios.post(this.$api.productList, {"params": this.newProJson})
                .then(response => {
                    if(response.code === "0000") {
                        let data = response.result
                        if(data.length == 0){
                            this.hasData = false
                            this.noData = true
                        }
                        for(let i=0;i<data.length;i++){
                            this.newProList.push(data[i])
                        }
                        done()
                    }else{
                        this.$vux.toast.text(response.msg)
                    }
                })
                .catch(function(response){
                    
                })
            }, 1500)
        },
        /*
        * 获取产品列表
        */
        getNewProList(){
            this.newProJson.pageNo = 1
            this.noData = false
            this.$axios.post(this.$api.productList, {"params": this.newProJson})
            .then(response => {
                if(response.code === "0000") {
                    let data = response.result
                    if(data.length > 0){
                        this.hasData = true
                    }
                    this.newProList = data
                }else{
                    this.$vux.toast.text(response.msg)
                }
            })
            .catch(function(response){
                
            })
        },
        /*
        * 跳转产品详情页面
        */
        toDetail(prodNo, prodName, othVisitUrl){
            this.recordJson.prodNo = prodNo
            this.recordJson.prodName = prodName
            this.recordJson.opType = '42100004'//42100004：信用卡UV
            this.countApply()
            window.location.href = othVisitUrl
        },
        /*
        * 统计浏览量
        */
        countApply(){
            recordScan(this.$api.record, this.recordJson)
        }
    }
}
</script>

