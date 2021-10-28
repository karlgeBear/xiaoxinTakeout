<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-jianshao1" v-show="food.count" @click="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="iconfont icon-icon_add-circle1" @click="updateFoodCount(true)"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
    }
  },
  props:{
    food:Object
  },
  methods:{
    // 更新food的count
    updateFoodCount(isAdd){ 
      const {food} = this
      // 通知action更新
      this.$store.dispatch('updateFoodCount',{isAdd,food})
    }
  }
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .icon-jianshao1
      position: relative
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active {
        -webkit-animation: move-out 0.6s;
      }
      &.move-leave-active {
        -webkit-animation: move-in 0.6s;
      }
      @-webkit-keyframes move-out {
        0% {
          left 35px
          -webkit-transform: rotate(0deg)
          opacity 0
          }
        100% {
          left 0px
          -webkit-transform: rotate(-360deg)
          opacity 1
          }
      }
      @-webkit-keyframes move-in {
        0% {
          left 0px
          -webkit-transform: rotate(-360deg)
          opacity 1
          }
        100% {
          left 35px
          -webkit-transform: rotate(0deg)
          opacity 0
          }
      }
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-icon_add-circle1
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
