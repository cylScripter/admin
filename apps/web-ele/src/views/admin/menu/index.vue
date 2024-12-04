<script lang="ts" setup>
import type { VbenFormProps } from "#/adapter/form";
import type { VxeGridProps } from "#/adapter/vxe-table";

import { useVbenDrawer } from "@vben/common-ui";

import { ElButton, ElSwitch, ElMessageBox, ElMessage } from "element-plus";

import { useVbenVxeGrid } from "#/adapter/vxe-table";

// 如果您正在使用CDN引入，请删除下面一行。
import { Delete, Edit, Plus, Setting } from "@element-plus/icons-vue";
import CreateUser from "#/form/createuser/index.vue";

import { formatTimestamp} from "#/utils/utils";

import type { RowType } from "./types";

const [CreateUserDrawer, CreateUserDrawerApi] = useVbenDrawer({
  showConfirmButton: false,
});


const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: "Input",
      componentProps: {
        placeholder: "请输入展示名称",
      },
      defaultValue: "",
      fieldName: "title",
      label: "展示名称",
    },

    {
      component: "Select",
      componentProps: {
        placeholder: "请选择父节点",
      },
      fieldName: "parent_id",
      label: "父节点",
    },
    {
      component: "Input",
      componentProps: {
        placeholder: "请输入路由Name",
      },
      fieldName: "name",
      label: "Name",
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
    { title: "ID", field:"id", width: 50 },
    { field: "title", title: "展示名称" },
    { field: "name", title: "路由Name" },
    { field: "path", title: "路由Path" },
    { field: "parent_id", title: "父节点" },
    { field: "icon", title: "图标" },
    { field: "order", title: "排序" },
    { field: "status", title: "页面组件" },
    { field: "action", title: "操作" },
  ],

  keepSource: true,
  proxyConfig: {
    ajax: {},
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
          新增根菜单
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
