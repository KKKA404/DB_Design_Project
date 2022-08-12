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
      name: "物资",
      component: () => import("../views/SystemIndex.vue"),
      meta: true,
      children: [
        {
          path: "/CheckDonationRecord",
          name: "物资捐赠记录查询",
          component: () => import("../views/CheckDonationRecord.vue"),
        },
        {
          path: "/MakeDonation",
          name: "捐赠物资",
          component: () => import("../views/MakeDonation.vue"),
        },
      ],
    },
    {
      path: "/Index",
      name: "个人需求表单",
      component: () => import("../views/SystemIndex.vue"),
      meta: true,
      children: [
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
      ],
    },
    {
      path: "/Index",
      name: "现有物资",
      component: () => import("../views/SystemIndex.vue"),
      meta: true,
      children: [
        {
          path: "/MaterialManage",
          name: "现有物资查询",
          component: () => import("../views/MaterialManage.vue"),
        },
      ],
    },
    {
      path: "/Index",
      name: "物资购买",
      component: () => import("../views/SystemIndex.vue"),
      meta: true,
      children: [
        {
          path: "/CheckNeedRecord",
          name: "物资需求查询",
          component: () => import("../views/CheckNeedRecord.vue"),
        },
        {
          path: "/CheckPurchRecord",
          name: "物资购买查询",
          component: () => import("../views/CheckPurchRecord.vue"),
        },
      ],
    },
    {
      path: "/Index",
      name: "核酸信息管理",
      component: () => import("../views/SystemIndex.vue"),
      meta: true,
      children: [
        {
          path: "/DNAManage",
          name: "核酸结果管理",
          component: () => import("../views/DNAManage.vue"),
        },

        {
          path: "/RecordPatient",
          name: "病历记录",
          component: () => import("../views/RecordPatient.vue"),
        },
      ],
    },
    {
      path: "/Index",
      name: "志愿管理",
      component: () => import("../views/SystemIndex.vue"),
      meta: true,
      children: [
        {
          path: "/VolunteerApplication",
          name: "志愿申请信息",
          component: () => import("../views/VolunteerApplication.vue"),
        },
      ],
    },
  ],
});
