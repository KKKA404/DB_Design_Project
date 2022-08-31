<template>
  <div class="navbar">
    <svg-icon :icon-class="this.isCollapse ? 'Collapse' : 'Expand'" @click.native.prevent="changeCollapse" />
    <span>&nbsp;&nbsp;</span>
    <el-breadcrumb separator="/" class="breadcrumb-container">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="breadCrumbItem in breadCrumbList" :key="breadCrumbItem.path"
          :to="breadCrumbItem.path">
          {{ breadCrumbItem.name }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

    <!-- <div class="right-menu">
      <el-menu mode="horizontal">
        <el-submenu index="">
          <template slot="title"><i class="el-icon-user"></i>账户</template>
          <el-menu-item @click="changeShowUserInfoFormVisible" index=""><i class="el-icon-s-order"></i>用户信息
          </el-menu-item>
          <el-menu-item @click="changeEditUserInfoFormVisible" index=""><i class="el-icon-paperclip"></i>更改用户信息
          </el-menu-item>
          <el-menu-item @click="changeResetPassWordFormVisible" index=""><i class="el-icon-s-operation"></i>更改密码
          </el-menu-item>
          <el-menu-item @click="logout" index=""><i class="el-icon-switch-button"></i>登出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-drawer :visible.sync="showUserInfoFormVisible" direction="rtl" custom-class="showUserInfoDrawer" ref="drawer"
      size="36%">
      <div class="showUserInfoDrawer__content">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix" style="font-size:large;font-weight:400">
            <span>用户信息</span>
          </div>
          <el-descriptions class="margin-top" :column="2" :size="size" border>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-postcard"></i>
                用户ID
              </template>
              {{this.$store.getters.ID}}
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-user"></i>
                用户名
              </template>
              {{ this.$store.getters.name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-news"></i>
                年龄
              </template>
              {{ this.$store.getters.age }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-guide"></i>
                性别
              </template>
              {{ this.$store.getters.gender }}
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                联系方式
              </template>
              {{ this.$store.getters.phoneNumber }}
            </el-descriptions-item>
          </el-descriptions>

        </el-card>
      </div>
    </el-drawer>
    <el-drawer title="修改用户信息" :visible.sync="editUserInfoFormVisible" direction="ltr" custom-class="editUserInfoDrawer"
      ref="drawer" size="36%">
      <div class="editUserInfoDrawer__content">
        <el-form :model="userInfoForm" style="padding-right:40px">
          <el-form-item label="用户名" :label-width="formLabelWidth" style="padding-top:20px;
            padding-bottom:10px">
            <el-input v-model="userInfoForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="userInfoForm.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" style="padding-top:10px;
           padding-bottom:10px">
            <el-input v-model="userInfoForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" style="padding-bottom:10px;
           margin-bottom:50px">
            <el-input v-model.number="userInfoForm.age"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="editUserInfoDrawer__footer">
          <el-button @click.native.prevent="changeEditUserInfoFormVisible" style="margin-left:20px;
          margin-right:10px">
            取消
          </el-button>
          <el-button type="primary" @click.native.prevent="editUserInfo" style="margin-left:50px;
          margin-right:20px">
            确定
          </el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer title="修改密码" :visible.sync="resetPassWordFormVisible" direction="ltr" custom-class="changePasswordDrawer"
      ref="drawer" size="36%">
      <div class="changePasswordDrawer__content">
        <el-form :model="newPassWordForm" style="padding-right:40px">
          <el-form-item label="旧密码" :label-width="formLabelWidth" style="padding-top:20px;
              padding-bottom:20px">
            <el-input show-password v-model="newPassWordForm.oldPassWord"></el-input>
          </el-form-item>
          <el-form-item label="设置新密码" :label-width="formLabelWidth" style="padding-top:10px;
              padding-bottom:10px">
            <el-input show-password v-model="newPassWordForm.newPassWord"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" :label-width="formLabelWidth" style="padding-top:10px;
              padding-bottom:10px;
              margin-bottom:50px">
            <el-input show-password v-model="newPassWordForm.repeatPassWord"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="changePasswordDrawer__footer">
          <el-button @click.native.prevent="changeResetPassWordFormVisible" style="margin-left:20px;
              margin-right:10px">
            取消
          </el-button>
          <el-button type="primary" @click.native.prevent="changePassWord" style="margin-left:50px;
              margin-right:20px">
            确定
          </el-button>
        </div>
      </div>
    </el-drawer> -->
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isCollapse: false,
      formLabelWidth: "120px",
    };
  },
  computed: {
    breadCrumbList() {
      return this.$route.matched;
    },
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("changeMenu");
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
