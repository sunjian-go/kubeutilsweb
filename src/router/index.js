//导入router的路由模式
import { createRouter, createWebHistory } from "vue-router";
//直接导入布局页面
import Layout from "@/layout/layout.vue";

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
        icon: "ChromeFilled", //图标
        meta: { title: "集群", requireAuth: true },
        component: () => import("@/views/home/Home.vue"), //视图组件
      },
    ],
  },
  {
    path: "/utils",
    name: "操作对象",
    component: Layout,
    icon: "Orange",
    children: [
      //配置子页面
      {
        path: "/node", //视图,访问子页面的时候会带上layout布局页面
        name: "节点",
        icon: "odometer", //图标
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

//抛出路由实例，在main.js中引用
export default router;
