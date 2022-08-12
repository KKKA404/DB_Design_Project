<template>
  <el-main>
    <el-input
      placeholder="请输入用户名"
      v-model="loginForm.userName"
      clearable
    ></el-input>
    <el-input placeholder="请输入密码" v-model="loginForm.passWord" clearable>
    </el-input>
    <router-link to="/Index">前往首页</router-link>
    <el-button type="primary" @click.native.prevent="handleLogin"
      >Login</el-button
    >
  </el-main>
</template>

<script>
import service from "@/plugins/axios";

export default {
  name: "SystemLogin",
  data() {
    return {
      loginForm: {
        userName: "admin",
        passWord: "12345678",
      },
    };
  },
  methods: {
    handleLogin() {
      // this.$store
      //   .dispatch("user/login", this.loginForm)
      //   .then(() => {
        console.log(this.loginForm)
      service.post("/user/login", this.loginForm).then((res) => {
      // service.post("/user/login", JSON.stringify({userName:"admin",passWord:"12345678"}) ).then((res) => {
        console.log(res);
        if (res.data.code == 20000) {
          this.$message({
            showClose: true,
            message: "登录成功",
            type: "success",
          });
          this.$router.push("/Index");
        } else {
          this.$message({
            showClose: true,
            message: "登录失败",
            type: "error",
          });
        }
      });
      // })
      // .catch(() => {});
    },
  },
};
</script>