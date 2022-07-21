<template>
  <el-container>
    <el-aside width="200px"><SideBar></SideBar></el-aside>
    <el-container>
      <el-header><NavBar></NavBar></el-header>
      <router-view />
      <el-footer><BottomFooter></BottomFooter></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "SystemIndex",
  components: {},
};
</script>
