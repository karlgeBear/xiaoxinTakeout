<template>
  <div>

    <router-view></router-view>
    <FooterGuide v-show="$route.meta.requiresAuth"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "components/FooterGuide/FooterGuide.vue";
import { mapActions } from 'vuex'
export default {
  // methods:{
  //   触发多个action，避免一个个dispatch
  //   ...mapActions(['getAddress','getCategorys','getShops'])
  // },
  mounted() {
    // 通知action异步获取address并保存到state
    this.$store.dispatch('getAddress')
  },
  components: {
    FooterGuide,
  },
};
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  *
    touch-action: none; /* 当触控事件发生在元素上时，不进行任何操作。 */
</style>
