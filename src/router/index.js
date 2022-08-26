import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import { getToken } from "@/utils/auth"; // get token from cookie

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration

import { Message } from 'element-ui'

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
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
 export const asyncRoutes = [
  {
    path: "/Materials/test",
    redirect: "/Index",
    name: "测试",
    component: () => import("../views/SystemIndex.vue"),
    meta: { icon: "Material" },
    // children: [
    //   {
    //     path: "/CheckDonationRecord",
    //     name: "物资捐赠记录查询测试",
    //     component: () => import("../views/CheckDonationRecord.vue"),
    //   },
    //   {
    //     path: "/MakeDonation",
    //     name: "捐赠物资测试",
    //     component: () => import("../views/MakeDonation.vue"),
    //   },
    // ],
  },

  // 404 page must be placed at the end !!!
]

const createRouter = () => new Router({

  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


const whiteList = ["/"]; // no redirect whitelist

//路由拦截
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = `${to.name} - 疫情防控系统`;

  // determine whether the user has logged in
  const hasToken = getToken();

  console.log("hasToken: " + hasToken);

  if (hasToken) {
    if (to.path == "/") {
      next("/Index");
      NProgress.done();
    } else{
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
console.log("roles:", roles)
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
console.log("accessRoutes:", accessRoutes)

          for(let i=0,length=accessRoutes.length; i<length; i++) {
            const element = accessRoutes[i];
            console.log("element: ", element);

            router.addRoute(element);
            console.log("router: ", router);

          }
          // dynamically add accessible routes
          console.log("router: ", router);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log("whitelist")
      // in the free login whitelist, go directly
      next();
    } else {

      // other pages that do not have permission to access are redirected to the login page.
      // Message({
      //   message: "请先登录！",
      //   type: 'warning',
      // })
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