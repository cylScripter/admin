import type { RouteRecordRaw } from 'vue-router';
import { BasicLayout } from "#/layouts";



const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      order: -1,
      title: "主体详情",
    },
    name: 'appInfo',
    path: '/appInfo',
    children: [
      {
        component: () => import('#/views/education/college/appInfo/index.vue'),
        meta: {
          title: "主体详情",
        },
        name: 'appInfo-list',
        path: '/appInfo',

      },
      {
        component: () => import('#/views/education/menu/setFunc/index.vue'),
        meta: {
          title: "设置权限",
        },
        name: 'set-func',
        path: '/setFunc',
      },
      {
        component: () => import('#/views/education/college/userInfo/index.vue'),
        meta: {
          title: "用户详情",
        },
        name: 'edu-user',
        path: '/eduUserInfo',
      },
    ],
  }

];

export default routes;
