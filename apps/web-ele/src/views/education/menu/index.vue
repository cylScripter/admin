<script lang="ts" setup>
import type { VbenFormProps } from "#/adapter/form";
import type { VxeGridProps } from "#/adapter/vxe-table";
import type { ListOption, Option } from "#/api/core/list";
import { useVbenDrawer } from "@vben/common-ui";
import { ElButton, ElSwitch, ElMessageBox, ElMessage } from "element-plus";
import { useVbenVxeGrid } from "#/adapter/vxe-table";
import { Delete, Edit, Plus  } from "@element-plus/icons-vue";
import { Icon } from '@iconify/vue';
import CreateMenu from "#/form/createeduMenu/index.vue";
import { formatTimestamp, GetOption} from "#/utils/utils";
import { DeleteMenuApi, GetMenuListApi, SetEduMenuStatusApi } from "#/api/education";

import { GetEducationListOption } from "#/utils/option";
import { reactive ,ref} from "vue";
import type { ModelMenu } from "#/types/education";


interface option {
  label: string;
  value: string;
}
//
let FormData = reactive<ModelMenu>({
  id: 0,
  created_at: 0,
  updated_at: 0,
  deleted_at: 0,
  component: "",
  meta: {
    title: "",
    order: 0,
    icon: "",
    badge: "",
    iframeSrc: "",
    affixTab: false,
    activePath: "",
    badgeVariants: "",
    badgeType: "",
    badgeText: "",
    hideChildrenInMenu: false,
    hideInTab: false,
    hideInMenu: false,
    keepAlive: false,
    activeIcon: "",
    hideInBreadcrumb: false,
    ignoreAccess: false,
    link: "",
    openInNewWindow: false,
    maxNumOfOpenTab: 0,
  },
  name: "",
  path: "",
  redirect: "",
  parent_id: 0,
  children: [],
  status: false,
});

const getOption =  ()=>{
  let option: Option[] = [];
  option.push({name:6 , value: "0"});
  const resp =  GetMenuListApi({
    list_option: {
      options: option,
      limit: 100,
      offset: 0,
      offset_token: "",
    },
  });
  let result: option[] = [];
  result.push({label: "根节点", value: "0"});
  resp.then(async ()=>{
    (await resp).list.forEach((menu) => result.push(
      {label: menu.name+`(${menu.meta.title})`, value: menu.id.toString()}
    ));
  });

  return result;
}



const childRef = ref();

const menuOnSubmit = () => {

  if (actionTypeRef.value == "create"){
    childRef.value.CreateMenu();
  }else{
    childRef.value.UpdateMenu();
  }
};





const [CreateMenuDrawer, CreateMenuDrawerApi] = useVbenDrawer({
  onConfirm: menuOnSubmit,
});

const formOptions: VbenFormProps = {
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
      component: 'Select',
      componentProps: {
        placeholder: '请选择父节点',
        options: getOption(),
      },
      fieldName: 'parent_id',
      label: '父节点',
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

const gridOptions: VxeGridProps<ModelMenu> = {
  checkboxConfig: {
    highlight: true,
    labelField: "name",
  },
  columns: [
    { title: "ID", field:"id", width: 50 },
    {
      field: "title",
      title: "展示名称" ,
      slots: { default: "title" }
    },
    { field: "name", title: "路由Name" },
    { field: "path", title: "路由Path" },
    { field: "parent_id", title: "父节点" },
    {
      field: "icon",
      title: "图标" ,
      slots: { default: "icon" },
      width: 80,
    },
    { field: "component", title: "页面组件" },
    {
      field: "status",
      title: "启用" ,
      slots: { default: "status" },
      width: 100
    },
    {
      field: "action",
      title: "操作" ,
      slots: { default: "action" },
      width: 250
    },
  ],
  keepSource: true,
  minHeight: 600,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formData) => {
        let option: Option[] = [];
        option = GetOption( formData,GetEducationListOption);
        const listOption: ListOption = {
          options: option,
          limit: page.pageSize,
          offset: (page.currentPage - 1) * page.pageSize,
          offset_token: "",
        };
        const result = await GetMenuListApi({
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

const [Grid,GridAPi] = useVbenVxeGrid({ formOptions, gridOptions });

// 确认删除
const handleDelete = (id:number) => {
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "确认删除", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const resp = DeleteMenuApi({ ids: [id] });
      resp.then(() => {
        GridAPi.query();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      });
    })
};

const resetMeta = () => {
  return {
    title: "Api管理",
    order: 0,
    icon: "eos-icons:api",
    badge: "",
    iframeSrc: "",
    affixTab: false,
    activePath: "",
    badgeVariants: "",
    badgeType: "",
    badgeText: "",
    hideChildrenInMenu: false,
    hideInTab: false,
    hideInMenu: false,
    keepAlive: false,
    activeIcon: "",
    hideInBreadcrumb: false,
    ignoreAccess: false,
    link: "",
    openInNewWindow: false,
    maxNumOfOpenTab: 0,
  };
};

const actionTypeRef = ref("create");
const OpenCreateMenuDrawer = (data: ModelMenu| null,actionType:string,parent :number) => {
  if (actionType == "create"){
    FormData.parent_id = parent;
    FormData.id = 0;
    FormData.name = "api";
    FormData.path = "/apimanager";
    FormData.component = "BasicLayout";
    FormData.redirect = "";
    FormData.meta = resetMeta();
    actionTypeRef.value = "create";
  }


  if (actionType == "update"){
    actionTypeRef.value = "update";
  }

  if (data != null ){
    FormData.parent_id = parent
    FormData.meta = data.meta;
    FormData.id = data.id;
    FormData.name = data.name;
    FormData.path = data.path;
    FormData.component = data.component;
    FormData.redirect = data.redirect;
    FormData.parent_id = data.parent_id;
    FormData.children = data.children;
  }
  CreateMenuDrawerApi.open();

}

const closeDrawer = () => {
  CreateMenuDrawerApi.close();
  GridAPi.query();
}

import {  useRouter } from "vue-router";
const router = useRouter();

const openSetFunc = () => {
  // 这里就是路由跳转，也可以用path
  router.push({ path: "/setFunc" });
};


const switchStatus =ref<Map<number,boolean>>(new Map())
const setMenuStatus = (id:number,status:boolean) => {
   if (switchStatus.value.get(id)){
     return
   }
   console.log(id,status);
   switchStatus.value.set(id,true)

  SetEduMenuStatusApi({
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
  <div class="p-5" >
    <Grid >
      <template #toolbar-tools>
        <ElButton :icon="Plus" type="primary" @click="OpenCreateMenuDrawer(null,'create',0)">
          新增根菜单
        </ElButton>

        <ElButton :icon="Plus" type="primary" @click="openSetFunc">
          配置权限
        </ElButton>
      </template>

      <template #last_login_at="{ row }">
        {{ formatTimestamp(row.last_login_at) }}
      </template>
      <template #icon="{ row }">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
          <Icon :icon="row.meta.icon" />
        </div>
      </template>
      <template #status="{ row }">
        <ElSwitch v-model="row.status" :loading="switchStatus.get(row.id)===undefined ?false :switchStatus.get(row.id)"    @click="() => setMenuStatus(row.id,row.status)" />
      </template>
      <template #title="{ row }">
        <span>{{ row.meta.title}}</span>
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
        <ElButton :key="row.id" :icon="Edit" link type="primary"@click="OpenCreateMenuDrawer(row,'update',row.parent_id)" >编辑</ElButton>
        <ElButton :key="row.id" :icon="Plus" link type="primary" @click="OpenCreateMenuDrawer(null,'create',row.id)"> 添加子菜单 </ElButton>
      </template>
    </Grid>

    <CreateMenuDrawer class="w-[800px]" title="编辑菜单">
      <CreateMenu  :data="FormData" :actionType="actionTypeRef" ref="childRef" :closeDrawer="closeDrawer"></CreateMenu>
    </CreateMenuDrawer>


  </div>
</template>


