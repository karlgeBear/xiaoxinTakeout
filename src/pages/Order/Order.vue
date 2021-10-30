<template>
  <div>
      <section class="order">
        <HeaderTop title="订单列表"/>
        <section class="order_no_login" v-if="!!!(user._id)">
          <img src="./images/person.png">
          <h3>登录后查看外卖订单</h3>
          <button @click="$router.push('/login')">立即登陆</button>
        </section>
        <section class="order_yes_login" v-else>
          <h3>暂无外卖订单</h3>
        </section>
      </section>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState } from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
  computed:{
    // ...mapState(['user'])
    ...mapState({
      user: state => state.user.user
    })
  },
  components: {
    HeaderTop
  }
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixins.styl'
  .order  //订单
    width 100%
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
    .order_yes_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
  
</style>
