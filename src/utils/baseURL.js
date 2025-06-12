let baseURL = "";
// 线上环境打包URL
if (process.env.NODE_ENV == "production") {
  baseURL = "/api";
} else {
  // 测试环境URL
    baseURL = "http://1.2.1.1:8999/api";
  // baseURL = "http://1.2.2.2:31899/api";
}
export default baseURL; //将该变量暴露出去
