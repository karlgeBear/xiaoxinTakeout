<template>
  <div class="footer-guide">
    <span class="guide-item" :class="{on: $route.path === '/msite'}" @click="goto('/msite')">
      <span>
        <i class="iconfont icon-shouye"></i>
      </span>
      <span>首页</span>
    </span>
    <span class="guide-item" :class="{on: $route.path === '/search'}" @click="goto('/search')">
      <span>
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide-item" :class="{on: $route.path === '/order'}" @click="goto('/order')">
      <span>
        <i class="iconfont icon-dindan"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide-item" :class="{on: $route.path === '/profile'}" @click="goto('/profile')">
      <span>
        <i class="iconfont icon-yonghu"></i>
      </span>
      <span>个人</span>
    </span>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'FooterGuide',
  data () {
    return {}
  },
  methods:{
    goto (path){
      // 方案1: 如果点击当前项，没有任何效果
      // if (path !== this.$route.path){
      //   //编程式路由跳转
      //   this.$router.replace(path)
      // }

      // 方案2：如果点击当前项，当前页面刷新
      if (path !== this.$route.path){
        //编程式路由跳转
        this.$router.replace(path)
      }else {
        window.location = path
      }
    }
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl';
  .footer-guide
    top-border-1px(#cccccc)
    display flex
    position fixed
    left 0
    bottom 0
    height 50px
    width 100%
    background-color white
    .guide-item
      display flex
      flex-direction column
      text-align center
      width 25%
      &.on
        color $green
      span
        margin-top 3px
        font-size 12px
        i
          font-size 22px
</style>
