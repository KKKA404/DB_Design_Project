<template>
  <el-col>
    <!-- 要点：在el-menu中设router为true，此后该menu中的item会以自身index为路径跳转 -->
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      router="true"
    >
      <el-submenu route>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>物资</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="CheckDonationRecord"
            >物资捐赠记录查询</el-menu-item
          >
          <el-menu-item index="2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "SideBar",
};
</script>
<style>
</style>