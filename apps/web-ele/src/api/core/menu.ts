import type { Menu } from '@vben/types';

import { requestClient } from '#/api/request';


/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.post<Menu>('/system/GetMenu');
}
