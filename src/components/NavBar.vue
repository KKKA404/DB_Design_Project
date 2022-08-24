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
          <el-menu-item @click="changeVisibility" index=""
            >更改密码</el-menu-item
          >
          <el-menu-item @click="logout" index="">登出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
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
        <el-button @click.native.prevent="changeVisibility">取消</el-button>
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
      dialogFormVisible: false,
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
          .catch((err) => {});
      }
    },
    changeVisibility() {
      this.dialogFormVisible = !this.dialogFormVisible;
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
