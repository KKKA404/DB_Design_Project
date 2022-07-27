import Vue from "vue";
import VueRouter from "vue-router";
import Index from '../views/SystemIndex.vue'

Vue.use(VueRouter);
const routes = [
  //配置默认的路径，默认显示登录页
  { path: '/', meta: false, component: () => import("../views/SystemLogin.vue") },
  
  {
    path: "/Index",
    name: "物资",
    component: Index,
    meta: true,
    children: [
      {
        path: "/CheckDonationRecord",
        name: "物资捐赠记录查询",
        component: () => import('../views/CheckDonationRecord.vue')
      },
      // {
      //   path: "/2",
      //   name: "选项2",
      //   component: () => import('')
      // }
    ]
  },
  {
    path: "/Index",
    name: "个人需求表单",
    component: Index,
    meta: true,
    children: [
      {
        path: "/AddRecord",
        name: "个人需求表单填写",
        component: () => import(/* webpackChunkName: "BlogManage" */ '../views/AddRecord.vue')
        //const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
      },
      {
        path: "/RecordManage",
        name: "个人需求表单查询",
        component: () => import(/* webpackChunkName:"AddBlog" */ '../views/RecordManage.vue')
      }
    ]
  },
  {
    path: "/Index",
    name: "现有物资",
    component: Index,
    meta: true,
    children: [{
      path: "/MaterialManage",
      name: "现有物资查询",
      component: () => import(/* webpackChunkName:"MaterialManage" */ '../views/MaterialManage.vue')
    }, 
    // {
    //   path: "/2",
    //   name: "选项2",
    //   component: () => import(/* webpackChunkName:"AddMaterial" */ '')
    // }
    ]
  },
  {
    path: "/Index",
    name: "物资购买",
    component: Index,
    meta: true,
    children: [{
      path: "/CheckNeedRecord",
      name: "物资需求查询",
      component: () => import(/* webpackChunkName:"MaterialManage" */ '../views/CheckNeedRecord.vue')
    },{
      path: "/CheckPurchRecord",
      name: "物资购买查询",
      component: () => import(/* webpackChunkName:"AddMaterial" */ '../views/CheckPurchRecord.vue')
    }
    ]
  },
  {
    path: "/Index",
    name: "核酸管理",
    component: Index,
    meta: true,
    children: [{
      path: "/DNAManage",
      name: "核酸信息管理",
      component: () => import(/* webpackChunkName:"MaterialManage" */ '../views/DNAManage.vue')
    },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// // 创建新页面后，在本文件下进行引入即可
// export default new VueRouter({
//   mode: "history",
//   routes: [
//     {
//       path: "/",
//       name: "登录",
//       meta: false,
//       component: () => import("../views/SystemLogin.vue"),
//     },
//     {
//       path: "/Index",
//       name: "首页",
//       component: () => import("../views/SystemIndex.vue"),
//       meta: true,
//       children: [
//         {
//           path: "/CheckDonationRecord",
//           name: "查询捐赠记录",
//           component: () => import("../views/CheckDonationRecord.vue"),
//         },
//         {
//           path: "/MakeDonation",
//           name: "捐赠物资",
//           component: () => import("../views/MakeDonation.vue"),
//         },
//         {
//           path: "/CheckNeedRecord",
//           name: "查询需求记录",
//           component: () => import("../views/CheckNeedRecord.vue"),
//         },
//         {
//           path: "/CheckPurchRecord",
//           name: "查询采购记录",
//           component: () => import("../views/CheckPurchRecord.vue"),
//         },
//         {
//           path: "/AddRecord",
//           name: "个人需求表单填写",
//           component: () => import("../views/AddRecord.vue"),
//         },
//         {
//           path: "/RecordManage",
//           name: "个人需求表单查询",
//           component: () => import("../views/RecordManage.vue"),
//         },
//         {
//           path: "/MaterialManage",
//           name: "现有物资查询",
//           component: () => import("../views/MaterialManage.vue"),
//         },
//       ],
//     },
//   ],
// });