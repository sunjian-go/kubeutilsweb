import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";
import baseURL from "./baseURL"; //导入url变量

//新建axios对象
const httpClient = axios.create({
  baseURL, //不能写ip，只能写路由，否则打包后不会走代理（测试的话可以写ip加端口加路由）
  validateStatus(status) {
    return status >= 200 && status <= 504; //设置默认的合法的状态，若状态码不合法，则不会接收response
  },
  timeout: 10000,
});

httpClient.defaults.retry = 3; //请求重试次数
httpClient.defaults.retryDelay = 1000; //请求重试时间间隔
httpClient.defaults.shouldRetry = true; //是否重试

// 创建一个取消令牌
let cancelToken = axios.CancelToken;
let source = cancelToken.source();
let cancelFlag = false; //取消标志位

//添加请求拦截器
// 获取 token
httpClient.interceptors.request.use(
  (config) => {
    console.log("请求：",config.url)
    if (config.url.includes("login")) {
      //当请求拦截器发现是login请求时，首先取消标志位置为false
      cancelFlag = false;
      //重新创建取消token和source
      cancelToken = axios.CancelToken;
      source = cancelToken.source();
    }
    //给config.cancelToken添加source.token，可以使source.cancel()来取消本次请求
    config.cancelToken = source.token;
    // if (cancelFlag && !config.url.includes("authformula")) {
    if (cancelFlag) {
      console.log("取消该请求。。。", config.url);
      //取消该请求
      source.cancel();
    }

    console.log("后端地址为：", config.baseURL);
    //添加header
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept-Language"] = "zh-CN";
    // config.headers["Authorization"] = localStorage.getItem("token"); //可以全局设置接口请求header中带token
    if (!config.url.includes("login")) {
      config.headers["Authorization"] = Cookies.get("token");
    }
    //
    // config.headers["Name"] = "etan";
    console.log("准备请求token为：", config.headers["Authorization"]);
    if (config.method == "post") {
      if (!config.data) {
        // 没有参数时，config.data为null，需要转下类型
        config.data = {};
      }
    }
    console.log("请求: ", config);
    return config;
  },
  (err) => {
    //Promise.reject()方法返回一个带有拒绝原因的Promise对象，在F12的console中显示报错
    Promise.reject(err);
  }
);

// httpClient.interceptors.request.use(
//   (config) => {
//     console.log("debug_request: ", config.url);
//     //重新创建取消token和source
//     cancelToken = axios.CancelToken;
//     source = cancelToken.source();

//     //给config.cancelToken添加source.token，可以使source.cancel()来取消本次请求
//     config.cancelToken = source.token;
//     if (cancelFlag) {
//       if (config.url != "/login" && config.url != "/authformula") {
//         console.log("取消该请求。。。", config.url);
//         source.cancel();
//         // cancelFlag = false;
//       }
//     }

//     console.log("后端地址为：", config.baseURL);
//     //添加header
//     config.headers["Content-Type"] = "application/json";
//     config.headers["Accept-Language"] = "zh-CN";
//     // config.headers["Authorization"] = localStorage.getItem("token"); //可以全局设置接口请求header中带token
//     if (!config.url.includes("login")) {
//       config.headers["Authorization"] = Cookies.get("token");
//     }
//     //
//     // config.headers["Name"] = "etan";
//     console.log("准备请求token为：", config.headers["Authorization"]);
//     if (config.method == "post") {
//       if (!config.data) {
//         // 没有参数时，config.data为null，需要转下类型
//         config.data = {};
//       }
//     }
//     console.log("请求: ", config);
//     return config;
//   },
//   (err) => {
//     //Promise.reject()方法返回一个带有拒绝原因的Promise对象，在F12的console中显示报错
//     Promise.reject(err);
//   }
// );

//添加响应拦截器
httpClient.interceptors.response.use(
  (response) => {
    console.log("打印response: ", response);
    if (response.status !== 200) {
      console.log("请求失败，错误状态码：", response.status);
      console.log("错误信息：", response.data);
      for (let k in response.data) {
        if (k == "data") {
          //code等于10086代表token已过期
          if (response.data[k].code == 10086) {
            //将取消标志位置为true

            ElMessage(response.data.msg);
            router.push("/login");
            cancelFlag = true;
          }
        }
      }
      return Promise.reject(response.data); // 返回一个被拒绝的Promise，将错误信息传递给后续的错误处理
    } else {
      return response.data; // 返回处理后的响应数据
    }
  },
  (error) => {
    //当source.cancel发起取消请求的时候，会生成一个特定类型的错误对象。axios.isCancel() 方法用于检查给定的错误对象是否是由请求取消而引起的。
    if (axios.isCancel(error)) {
      // 取消请求的情况下，终端Promise调用链
      return new Promise(() => {}); //终止 Promise 调用链，表示不再进行任何请求或响应的操作了。通过返回一个立即解析的空 Promise，它告诉 Promise 调用链在这里终止，不再执行后续的操作。
    } else {
      console.log("请求发生错误：", error);
      return Promise.reject(error); // 返回一个被拒绝的Promise，将错误信息传递给后续的错误处理
    }
  }
);

export default httpClient;
