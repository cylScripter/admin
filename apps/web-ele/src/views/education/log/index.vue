<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type { ModelOperationLogs } from "#/types/education";
import type { ListOption, Option } from "#/api/core/list";
import { formatTimestamp, GetOption } from "#/utils/utils";
import {  GetOperationLogsListApi } from "#/api/education";
import { GetOperationLogsListOption } from "#/utils/option";
import { ElTag } from "element-plus";



const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入appId',
      },
      fieldName: 'app_id',
      label: 'AppId',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      fieldName: 'user_name',
      label: '用户名',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入操作名称',
      },
      fieldName: 'operation',
      label: '操作名称',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入操作Id',
      },
      fieldName: 'object_id',
      label: '操作Id',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  submitOnEnter: true,
};

const gridOptions: VxeGridProps<ModelOperationLogs> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'app_id', title: 'AppId' },
    { field: 'user_name', title: '用户名' },
    { field: 'operation', title: '操作' },
    { field: 'object_type', title: '类型' },
    { field: 'object_id',  title: "操作Id" },
    { field: 'details', title: '详细' },
    { field: 'created_at', title: '时间', width:200,slots :{ default: "created_at"} },
    { field: 'ip_address', title: 'IP' },
    { field: 'status', title: '状态'  , slots : {
        default: "status"
      }},
  ],
  minHeight: 500,
  keepSource: true,
  pagerConfig: {

  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        let option: Option[] = [];
        option = GetOption( formValues, GetOperationLogsListOption);
        const listOption: ListOption = {
          options: option,
          limit: page.pageSize,
          offset: (page.currentPage - 1) * page.pageSize,
          offset_token: "",
        };
        const result = await GetOperationLogsListApi({
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

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <div class="p-5">
    <Grid >
      <template #created_at="{ row }">
        {{formatTimestamp(row.created_at)}}
      </template>
      <template #status="{ row }">
        <el-tag size="small"   >{{ row.status===1 ?"成功":"失败" }}</el-tag>
      </template>
    </Grid>
  </div>
</template>
