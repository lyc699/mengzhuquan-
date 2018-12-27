<style>

</style>
<template>
  <section>
      <group>
          <cell title="头像"  @click.native="addHead()">
            <input type="file" id='myHead' accept="image/*" style="display: none" @change="onFileChange" />
             <img style="width:50px;height:50px;border-radius: 50px;"  :src="headPic" onerror="onerror=null;src='static/images/Mine_Img_HeadPortrait@2x.png'">
          </cell>
          <x-input title="昵称" name="nickname" text-align='right' placeholder="请输入昵称"  v-model='nickname'></x-input>
      </group>   
      <div class="login-btn">
          <x-button @click.native="submit" v-touch>保存</x-button>
      </div>    
  </section>
</template>
<script>
  import { Group, XInput, XButton, Cell } from 'vux'
  import lrz from "lrz"
  export default {
    data () {
      return {
        nickname:this.$route.query.nickname,
        headPic:''
      }
    },
    components: {
      Group,
      XInput,
      XButton,
      Cell
    },
    created(){
      this.getHead()
    },
    methods: {
      getHead(){
        let num = new Date().getTime()
        this.headPic = this.$api.downLoad+"?busiNo="+localStorage.phoneNo+"_03&"+num
      },
      addHead() {
          document.getElementById("myHead").click();
          return false;
      },
      onFileChange(e){
          let files = e.target.files || e.dataTransfer.files;
          if(!files.length) return;
          this.createImage(files, e);
      },
      createImage(file, e) {
		        lrz(file[0], { width: 800 }).then(rst => {
		          this.saveImage(rst.base64)
		          return rst;
		        }).always(function() {
		          // 清空文件上传控件的值
		          e.target.value = null;
		        });
		    },
		    saveImage(base64Codes){
		        let formData = new FormData();   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
	            formData.append("file",base64Codes);  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
	            formData.append("phoneNo",localStorage.getItem("phoneNo"));//业务id就是贷款编号
	            formData.append("certType","03");//正面照：01； 背面照：02； 用户头像：03 ；用户反馈图片1：04；用户反馈图片2：05；用户反馈图片3：06；用户反馈图片4：07；用户反馈图片5：08；|
		        this.$axios.post(this.$api.base64UploadCert, formData)
                .then(res => {
                  if(res.code == "0000"){
                    this.getHead()
                	}else{
                    this.$vux.toast.text(res.msg, "top")
                  }
                })
                .catch(res => {
                	console.log(res)
                })
		    },
        submit(){
          this.$axios.post(this.$api.personInfo,{params:{phoneNo:localStorage.phoneNo,nickname: this.nickname}})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    this.$vux.toast.text('保存成功')
                    this.$router.push({"path": "/my"})
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        }      
    }
  }
</script>
