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
          this.$router.push("/Index");
        // })
        // .catch(() => {});
      console.log("login successfully");
    },
  },
};
</script>