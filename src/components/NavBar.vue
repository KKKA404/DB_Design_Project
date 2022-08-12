<template>
  <div class="navbar">
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
        <el-menu-item index="/">登录</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    breadCrumbList() {
      console.log(this.$route.matched);
      return this.$route.matched;
    },
  },
};
</script>
<style>
.navbar {
  height: 50px;
}

.right-menu {
  float: right;
  line-height: 50px;
}

.breadcrumb-container {
  float: left;
      height: 100%;
  line-height: 50px;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
</style>
