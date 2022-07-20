<template>
  <el-col>
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>物资</span>
        </template>
        <el-menu-item-group>
          <template slot="title">捐赠</template>
          <el-menu-item index="1-1">物资捐赠记录查询</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
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