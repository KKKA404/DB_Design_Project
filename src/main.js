import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import SideBar from "./components/SideBar.vue";
import BottomFooter from "./components/BottomFooter.vue";
import NavBar from "./components/NavBar.vue";
Vue.component("SideBar",SideBar);
Vue.component("BottomFooter",BottomFooter);
Vue.component("NavBar", NavBar);

Vue.config.productionTip = false;

Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
