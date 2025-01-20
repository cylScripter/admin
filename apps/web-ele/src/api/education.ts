import type {
  GetAppListReq,
  GetAppListResp,
  GetMenuListReq,
  GetMenuListResp,
  CreateMenuReq,
  CreateMenuResp,
  DeleteMenuReq,
  DeleteMenuResp,
  UpdateMenuReq,
  UpdateMenuResp,
  CreateAppApiReq,
  CreateAppApiResp,
  DeleteAppApiReq,
  DeleteAppApiResp,
  CreateEduUserApiReq,
  CreateEduUserApiResp,
  GetAppApiReq,
  GetAppApiResp,
  GetPasswordApiReq,
  GetPasswordApiResp,
  GetEduRoleListReq,
  GetEduRoleListResp,
  GetEduRoleMenuReq,
  GetEduRoleMenuResp,
  SetAppRoleMenuResp,
  SetAppRoleMenuReq,
  SetEduMenuStatusApiReq,
  SetEduMenuStatusApiResp,
  GetEduUserListApiReq,
  GetEduUserListApiResp,
  GetEduUserTokenApiReq,
  GetEduUserTokenApiResp,
  ResetEduUserPasswordApiResp,
  ResetEduUserPasswordApiReq,
  SetEduUserRoleApiReq,
  SetEduUserRoleApiResp,
  SetAppStatusApiResp,
  SetAppStatusApiReq,
  GetOperationLogsListApiReq,
  GetOperationLogsListApiResp,
  GetFileListApiResp,
  GetFileListApiReq, GetObjectApiReq, GetObjectApiResp, DeleteObjectApiReq, DeleteObjectApiResp
} from "#/types/education";
import { requestClient } from '#/api/request';

/**
 * 获取app主体
 */
export async function GetAppListApi(data: GetAppListReq) {
  return requestClient.post<GetAppListResp>("/system/GetAppList", data);
}

/**
 * 获取菜单功能
 */
export async function GetMenuListApi(data: GetMenuListReq) {
  return requestClient.post<GetMenuListResp>("/system/GetEduMenuList", data);
}
/**
 * 创建菜单功能
 */
export async function CreateMenuApi(data: CreateMenuReq) {
  return requestClient.post<CreateMenuResp>("/system/CreateEduMenu", data);
}


export async function DeleteMenuApi(data: DeleteMenuReq) {
  return requestClient.post<DeleteMenuResp>("/system/DeleteEduMenu", data);
}

export async function UpdateMenuApi(data: UpdateMenuReq) {
  return requestClient.post<UpdateMenuResp>("/system/UpdateEduMenu", data);
}


export async function CreateAppApi( data : CreateAppApiReq) {
  return requestClient.post<CreateAppApiResp>("/system/CreateApp",data);
}


export async function DeleteAppApi(data:DeleteAppApiReq ) {
  return requestClient.post<DeleteAppApiResp>("/system/DeleteApp",data);
}


export async function CreateEduUserApi(data:CreateEduUserApiReq) {
  return requestClient.post<CreateEduUserApiResp>("/system/CreateEduUser",data);
}

export async function GetAppApi(data:GetAppApiReq) {
  return requestClient.post<GetAppApiResp>("/system/GetApp",data);
}


export async function GetPasswordApi(data:GetPasswordApiReq) {
  return requestClient.post<GetPasswordApiResp>("/system/GetPassword",data);
}

export async function GetEduRoleListApi (data: GetEduRoleListReq) {
  return requestClient.post<GetEduRoleListResp>("/system/GetEduRoleList",data);
}

export async function GetEduRoleMenuApi (data: GetEduRoleMenuReq) {
  return requestClient.post<GetEduRoleMenuResp>("/system/GetEduRoleMenu",data);
}

export async function SetAppRoleMenu (data :SetAppRoleMenuReq) {
  return requestClient.post<SetAppRoleMenuResp>("/system/SetAppRoleMenu",data);
}


export async function SetEduMenuStatusApi (data: SetEduMenuStatusApiReq) {
  return requestClient.post<SetEduMenuStatusApiResp>("/system/SetEduMenuStatus",data);
}


export async function GetEduUserListApi (data: GetEduUserListApiReq) {
  return requestClient.post<GetEduUserListApiResp>("/system/GetEduUserList",data);
}


export async function GetEduUserTokenApi (data: GetEduUserTokenApiReq) {
  return requestClient.post<GetEduUserTokenApiResp>("/system/GetEduUserToken",data);
}


export async  function ResetEduUserPasswordApi (data: ResetEduUserPasswordApiReq) {
  return requestClient.post<ResetEduUserPasswordApiResp>("/system/ResetEduUserPassword",data);
}


export async function SetEduUserRoleApi (data: SetEduUserRoleApiReq) {
  return requestClient.post<SetEduUserRoleApiResp>("/system/SetEduUserRole",data);
}


export async function SetAppStatusApi (data: SetAppStatusApiReq) {
  return requestClient.post<SetAppStatusApiResp>("/system/SetAppStatus",data);
}


export  async function GetOperationLogsListApi (data: GetOperationLogsListApiReq) {
  return requestClient.post<GetOperationLogsListApiResp>("/system/GetOperationLogsList",data);
}

export async function GetFileListApi (data: GetFileListApiReq) {
  return requestClient.post<GetFileListApiResp>("/system/GetFileList",data);
}


export async function GetObjectApi (data: GetObjectApiReq) {
  return requestClient.post<GetObjectApiResp>("/system/GetObject",data);
}

export async function DeleteObject(data: DeleteObjectApiReq) {
  return requestClient.post<DeleteObjectApiResp>("/system/DeleteObject",data);
}
