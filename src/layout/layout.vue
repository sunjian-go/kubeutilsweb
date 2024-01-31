<template>
    <div class="common-layout">
      <!-- container整体布局 -->
      <el-container style="height: 100vh">
        <!-- 侧边栏，定义默认宽度 -->
        <el-aside :width="asideWidth" class="aside" :style="dynamicStyle">
          <!-- 固钉，将平台logo和名字固钉在侧边栏最上方 -->
          <!-- z-index是显示优先级 -->
          <el-affix class="aside-affix" :z-index="1200">
            <div class="aside-logo">
              <!-- logo图片 -->
              <el-image class="logo-img" :src="logo" />
              <!-- 平台名，折叠后不显示 -->
              <span :class="[isCollapse ? 'is-collapse' : '']"></span>
              <span
                :style="dynamicFontStyle"
                class="logo-name"
                v-show="!isCollapse"
                >KubeUtils</span
              >
            </div>
          </el-affix>
          <!-- 菜单导航栏 -->
          <!-- router 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
          <!-- default-active 默认激活的菜单栏,根据打开的path来找到对应的栏 -->
          <!-- collapse 是否折叠 ;background-color="#131b27"-->
          <!-- active-text-color="#20a0ff" -->
          <!-- text-color="#bfcbd9" 控制el-submenu的下箭头颜色 -->
          <!-- :default-active="$route.path" -->
          <el-menu
            :style="dynamicStyle"
            class="aside-menu"
            router
            :default-active="defaultActive"
            :collapse="isCollapse"
            background-color="color"
            text-color="#bfcbd9"
          >
            <!-- for循环路由规则，routers就是router/index.js中的routers -->
            <div v-for="m in routers" :key="m" style="padding-left: 10px;padding-right: 10px;padding-top: 2px;">
              <!-- 第一种情况：路由规则children只有1个的菜单栏 -->
              <!--v-if判断：m.children表示有这个children，并且children长度为1，也就是只有一个子路由的情况下-->
              <!--index表示点击该路由时跳转到的页面-->
              <el-menu-item
                class="aside-menu-item"
                style="height: 50px;"
                v-if="m.children && m.children.length == 1"
                :index="m.children[0].path"
              >
                <!-- 处理图标和菜单栏的名字 -->
                <el-icon
                  ><component :is="m.children[0].icon"></component
                ></el-icon>
                <!--下面的template是一个插槽，插槽名字是title-->
                <template #title>
                  <!--这个m.children[0].name就是index.js里面的‘概要’路由，目前只有它有一个子路由-->
                  <span :style="dynamicFontStyle">{{ m.children[0].name }}</span>
                </template>
              </el-menu-item>
  
              <!-- 第二种情况：路由规则children大于1个的菜单栏 -->
              <!-- 注意el-menu-item在折叠后，title的部分会自动消失，但el-sub-menu不会，需要自己控制 -->
              <!--处理父菜单栏-->
              <el-sub-menu
                class="aside-submenu"
                v-if="m.children && m.children.length > 1"
                :index="m.path"
              >
                <!--添加到模板中的元素，只有加上#元素名才会显示模板中的内容-->
                <template #title>
                  <el-icon><component :is="m.icon" /></el-icon>
                  <!--如果isCollapse为true,则将is-collapse作为class的值赋给元素的class属性，反之则赋值一个空字符串给元素的class属性-->
                  <span
                    :class="[isCollapse ? 'is-collapse' : '']"
                    v-show="!isCollapse"
                    :style="dynamicFontStyle"
                  >
                    <!--下面m.name就是index.js里面的工作负载路由的name-->
                    {{ m.name }}</span
                  >
                </template>
                <!--处理子菜单栏-->
                <div v-for="child in m.children" :key="child" style="padding-top: 2px;">
                  <el-menu-item
                    v-if="child.meta.showStatus!=false"
                    class="aside-menu-childitem"
                    :style="dynamicFontStyle"
                    :index="child.path"                  
                  >
                    <template #title >
                      <el-icon style="margin-left: 10px;"><component :is="child.icon"/></el-icon>
                      <!--下面child.name就是index.js里面工作负载的所有子路由的name-->
                      {{ child.name }}
                    </template>
                  </el-menu-item>
                </div>
              </el-sub-menu>
            </div>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header class="header">
            <!-- 使用了 Element UI 的栅格布局（el-row和el-col）来创建一个具有列间距的行。
              :gutter="20"表示设置列（el-col）之间的间距为20像素;
              :span="1"，表示该列占据一等分的宽度。一行中总共24等分 -->
            <el-row :gutter="20">
              <!-- 折叠按钮 -->
              <el-col :span="1">
                <div class="header-collapse" @click="onCollapse">
                  <!-- :is="isCollapse ? 'expand' : 'fold'" 表示当isCollapse为true时为展开，设置相应图标，反之也是 -->
                  <el-icon
                    ><component :is="isCollapse ? 'expand' : 'fold'"
                  /></el-icon>
                </div>
              </el-col>
              <!-- 配置面包屑 -->
              <el-col :span="10">
                <div class="header-breadcrumb">
                  <!-- el-breadcrumb面包屑 : 就是横着排列的一级一级的路径，随着点击设置的el-breadcrumb-item而路径发生变化-->
                  <!-- separator用来配置分隔路径的符号 -->
                  <el-breadcrumb separator="/">
                    <!-- 最外层的工作台（写死）；:to="{ path: '/' }"表示点击该元素时跳转到/home路径 -->
                    <el-breadcrumb-item :to="{ path: '/home' }"
                      >工作台</el-breadcrumb-item
                    >
                    <!-- this.$route.matched固定写法，可以在其循环出路由规则中的父name和子name -->
                    <template v-for="(path, i) in this.$route.matched" :key="i">
                      <el-breadcrumb-item v-if="path.name != undefined">{{
                        path.name
                      }}</el-breadcrumb-item>
                    </template>
                  </el-breadcrumb>
                </div>
              </el-col>
              <!-- 用户信息 -->
              <el-col class="header-menu" :span="13">
                <!-- el-dropdown是一个下拉菜单 -->
                <el-dropdown>
                  <div class="header-dropdown">
                    <el-image class="avator-image" :src="avator" />
                    <!-- getUsername是script里面computed下面的获取username的函数，会返回用户名的值 -->
                    <span>{{ getUsername }}</span>
                  </div>
                  <!-- 下拉框内容 ,放在模板中-->
                  <!-- 通过 #dropdown 来使用这个模板，将下拉菜单插入到相应的位置。 -->
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="updatePwd()">修改密码</el-dropdown-item>
                      <el-dropdown-item @click="colorStatus = false"
                        >设置</el-dropdown-item
                      >
                      <el-dropdown-item @click="logout()">退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-header>
          <el-main class="main"><router-view></router-view></el-main>
          <el-footer>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 20px;
                font-size: 14px;
              "
            >
              <!-- 图片 -->
              <el-icon style="color: darkgray; margin-right: 5px"
                ><Place
              /></el-icon>
              <!-- 说明 -->
              <span style="color: darkgray; margin-left: 5px">
                2024 devops kubeutils</span
              >
            </div>
          </el-footer>
        </el-container>
      </el-container>
      <div>
        <el-dialog title="设置背景色" v-model="colorStatus" width="20%" top="5%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="设置背景色" name="first">
              <el-row>
                <el-col :span="24" style="display: flex; justify-content: left">
                  <span
                    style="display: flex; align-items: center; font-size: 16px"
                    >选择背景色:
                  </span>
                  <div class="block" style="padding-left: 10px">
                    <el-color-picker v-model="backgroundColor"></el-color-picker>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="设置字体颜色" name="second">
              <el-row>
                <el-col :span="24" style="display: flex; justify-content: left">
                  <span
                    style="display: flex; align-items: center; font-size: 16px"
                    >选择字体颜色:
                  </span>
                  <div class="block" style="padding-left: 10px">
                    <el-color-picker v-model="fontColor"></el-color-picker>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="colorStatus = false">取 消</el-button>
              <el-button type="primary" @click="updateColor">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
// import { updateColorReq } from "@/api/style/style";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
// import common from "../views/common/Config";
  
  export default {
    data() {
      return {
        defaultActive:"",
        //导入logo图片
        logo: require("@/assets/img/k8s-metrics.png"),
        avator: require("@/assets/img/avator.png"),
        //控制导航栏折叠，true是收起，false是展开
        isCollapse: false,
        asideWidth: "220px",
        //路由规则
        routers: [],
        colorStatus: false,
        backgroundColor: "#253454",
        fontColor: "",
        activeName: "first",
        // getColorData: {
        //   url: common.GetColor,
        // },
        // updateColorData: {
        //   url: common.UpdateColor,
        //   body: {
        //     background: "",
        //     color: "",
        //   },
        // },
        pathFlag:0
      };
    },
    watch: {
      '$route': {
        handler(newRoute) {
          const newPath = newRoute.path;
          console.log("路由发生变化，新的路径：", newPath);
          // 在这里可以检查 $route.path 是否有变化
          if(newPath=='/home' && sessionStorage.getItem('flag')!=1){   //sessionStorage.getItem('flag')!=1,表示只有第一次跳转该页面的时候flag才会不等于1，只要跳转过一次，那么后面都会等于1
            this.defaultActive=""
            sessionStorage.setItem('flag', 1); 
            // sessionStorage.setItem('path', '/home'); 
          }else if (this.defaultActive !== newPath && newPath != '/workload/create') {
              // $route.path 发生变化
              this.defaultActive = newPath;
              // 保存路径到 sessionStorage (存储在 sessionStorage 里面的数据在页面会话结束时会被清除)
              sessionStorage.setItem('path', this.defaultActive); 
          }else{
            //由于刷新页面后，子菜单没有/workload/create这一项，没有选中状态，所以直接读取刷新页面之前的path值即可解决
            this.defaultActive=sessionStorage.getItem('path');
          }
        },
        immediate: true, // 立即执行一次，捕获初始值
        deep: true
      }
    },
    // computed里面：当值改变了，会自动重新获取该值
    computed: {
      getUsername() {
        let username = localStorage.getItem("username");
        return username ? username : "unknow";
      },
      //设置背景色和字体颜色，值为自定义颜色，使用方法：<div :style="dynamicStyle">
      //背景色
      dynamicStyle() {
        return {
          background: this.backgroundColor,
          // 其他样式属性...
        };
      },
      //字体颜色
      dynamicFontStyle() {
        return {
          color: this.fontColor,
          // 其他样式属性...
        };
      },
    },
    //加载页面之前的操作
    beforeMount() {
      //使用useRouter().options.routes方法获取index.js里的路由规则
      this.routers = useRouter().options.routes;
    },
    methods: {
      updatePwd(){
        this.$message.info({
          message:"抱歉，改不了"
        })
      },
      //控制折叠
      onCollapse() {
        // document.documentElement.style.setProperty("--my-variable", "#6c038b");
        // 当前状态是收起，点击后展开
        if (this.isCollapse) {
          this.asideWidth = "220px";
          this.isCollapse = false;
        } else {
          this.isCollapse = true;
          this.asideWidth = "64px";
        }
      },
      logout() {
        this.$confirm("是否退出？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            //移除用户名
            localStorage.removeItem("username");
            //清除集群
            Cookies.set("cluName","undefined")
            //移除token
            Cookies.remove("token");
            this.$message({
              type: "success",
              message: "已退出!",
            });
            sessionStorage.setItem('flag', 0);
            //跳转至/login页面
            this.$router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消退出",
            });
          });
      },
      //更新背景色
    //   updateColor() {
    //     this.updateColorData.body.background = this.backgroundColor;
    //     this.updateColorData.body.color = this.fontColor;
    //     updateColorReq(this.updateColorData.body)
    //       .then((res) => {
    //         this.$message.success({
    //           message: res.msg,
    //         });
    //         this.getColorForServer();
    //       })
    //       .catch((res) => {
    //         this.$message.info({
    //           message: res.err,
    //         });
    //       });
    //     this.colorStatus = false;
    //   },
      //从后端获取颜色
    //   getColorForServer() {
    //     // getColorReq()
    //     //   .then((res) => {
    //     //     console.log("获取到颜色为：", res.data);
    //     //     //成功获取到的话就更新颜色为最新，反之不变
    //     //     this.backgroundColor = res.data.background;
    //     //     this.fontColor = res.data.color;
    //     //   })
    //     //   .catch((res) => {
    //     //     console.log("报错为：", res.err);
    //         this.backgroundColor = "#253454";
    //         this.fontColor = "#EEEEEE";
    //     //   });
    //   },
    },
  };
  </script>
  
  <style scoped>
  /* el-header的属性 */
  .header {
    z-index: 1200; /* 较高的 z-index 值表示元素在层叠顺序中的层级较高，会位于其他具有较低 z-index 值的元素之上。 */
    line-height: 60px;
    font-size: 24px; /*图标调整大小用这个 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); /*边框阴影*/
  }
  /* 折叠按钮 */
  .header-collapse {
    cursor: pointer; /*鼠标悬停 */
  }
  /* 面包屑 */
  .header-breadcrumb {
    padding-top: 0.9em;
  }
  .header-menu {
    text-align: right;
  }
  .header-dropdown {
    line-height: 60px;
    cursor: pointer; /*将光标样式设置为指针，表示在该元素上悬停时会显示为手型图标。 */
  }
  .avator-image {
    top: 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
  }
  /* 侧边栏折叠速度，背景色 */
  .aside {
    transition: all 0.5s; /*折叠菜单栏的速度 */
  }
  /* 修整边框，让边框不要有溢出 */
  .aside-affix {
    border-buttom-width: 0;
  }
  .aside-menu {
    border-right-width: 0;
  }
  
  /* 固钉，以及logo图片和平台名的属性 */
  .aside-logo {
    height: 60px;
    color: white;
  }
  .logo-img {
    width: 45px;
    height: 40px;
    top: 12px;
    padding-left: 12px;
  }
  .logo-name {
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
  }
  
  .aside-menu-item {
    padding-left: 20px !important; /* 被标记为!important时，它的优先级会高于其他样式规则 */
    border-radius: 10px
  }
  
  .aside-sub-menu {
    padding-left: 20px !important;
    border-radius: 10px
  }
  .aside-menu-childitem {
    padding-left: 20px !important;
    border-radius: 10px
  }
  .font-color {
    color: white;
  }
  /* main属性 */
  .main {
    padding: 10px; /*4个内边距都为10px */
  }
  
  .el-menu-item.is-active {
      background-color: #204e94;   /*el-menu-item被激活时的颜色 */
  }
  .el-menu-item:hover {
      background-color: #204e94;   /*el-menu-item鼠标悬停的颜色 */
  }
  ::v-deep .el-sub-menu__title:hover {   /*::v-deep穿透，穿透到el-sub-menu的样式里面修改*/
      background-color: transparent;
  }
  
  </style>
  