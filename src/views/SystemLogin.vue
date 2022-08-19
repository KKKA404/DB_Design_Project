<template>
  <div class="login-wrap">
    <h2>疫知通--防疫信息管理系统</h2>
    <h1>登录</h1>
    <el-input
      placeholder="请输入用户名"
      v-model="loginForm.userName"
      clearable
    ></el-input>
    <el-input placeholder="请输入密码" v-model="loginForm.passWord" clearable>
    </el-input>
    <br />
    <router-link to="/Index"><h2>首页</h2></router-link>
    <br />
    <el-button type="primary" @click.native.prevent="handleLogin"
      >Login</el-button
    >
  </div>
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
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      // this.loading = true;
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || "/Index" });
          // this.loading = false;
        })
        .catch(() => {
          // this.loading = false;
        });
    },
  },
};
</script>

<style>
.login-wrap {
  width: 400px;
  height: 300px;
  margin: auto;
  padding-top: 10px;
  line-height: 40px;
}
</style>