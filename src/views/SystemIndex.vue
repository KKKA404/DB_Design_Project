<template>
  
  <div>
    <el-container style="height: 100%; border: 1px solid #eee">
      
      <el-aside
        width="collapse"
        style="background-color: #ffffff height: 100%;"
      >
      
        <el-menu
          router
          :default-active="$route.path"
          :collapse="isCollapse"
          class="el-menu-vertical"
        >
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
              <span>{{ item.name }}</span></template
            >
            <el-menu-item-group>
              <el-menu-item
                v-for="(item2, index2) in item.children"
                :index="item2.path"
                :key="index2"
              >
                <template>
                  <svg-icon
                    v-if="item2.meta && item2.meta.icon"
                    :icon-class="item2.meta && item2.meta.icon"
                  ></svg-icon>
                  <span>{{ item2.name }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <NavBar @changeMenu="changeMenu"></NavBar>
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
import SvgIcon from "@/components/SvgIcon.vue";
import Header from './Header.vue';
export default {
  name: "SystemIndex",
  components: { SvgIcon, Header },
  data() {
    return {
      currentMenu: "",
      router: "",
      isCollapse: true,
    };
  },
  created() {
    this.router = this.$router.options.routes.filter((i) => {
      return i.meta;
    });
  },
  methods: {
    changeMenu() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  overflow: hidden;
}

.el-menu--collapse {
  .el-submenu {
    span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
  }
}
</style>