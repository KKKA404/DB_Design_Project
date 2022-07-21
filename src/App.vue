<template>
  <div id="app">
    <el-container>
      <el-aside width="200px"><SideBar></SideBar></el-aside>
      <el-container>
        <el-header><NavBar></NavBar></el-header>
        <router-view />
        <el-footer><BottomFooter></BottomFooter></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
