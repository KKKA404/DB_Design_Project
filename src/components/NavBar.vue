<template>
  <div class="navbar">
    <svg-icon
      :icon-class="this.isCollapse ? 'Collapse' : 'Expand'"
      @click.native.prevent="changeCollapse"
    />
    <span>&nbsp;&nbsp;</span>
    <el-breadcrumb separator="/" class="breadcrumb-container">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="breadCrumbItem in breadCrumbList"
          :key="breadCrumbItem.path"
          :to="breadCrumbItem.path"
        >
          {{ breadCrumbItem.name }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

    <div class="right-menu">
      <el-menu mode="horizontal">
        <el-submenu index="">
          <template slot="title"><i class="el-icon-user"></i>账户</template>
          <el-menu-item @click="changeShowUserInfoFormVisible" index=""
            ><i class="el-icon-s-order"></i>用户信息</el-menu-item
          >
          <el-menu-item @click="changeEditUserInfoFormVisible" index=""
            ><i class="el-icon-paperclip"></i>更改用户信息</el-menu-item
          >
          <el-menu-item @click="changeResetPassWordFormVisible" index=""
            ><i class="el-icon-s-operation"></i>更改密码</el-menu-item
          >
          <el-menu-item @click="logout" index=""
            ><i class="el-icon-switch-button"></i>登出</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog
      title="用户信息"
      :visible.sync="showUserInfoFormVisible"
      width="30%"
    >
      <template>
        <p>用户ID：{{ this.$store.getters.ID }}</p>
        <p>用户名：{{ this.$store.getters.name }}</p>
        <p>性别：{{ this.$store.getters.gender }}</p>
        <p>联系方式：{{ this.$store.getters.phoneNumber }}</p>
        <p>年龄：{{ this.$store.getters.age }}</p>
      </template>
    </el-dialog>
    <el-dialog
      title="修改用户信息"
      :visible.sync="editUserInfoFormVisible"
      width="30%"
    >
      <el-form :model="userInfoForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userInfoForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="userInfoForm.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="userInfoForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model.number="userInfoForm.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="changeEditUserInfoFormVisible"
          >取消</el-button
        >
        <el-button @click.native.prevent="editUserInfo">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="resetPassWordFormVisible"
      width="30%"
    >
      <el-form :model="newPassWordForm">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input
            show-password
            v-model="newPassWordForm.oldPassWord"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input
            show-password
            v-model="newPassWordForm.newPassWord"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" :label-width="formLabelWidth">
          <el-input
            show-password
            v-model="newPassWordForm.repeatPassWord"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="changeResetPassWordFormVisible"
          >取消</el-button
        >
        <el-button @click.native.prevent="changePassWord">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isCollapse: false,
      newPassWordForm: {
        oldPassWord: "",
        newPassWord: "",
        repeatPassWord: "",
      },
      userInfoForm: {
        userName: this.$store.getters.name,
        gender: this.$store.getters.gender == "男" ? "1" : "0",
        phoneNumber: this.$store.getters.phoneNumber,
        age: this.$store.getters.age,
      },
      resetPassWordFormVisible: false,
      showUserInfoFormVisible: false,
      editUserInfoFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  computed: {
    breadCrumbList() {
      return this.$route.matched;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$message({
        message: "已登出!",
        type: "warning",
      });
      this.$router.push("/");
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("changeMenu");
    },
    changePassWord() {
      if (this.newPassWordForm.newPassWord.length < 8) {
        this.$message.error("密码长度需大于8位！");
      } else if (
        this.newPassWordForm.newPassWord != this.newPassWordForm.repeatPassWord
      ) {
        this.$message.error("两次输入新密码不一致！");
      } else {
        this.$axios
          .post("/user/password", {
            newPassWord: this.newPassWordForm.newPassWord,
            oldPassWord: this.newPassWordForm.oldPassWord,
          })
          .then((res) => {
            if (res.code == 20000) {
              this.$message.success("修改密码成功！");
              this.dialogFormVisible = !this.dialogFormVisible;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {});
      }
    },
    editUserInfo() {
      this.$axios
        .post("/user/editInfo", this.userInfoForm)
        .then((res) => {
          if (res.code == 20000) {
            // success
            this.$message({
              type: "success",
              message: "修改用户信息完成！",
            });
            this.$store.commit("user/SET_NAME", this.userInfoForm.userName);
            this.$store.commit("user/SET_GENDER", this.userInfoForm.gender);
            this.$store.commit(
              "user/SET_PHONE_NUMBER",
              this.userInfoForm.phoneNumber
            );
            this.$store.commit("user/SET_AGE", this.userInfoForm.age);
            console.log(this.$store.getters.phoneNumber);
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    changeResetPassWordFormVisible() {
      this.resetPassWordFormVisible = !this.resetPassWordFormVisible;
    },
    changeShowUserInfoFormVisible() {
      this.showUserInfoFormVisible = !this.showUserInfoFormVisible;
    },
    changeEditUserInfoFormVisible() {
      this.editUserInfoFormVisible = !this.editUserInfoFormVisible;
    },
  },
};
</script>
<style>
.navbar {
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.right-menu {
  justify-content: flex-end;
  margin-left: auto;
}

.breadcrumb-container {
  float: left;
  height: 100%;
  line-height: 50px;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
</style>
