# xiaoxintakeout
## 下载了相关依赖
0. vuex、vue-router、mint-ui
1. 自动计算rem：yarn add lib-flexible postcss-px2rem -D
2. css预编译：yarn add stylus stylus-loader -D
3. 轮播: yarn add swiper
    ```
    轮播不正常显示
        原因：// 必须数据列表显示之后创建swiper对象轮播才正常(数据同步更新，界面异步更新，而new swiper()是立即同步调用监视回调函数，同步执行的,)
        解决方案：
            方式1：watch + nextTick()
            方式2：callback + nextTick()
            方式3(首选)：利用dispatch返回的promise  ==》 dispatch返回的Promise在数据更新且界面更新之后才成功
    ```
4. 实现按需引入：yarn add babel-plugin-component -D
5. 生成随机数据，拦截 Ajax 请求：yarn add mockjs
## 引入了相关的库
- 解决点击响应0.3s延时问题
    https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js
- 在页面中引入在线的iconfont样式
## 使用自带库
1. lodash: 一个 JavaScript 的实用工具库, 表现一致性, 模块化, 高性能, 以及 可扩展

