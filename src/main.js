import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import * as echarts from 'echarts';
import "element-ui/lib/theme-chalk/index.css";

import VueRouter from "./router";

// import SideBar from "./components/SideBar.vue";
import BottomFooter from "./components/BottomFooter.vue";
import NavBar from "./components/NavBar.vue";
// Vue.component("SideBar",SideBar);

Vue.component("BottomFooter", BottomFooter);
Vue.component("NavBar", NavBar);

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
new Vue({
  router: VueRouter,
  render: (h) => h(App),
}).$mount("#app");
