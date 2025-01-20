import type { Option } from "#/api/core/list";
import { ElMessage } from "element-plus";
import useClipboard from 'vue-clipboard3'
/**
 * 格式化时间戳
 * @param timestamp
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp*1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


const { toClipboard } = useClipboard();
export const copy = async (text: string) => {
  try {
    await toClipboard(text);
    ElMessage.success("复制成功");
  } catch (error) {
    ElMessage.error("复制失败");
    console.error(error);
  }
};
/**
 * 判断是否是undefined
 * @param value
 */
export function isUndefined(value: any): boolean {
  return value === undefined|| value === null|| value === '';
}

/**
 * 获取Option
 * @param value
 * @param option
 * @returns
 */
export function GetOption(value: any,option:Map<string, number>): Option[]  {
  const optionList: Option[] = [];
  for (const key in value) {
    if (option.has(key) && !isUndefined(value[key])) {
      optionList.push({
        name: option.get(key),
        value: value[key],
      });
    }
  }
  return optionList;
}

export interface TreeNode {
  id: number
  label: string
  children?: TreeNode[]
}



export  async function downloadFile(url: string, fileName: string): Promise<void> {
  try {
    // 使用 fetch 获取文件数据
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`下载失败，状态码: ${response.status}`);
    }
    // 将响应数据转换为 Blob
    const blob = await response.blob();

    // 创建一个隐形的 <a> 标签用于触发下载
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // 将 <a> 标签添加到 DOM，触发点击事件后移除
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 释放创建的 Blob URL
    URL.revokeObjectURL(link.href);

    console.log(`文件 "${fileName}" 下载成功！`);
  } catch (error) {
    console.error('文件下载失败:', error);
  }
}
