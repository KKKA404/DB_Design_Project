import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import { getToken } from "@/utils/auth"; // get token from cookie

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration

import { Message } from "element-ui";

Vue.use(Router);
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/",
    name: "登录",
    component: () => import("../views/SystemLogin.vue"),
  },
  {
    path: "/Register",
    name: "注册",
    component: () => import("../views/SystemRegister.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
    hidden: true,
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/Index", // forget to add Index !!!!!!
    name: "主页",
    redirect:"/AboutUs",
    meta: {icon:"Home",roles: ["admin","user"]},
    component: () => import("../views/SystemIndex.vue"),
    children:[
      {
        path: "/AboutUs",
        name: "网站简介",
        component: () => import("../views/Home.vue"),
        meta: { roles: ["admin","user"] },
    },
      {
        path: "/CovidBrowse",
        name: "疫情速览",
        component: () => import("../views/CovidBrowse.vue"),
        meta: { roles: ["admin","user"] },
    },
    {
      path: "/CovidProtection",
      name: "防控指南",
      component: () => import("../views/CovidProtection.vue"),
      meta: { roles: ["admin", "user"] },
    },

  ]
  },
  {
    path: "/Materials",
    redirect: "/Index",
    name: "物资",
    component: () => import("../views/SystemIndex.vue"),
    meta: { icon: "Material" ,roles: ["admin"]},
    children: [
      {
        path: "/CheckDonationRecord",
        name: "物资捐赠记录查询",
        component: () => import("../views/CheckDonationRecord.vue"),
        meta: { roles: ["admin"]},
      },
      {
        path: "/MakeDonation",
        name: "捐赠物资",
        component: () => import("../views/MakeDonation.vue"),
        meta: { roles: ["admin"]},
      },
    ],
  },
  {
    path: "/PersonalRequest",
    redirect: "/Index",
    name: "个人需求表单",
    component: () => import("../views/SystemIndex.vue"),
    meta: { icon: "PersonalRequest", roles: ["user","admin"]},
    children: [
      {
        path: "/AddRecord",
        name: "个人需求表单填写",
        component: () => import("../views/AddRecord.vue"),
        meta: { roles: ["user"]},
      },
      {
        path: "/RecordManage",
        name: "个人需求表单查询",
        component: () => import("../views/RecordManage.vue"),
        meta: { roles: ["user"]},
      },
    ],
  },
  {
    path: "/ExistingMaterials",
    redirect: "/Index",
    name: "现有物资",
    meta: { icon: "ExistingMaterials" ,roles: ["admin"]},
    component: () => import("../views/SystemIndex.vue"),
    children: [
      {
        path: "/MaterialManage",
        name: "现有物资查询",
        component: () => import("../views/MaterialManage.vue"),
        meta: {roles: ["admin"]},
      },
    ],
  },
  {
    path: "/MaterialPurchase",
    redirect: "/Index",
    name: "物资购买",
    meta: { icon: "MaterialPurchase" ,roles: ["admin"]},
    component: () => import("../views/SystemIndex.vue"),
    children: [
      {
        path: "/CheckNeedRecord",
        name: "物资需求查询",
        meta: {roles: ["admin"]},
        component: () => import("../views/CheckNeedRecord.vue"),
      },
      {
        path: "/CheckPurchRecord",
        name: "物资购买查询",
        component: () => import("../views/CheckPurchRecord.vue"),
        meta: {roles: ["admin"]},
      },
      {
        path: "/MaterialTransport.vue",
        name: "物流信息",
        component: () => import("../views/MaterialTransport.vue"),
        meta: {roles: ["admin"]},
      },
    ],
  },
  {
    path: "/InspectionInformation",
    name: "核酸信息管理",
    redirect: "/Index",
    meta: { icon: "InspectionInformation" ,roles: ["admin","user"]},
    component: () => import("../views/SystemIndex.vue"),
    children: [
      {
        path: "/DNAManage",
        name: "核酸结果管理",
        component: () => import("../views/DNAManage.vue"),
    meta: {roles: ["admin","user"]},

      },

      {
        path: "/RecordPatient",
        name: "病历记录",
        component: () => import("../views/RecordPatient.vue"),
    meta: {roles: ["admin","user"]},

      },
    ],
  },
  {
    path: "/Volunteer",
    redirect: "/Index",
    name: "志愿管理",
    meta: { icon: "Volunteer", roles: ["admin","user"] },
    component: () => import("../views/SystemIndex.vue"),
    children: [
      {
        path: "/VolunteerApplication",
        name: "志愿申请信息",
        meta: { roles: ["admin","user"] },
        component: () => import("../views/VolunteerApplication.vue"),
      },
    ],
  },
  {
    path: "/IsolationAllocate",
    redirect: "/Index",
    name: "医疗资源分配",
    meta: { icon: "Medical",roles: ["admin","user"] },
    component: () => import("../views/SystemIndex.vue"),
    children: [
      {
        path: "/IsolationAllocate",
        name: "隔离点分配",
        component: () => import("../views/IsolationAllocate.vue"),
    meta: { roles: ["admin","user"] },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

const whiteList = ["/", "/Register","/404"]; // no redirect whitelist

//路由拦截
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
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;

      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch("user/getInfo");

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );

          accessRoutes.forEach((singleRoute) => {
            router.addRoute(singleRoute);
          });

          // 由于Index里通过router.options.routes渲染侧边栏
          // 加之其无法通过addRoutes动态渲染
          // 故此处需手动添加，慎之慎之！
          router.options.routes = store.getters.permission_routes;

          // dynamically add accessible routes
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      Message({
        message: "请先登录！",
        type: "warning",
      });
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
