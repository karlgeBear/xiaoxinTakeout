<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUI">
          <li class="menu-item" 
          v-for="shopGood,index in shopGoods" :key="index" 
          :class="{current:index===currentIndex}" 
          @click="clickItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="shopGood.icon" :src="shopGood.icon" >
              {{shopGood.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="right">
        <ul ref="rightUI">
          <li class="food-list food-list-hook" v-for="shopGood,index in shopGoods">
            <h1 class="title">{{shopGood.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in shopGood.foods" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper" :food="food">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food :food="selectedFood" ref="food"/>
    <shopcart />
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState } from 'vuex'
import BScroll from '@better-scroll/core'
import Food from '@/components/Food/food.vue'
import shopcart from '@/components/shopCart/shopCart.vue'
export default {
  components:{
    Food,
    shopcart
  },
  data () {
    return {
      // 1. 右侧列表滑动的Y轴坐标： ScrollY 在滑动过程中不断改变
      scrollY:0,
      // 2. 右侧每个分类<li>的top值得数组tops：第一次列表显示统计后面不再变化
      tops:[],
      
      selectedFood:{}
    }
  },
  computed:{
    //...mapState(['shopGoods']),
    ...mapState({
      shopGoods: state => state.shop.shop.goods || []
    }),
    currentIndex(){
      const {scrollY, tops} = this
      let index =  tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])
      if (index !== this.index && this.leftScroll) {  // 当右侧滑动时，currentIndex与左侧li的index不相等时  && 数据初始化并没有this.leftScroll,所以需要判断
        // 保存当前index，用于随右侧选项滑动，判断左右两端的项是否对应
        this.index = index
        // 让左侧列表滑动到右侧滑动对应的那一项
        const li = this.$refs.leftUI.children[index]
        // 滚动到目标元素
        if (li){
          this.leftScroll.scrollToElement(li,300)
        }
        
      }
      return index
    }
  },
  methods:{
    //初始化滑动
    _initScroll (){
      if (!this.leftScroll) {
        console.log('创建scroll对象')
        this.leftScroll = new BScroll(this.$refs.left,{
        // 分发click事件，不指定的话，原生js指定的click会默认阻止
          click:true
        })
        this.rightScroll = new BScroll(this.$refs.right,{
          click:true,
          probeType:1  // 非实时（低频率） / 触摸
        })
       // 给右侧列表绑定scoll监听
        this.rightScroll.on('scroll',({x,y}) => {
          console.log('scroll',x,y)
          this.scrollY = Math.abs(y)
        })

        // 给右侧列表绑定scrollEnd监听
        this.rightScroll.on('scrollEnd',({x,y}) => {
          console.log('scrollEnd',x,y)
          this.scrollY = Math.abs(y)
        })
      }else{
        this.leftScroll.refresh()
        this.rightScroll.refresh()

      }
    },
    // 统计右侧所有分类li的top的数组
    _initTops(){
      const tops = []
      let top =0 
      tops.push(top)
      const lis = Array.prototype.slice.call(this.$refs.rightUI.children)
      lis.forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })

      //更新tops数据
      this.tops =tops
      console.log('tops',tops)
    },
    
    // 给滑动左侧绑定事件监听
    clickItem(index){
      // 获取点击左侧选项对应右侧li的scrollY的值
      let top = this.tops[index]
      // 立即更新scroll为目标值（立即选中当前分类项）
      this.scrollY = top
      // 让右侧滑动到对应的位置
      this.rightScroll.scrollTo(0, -top, 300)

    },

    showFood(selectedFood){
      // 将选中的菜品信息保存下来
      this.selectedFood = selectedFood
      // 取子组件food的方法
      this.$refs.food.toggleShow()
    }
   
  },
  mounted () {
    // 如果数据已经有了, 直接做初始化的操作
    if (this.shopGoods.length>0) {
      console.log('mounted goods')
      this._initScroll()
      this._initTops()
    }
    console.log('3333',this.shopGoods)
  },
  watch:{
    shopGoods(){  //监视shopGoods的列表数据的改变
    this.$nextTick(() => {  // 数据列表显示了（将回调延迟到下次 DOM 更新循环之后执行：数据更新且界面显示之后）
      this._initScroll()
      this._initTops()
    })
    }
  }
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
