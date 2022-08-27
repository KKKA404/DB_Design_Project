import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import * as echarts from 'echarts';
import "element-ui/lib/theme-chalk/index.css";
import "./icons";

import router from "./router";

// axios
import service from "./plugins/axios";
Vue.prototype.$axios = service;

// global css
import "./styles/index.scss";

// mockjs
if (process.env.NODE_ENV == "development") {
  require("../mock/index");
}

// store
import store from "./store";

import BottomFooter from "./components/BottomFooter.vue";
import NavBar from "./components/NavBar.vue";

Vue.component("BottomFooter", BottomFooter);
Vue.component("NavBar", NavBar);

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
