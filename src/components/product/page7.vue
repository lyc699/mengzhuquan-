<template>
    <div>
     <p v-if="isShow" style="text-align:center;margin-top:30%">链接已失效</p> 
    </div>
</template>

<script>
  import { querystring } from 'vux'
    export default {
        data(){
            return {
              prodName:"",
              ip:"",
              url:"",
              isShow:false
            }
        },
        created(){},
        mounted(){
          this.getProductInfo()
        },
        methods: {
          getProductInfo(){
            let that=this
            that.$axios.post('/mzq/bycx-luckycat-service/bMarketProdDetails/getProductDetail', {"params":{"prodNo":that.$route.query.prod}})
              .then(res => {
                if(res.code == '0000'){
                that.url=res.result.othVisitUrl
                that.prodName=res.result.prodName
                that.getClientIp()
              }else{
                that.$message.error(res.msg)
              }
          })
          },
          getClientIp(){
              let that=this
              that.$axios.post('/mzq/bycx-drainage-service/aSysAtt/getHeaderInfo', {"params":{}})
              .then(res => {
                let sendData={ip: localStorage.ip,prodNo:that.$route.query.prod,prodName:that.prodName,opType:42100012,sourceType:26600005,usrSource:45900001,appType:30500158,chanNo:that.$route.query.chanNo}
                that.setBurial(sendData)
                localStorage.setItem('mChanNo',that.$route.query.chanNo)
                that.isUrl()
              })
          },
          isUrl(){
            this.$axios.post('/mzq/bycx-luckycat-service/bMarketProdChannelRel/queryProdChannelList', {"params":{prodNo:this.$route.query.prod,chanNo:this.$route.query.chanNo}})
            .then(res => {
              if(res.code=='0000'){
                if(res.result[0].status=='13900001'){
                  window.location.href=this.url
                }else{
                  this.isShow=true
                }
              }
            })
          },
          setBurial(val){
            let img = new Image()
            let sendJson=querystring.stringify(val)
            img.src=`/mzq/bycx-drainage-service/bMarketVisitRecord/record?${sendJson}`
          }
        }
    }
</script>
