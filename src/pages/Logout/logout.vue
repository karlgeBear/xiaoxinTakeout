<template>
  <div>
    <a href="javascript:" class="go_back" @click="$router.replace('/profile')">
      <i class="iconfont icon-fanhui"></i>
    </a>
    <button class="logout" @click="logout">退出登录</button>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  methods:{
    logout(){
      this.$store.dispatch('logout')
      this.$router.replace('/profile')
    }
  }
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  .go_back
    position absolute
    top 5px
    left 5px
    width 30px
    height 30px
  .logout
    position:absolute
    width 100%
    height 42px
    bottom: 0px
    border-radius 4px
    background #4cd96f
    color #fff
    text-align center
    font-size 16px
    line-height 42px
    border 0
</style>