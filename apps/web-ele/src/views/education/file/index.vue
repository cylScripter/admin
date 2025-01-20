<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type { ModelFile } from "#/types/education";
import type { ListOption, Option } from "#/api/core/list";
import { copy, formatTimestamp, GetOption } from "#/utils/utils";
import { DeleteObject, GetFileListApi, GetObjectApi } from "#/api/education";
import { GetFileListOption } from "#/utils/option";
import { ElButton, ElMessage, ElMessageBox, ElTag } from "element-plus";
import { FileStatusMap, FileTypeMap } from "#/utils/map";
import { Icon } from "@iconify/vue";
import { Delete, Edit, Setting } from "@element-plus/icons-vue";

interface option {
  label: string;
  value: string;
}

const getFileTypeOption = ()=>{
  let options: option[] = [];
  FileTypeMap.forEach((value, key) => {
    options.push({label: value, value: key.toString()});
  })
  return options
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入唯一ID',
      },
      fieldName: 'upload_id',
      label: '唯一ID',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入文件id',
      },
      fieldName: 'str_file_id',
      label: '文件id',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入文件路径',
      },
      fieldName: 'file_path',
      label: '文件路径',
    },
    {
      component: 'Select',
      componentProps: {
        placeholder: '请选择文件类型',
        options:getFileTypeOption(),
      },
      fieldName: 'file_type',
      label: '文件类型',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  submitOnEnter: true,
};

const gridOptions: VxeGridProps<ModelFile> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'file_name', title: '文件名' },
    { field: 'file_path', title: '文件路径' },
    { field: 'file_type', title: '文件类型' ,slots:{default: "file_type"}},
    { field: 'upload_id', title: '唯一Id' ,slots :{ default: "upload_id"}},
    { field: 'str_file_id',  title: "文件Id",slots : { default: "str_file_id"} },
    { field: 'created_at', title: '上传时间',width: 200, slots :{ default: "created_at"} },
    { field: 'status', title: '状态'  , slots : { default: "status" }},
    {
      field: "action",
      title: "操作" ,
      slots: { default: "action" },
      width: 250
    },
  ],
  minHeight: 500,
  keepSource: true,
  pagerConfig: {

  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        let option: Option[] = [];
        option = GetOption( formValues, GetFileListOption);
        const listOption: ListOption = {
          options: option,
          limit: page.pageSize,
          offset: (page.currentPage - 1) * page.pageSize,
          offset_token: "",
        };
        const result = await GetFileListApi({
          list_option: listOption,
        });
        console.log(result.list);
        return {
          items: result.list,
          total: result.paginate.total,
        };
      },
    },
  },
  toolbarConfig: {
    custom: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid,gridRef] = useVbenVxeGrid({ formOptions, gridOptions });



// 确认删除
const handleDelete = (id : string) => {
  ElMessageBox.confirm("此操作将永久删除文件, 是否继续?", "确认删除", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      DeleteObject({
        upload_id: id,
      }).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        gridRef.query()
      })
    })
};


const getFileUrl = (id : string)=>{
  GetObjectApi({
    upload_id: id,
  }).then((res)=>{
    copy(res.url)
  })
}


// 下载文件
const downloadFile = (id: string) => {
  GetObjectApi({
    upload_id: id,
  }).then((res) => {
    const url = res.url;
    const link = document.createElement('a');
    link.href = url;
    link.download = res.file_name; // 设置下载的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    ElMessage({
      type: "success",
      message: "文件下载成功",
    });
  })
};

</script>

<template>
  <div class="p-5">
    <Grid >
      <template #created_at="{ row }">
        {{formatTimestamp(row.created_at)}}
      </template>

      <template #file_type="{ row }">
        {{ FileTypeMap.get(row.file_type)}}
      </template>

      <template #upload_id="{ row }">
        <ElButton link type="primary" @click="copy(String(row.upload_id))">
          <Icon icon="tabler:copy" width="14" height="14"  style="color: #838383" />  复制
        </ElButton>
      </template>

      <template #str_file_id="{ row }">
        <ElButton link type="primary" @click="copy(String(row.str_file_id))">
        {{row.str_file_id}}
        </ElButton>
      </template>
      <template #status="{ row }">
        <el-tag size="small"   >{{FileStatusMap.get(row.status) }}</el-tag>
      </template>


      <template #action="{ row }">
        <ElButton
          :key="row.id"
          :icon="Delete"
          link
          type="primary"
          @click="() => handleDelete(row.upload_id)"
        >
          删除
        </ElButton>
        <ElButton
          :key="row.id"
          :icon="Edit"
          link
          type="primary"
          @click="() => getFileUrl(row.upload_id)"
        > 链接
        </ElButton>


        <ElButton :key="row.id" :icon="Setting" link type="primary"
        @click="() => downloadFile(row.upload_id)"> 下载文件 </ElButton>
      </template>
    </Grid>
  </div>
</template>
