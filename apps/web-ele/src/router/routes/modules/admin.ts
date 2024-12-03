import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: "用户管理",
    },
    name: 'admin',
    path: '/admin',
    children: [
      {
        name: 'adminuser',
        path: '/admin',
        component: () => import('#/views/admin/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: "用户管理",
        },
      },
    ],
  },
];

export default routes;
