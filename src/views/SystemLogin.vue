<template>
  <div style="margin: auto auto; display: flex; justify-content: center">
    <div>
      <img src="../assets/covid.png" style="width: 400px; height: 400px" />
    </div>
    <div>
      <div class="login-container">
        <el-link href="/"><h2>疫知通--防疫信息管理系统</h2></el-link>
        <h1>登录</h1>
        <el-form ref="loginForm" class="login-form" auto-complete="on">
          <!-- <el-form-item>
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.userId"
              placeholder="请输入用户ID"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item> -->
          <el-form-item>
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.userName"
              placeholder="请输入用户名"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              show-password
              prefix-icon="el-icon-s-goods"
              v-model="loginForm.passWord"
              placeholder="请输入密码"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click.native.prevent="goRegister">注册</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemLogin",
  data() {
    return {
      loginForm: {
        // userId:"123",
        userName: "admin",
        passWord: "12345678",
      },
      loading: false,
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
      this.loading = true;
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || "/Index" },()=> {});
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goRegister() {
      this.$router.push("/Register");
    },
  },
};
</script>

<style lang="scss" >
.login-container {
  overflow: auto;
  .login-form {
    position: relative;
    width: 300px;
    padding: 30px 30px 0;
    overflow: hidden;
  }
}
</style>
