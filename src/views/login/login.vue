<template>
    <div class="login">
      <div class="div-title">
        <!-- <el-icon><ChromeFilled /></el-icon> -->
        <el-row>
          <!-- <el-col
            :span="1"
            style="
              padding-top: 5px;
              padding-right: 5px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
            ><el-icon style="color: #1256e7"><ChromeFilled /></el-icon
          ></el-col>
          <el-col :span="5"><span>KubeJump</span></el-col> -->
        </el-row>
      </div>
      <el-card class="login-card">
        <template #header>
          <div class="login-card-header">
            <span>用户登录</span>
          </div>
        </template>
        <div>
          <el-form :model="loginData" :rules="loginDataRules" ref="loginData">
            <el-form-item prop="username">
              <div style="width:100%">
                <el-input
                  prefix-icon="UserFilled"
                  placeholder="请输入账号"
                  v-model="loginData.username"
                  style="height: 40px"
                  
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div style="width:100%;padding-top: 10px;">
                <el-input
                  prefix-icon="Lock"
                  placeholder="请输入密码"
                  v-model="loginData.password"
                  type="password"
                  style="height: 40px"
                  
                  @keyup.enter="submitForm('loginDataRules')"
                ></el-input>
              </div>
            </el-form-item>
          </el-form>
          <div>
            <div class="loginBtn">
                  <el-button
                    type="primary"
                    style="width: 100%; height: 40px"                           
                    @click="submitForm('loginDataRules')"
                    >登录</el-button
                  >
            </div>
          </div>
        </div>
        
      </el-card>
    </div>
  </template>
  
  <script>
  import { login } from "@/api/user/user";
import Cookies from "js-cookie";
import moment from "moment";
import common from "../common/Config";
  export default {
    data() {
      return {
        // /加载等待动画
        loginLoading: false,
        //登录验证的后端接口
        loginUrl: common.loginAuth,
        loginData: {
          username: "",
          password: "",
        },
        loginDataRules: {
          username: [
            {
              required: true,
              message: "请填写用户名",
              trigger: "change",
            },
          ],
          password: [
            {
              required: true,
              message: "请填写密码",
              trigger: "change",
            },
          ],
        },
        token: "",
        wshost: "",
        wsport:"",
      };
    },
    methods: {
      //校验账号密码
      submitForm(formName) {
        console.log(this.$refs[formName])
        //验证表单的每个规则是否通过，通过则调用createDeployFunc，反之返回false
        this.$refs['loginData'].validate((valid) => {
          if (valid) {
            console.log("验证成功")
            this.handleLogin();
          } else {
            console.log("验证失败")
            return false;
          }
        });
      },
      //登录方法
      handleLogin() {
        console.log("准备登录：", this.loginData);
        login(this.loginData)
          .then((res) => {
            console.log("登陆成功了");
            //账号密码校验成功后的一系列操作
            localStorage.setItem("username", this.loginData.username);
            localStorage.setItem(
              "loginDate",
              moment().format("YYYY-MM-DDHH:mm:ss")
            );
            //从后端拿到token和websocket的地址
            this.token = res.token;
            this.wshost = res.host;
            this.wsport = res.port;
            console.log("拿到的token为：", this.token);
            console.log("拿到的ip为：", this.wshost);
            console.log("拿到的wsport为：", this.wsport);

            // 存储 token和websocket的地址
            Cookies.set("token", this.token);
            Cookies.set("host", this.wshost);
            Cookies.set("port", this.wsport);
            console.log("token 获取：",Cookies.get("token"))
            // console.log("asasasas:",Cookies.get("host"),Cookies.get("port"))
            //跳转至根路径
            this.$router.push("/home");
            this.$message.success({
              message: res.msg,
            });
          })
          .catch((res) => {
            this.$message.error({
              message: "账号或密码错误",
            });
          });
      },
    },
  };
  </script>
  <style>
  .login {
    position: absolute; /*将该元素的定位方式设置为绝对定位，使其相对于其最近的已定位父元素进行定位。*/
    width: 100%;
    height: 100%;
    background: aquamarine;
    background-image: url(../../assets/img/login2.jpg);
    background-size: 100%; /*将背景图片的尺寸设置为100%，使其填充整个元素的背景区域*/
  }
  .login-card {
    position: absolute;
    left: 65%;
    top: 40%;
    width: 450px;
    height: 300px;
    border-radius: 25px;
    background: rgb(255, 255, 255);
    overflow: hidden;
  }
  .login-card-header {
    text-align: center;
  }
  .loginBtn {
    width: 100%;
    padding-top: 10px;
    text-align: center;
  }
  .div-title {
    padding-left: 50px;
    padding-top: 35px;
    font-size: 35px;
    font-weight: bold;
  
    color: black;
  }
  </style>
  