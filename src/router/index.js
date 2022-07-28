import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 创建新页面后，在本文件下进行引入即可
export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "登录",
      meta: false,
      component: () => import("../views/SystemLogin.vue"),
    },
    {
      path: "/Index",
      name: "首页",
      component: () => import("../views/SystemIndex.vue"),
      meta: true,
      children: [
        {
          path: "/CheckDonationRecord",
          name: "查询捐赠记录",
          component: () => import("../views/CheckDonationRecord.vue"),
        },
        {
          path: "/MakeDonation",
          name: "捐赠物资",
          component: () => import("../views/MakeDonation.vue"),
        },
        {
          path: "/CheckNeedRecord",
          name: "查询需求记录",
          component: () => import("../views/CheckNeedRecord.vue"),
        },
        {
          path: "/CheckPurchRecord",
          name: "查询采购记录",
          component: () => import("../views/CheckPurchRecord.vue"),
        },
        {
          path: "/AddRecord",
          name: "个人需求表单填写",
          component: () => import("../views/AddRecord.vue"),
        },
        {
          path: "/RecordManage",
          name: "个人需求表单查询",
          component: () => import("../views/RecordManage.vue"),
        },
        {
          path: "/MaterialManage",
          name: "现有物资查询",
          component: () => import("../views/MaterialManage.vue"),
        },
        {
          path: "/VolunteerApplication",
          name: "志愿申请信息",
          component: () => import("../views/VolunteerApplication.vue"),
        },
        {
          path: "/RecordPatient",
          name: "病历记录",
          component: () => import("../views/RecordPatient.vue"),
        },
      ],
    },
  ],
});
