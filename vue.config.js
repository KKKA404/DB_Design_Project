const { defineConfig } = require('@vue/cli-service')

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  // unset multiword check
  lintOnSave:false,
  // svg
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
})

// module.exports = {
//   devServer: {
//       port: 8080,//它是用来修改你打开后的端口号的
//       proxy:{
//           '/api':{
//               target:'https://view.inews.qq.com/',//跨域请求的公共地址
//               ws:false, //也可以忽略不写，不写不会影响跨域
//               changeOrigin:true, //是否开启跨域，值为 true 就是开启， false 不开启
//               pathRewrite:{
//                   '^/api':''//注册全局路径， 但是在你请求的时候前面需要加上 /api  
//               }
//           }
//       }
//   },

// }
