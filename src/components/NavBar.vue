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
        <el-menu-item @click="logout">登出</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    breadCrumbList() {
      return this.$route.matched;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$message({
        message: '已登出!',
        type: 'warning',
      })
      this.$router.push("/");
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
