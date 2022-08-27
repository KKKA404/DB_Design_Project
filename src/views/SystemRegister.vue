<template>
  <div style="margin: auto auto; display: flex; justify-content: center">
    <div>
      <img src="../assets/covid.png" style="width: 400px; height: 400px" />
    </div>
    <div>
      <div class="register-container">
        <el-link href="/"><h2>疫知通--防疫信息管理系统</h2></el-link>
        <h1>注册</h1>
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          class="register-form"
          auto-complete="on"
        >
          <el-form-item prop="userName">
            <el-input
              ref="userName"
              prefix-icon="el-icon-user-solid"
              v-model="registerForm.userName"
              placeholder="请输入用户名"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model.number="registerForm.age"
              placeholder="请输入年龄"
              tabindex="2"
            />
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="registerForm.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              ref="passWord"
              show-password
              prefix-icon="el-icon-s-goods"
              v-model="registerForm.passWord"
              placeholder="请输入密码（长度大于8位）"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              show-password
              prefix-icon="el-icon-check"
              v-model="repeatPassWord"
              placeholder="请再次输入密码"
              tabindex="3"
              auto-complete="on"
              @keyup.enter.native="handleRegister"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click.native.prevent="goLogin"
          >首页</el-button
        >
        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="validateRegister"
          >注册</el-button
        >
        <el-popover
          ref="popover"
          trigger="manual"
          v-model="visible"
          placement="top-start"
        >
          <div class="sliding-pictures">
            <Verify
              ref="verifyImg"
              @closePupUp="closePupUp"
              @register="handleRegister"
            />
            <div class="operation">
              <span
                title="关闭验证码"
                @click="closePupUp"
                class="el-icon-circle-close"
              ></span>
              <span
                title="刷新验证码"
                @click="canvasInit"
                class="el-icon-refresh-left"
              ></span>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from "@/components/Verify.vue";

export default {
  name: "SystemRegister",
  components: {
    Verify,
  },
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      } else {
        callback();
      }
    };
    const validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else if (value.length < 8) {
        callback(new Error("密码长度必须大于8位！"));
      } else if (value != this.repeatPassWord) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
    };
    return {
      repeatPassWord: "",
      registerForm: {
        userName: "",
        passWord: "",
        gender: -1,
        phoneNumber: "",
        age: "",
      },
      registerRules: {
        userName: [
          { required: true, trigger: "blur", validator: validateUserName },
        ],
        passWord: [
          { required: true, trigger: "blur", validator: validatePassWord },
        ],
      },
      loading: false,
      visible: false,
      puzzle: false,
    };
  },
  watch: {
    visible(e) {
      if (e) {
        this.$refs.verifyImg.eventInitImg();
        this.puzzle = false;
      }
    },
  },
  methods: {
    validateRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.visible = true;
          this.puzzle = false;
        }
      });
    },
    handleRegister() {
      this.loading = true;
      this.$axios
        .post("/user/register", this.registerForm)
        .then((res) => {
          if (res.code == 20000) {
            // success
            this.$confirm("注册完成, 是否前往登录页面?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "进入登录页面!",
                });
                this.$router.push("/");
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "取消进入登录！",
                });
              });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goLogin() {
      this.$router.push("/");
    },
    canvasInit() {
      this.$refs.verifyImg.eventResetImg();
    },
    closePupUp() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" >
.register-container {
  overflow: auto;
  .register-form {
    position: relative;
    width: 300px;
    padding: 30px 30px 0;
    overflow: hidden;
  }
}

.sliding-pictures {
  width: 100%;
  .operation {
    width: 100%;
    height: 40px;
    > span {
      color: #9fa3ac;
      display: inline-block;
      width: 40px;
      font-size: 25px;
      line-height: 40px;
      text-align: center;
      &:hover {
        background: #e2e8f5;
      }
    }
  }
}
</style>
