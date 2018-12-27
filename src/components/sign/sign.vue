<template>
  <div class="sign">
        <div class="head_div">
            <div class="head_btn">
                <img src="static/images/sign/bg.png" alt="">
                <div @click="signIn(dayFinish)">
                    <h3>{{btnText}}</h3>
                    <p v-if="btnText!=='立即签到'">已连续签到</p>
                </div>
            </div>
            <h3 v-html="title">{{title}}</h3>
            <p v-if="dec">{{dec}}</p>
            <img src="static/images/sign/banner1.png" alt="" @click="getAdvUrl()">
            <span @click="dialog=true" class="rules">活动规则</span>
        </div> 
        <div class="day_div">
            <flexbox>
                <flexbox-item @click.native="signIn(0)"><div class="flex-demo"><img :src="`static/images/sign/${weekList[0].imgUrl}.png`" alt=""><p>{{weekList[0].name}}</p></div></flexbox-item>
                <flexbox-item @click.native="signIn(1)"><div class="flex-demo"><img :src="`static/images/sign/${weekList[1].imgUrl}.png`" alt=""><p>{{weekList[1].name}}</p></div></flexbox-item>
                <flexbox-item @click.native="signIn(2)"><div class="flex-demo"><img :src="`static/images/sign/${weekList[2].imgUrl}.png`" alt=""><p>{{weekList[2].name}}</p></div></flexbox-item>
                <flexbox-item @click.native="signIn(3)"><div class="flex-demo"><img :src="`static/images/sign/${weekList[3].imgUrl}.png`" alt=""><p>{{weekList[3].name}}</p></div></flexbox-item>
                <flexbox-item @click.native="signIn(4)"><div class="flex-demo"><img :src="`static/images/sign/${weekList[4].imgUrl}.png`" alt=""><p>{{weekList[4].name}}</p></div></flexbox-item>
                <flexbox-item @click.native="signIn(5)"><div class="flex-demo"><img :src="`static/images/sign/${weekList[5].imgUrl}.png`" alt=""><p>{{weekList[5].name}}</p></div></flexbox-item>
                <flexbox-item @click.native="signIn(6)"><div class="flex-demo"><img :src="`static/images/sign/${weekList[6].imgUrl}.png`" alt=""><p>{{weekList[6].name}}</p></div></flexbox-item>
            </flexbox>
        </div>
        <group class="gift_div">
            <cell :title="prizeList[0].default_title" inline-desc='连续签到2天，轻松拿走'>
                <img slot="icon" class="icon" width="20" style="display:block;margin-right:5px;" :src="`static/images/sign/${prizeList[0].default_img}.png`">
                <button :disabled='prizeList[0].abled' :class="{disabled:prizeList[0].abled,end:prizeList[0].text==='已领取'}" @click="getPrize(0)">{{prizeList[0].text}}</button>
            </cell>
            <cell :title="prizeList[1].default_title" inline-desc='连续签到4天，即可带走'>
                <img slot="icon" class="icon" width="20" style="display:block;margin-right:5px;" :src="`static/images/sign/${prizeList[1].default_img}.png`">
                <button :disabled='prizeList[1].abled' :class="{disabled:prizeList[1].abled,end:prizeList[1].text==='已领取'}" @click="getPrize(1)">{{prizeList[1].text}}</button>
            </cell>
            <cell :title="prizeList[2].default_title" inline-desc='连续签到7天，给你我的心意'>
                <img slot="icon" class="icon" width="20" style="display:block;margin-right:5px;" :src="`static/images/sign/${prizeList[2].default_img}.png`">
                <button :disabled='prizeList[2].abled' :class="{disabled:prizeList[2].abled,end:prizeList[2].text==='已领取'}" @click="getPrize(2)">{{prizeList[2].text}}</button>
            </cell>
        </group>
        <div v-transfer-dom>
			<x-dialog v-model="dialog" class="dialog-demo sign_dialog">
                <img src="static/images/sign/close.png" alt="" class="close" @click="dialog=false" >
                <img src="static/images/sign/dialogBg.png" alt="" class="dialogBg">
                <img src="static/images/sign/flower.png" alt="" class="flower">
			    <div class="dialog_div">
                    <h1>盟主圈签到活动规则</h1>
                    <p>1.活动时间:8月14日-10月30日</p>
                    <p>2.活动期间内,连续签到第2天、第4天、第7天分别有好礼相送,<span>坚持7天,得三份大礼. </span></p>
                    <p>连续签到第2天,获取奖励;</p>
                    <p>连续签到第4天,解锁第4天奖励,并领取;</p>
                    <p>连续签到第7天,解锁第7天奖励,获取连续签到一周大奖. </p>
                    <p>3.对通过不正当手段影响活动结果的用户,本平台有权取消其参与及获奖资格. </p>
                    <p>4.在法律允许的范围内,本平台具有该活动全部解释权. 如有其他疑问,请关注微信公众号"盟主圈"咨询. </p>
                </div>
			</x-dialog>
            <x-dialog v-model="dialog1" class="dialog-demo dialog1">
                <img src="static/images/sign/close.png" alt="" class="close" @click="dialog1=false" >
			    <div class="dialog_div">
                    <h1>温馨提示</h1>
                    <p>请用签到手机号拨打<a href="tel:028-68850866">028-68850866</a>，领取您连续签到7天大奖。数量有限，先到先得。</p>
                    <a href="tel:028-68850866">联系我们</a>
                </div>
			</x-dialog>
		</div>
  </div>
</template>
<script>
import { Group, Cell, Flexbox, FlexboxItem, XDialog, TransferDom, Swiper } from 'vux'
import _ from 'underscore';
export default {
    data() {
      return{
          dialog: false,//显示弹窗
          dialog1:false,
          title:"连续签到有礼",
          dec:"",
          dayFinish: 0,//签到天数
          btnText:"立即签到",
          disAbleDay: false,//可否签到
          prizeList:[
              {
                  abled:true,
                  text:'领取',
                  prizeNo: '10000201',
                  url: '',
                  default_img: 'aqy',
                  img: 'aqy',
                  default_title:'视频会员85折',
                  title:'视频会员85折'
              },
              {
                  abled:true,
                  text:'领取',
                  prizeNo: '10000202',
                  url: '',
                  default_img: 'axbx',
                  img: 'axbx',
                  default_title:'安心意外保障险',
                  title:'安心意外保障险'
              },
              {
                  abled:true,
                  text:'领取',
                  prizeNo: '10000203',
                  url: 'javascript:',
                  default_img: 'yk',
                  img: 'yk',
                  default_title:'优酷视频会员月卡',
                  title:'优酷视频会员月卡'
              },
          ],
          weekList:[
              {
                imgUrl: 'oneDay',
                name: '第1天',
                title: '恭喜您已迈出成功第一步',
                dec: '第2天签到可领礼包',
                clickUrl: 'oneDaySigning',
                finishUrl: 'oneDaySigned'
              },
              {
                imgUrl: 'otherDay',
                name: '第2天',
                title: '您已击败50%的用户',
                dec: '第4天签到可领礼包',
                clickUrl: 'otherDaySigning',
                finishUrl: 'otherDaySigned'
              },
              {
                imgUrl: 'threeDay',
                name: '第3天',
                title: '坚持小达人，努力就会有收获',
                dec: '第4天签到可领礼包',
                clickUrl: 'threeDaySigning',
                finishUrl: 'oneDaySigned'
              },
              {
                imgUrl: 'otherDay',
                name: '第4天',
                title: '小小礼物奖励会生活的您',
                dec: '第7天签到可领礼包',
                clickUrl: 'otherDaySigning',
                finishUrl: 'otherDaySigned'
              },
              {
                imgUrl: 'fiveDay',
                name: '第5天',
                title: '您已经成功超越90%的用户',
                dec: '第7天签到可领礼包',
                clickUrl: 'fiveDaySigning',
                finishUrl: 'oneDaySigned'
              },
              {
                imgUrl: 'sixDay',
                name: '第6天',
                title: '爱你哟<img src="static/images/sign/love.png">',
                dec: '第7天签到可领礼包',
                clickUrl: 'sixDaySigning',
                finishUrl: 'oneDaySigned'
              },
              {
                imgUrl: 'otherDay',
                name: '第7天',
                title: '美好的一天',
                dec: '来一场说看就看的电影',
                clickUrl: 'otherDaySigning',
                finishUrl: 'otherDaySigned'
              }
          ]
      }
    },
    directives: {
		TransferDom
	},
    components: {
        Group,
        Cell,
        Flexbox,
        FlexboxItem,
        XDialog,
        Swiper
    },
    created(){      
        this.init()
    },
    methods:{
        init(){
            this.getPrizeAddr()
            this.querySigninDays()            
        },
        /* 
        * 连续签到的天数   
        */
        querySigninDays(){
            this.$axios.post(this.$api.querySigninDays,{params: {phoneNo: localStorage.phoneNo}})
            .then(response => {
    			if(response.code === "0000") {
                    // //用于测试
                    // if(response.result.signDays === 7 && response.result.isSigninToday === '13900002'){
                    // }
                    //如果连续签到为0天，则清楚领取奖品的状态
                    if(response.result.signDays === 0){
                        if(localStorage.receivedPrize){
                            localStorage.removeItem("receivedPrize")
                        }
                    }
                    //连续签到多少天，修改图标
                    // response.result.signDays = 6;
                    // response.result.isSigninToday = '13900001'
                    _.map(this.weekList, (item, index) => {
                        if(index < response.result.signDays){
                            item.imgUrl = item.finishUrl
                        }
                    });
                    //判断今天是否已经签到，13900002未签到
                    if(response.result.isSigninToday === '13900002'){
                        let day = response.result.signDays
                        this.weekList[day].name = '今日'
                        this.weekList[day].imgUrl = this.weekList[day].clickUrl
                    }else{
                        this.disAbleDay = true//都已签到，将天数按钮设为不可点击状态
                    }
                    this.dayFinish = response.result.signDays
                    this.signFinish()
    			}else{
                    this.$vux.toast.text(response.msg)
    			}
    		})
        },
        /* 
        * 签到操作 
        */
        signIn(index){
            //判断今日是否已经签到
            if(this.disAbleDay){
                return false
            }
            //判断是否点击今日之后的日期
            // 
            if(this.dayFinish - index !== 0){
                return false
            }
            let data = {
                phoneNo: localStorage.phoneNo,
                signinDays: ( index + 1 ).toString(), 
            }
            this.$axios.post(this.$api.signIn,{params: data})
            .then(response => {
    			if(response.code === "0000") {
                    this.weekList[index].imgUrl = this.weekList[index].finishUrl
                    this.dayFinish = response.params.signinDays
                    this.disAbleDay = true
                    this.signFinish()
    			}else{
                    this.$vux.toast.text(response.msg)
    			}
    		})
        },
        /* 
        * 签到完成之后修改页面相应的显示 
        */
        signFinish(){
            if(!parseInt(this.dayFinish)){
                return false
            }
            let day = this.dayFinish - 1
            this.title = this.weekList[day].title;
            this.dec = this.weekList[day].dec;
            this.btnText = this.dayFinish + '天';
            this.prize()
        },
        /* 
        * 奖品领取状态 
        */
        prize(){
            switch (true){
                case (this.dayFinish >= 2 && this.dayFinish < 4): 
                    this.prizeList[0].abled = false;      
                    break;
                case (this.dayFinish >= 4 && this.dayFinish < 7):
                    this.prizeList[0].abled = false;   
                    this.prizeList[1].abled = false;   
                    this.prizeList[1].default_img = this.prizeList[1].img 
                    this.prizeList[1].default_title = this.prizeList[1].title 
                    break;
                case (this.dayFinish >= 7): 
                    this.prizeList[0].abled = false;   
                    this.prizeList[1].abled = false;
                    this.prizeList[2].abled = false;
                    this.prizeList[1].default_img = this.prizeList[1].img
                    this.prizeList[2].default_img = this.prizeList[2].img
                    this.prizeList[1].default_title = this.prizeList[1].title
                    this.prizeList[2].default_title = this.prizeList[2].title
                    break;
                default:
                    break;
            }
            if(localStorage.receivedPrize){
                this.prizeList[2].text = '已领取'
                this.prizeList[2].default_img = this.prizeList[2].img
                this.prizeList[2].default_title = this.prizeList[2].title
                this.prizeList[2].abled = true
            }
        },
        /* 
        * 领取奖品
        */
        getPrize(index){            
            let data = {
                phoneNo: localStorage.phoneNo,
                prizeNo: this.prizeList[index].prizeNo,
            }
            this.$axios.post(this.$api.takePrize,{params: data})
            .then(response => {
    			if(response.code === "0000") {          
                    this.$vux.toast.text('领取成功！')
                    this.prizeList[index].default_img = this.prizeList[index].img  
                    this.prizeList[index].default_title = this.prizeList[index].title
                    this.prizeList[index].abled = true
                    this.prizeList[index].text = '已领取'
                    if(index === 2){
                        this.dialog1=true
                        localStorage.setItem(`receivedPrize`, true)
                    }
                    window.location.href = this.prizeList[index].url        
    			}else{
                    this.$vux.toast.text(response.msg)
    			}
    		})
        },
        /* 
        * 获取广告的url
        */
        getAdvUrl(){
            this.$axios.post(this.$api.getAdvUrl,{params: {activityNo: '100002'}})
            .then(response => {
    			if(response.code === "0000") {   
                   this.$axios.post(this.$api.advClick,{params: {activityNo: '100002'}})
                   window.location.href = response.result.activityAdvUrl
    			}else{
                    this.$vux.toast.text(response.msg)
    			}
    		})
        },
        /* 
        * 获取奖品领取的url
        */
        getPrizeAddr(){
            this.$axios.post(this.$api.queryPrizeAddr,{})
            .then(response => {
    			if(response.code === "0000") {   
                    this.prizeList[0].url = response.result.twoDayPrizeAddr
                    this.prizeList[1].url = response.result.fourDayPrizeAddr
    			}else{
                    this.$vux.toast.text(response.msg)
    			}
    		})
        }
    }
}
</script>

