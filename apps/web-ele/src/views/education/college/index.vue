<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import {
  CreateAppApi,
  DeleteAppApi,
  GetAppListApi,
  SetAppStatusApi,
} from "#/api/education";
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { Delete, Edit, Plus, Setting,User } from "@element-plus/icons-vue";
import CreateEduUser from "#/form/createeduuser/index.vue";
import {
  ElButton, ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElSwitch
} from "element-plus";
import type { ListOption, Option } from "#/api/core/list";
import { GetOption } from "#/utils/utils";
import { GetAppListOption } from "#/utils/option";
import { formatTimestamp } from "#/utils/utils";
import type { ModelApp } from "#/types/education";
import useClipboard from 'vue-clipboard3'
import { useVbenDrawer } from '@vben/common-ui';
import { reactive, ref } from "vue";
import { useVbenModal } from '@vben/common-ui';

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入学校',
      },
      fieldName: 'school_name',
      label:  "学校",
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入学院名称',
      },
      fieldName: 'college_name',
      label: '学院',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入AppId',
      },
      fieldName: 'id',
      label: 'AppId',
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

const gridOptions: VxeGridProps<ModelApp> = {
  toolbarConfig: {
    custom: true,
    refresh: true,
    zoom: true,
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'school_name', title: '学校' },
    { field: 'college_name', title: '学院名称' },
    { field: 'id', title: 'AppId', slots : {default: "id"} },
    { field: 'created_at', title: '创建时间',
     slots : {
      default: "created_at"
     }
    },
    {
      field: "app_secret",
      title: "AppSecret",
      slots : {
        default: "app_secret"
      }
      ,
      width: 250
    },
    {
      field: "status",
      title: "启用",
      slots : {
        default: "status"
      }
    },
    {
      field: "action",
      title: "操作" ,
      slots: { default: "action" },
      width: 350
    },

  ],
  keepSource: true,
  pagerConfig: {},
  height: 760,

  proxyConfig: {
    ajax: {
      query: async ({ page }, formData) => {
        let option: Option[] = [];
        option = GetOption( formData,GetAppListOption);
        const listOption: ListOption = {
          options: option,
          limit: page.pageSize,
          offset: (page.currentPage - 1) * page.pageSize,
          offset_token: "",
        };
        const result = await GetAppListApi({
          list_option: listOption,
        });
        console.log(result);
        return {
          items: result.list,
          total: result.paginate.total,
        };
      },
    },
  },

};

const [Grid, gridRef] = useVbenVxeGrid({ formOptions, gridOptions });

const { toClipboard } = useClipboard();

const school_name = ref("");
const college_name = ref("");

const copys = async (text: string) => {
  try {
    await toClipboard(text);
    ElMessage.success("复制成功");
  } catch (error) {
    ElMessage.error("复制失败");
    console.error(error);
  }
};

const submitCreateApp = () => {
     CreateAppApi( {
       school_name: school_name.value,
       college_name: college_name.value
     }).then((resp) => {
       console.log(resp);
       ElMessage.success("创建成功");
       school_name.value = "";
       college_name.value = "";
       CreateAppModalApi.close()
       gridRef.query()
     })
};
const [CreateAppModal, CreateAppModalApi] = useVbenModal({
    onConfirm: submitCreateApp
  }
);

// 确认删除
const handleDelete = (id : number) => {
  ElMessageBox.confirm("此操作将永久删除该主体, 是否继续?", "确认删除", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      DeleteAppApi({
        ids : [id]
      }).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        gridRef.query()
      })
    })
};




const college = reactive<ModelApp>({
  id: 0,
  created_at: 0,
  updated_at: 0,
  deleted_at: 0,
  school_name: "",
  college_name: "",
  app_key: "",
  app_secret: "",
  status: false
})



const createUserEvent = (app :ModelApp) => {
   console.log(app);
   college.id = app.id;
   college.app_key = app.app_key;
   college.app_secret = app.app_secret;
   college.college_name = app.college_name;
   college.school_name = app.school_name;
   college.status = app.status

  console.log(college);
   drawerApi.open()
}

const submitCreateUser = () => {
  childRef.value.CreateUser();
}
const [Drawer, drawerApi] = useVbenDrawer({
  onConfirm: submitCreateUser,
});

const closeDrawer = () => {
  drawerApi.close();
  gridRef.query();
}

const childRef = ref();
const switchStatus =ref<Map<number,boolean>>(new Map())
const setAppStatus = (id:number,status:boolean) => {
  if (switchStatus.value.get(id)){
    return
  }
  console.log(id,status);
  switchStatus.value.set(id,true)

  SetAppStatusApi({
    values: [{
      id: id,
      value: status
    }]
  }).then(()=>{
    switchStatus.value.set(id,false)
    ElMessage.success("修改成功")
  }).catch(()=>{
    switchStatus.value.set(id,false)
  })
}


</script>

<template>
  <div class="p-5">
      <Grid>
        <template #toolbar-tools>
          <ElButton :icon="Plus" type="primary" @click="CreateAppModalApi.open()" >
            新增主体
          </ElButton>
        </template>

        <template #action="{ row }">
          <ElButton
            :key="row.id"
            :icon="Delete"
            link
            type="primary"
            @click="() => handleDelete(row.id)"
          >
            删除
          </ElButton>
          <ElButton
            :key="row.id"
            :icon="Edit"
            link
            type="primary"
          >
            <RouterLink :to="'appInfo?id='+String(row.id)">
              详情
            </RouterLink>
          </ElButton>

          <ElButton :key="row.id" :icon="User" link type="primary" >
            <RouterLink :to="'eduUserInfo?app_id='+String(row.id)">
              用户
            </RouterLink>
          </ElButton>
          <ElButton :key="row.id" :icon="Setting" link type="primary" @click="createUserEvent(row)"> 创建用户 </ElButton>
        </template>

        <template #status="{ row }">
          <ElSwitch v-model="row.status" :loading="switchStatus.get(row.id)===undefined ?false :switchStatus.get(row.id)"  @click="() => setAppStatus(row.id,row.status)"/>
        </template>

        <template #created_at="{row}">
          {{ formatTimestamp(row.created_at) }}
        </template>

        <template #app_secret="{row}">
          <ElButton link type="primary"  @click="copys(row.app_secret)">
            {{ row.app_secret }}
          </ElButton>
        </template>

        <template #id="{row}">
          <ElButton link type="primary" @click="copys(String(row.id))">
            {{ row.id }}
          </ElButton>
        </template>
      </Grid>
      <CreateAppModal class="w-[600px]" title="创建主体">
        <div class="form-container">
          <ElForm class="w-[500px]  "  :inline="true" label-position="right" label-width="auto">

            <ElFormItem label="学校名称" >
              <ElInput style="width: 400px;"  v-model="school_name"   placeholder="请输入学校名称" clearable />
            </ElFormItem>


            <ElFormItem label="学院名称">
              <ElInput  style="width: 400px;"   v-model="college_name"   placeholder="请输入学院名称" clearable />
            </ElFormItem>

          </ElForm>

        </div>

      </CreateAppModal>
      <Drawer class="w-[600px]" title="创建用户">
        <div class="m-2 p-5">
          <CreateEduUser :item="college" :closeDrawer="closeDrawer" ref="childRef"> </CreateEduUser>
        </div>
      </Drawer>

  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.form-container .el-form {
  margin: 20px auto;
  width: 500px;
}
</style>
