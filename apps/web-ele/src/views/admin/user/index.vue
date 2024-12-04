<script lang="ts" setup>
import type { VbenFormProps } from "#/adapter/form";
import type { VxeGridProps } from "#/adapter/vxe-table";
import type { ListOption, Option } from "#/api/core/list";

import { useVbenDrawer } from "@vben/common-ui";

import { ElButton, ElSwitch, ElMessageBox, ElMessage } from "element-plus";

import { useVbenVxeGrid } from "#/adapter/vxe-table";

// 如果您正在使用CDN引入，请删除下面一行。
import { Delete, Edit, Plus, Setting } from "@element-plus/icons-vue";

import { GetUserListApi } from "#/api";
import CreateUser from "#/form/createuser/index.vue";
import { GetUserListOption } from "#/utils/option";
import { formatTimestamp, isUndefined } from "#/utils/utils";

const [CreateUserDrawer, CreateUserDrawerApi] = useVbenDrawer({
  showConfirmButton: false,
});

interface RowType {
  id: string;
  user_id: string;
  nickname: string;
  email: string;
  mobile: string;
  status: boolean;
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
      component: "Input",
      componentProps: {
        placeholder: "请输入用户名",
      },
      defaultValue: "",
      fieldName: "nickname",
      label: "用户名",
    },
    {
      component: "Input",
      componentProps: {
        placeholder: "请输入手机号",
      },
      fieldName: "mobile",
      label: "电话",
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: "查询",
  },
  // 按下回车时是否提交表单
  submitOnEnter: true,
};

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: "name",
  },
  columns: [
    { title: "序号", type: "seq", width: 50 },
    { align: "left", title: "选择", type: "checkbox", width: 100 },
    { field: "user_id", title: "用户Id" },
    { field: "nickname", title: "用户名" },
    { field: "mobile", title: "电话号码" },
    { field: "email", title: "邮箱" },
    {
      field: "last_login_at",
      slots: {
        default: "last_login_at",
      },
      title: "最近登录时间",
    },
    {
      field: "status",
      slots: {
        default: "status",
      },
      title: "启用",
      width: 100,
    },
    {
      slots: {
        default: "action",
      },
      field: "action",
      fixed: "right",
      title: "操作",
      width: 250,
    },
  ],

  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formData) => {
        const option: Option[] = [];
        for (const key in formData) {
          if (GetUserListOption.has(key) && !isUndefined(formData[key])) {
            option.push({
              name: GetUserListOption.get(key),
              value: formData[key],
            });
          }
        }
        const listOption: ListOption = {
          list: option,
          limit: page.pageSize,
          offset: (page.currentPage - 1) * page.pageSize,
          offset_token: "",
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
    refresh: true,
    zoom: true,
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });

// 确认删除
const handleDelete = () => {
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "确认删除", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>

<template>
  <div class="p-5" >
    <Grid >
      <template #toolbar-tools>
        <ElButton :icon="Plus" type="primary" @click="() => CreateUserDrawerApi.open()">
          新增
        </ElButton>
      </template>

      <template #last_login_at="{ row }">
        {{ formatTimestamp(row.last_login_at) }}
      </template>

      <template #status="{ row }">
        <ElSwitch v-model="row.status" />
      </template>

      <template #action="{ row }">
        <ElButton
          :key="row.id"
          :icon="Delete"
          link
          type="primary"
          @click="() => handleDelete()"
        >
          删除
        </ElButton>
        <ElButton :key="row.id" :icon="Edit" link type="primary">编辑</ElButton>
        <ElButton :key="row.id" :icon="Setting" link type="primary"> 设置角色 </ElButton>
      </template>
    </Grid>
    <CreateUserDrawer class="w-[600px]" title="基础示例">
      <div class="m-2 p-5">
        <CreateUser />
      </div>
    </CreateUserDrawer>
  </div>
</template>
