<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span slot="search" @click="$router.push('/search')" class="header_search">
        <i class="iconfont icon-search"></i>
      </span>
      <router-link slot="login" to="/login" class="header_login">
        <span class="header_login_text">{{user._id ? '' : '登陆|注册'}}</span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper" v-if="categorys.length > 0">
          <div
            class="swiper-slide"
            v-for="(categorys, index) in categorysArr2"
            :key="index"
          >
            <div
              class="link_to_food"
              v-for="(cs, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="'http://fuss10.elemecdn.com' + cs.image_url" />
              </div>
              <span>{{ cs.title }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="food_container">
            <img src="./images/msite_back.svg" alt="loading">
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ul class="shop_list" v-if="shops.length > 0">
          <router-link class="shop_li border-1px"
            
            to="/shop"
            v-for="(shop, index) in shops"
            :key="shop.id"
          >
            <a>
              <div class="shop_left">
                <img
                  class="shop_img"
                  :src="'http://fuss10.elemecdn.com' + shop.image_path"
                />
              </div>
              <div class="shop_right">
                <section class="shop_detail_header">
                  <h4 class="shop_title ellipsis">{{ shop.name }}</h4>
                  <ul class="shop_detail_ul">
                    <li
                      class="supports"
                      v-for="(support, index) in shop.supports"
                      :key="index"
                    >
                      {{ support.icon_name }}
                    </li>
                  </ul>
                </section>
                <section class="shop_rating_order">
                  <section class="shop_rating_order_left">
                    <div class="star star-24">
                      <span class="star-item on"></span>
                      <span class="star-item on"></span>
                      <span class="star-item on"></span>
                      <span class="star-item half"></span>
                      <span class="star-item off"></span>
                    </div>
                    <div class="rating_section">{{ shop.rating }}</div>
                    <div class="order_section">
                      月售{{ shop.recent_order_num }}单
                    </div>
                  </section>
                  <section class="shop_rating_order_right">
                    <span class="delivery_style delivery_right">{{
                      shop.delivery_mode.text
                    }}</span>
                  </section>
                </section>
                <section class="shop_distance">
                  <p class="shop_delivery_msg">
                    <span>¥{{ shop.float_minimum_order_amount }}起送</span>
                    <span class="segmentation">/</span>
                    <span>{{ shop.piecewise_agent_fee.tips }}</span>
                  </p>
                </section>
              </div>
            </a>
          </router-link>
        </ul>
        <ul v-else>
          <li><img src="./images//shop_back.svg" alt="loading" /></li>
          <li><img src="./images//shop_back.svg" alt="loading" /></li>
          <li><img src="./images//shop_back.svg" alt="loading" /></li>
          <li><img src="./images//shop_back.svg" alt="loading" /></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script type='text/ecmascript-6'>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import { mapState } from "vuex";
// import _ from 'lodash'
import chunk from "lodash/chunk"; //按需引入

export default {
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState(["address", "categorys", "shops","user"]), //等同于：stateName(){return this.$store.state['stateName']}

    /* 
      根据一维数组生成二维数组
      包含所有分类的二维数组
      内部小组的长度最大是8
    */
    categorysArr() {
      const { categorys } = this;
      const bigArr = [];
      let smallArr = [];

      // 遍历一维数组
      categorys.forEach((category) => {
        //只遍历一次，创建二维数组
        if (smallArr.length === 0) {
          bigArr.push(smallArr);
        }
        smallArr.push(category);

        // 判断smallArr的长度是否为8
        if (smallArr.length === 8) {
          // 将samllArr清空，则遍历时又可创建一个数组
          smallArr = [];
        }
      });
      console.log(bigArr);
      return bigArr;
    },

    // 利用lodash库来将一维数组拆分为二维数组
    categorysArr2() {
      return chunk(this.categorys, 8);
    },
  },
  async mounted() {
    this.$store.dispatch("getShops")   // 此dispatch返回的promise在数据更新之后就成功了
    await this.$store.dispatch("getCategorys") // 此dispatch返回的promise在数据更新且界面更新才成功
    //轮播
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      //autoplay:true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
    })
  },
  watch: {
    /* 
     1. 更新数据
     2. 立即同步调用监视回调函数  
     3. 异步更新界面
    */
    /*     categorys(){  // 监视categorys值，一改变值 执行此函数 (此时还没有显示列表数据)

    // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
      this.$nextTick(() => {
        // 必须列表显示之后创建swiper对象轮播才正常
        new Swiper ('.swiper-container', {
          loop: true, // 循环模式选项
          //autoplay:true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
      })
    } */
  },
};
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }

    .shop_container {
      margin-bottom: 50px;

      .shop_list {
        .shop_li {
          bottom-border-1px(#f1f1f1);
          width: 100%;

          >a {
            clearFix();
            display: block;
            box-sizing: border-box;
            padding: 15px 8px;
            width: 100%;

            .shop_left {
              float: left;
              box-sizing: border-box;
              width: 23%;
              height: 75px;
              padding-right: 10px;

              .shop_img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .shop_right {
              float: right;
              width: 77%;

              .shop_detail_header {
                clearFix();
                width: 100%;

                .shop_title {
                  float: left;
                  width: 200px;
                  color: #333;
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 700;

                  &::before {
                    content: '品牌';
                    display: inline-block;
                    font-size: 11px;
                    line-height: 11px;
                    color: #333;
                    background-color: #ffd930;
                    padding: 2px 2px;
                    border-radius: 2px;
                    margin-right: 5px;
                  }
                }

                .shop_detail_ul {
                  float: right;
                  margin-top: 3px;

                  .supports {
                    float: left;
                    font-size: 10px;
                    color: #999;
                    border: 1px solid #f1f1f1;
                    padding: 0 2px;
                    border-radius: 2px;
                  }
                }
              }

              .shop_rating_order {
                clearFix();
                width: 100%;
                margin-top: 18px;
                margin-bottom: 8px;

                .shop_rating_order_left {
                  float: left;
                  color: #ff9a0d;

                  .star { // 2x图 3x图
                    float: left;
                    font-size: 0;

                    .star-item {
                      display: inline-block;
                      background-repeat: no-repeat;
                    }

                    &.star-48 {
                      .star-item {
                        width: 20px;
                        height: 20px;
                        margin-right: 22px;
                        background-size: 20px 20px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('./images/stars/star48_on');
                        }

                        &.half {
                          bg-image('./images/stars/star48_half');
                        }

                        &.off {
                          bg-image('./images/stars/star48_off');
                        }
                      }
                    }

                    &.star-36 {
                      .star-item {
                        width: 15px;
                        height: 15px;
                        margin-right: 6px;
                        background-size: 15px 15px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('./images/stars/star36_on');
                        }

                        &.half {
                          bg-image('./images/stars/star36_half');
                        }

                        &.off {
                          bg-image('./images/stars/star36_off');
                        }
                      }
                    }

                    &.star-24 {
                      .star-item {
                        width: 10px;
                        height: 10px;
                        margin-right: 3px;
                        background-size: 10px 10px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('./images/stars/star24_on');
                        }

                        &.half {
                          bg-image('./images/stars/star24_half');
                        }

                        &.off {
                          bg-image('./images/stars/star24_off');
                        }
                      }
                    }
                  }

                  .rating_section {
                    float: left;
                    font-size: 10px;
                    color: #ff6000;
                    margin-left: 4px;
                  }

                  .order_section {
                    float: left;
                    font-size: 10px;
                    color: #666;
                    transform: scale(0.8);
                  }
                }

                .shop_rating_order_right {
                  float: right;
                  font-size: 0;

                  .delivery_style {
                    transform-origin: 35px 0;
                    transform: scale(0.7);
                    display: inline-block;
                    font-size: 12px;
                    padding: 1px;
                    border-radius: 2px;
                  }

                  .delivery_left {
                    color: #fff;
                    margin-right: -10px;
                    background-color: #02a774;
                    border: 1px solid #02a774;
                  }

                  .delivery_right {
                    color: #02a774;
                    border: 1px solid #02a774;
                  }
                }
              }

              .shop_distance {
                clearFix();
                width: 100%;
                font-size: 12px;

                .shop_delivery_msg {
                  float: left;
                  transform-origin: 0;
                  transform: scale(0.9);
                  color: #666;
                }

                .segmentation {
                  color: #ccc;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
