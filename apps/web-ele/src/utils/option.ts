

const GetUserListOption :Map<string, number> = new Map([
  ['created_at', 1],
  ['updated_at', 2],
  ['user_id', 4],
  ['mobile', 5],
  ['email', 6],
  ['nickname', 7],
  ['avatar', 8],
  ['status', 9],
  ['last_login_at', 10],
  ['str_user_id', 11],
]);


const GetMenuListOption :Map<string, number> = new Map([
  ['id', 1],
  ['name', 2],
  ['path', 3],
  ['component', 4],
  ['redirect', 5],
  ['parent_id', 6],
  ['title', 7],
  ['created_at', 8],
])



const GetAppListOption :Map<string, number> = new Map([
  ['id', 1],
  ['school_name', 2],
  ['created_at', 3],
  ['college_name', 4],
])

const GetEducationListOption :Map<string, number> = new Map([
  ['id', 1],
  ['name', 2],
  ['path', 3],
  ['component', 4],
  ['redirect', 5],
  ['parent_id', 6],
  ['title', 7],
  ['created_at', 8],
])
export {
  GetUserListOption,
  GetMenuListOption ,
  GetAppListOption,
  GetEducationListOption,
};



export const GetEduUserListOption :  Map<string,number> = new Map([
   ["id",1],
   ["user_name",3],
   ["nick_name",2],
  ["email",4],
  ["mobile",5],
])




export const GetOperationLogsListOption :  Map<string,number> = new Map([
  ["id",1],
  ["created_at",2],
  ["user_name",3],
  ["operation",4],
  ["object_type",5],
  ["object_id",6],
  ["details",7],
  ["ip_address",8],
  ["app_id",9],
])



export const GetFileListOption :  Map<string,number> = new Map([
  ["id",1],
  ["file_name",2],
  ["file_path",3],
  ["file_type",4],
  ["status",5],
  ["upload_id",6],
  ["suffix",7],
  ["str_file_id",8],
  ["bucket_name",9],
])


// enum FileStatus {
//   Unknown = 0 // 未知
// Init = 1 // 初始化
// Uploading = 2 // 上传中
// Uploaded = 3 // 上传完成
// Failed = 4   // 上传失败
// Deleted = 5  // 删除
// Expired = 6  // 过期
// Aborted = 7 // 中断
// }

