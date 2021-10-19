<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">小新外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:isShowSms}" @click="isShowSms = true">短信登录</a>
            <a href="javascript:;" :class="{on:!isShowSms}" @click="isShowSms = false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:isShowSms}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button 
                :disabled="!isRightPone" class="get_verification" 
                :class="{right_phone_number:isRightPone}" 
                @click.prevent="getCode()" 
                v-show="codeText">获取验证码</button>
                <button disabled="disabled" class="get_verification" v-show="!codeText">请{{computeTime}}s后再获取</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码"  v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册小新外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!isShowSms}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input :type="isShowPwd ? 'text': 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                  <div class="switch_button" :class="isShowPwd ? 'on':'off'" @click="isShowPwd = !isShowPwd">
                    <div class="switch_circle" :class="{right:isShowPwd}"></div>
                    <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="/api/captcha" alt="captcha" @click="changeCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
            <alert-tip v-if="alertShow" :alertText="alertText" @closeTip="closeTip"/>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.replace('/profile')">
          <i class="iconfont icon-fanhui"></i>
        </a>
      </div>
    </section>
    
</template>

<script type='text/ecmascript-6'>
import { reSendCode,reqSmsLogin,reqPwdLogin } from '../../api'
import alertTip from '../../components/alertTip/alertTip.vue'
export default {
  name:'Login',
  components: {
    alertTip,
  },
  data () {
    return {
      isShowSms: true, //true：显示短信登入界面 ，false：显示密码登入界面
      phone:'',
      isShowPwd:false,   //判断密码是否显示
      code: '',  //短信验证码
      codeText: true, 
      name: '', //用户名
      pwd: '', // 密码
      captcha: '', // 图片验证码
      computeTime: 0, //计时时间
      alertText: '', // 提示框文本
      alertShow: false, //是否显示提示框
    }
  },
  computed:{
    // 验证手机号是否为十位
    isRightPone(){
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods:{
    // 点击短信验证码异步发送短信
    async getCode(){
      // 倒计时再发送手机验证码
      if (this.isRightPone) { // 输入了合法的手机号
        // 开始倒计时
        this.computeTime = 60
        // 启动循环定时器, 每隔1s减少1
        const intervalId = setInterval(() => {
          this.computeTime--
          //如果到时, 停止计时
          if (this.computeTime === 0) {
            clearInterval(intervalId)
            this.codeText = true
          }
        }, 1000)
      }
      // 发送手机验证码
      const result = await reSendCode(this.phone)
      if (result.code === 0){
        this.codeText = false
        //this.isRightPone = false
        //this.phone = ''
      }
      //if (result.code === 0)
    },

    //更新图形验证码
    changeCaptcha(event){
      event.target.src = '/api/captcha?time=' + new Date()
    },

    //登录
    async login(){
      // 手机密码登录
       //输入格式验证
      if (this.isShowSms){
        let {isRightPone, phone, code } = this
        if(!isRightPone){
          this.alertShow = true
          this.alertText = '手机号码格式错误'
          return  //结束程序向下执行
        }else if(!/^\d{6}$/.test(code)){
          this.alertShow = true
          this.alertText = '验证码输入错误'
          return
        }
        // 提交登入请求
        let result = await reqSmsLogin(phone,code)
      }else {  // 用户密码登录
        let { name, pwd, captcha} = this
        //用户输入格式验证
        if (!name){
          console.log(112)
          this.alertShow = true
          this.alertText = '请输入用户名'
          return
        }else if(!/^\d{8}$/.test(pwd)){
          this.alertShow = true
          this.alertText = '请输入密码'
          return
        }else if(!/^[0-9a-z]{4}$/.test(captcha)){
          this.alertShow = true
          this.alertText = '请输入图片对应的的验证码'
          return
        }
        // 提交登录请求
        //{"code":0,"data":{"_id":"616d1a12ad711d1c1c1c8d22","name":"test2","token":"e。。。。。。"}}
        let result = await reqPwdLogin({ name, pwd, captcha })

        if (result.code === 0){
          // 得到用户信息
          const userinfo = result.data
          console.log(userinfo)
          // 将userinfo保存到state中
          this.$store.dispatch('recordUser',userinfo)
          // 回退
          this.$router.back()
        }else {
          this.alertShow = true
          this.alertText = result.msg
        }
      }
    },

    // 关闭提示框
    closeTip () {
        this.alertShow = false
    }
  }
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixins.styl';
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone_number
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
