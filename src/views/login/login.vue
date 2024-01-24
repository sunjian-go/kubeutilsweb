<template>
  <div class="login">
    <el-card class="login-card">
      <template #header>
        <div class="login-card-header">
          <span>用户登录</span>
        </div>
      </template>
      <div>
        <el-form :model="loginData" :rules="loginDataRules" ref="loginData">
          <el-form-item prop="username">
            <div style="width: 100%">
              <el-input
                prefix-icon="UserFilled"
                placeholder="请输入账号"
                v-model="loginData.username"
                style="height: 40px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div style="width: 100%">
              <el-input
                prefix-icon="Lock"
                placeholder="请输入密码"
                v-model="loginData.password"
                type="password"
                style="height: 40px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="result">
            <div style="width: 100%">
              <el-input
                v-model="loginData.result"
                style="width: 40%"
                placeholder="验证码，点击图片刷新"
                @keyup.enter="submitForm('loginDataRules')"
              ></el-input>
              <el-tag class="login-tag-code" @click="getcode">{{
                viewCode
              }}</el-tag>
            </div>
          </el-form-item>
        </el-form>
        <div></div>
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
import { authCode, login } from "@/api/user/user";
import Cookies from "js-cookie";
import moment from "moment";
import common from "../common/Config";
export default {
  data() {
    return {
      code: "",
      viewCode: "",
      // /加载等待动画
      loginLoading: false,
      //登录验证的后端接口
      loginUrl: common.loginAuth,
      loginData: {
        username: "",
        password: "",
        formula: "",
        result: "",
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
        result: [
          {
            required: true,
            message: "请填写验证码",
            trigger: "change",
          },
        ],
      },
      token: "",
      wshost: "",
      wsport: "",
    };
  },
  methods: {
    //后端获取验证码
    getcode() {
      this.viewCode=""
      authCode()
        .then((res) => {
          console.log("验证码：", res);
          this.viewCode = res.data;
        })
        .catch((_) => {
          this.$message.error({
            message: "服务不可用",
          });
        });
    },
    //校验账号密码
    submitForm(formName) {
      console.log(this.$refs[formName]);
      //验证表单的每个规则是否通过，通过则调用createDeployFunc，反之返回false
      this.$refs["loginData"].validate((valid) => {
        if (valid) {
          console.log("验证成功");
          this.handleLogin();
        } else {
          console.log("验证失败");
          return false;
        }
      });
    },
    //登录方法
    handleLogin() {
      console.log("准备登录：", this.loginData);
      this.loginData.formula = this.viewCode;
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
          console.log("token 获取：", Cookies.get("token"));
          // console.log("asasasas:",Cookies.get("host"),Cookies.get("port"))
          //跳转至根路径
          this.$router.push("/home");
          this.$message.success({
            message: res.msg,
          });
        })
        .catch((res) => {
          this.getcode();
          if (!res.err) {
            this.$message.error({
              message: "服务不可用",
            });
          } else {
            this.$message.error({
              message: res.err,
            });
          }
        });
    },
  },
  beforeMount() {
    //后端获取验证码
    this.getcode();
  },
  mounted() {
    this.getcode();
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
  /* top: 38%; */
  top: 360px;
  width: 450px;
  height: 320px;
  border-radius: 25px;
  background: rgb(255, 255, 255);
  overflow: hidden;
}
.login-card-header {
  text-align: center;
}
.loginBtn {
  width: 100%;
  text-align: center;
}
.div-title {
  padding-left: 50px;
  padding-top: 35px;
  font-size: 35px;
  font-weight: bold;

  color: black;
}
.login-tag-code {
  width: 50%;
  height: 32px;
  margin-left: 5px;
  width: 30%;
  font-size: 20px;
  font-weight: bold;
  font-family: "Comic Sans MS", cursive;
}
.login-tag-code:hover {
  cursor: pointer;
}
</style>
