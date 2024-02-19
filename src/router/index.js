//导入router的路由模式
import { createRouter, createWebHistory } from "vue-router";
//直接导入布局页面
import Layout from "@/layout/layout.vue";
//导入进度条组件
import Cookies from "js-cookie";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//路由规则
const routes = [
  {
    path: "/",
    redirect: "/login", // 设置默认重定向到login页面
  },
  {
    path: "/login", //视图
    icon: "el-icon-unlock", //图标
    meta: { title: "login", requireAuth: true }, //定义meta元数据
    component: () => import("@/views/login/login.vue"), //视图组件
  },
  {
    path: "/home",
    component: Layout,
    icon: "odometer",
    children: [
      //配置子页面
      {
        path: "/home", //视图,访问子页面的时候会带上layout布局页面
        name: "集群",
        icon: "Orange", //图标
        meta: { title: "集群", requireAuth: true },
        component: () => import("@/views/home/Home.vue"), //视图组件
      },
    ],
  },
  {
    path: "/utils",
    name: "操作对象",
    component: Layout,
    icon: "ChromeFilled",
    children: [
      //配置子页面
      {
        path: "/node", //视图,访问子页面的时候会带上layout布局页面
        name: "节点",
        icon: "Coin", //图标
        meta: { title: "节点", requireAuth: true },
        component: () => import("@/views/node/node.vue"), //视图组件
      },
      {
        path: "/pod", //视图,访问子页面的时候会带上layout布局页面
        name: "Pod",
        icon: "Watermelon", //图标
        meta: { title: "Pod", requireAuth: true },
        component: () => import("@/views/pod/Pod.vue"), //视图组件
      },
    ],
  },
];

//创建路由实例
const router = createRouter({
  //hash模式：createWebHashHistory
  //history模式：createWebHistory
  history: createWebHistory(),
  routes,
});

//递增进度条，这将获取当前状态值并添加0.2直到状态为0.994
//NProgress.inc(100);
NProgress.inc(0.2);

//easing 动画字符串; speed 动画速度; showSpinner 进度环显示隐藏
NProgress.configure({ easing: "ease", speed: 600, showSpinner: false });

//router.beforeEach（）一般用来做一些进入页面的限制。比如没有登录，就不能进入某些页面，只有登录了之后才有权限查看某些页面。。。说白了就是路由拦截。
//to 要去到某个页面的属性; from 从哪个页面来的属性; next 处理路由跳转及放行
router.beforeEach((to, from, next) => {
  // 启动进度条
  NProgress.start();
  // 设置头部
  // console.log("头部", to.meta.title);
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "KubeUtils";
  }

  // console.log("to", to.path);
  if (to.path != "/" && to.path != "/login") {
    let token = Cookies.get("token");
    // console.log("flag", flag);
    if (token == "" || token == null) {
      console.log("开始跳转路由");
      // 如果路由需要登录权限且用户未登录，则重定向到登录页面
      next({
        path: "/login",
      });
    } else {
      // 如果用户已登录或路由不需要登录权限，则允许访问
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from, next) => {
  // 关闭进度条
  NProgress.done();
});

//抛出路由实例，在main.js中引用
export default router;
