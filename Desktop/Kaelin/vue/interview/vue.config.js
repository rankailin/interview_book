// 项目根目录中创建了`vue.config.js`
// const path = require('path');
// 导包
const autoprefixer = require('autoprefixer');
// 导包
const pxtorem = require('postcss-pxtorem');
// 暴露出去
module.exports = {
  publicPath: './',
  // 插件配置
  // css属性如何处理
  css: {
    // 处理的选项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // 使用 pxtorem库进行转换
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
          }),
        ],
      },
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `
                  @import "@/style/global.scss";
        `,
      },
    },
  },
  devServer: {

    proxy: {

      '/api': {

        target: 'https://www.meituan.com/ptapi/getprovincecityinfo/',

        changOrigin: true,

        pathRewrite: {

          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时

            实际上访问的地址是：https://www.meituan.com/ptapi/getprovincecityinfo,因为重写了 /api

          */

          '^/api': '',

        },

      },

    },

  },
};
