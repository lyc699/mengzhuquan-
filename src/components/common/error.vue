<template>
    <load-more :show-loading="false" tip="渠道跑丢了" background-color="#fbf9fe"></load-more>
</template>
<script>
import { LoadMore } from 'vux'

export default {
  components: {
    LoadMore
  }
}
</script>