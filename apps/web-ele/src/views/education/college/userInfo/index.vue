<script lang="ts" setup>
import type { VbenFormProps } from "#/adapter/form";
import type { VxeGridProps } from "#/adapter/vxe-table";
import type { ListOption, Option } from "#/api/core/list";

import { Page } from "@vben/common-ui";

import {
  ElButton,
  ElMessage,
  ElMessageBox, ElNotification,
  ElSwitch,
  ElTag,
  ElTree
} from "element-plus";
import { useVbenVxeGrid } from "#/adapter/vxe-table";
import { Delete, Edit, Setting } from "@element-plus/icons-vue";

import { GetEduUserListOption } from "#/utils/option";
import {
  copy,
  formatTimestamp,
  isUndefined,
  type TreeNode
} from "#/utils/utils";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import {
  GetEduRoleListApi,
  GetEduUserListApi,
  GetEduUserTokenApi,
  GetPasswordApi,
  ResetEduUserPasswordApi, SetEduUserRoleApi
} from "#/api/education";
import { ref } from "vue";
const route = useRoute();
const queryParam = route.query;
console.log(queryParam);

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
      fieldName: "user_name",
      label: "用户名",
    },
    {
      component: "Input",
      componentProps: {
        placeholder: "请输入姓名",
      },
      defaultValue: "",
      fieldName: "nick_name",
      label: "姓名",
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
const userRoleMap = ref();
const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: "name",
  },
  columns: [
    { title: "序号", type: "seq", width: 50 },
    { align: "left", title: "选择", type: "checkbox", width: 100 },
    { field: "user_name", title: "用户名" },
    { field: "nick_name", title: "姓名" },
    { field: "mobile", title: "电话号码" },
    { field: "email", title: "邮箱" },

    {
      slots: {
        default: "role",
      },
      field: "role",
      title: "角色",
      width: 350,
    },


    {
      slots: {
        default: "action",
      },
      field: "action",
      title: "操作",
      width: 350,
    },
  ],

  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formData) => {
        const option: Option[] = [];
        for (const key in formData) {
          if (GetEduUserListOption.has(key) && !isUndefined(formData[key])) {
            option.push({
              name: GetEduUserListOption.get(key),
              value: formData[key],
            });
          }
        }
        const listOption: ListOption = {
          options: option,
          limit: page.pageSize,
          offset: (page.currentPage - 1) * page.pageSize,
          offset_token: "",
        };
        const result = await GetEduUserListApi({
          list_option: listOption,
          app_id : Number(queryParam.app_id)
        });
        userRoleMap.value= result.role_map;
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

const [Grid, gridRef] = useVbenVxeGrid({ formOptions, gridOptions });




const router = useRouter();


const getEduUserToken = async (id:number) => {
  GetEduUserTokenApi({
    user_id : id,
    app_id : Number(queryParam.app_id)
  }).then((res) => {
    copy(res.token)
  });
}

const getPassword = (id:string) => {
  GetPasswordApi({
    user_id: id,
    app_id: Number(queryParam.app_id)
  }).then((res) => {
    copy(res.password)
  })
}



// 确认删除
const handleResetPassword = (id:number) => {
  ElMessageBox.confirm("此操作不可逆, 是否继续?", "确认修改", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ResetEduUserPasswordApi({
        user_id: id,
        app_id: Number(queryParam.app_id)
      }).then(() => {
        ElMessage.success("重置成功")
      })
    })
};



import { useVbenDrawer } from '@vben/common-ui';

const data = ref<TreeNode[]>([])
const checkedKey = ref<number[]>([])

const defaultProps = {
  children: 'children',
  label: 'label',
}


const checkedKeys = ref()
const userId = ref()
const setRole = () => {
  console.log(checkedKeys.value.getCheckedKeys())
  SetEduUserRoleApi({
    user_id: Number(userId.value),
    app_id: Number(queryParam.app_id),
    role_ids: checkedKeys.value.getCheckedKeys()
  }).then(() => {
    ElNotification({
      title: 'Success',
      message: '设置成功',
      type: 'success',
    });
    drawerApi.close()
    gridRef.query()
  })
}

const [Drawer, drawerApi] = useVbenDrawer({
  onConfirm: setRole,
});

// 将 JSON 数据转换为 TreeNode 结构
function convertToTreeNode(data: Array<any>): TreeNode[] {
  const rootNodes: TreeNode[] = [];
  // 处理父子关系
  data.forEach(item => {
    rootNodes.push({ id: item.id, label: item.name, children: [] })
  });
  return rootNodes;
}


const openDrawer = (id:number) => {
  drawerApi.open()
  userId.value = id
  GetEduRoleListApi({
    app_id : Number(queryParam.app_id),
    list_option: {
      limit: 1000,
      offset: 0,
      offset_token: "",
      options:[],
    },
  }).then((res) => {
   data.value = convertToTreeNode(res.list)
  })
  checkedKey.value = [];
  for (let i = 0; i < userRoleMap.value[id].length; i++) {
    const item = userRoleMap.value[id][i];
    checkedKey.value.push(item.id)
  }
};





</script>

<template>

  <Page>



    <template #title>
      <div>
        <ElButton link type="primary" @click="router.back()">
          <Icon icon="icon-park-outline:left" width="24" height="24" style="color: #1b5cff" />返回
        </ElButton>
      </div>
    </template>


    <div class="p-2" >
      <Grid >
        <template #toolbar-tools>
        </template>

        <template #last_login_at="{ row }">
          {{ formatTimestamp(row.last_login_at) }}
        </template>

        <template #status="{ row }">
          <ElSwitch v-model="row.status" />
        </template>

        <template #role="{ row }">
          <el-tag size="small" v-for="item in userRoleMap[row.id]" class="mr-2">{{item.name}}</el-tag>
        </template>

        <template #action="{ row }">
          <ElButton :key="row.id" :icon="Edit" link type="primary" @click="getEduUserToken(row.id)">Token</ElButton>
          <ElButton :key="row.id" :icon="Edit" link type="primary" @click="getPassword(row.user_name)">密码</ElButton>
          <ElButton
            :key="row.id"
            :icon="Delete"
            link
            type="primary"
            @click="() => handleResetPassword(row.id)"
          >
            重置密码
          </ElButton>
          <ElButton :key="row.id" :icon="Setting" link type="primary" @click="openDrawer(row.id)"> 设置角色 </ElButton>


        </template>
      </Grid>
      <Drawer class="w-[600px]" title="设置角色">

        <el-tree   style="max-width: 600px"
                   :data="data"
                   show-checkbox
                   node-key="id"
                   :default-checked-keys="checkedKey"
                   :props="defaultProps"
                   v-model="checkedKey"
                   ref="checkedKeys"
        />
      </Drawer>
    </div>
  </Page>

</template>
