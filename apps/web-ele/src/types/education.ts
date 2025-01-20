import  type  {ListOption,Paginate} from "#/api/core/list";


export interface ModelFile {
  id: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  file_name: string;
  file_path: string;
  file_type: number;
  status: number;
  upload_id: string;
  meta: string;
  suffix: string;
  str_file_id: string;
  bucket_name: string;
}




export interface ModelOperationLogs{
  id: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  user_name: string;
  operation: string;
  object_type: string;
  object_id: string;
  details: string;
  ip_address: string;
  status: number;
  app_id : number;
}

export interface GetAppListReq {
  list_option: ListOption;
}



export interface GetAppListResp {
  paginate: Paginate;
  list: ModelApp[];
}


export interface ModelUser {
  id: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  user_name: string;
  nick_name: string;
  email: string;
  mobile: string;
  avatar: string;
  status: boolean;
  app_id: number;
}

export interface ModelApp  {
  id: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  school_name : string| undefined;
  college_name : string| undefined;
  app_key :string ;
  app_secret :string;
  status:boolean;
}

export interface ModelRole {
  id: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  name: string;
  status: boolean;
  str_role_id: string;
  description : string;
  app_id : number;

}

export interface GetMenuListReq {
  list_option: ListOption;
}


export interface GetMenuListResp {
  paginate: Paginate;
  list: ModelMenu[];
}




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

interface ModelMenu {
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
  children: ModelMenu[];
  status: boolean;
}


export type {
  Meta,
  ModelMenu,
}


export interface CreateMenuReq {
  name: string;
  path: string;
  component: string;
  redirect: string;
  parent_id: number;
  meta: Meta;
}

export interface CreateMenuResp{

}


export interface UpdateMenuReq {
  id: number;
  component: string;
  meta: Meta;
  name: string;
  path: string;
  redirect: string;
  parent_id: number;
}

export interface UpdateMenuResp{

}


export interface DeleteMenuReq {
  ids: number[];
}

export interface DeleteMenuResp{}


export  interface  CreateAppApiReq {
  school_name : string;
  college_name : string;
}

export interface CreateAppApiResp {

}


export  interface DeleteAppApiReq {
  ids : number[];
}

export interface DeleteAppApiResp {}


export interface CreateEduUserApiReq {
  app_id: number;
  username: string;
  password: string;
  nick_name: string;
  email: string;
  mobile: string;
  avatar: string;

}

export interface CreateEduUserApiResp {}


export  interface  GetAppApiReq {
 id :number ;
}


export interface GetAppApiResp {
  app: ModelApp;
  user: ModelUser;
  roles: ModelRole[];
}


export  interface  GetPasswordApiReq {
  user_id : string;
  app_id: number
}

export interface GetPasswordApiResp {
  password: string;
}

export interface GetEduRoleListReq {
  list_option: ListOption;
  app_id : number;
}

export interface GetEduRoleListResp {
  list: ModelRole[];
  paginate: Paginate;
}


export interface GetEduRoleMenuReq {
   role_id : number;
   app_id : number;
}

export interface GetEduRoleMenuResp {
  list: ModelMenu[];
}

export interface SetAppRoleMenuReq {
  role_id : number;
  app_id : number;
  menu_ids : number[];
}

export interface SetAppRoleMenuResp {}

export interface StatusValue {
  id : number;
  value : boolean;
}


export interface SetEduMenuStatusApiReq {
  values : StatusValue[];
}

export interface SetEduMenuStatusApiResp {}


export interface GetEduUserListApiReq {
  list_option: ListOption;
  app_id : number;
}
export interface GetEduUserListApiResp {
  list: ModelUser[];
  paginate: Paginate
  role_map: object;
}

export  interface GetEduUserTokenApiReq{
  user_id : number;
  app_id: number;
}

export interface GetEduUserTokenApiResp {
  token: string;
}

export interface ResetEduUserPasswordApiReq {
  user_id : number;
  app_id: number;
}

export interface ResetEduUserPasswordApiResp {}


export interface SetEduUserRoleApiReq {
  user_id : number;
  app_id: number;
  role_ids : number[];
}

export interface SetEduUserRoleApiResp {}


export interface SetAppStatusApiReq {
  values : StatusValue[];
}
export interface SetAppStatusApiResp {
}

export interface GetOperationLogsListApiReq {
  list_option: ListOption;
}
export interface GetOperationLogsListApiResp {
  list: ModelOperationLogs[];
  paginate: Paginate;
}

export interface GetFileListApiReq {
  list_option: ListOption;
}

export interface GetFileListApiResp {
  list: ModelFile[];
  paginate: Paginate;
}

export interface  GetObjectApiReq {
  upload_id:string
}

export interface  GetObjectApiResp {
   url: string
  file_name: string
}


export interface  DeleteObjectApiReq {
  upload_id:string
}

export  interface  DeleteObjectApiResp {
}
