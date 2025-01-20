
export const FileStatusMap : Map<number,string>= new Map([
  [0,'未知']
  ,[1,'初始化']
  ,[2,'上传中']
  ,[3,'上传完成']
  ,[4,'上传失败']
  ,[5,'删除']
  ,[6,'过期']
  ,[7,'中断']
])


// enum FileType {
//   Unknown = 0
// System = 1 // 系统文件
// Tmp = 2 // 临时文件
// Business = 3// 业务文件
// }


export const FileTypeMap : Map<number,string>= new Map([
  [0,'未知']
  ,[1,'系统文件']
  ,[2,'临时文件']
  ,[3,'业务文件']
])
