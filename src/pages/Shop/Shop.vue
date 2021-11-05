<template>
  <div>
    <shop-header/>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="`/shop/${id}/goods`">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${id}/ratings`" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${id}/info`" replace>商家</router-link>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script type='text/ecmascript-6'>
import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
import { mapState } from 'vuex'
import Vue from 'vue'
import saveShopCart from '@/untils/index.js'
export default {
  props: ['id'],
  components:{
    ShopHeader
  },
  computed: {
    // ...mapState(['shopInfo'])
    // ...mapState({
    //   shopInfo: state => state.shop.shop.info || {}
    // })
  },
  mounted(){
    // 将info从接口中请求获取到了state中
    // this.$store.dispatch("getShopInfo")
    // this.$store.dispatch("getShopGoods")
    // this.$store.dispatch("getShopRatings")

    //得到当前请求的id
    //const id = this.$route.params.id
    const id = this.id
    // 分发actions请求商家数据
    this.$store.dispatch("getShop",id)

    console.log('id',id)
    //let res=JSON.parse(JSON.stringify(this.$store.state.shop));  
    //console.log('shopinfo',res)

    // 给窗口绑定一个卸载的监听
    window.addEventListener('unload',()=>{
      const {shop:{id},shopCart} = this.shop  //多层解构
      // 将当前商家数据保存
      saveShopCart(id,shopCart)
    })
    
  },
  computed:{
    ...mapState({
      shop: state => state.shop
    })
  },

  // 在组件销毁之前，在sessionStorage中保存shop.shop.id : {shop.shopCart.index:shop.shopCart.count
  beforeDestroy(){  // 页面刷新，不会执行，那shopCart减一下，刷新一下数据就不会被保存到sesssionStorage,还是原来的值？
    const {shop:{id},shopCart} = this.shop  //多层解构
    console.log('beforeDestroy:',id,shopCart)
    // 将当前商家数据保存
    saveShopCart(id,shopCart)
  }
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
