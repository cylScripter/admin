import { baseRequestClient, requestClient } from '#/api/request';
import {LoginURL} from "#/api/core/url";

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    user_id?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    token: string;
    user: object;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }

  export interface GetAuthCodeResp {
    auth_codes : string[]
  }

  export interface GetAuthCodeReq {}


}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>(LoginURL, data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi(data: AuthApi.GetAuthCodeReq) {
  return requestClient.post<AuthApi.GetAuthCodeResp>("/system/GetAuthCode", data);
}
