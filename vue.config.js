const path = require('path')
const px2rem = require('postcss-px2rem') //postcss的一个插件
 

module.exports = { // 只能写vue封装的配置
  //runtimeCompiler: true, //配置vue带编译器的版本
  //lintOnSave: false, // 关闭Eslint规则
  publicPath:"./", //用法和webpack本身的output.publickPath用法一致

  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 37.5  //设计稿等分后的rem值 375/10
          })
        ]
      }
    }
  },
  configureWebpack: { // 内部写webpack原生配置
    resolve: {
      /* 
      1.简化模块路径
      2.加快打包速度
      */
      extensions: ['.js', '.vue', 'json'], //指定那些后缀的模块可以省略后缀
      alias: { //模块路径别名
        '@': path.resolve(__dirname, 'src'),
        //'vue$': 'vue/dist/vue.esm.js',  //表示精准匹配  带vue编译器
        'components': path.resolve(__dirname, 'src/components'),
      }
    }
  }

}