<style>

</style>
<template>
  <section class="problem-module">
    <p class="problem-module-tit">常见问题</p>
    <accordion v-for="item in problemList" :key="item.id" :item="item"></accordion>
  </section>
</template>
<script>
  import { Group, Cell } from 'vux'
  import accordion from '../common/Accordion.vue'
  import problemList from '@/data/quesData.json'

  export default {
    name: 'app',
    data () {
      return {
        show: false,
        problemList: []
      }
    },
    components: {
      Group,
      Cell,
      accordion
    },
    created () {
      this.initInfo()
    },
    methods: {
      initInfo () {
        const  that = this
        that.problemList = problemList.data
      }
    }
  }
</script>
