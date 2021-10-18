<template>
  <form>
    <mt-button type="danger">{{alertText}}</mt-button>
  </form>

</template>

<script type='text/ecmascript-6'>
export default {
  props:{
    alertText: String
  },
  data () {
    return {}
  },
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixins.styl';
  .mint-button--normal
    display block
    width 100%
    margin-top 16px
</style>
