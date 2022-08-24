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

    <!-- 要点：在el-menu中设router为true，此后该menu中的item会以自身index为路径跳转 -->
    <div class="right-menu">
      <el-menu :router="true" default-active="$route.path" mode="horizontal">
        <el-submenu>
    <template slot="title"><i class="el-icon-user"></i>账户</template>
        <el-menu-item @click="changePassWord">更改密码</el-menu-item>

        <el-menu-item @click="logout">登出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isCollapse: false,
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
    }
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
