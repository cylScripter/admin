<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {ElButton} from "element-plus";


import {GetUserListApi} from "#/api";

import type { ListOption ,Option} from '#/api/core/list';
import {GetUserListOption} from "#/utils/option";

interface RowType {
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

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      defaultValue: '',
      fieldName: 'nickname',
      label: '用户名',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号',
      },
      fieldName: 'mobile',
      label: '电话',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  // 按下回车时是否提交表单
  submitOnEnter: true,
};

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', title: '选择', type: 'checkbox', width: 100 },
    { field: 'user_id', title: '用户Id' },
    { field: 'nickname', title: '用户名' },
    { field: 'mobile', title: '电话号码' },
    { field: 'email', title: '邮箱' },
    { field: 'last_login_at', formatter: 'formatDateTime', title: '最近登录时间' },
    {
      cellRender: { name: 'CellLink', props: { text: '编辑' } },
      field: 'action',
      fixed: 'right',
      title: '操作',
      width: 120,
    },
  ],

  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page },formData) => {

        const option: Option[] = [];

        for (const key in formData) {

          option.push({
            name: GetUserListOption.get(key),
            value: formData[key],
          });
        }

        const listOption: ListOption = {
          list: option,
          limit: page.pageSize,
          offset: (page.currentPage - 1) * page.pageSize,
          offset_token: '',
        };
        const result = await GetUserListApi({
          list_option: listOption,
        });
        return {
          items: result.users,
          total: result.paginate.total,
        };
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <div class="p-5">
    <Grid >
      <template #toolbar-tools>
        <ElButton type="primary">新增</ElButton>
      </template>

      <template #action >
        <Button type="link">编辑</Button>
      </template>


    </Grid>
  </div>
</template>
