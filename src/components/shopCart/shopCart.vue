<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalPrice>0}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalPrice>0}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clear">清空</span>
        </div>
        <div class="list-content" ref="foods">
          <ul>
            <li class="food" v-for="(food, index) in shopCart" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price"><span >￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import {mapState,mapGetters} from 'vuex'
import CartControl from '@/components/CartControl/CartControl.vue'
import BScroll from '@better-scroll/core'
export default {
  components:{
    CartControl
  },
  data () {
    return {
      isShow: false
    }
  },
  created(){
    console.log('info',this.$store.state.shop)
  },
  computed:{
    ...mapState({
      shopCart: state => state.shop.shopCart,
      info: state => state.shop.shop.info || {},
    }),
    ...mapGetters(['totalCount', 'totalPrice']),

    payClass () {
      const {totalPrice} = this
      const {minPrice} = this.info
      return totalPrice>=minPrice ? 'enough' : 'not-enough'
    },

    payText () {
      const {totalPrice} = this
      const {minPrice} = this.info
      if(totalPrice===0) {
        return `￥${minPrice}元起送`
      } else if(totalPrice<minPrice) {
        return `还差￥${minPrice-totalPrice}元起送`
      } else {
        return '去结算'
      }
    },

    // 购物车列表是否显示
    listShow () {
      // 如果没有数量, 直接不显示
      if(this.totalCount===0) {
        // 将isShow改为false
        this.isShow = false
        return false
      }
      if (this.isShow) {
        this.$nextTick(()=>{
         //在界面更新后创建BScroll(只能创建一个)
          /*
          单例:
            1. 在创建前, 判断是否存在,只有不存在, 才去创建
            2. 创建后, 保存它
            */
          if(!this.scroll) { // 第一次打开
            this.scroll = new BScroll(this.$refs.foods, {
              click: true
            })
          } else {// 后面打开
            // 通知scroll对象
            this.scroll.refresh()  // 关闭购物车时会重新计算高度，进行刷新
          }
        })
      }
      // 只需要看isShow
      return this.isShow
    }
  },
  methods:{
    toggleShow(){
      if(this.totalCount) { // 只有有数量时切换
        this.isShow = !this.isShow
      }
      console.log(2)
    },
    clear(){
      if(window.confirm('你确定清空购物车吗？')){
        this.$store.dispatch('clearCart')
      }
    }
  }
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          width: 48px
          display: inline-block
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0         
      vertical-align: top
      position: relative
      top: -10px
      margin: 0 12px
      padding: 6px
      width: 56px
      height: 56px
      box-sizing: border-box
      border-radius: 50%
</style>
