import type { UserInfo } from '@vben/types';
import { requestClient } from '#/api/request';
import {GetUserInfoURL, GetUserListURL} from "#/api/core/url";
import type {BaseParam} from "#/api/core/list";



export interface Paginate {
  total: number;
  limit: number;
  offset: number;
  next_offset_token: string;
  has_more: boolean;
}

export interface GetUserListResult {
  paginate: Paginate;
  users: UserItem[];
}

export interface UserItem {
  id: string;
  user_id: string;
  nickname: string;
  email: string;
  mobile: string;
  status: string;
  avatar: string;
  last_login_at: number;
  created_at: number;
  deleted_at: number;
  updated_at: number;
  str_user_id: string;
}
/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.post<UserInfo>(GetUserInfoURL);
}

/**
 * 获取用户列表
 */
export async function GetUserListApi(data:BaseParam) {
  return requestClient.post<GetUserListResult>(GetUserListURL,data);
}
