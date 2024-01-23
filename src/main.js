import { createApp } from "vue";
//引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//引入图标视图
import * as ELIcons from "@element-plus/icons-vue";
//引入APP.vue主组件
import App from "./App.vue";
//引入路由配置及规则
import VueClipboard from 'vue-clipboard2';
import router from "./router";

//创建vue实例
const app = createApp(App);
//将图标注册为全局组件
for (let iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName]);
}
//引入element plus
app.use(ElementPlus);
//引入路由
app.use(router);
app.use(VueClipboard);

const debounce = (fn, delay) => {
    let timer = null;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  };
  const _ResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
      callback = debounce(callback, 16);
      super(callback);
    }
  };

//挂载
app.mount("#app");
