<template>
  <!-- 要点：在el-menu中设router为true，此后该menu中的item会以自身index为路径跳转 -->
  <el-menu :router="true" default-active="$route.path" mode="horizontal">
    <el-menu-item index="/">登录</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "BottomFooter",
};
</script>
<style>
</style>
