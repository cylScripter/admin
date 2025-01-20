import type { Menu } from '@vben/types';

import { requestClient } from '#/api/request';
import type { GetMenuListRequest, GetMenuListResponse ,CreateMenuRequest, CreateMenuResponse, DeleteMenuRequest, DeleteMenuResponse, UpdateMenuResponse, UpdateMenuRequest } from '#/types/menu';



/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.post<Menu>('/system/GetMenu');
}


/**
 * 获取用户菜单列表
 */

export async function GetMenuListApi(data:GetMenuListRequest) {
  return requestClient.post<GetMenuListResponse>('/system/GetMenuList',data);
}

/**
 * 创建菜单
 * @param data
 * @returns
 * @see CreateMenuRequest
 * @see CreateMenuResponse
 */
export async function CreateMenuApi(data:CreateMenuRequest) {
  return requestClient.post<CreateMenuResponse>('/system/CreateMenu',data);
}

/**
 * 删除菜单
 * @param data
 * @returns
 * @see DeleteMenuRequest
 * @see DeleteMenuResponse
 */
export async function DeleteMenuApi(data:DeleteMenuRequest) {
  return requestClient.post<DeleteMenuResponse>('/system/DeleteMenu',data);
}


export async function UpdateMenuApi(data:UpdateMenuRequest) {
  return requestClient.post<UpdateMenuResponse>('/system/UpdateMenu',data);
}


