const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    host: "0.0.0.0", //监听地址
    port: 8080, // 启动端口号
    open: true, // 启动后是否自动打开网页
  },
  transpileDependencies: true,
  //关闭语法检测
  lintOnSave: false,
});
