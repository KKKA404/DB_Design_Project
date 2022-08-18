import Vue from "vue";
import Router from "vue-router";
import { getToken } from "@/utils/auth"; // get token from cookie

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration

import { Message } from 'element-ui'

Vue.use(Router);

// 创建新页面后，在本文件下进行引入即可
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "登录",
      component: () => import("../views/SystemLogin.vue"),
    },
    {
      path: "/Index", // forget to add Index !!!!!!
      name: "主页",
      meta: false,
      component: () => import("../views/SystemIndex.vue"),
    },
    {
      path: "/Materials",
      redirect: "/Index",
      name: "物资",
      component: () => import("../views/SystemIndex.vue"),
      meta: { icon: "Material" },
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
      path: "/PersonalRequest",
      redirect: "/Index",
      name: "个人需求表单",
      component: () => import("../views/SystemIndex.vue"),
      meta: { icon: "PersonalRequest" },
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
      path: "/ExistingMaterials",
      redirect: "/Index",
      name: "现有物资",
      meta: { icon: "ExistingMaterials" },
      component: () => import("../views/SystemIndex.vue"),
      children: [
        {
          path: "/MaterialManage",
          name: "现有物资查询",
          component: () => import("../views/MaterialManage.vue"),
        },
      ],
    },
    {
      path: "/MaterialPurchase",
      redirect: "/Index",
      name: "物资购买",
      meta: { icon: "MaterialPurchase" },
      component: () => import("../views/SystemIndex.vue"),
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
      path: "/InspectionInformation",
      name: "核酸信息管理",
      redirect: "/Index",
      meta: { icon: "InspectionInformation" },
      component: () => import("../views/SystemIndex.vue"),
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
      path: "/Volunteer",
      redirect: "/Index",
      name: "志愿管理",
      meta: { icon: "Volunteer" },
      component: () => import("../views/SystemIndex.vue"),
      children: [
        {
          path: "/VolunteerApplication",
          name: "志愿申请信息",
          component: () => import("../views/VolunteerApplication.vue"),
        },
      ],
    },
    // 404 必须放在最后
    {
      path: "/404",
      name: "404",
      component: () => import("../views/404.vue"),
      hidden: true,
    },
    {
      path: "*",
      redirect: "/404",
      hidden: true,
    },
  ],
});

const whiteList = ["/"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = `${to.name} - 疫情防控系统`;

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path == "/") {
      next("/Index");
      NProgress.done();
    } else{
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      Message({
        message: "请先登录！",
        type: 'warning',
      })
      next(`/?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;