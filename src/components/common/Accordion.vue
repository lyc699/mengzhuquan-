<style>

</style>
<template>
  <section>
    <div class="problem-list">
      <p class="problem-list-tit" @click="toggle()">
        <img src="static/images/problem/Question_Arrow_Right.png" :class="{'up': show }" alt="">
        <span>{{ problemList.question }}</span>
      </p>
      <div class="problem-list-cnt slide" :class="{'animate': show}">
        <p>{{ problemList.answer }}</p>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'app',
    props: ['item'],
    data () {
      return {
        show: false,
        problemList: ''
      }
    },
    created () {
      this.problemList = this.item
    },
    methods: {
      toggle () {
        let that = this
        that.show = !that.show
      }
    }
  }
</script>
