import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 创建新页面后，在本文件下进行引入即可
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '登录',
      component: ()=>import("../views/SystemLogin.vue"),
    },
    {
      path: '/CheckDonationRecord',
      name: '查询捐赠记录',
      component: ()=>import("../views/CheckDonationRecord.vue"),
    },
  ]
})