<template>
  <div class="index">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="$route.path">
          <el-submenu
            v-for="(item, index) in router"
            :index="index + ''"
            :key="index"
          >
            <template slot="title">
              <svg-icon
                v-if="item.meta && item.meta.icon"
                :icon-class="item.meta && item.meta.icon"
              ></svg-icon>
              {{ item.name }}</template
            >
            <el-menu-item
              v-for="(item2, index2) in item.children"
              :index="item2.path"
              :key="index2"
            >
              <svg-icon
                v-if="item2.meta && item2.meta.icon"
                :icon-class="item2.meta && item2.meta.icon"
              ></svg-icon>
              {{ item2.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <NavBar></NavBar>
        </el-header>
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
        <el-footer>
          <BottomFooter></BottomFooter>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentMenu: "",
      router: "",
    };
  },
  created() {
    console.log(this.$router);
    this.router = this.$router.options.routes.filter((i) => {
      return i.meta;
    });
  },
  name: "SystemIndex",
};
</script>
