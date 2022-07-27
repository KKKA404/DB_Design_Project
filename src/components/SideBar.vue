<template>
  <el-col>
    <!-- 要点：在el-menu中设router为true，此后该menu中的item会以自身index为路径跳转 -->
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      router="true"
    >
      <el-submenu index="null">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>物资</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="CheckDonationRecord"
            >物资捐赠记录查询</el-menu-item
          >
          <el-menu-item index="MakeDonation">捐赠物资</el-menu-item>
          <el-menu-item index="2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="null">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>个人需求表单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="AddRecord">个人需求表单填写</el-menu-item>
          <el-menu-item index="RecordManage">个人需求表单查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="null">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>现有物资</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="MaterialManage">现有物资查询</el-menu-item>
          <el-menu-item index="2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="null">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>物资购买</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="CheckNeedRecord">物资需求查询</el-menu-item>
          <el-menu-item index="CheckPurchRecord">物资购买查询</el-menu-item>
          <el-menu-item index="2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="null">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>信息统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="VolunteerApplication">志愿申请信息统计</el-menu-item>
          <el-menu-item index="CheckPurchRecord">病历记录功能</el-menu-item>
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
<style></style>
