
import type { Paginate } from "#/api";
import type { BaseParam } from "#/api/core/list";

interface Meta {
  title: string;
  order: number;
  icon: string;
  badge: string;
  iframeSrc: string;
  affixTab: boolean;
  activePath: string;
  badgeVariants: string;
  badgeType: string;
  badgeText: string;
  hideChildrenInMenu: boolean;
  hideInTab: boolean;
  hideInMenu: boolean;
  keepAlive: boolean;
  activeIcon: string;
  hideInBreadcrumb: boolean;
  ignoreAccess: boolean;
  link: string;
  openInNewWindow: boolean;
  maxNumOfOpenTab: number;
}

interface MenuRowType {
  id: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  component: string;
  meta: Meta;
  name: string;
  path: string;
  redirect: string;
  parent_id: number;
  children: MenuRowType[];
}
export type {
  Meta,
  MenuRowType,
}

export interface GetMenuListRequest extends BaseParam {
  id : number;
}

export interface CreateMenuRequest {
  name: string;
  path: string;
  component: string;
  redirect: string;
  parent_id: number;
  meta: Meta;
}


export interface CreateMenuResponse {}

export interface GetMenuListResponse {
  paginate: Paginate;
  menus: MenuRowType[];
}


export interface DeleteMenuRequest {  
  ids: number[];
}

export interface DeleteMenuResponse {}


export interface UpdateMenuRequest {
  id: number;
  component: string;
  meta: Meta;
  name: string;
  path: string;
  redirect: string;
  parent_id: number;
}

export interface UpdateMenuResponse {}
