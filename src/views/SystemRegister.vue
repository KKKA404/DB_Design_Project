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
        <el-form-item prop="userId">
            <el-input
              ref="userId"
              prefix-icon="el-icon-user-solid"
              v-model="registerForm.ID"
              placeholder="请输入用户ID"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
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

          <el-form-item prop="userName">
            <el-input
              ref="Name"
              prefix-icon="el-icon-user-solid"
              v-model="registerForm.Name"
              placeholder="请输入真实姓名"
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

          <el-form-item label="所在地区" :label-width="formLabelWidth">
            <el-select
              v-model="registerForm.userAddress"
              clearable
              placeholder="请选择"
            >
              <el-option label="河北" value="河北"></el-option>
              <el-option label="山西" value="山西"></el-option>
              <el-option label="辽宁" value="辽宁"></el-option>
              <el-option label="吉林" value="吉林"></el-option>
              <el-option label="黑龙江" value="黑龙江"></el-option>
              <el-option label="江苏" value="江苏"></el-option>
              <el-option label="浙江" value="浙江"></el-option>
              <el-option label="安徽" value="安徽"></el-option>
              <el-option label="福建" value="福建"></el-option>
              <el-option label="江西" value="江西"></el-option>
              <el-option label="山东" value="山东"></el-option>
              <el-option label="河南" value="河南"></el-option>
              <el-option label="湖北" value="湖北"></el-option>
              <el-option label="湖南" value="湖南"></el-option>
              <el-option label="广东" value="广东"></el-option>
              <el-option label="海南" value="海南"></el-option>
              <el-option label="四川" value="四川"></el-option>
              <el-option label="贵州" value="贵州"></el-option>
              <el-option label="云南" value="云南"></el-option>
              <el-option label="陕西" value="陕西"></el-option>
              <el-option label="甘肃" value="甘肃"></el-option>
              <el-option label="青海" value="青海"></el-option>
              <el-option label="台湾" value="台湾"></el-option>
              <el-option label="内蒙古" value="内蒙古"></el-option>
              <el-option label="广西" value="广西"></el-option>
              <el-option label="西藏" value="西藏"></el-option>
              <el-option label="宁夏" value="宁夏"></el-option>
              <el-option label="新疆" value="新疆"></el-option>
              <el-option label="北京" value="北京"></el-option>
              <el-option label="天津" value="天津"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="重庆" value="重庆"></el-option>
              <el-option label="香港" value="香港"></el-option>
              <el-option label="澳门" value="澳门"></el-option>
            </el-select>
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
import { register } from "@/api/user";
export default {
  name: "SystemRegister",
  components: {
    Verify,
  },
  data() {
    const validateUserId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户ID！"));
      } else {
        callback();
      }
    };
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
        ID:"",
        userName: "",
        passWord: "",
        gender: -1,
        address:"",
        phoneNumber: "",
        age: "",
        Name:"",
      },
      registerRules: {
        userId: [
          { required: true, trigger: "blur", validator: validateUserId },
        ],
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
      register(this.registerForm)
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
