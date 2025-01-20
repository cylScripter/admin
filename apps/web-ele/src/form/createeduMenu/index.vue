<script lang="ts" setup>
import {  ElRow,ElCol,
  ElInput, ElFormItem,ElForm,
   ElSelect, ElOption ,ElDivider,ElSwitch,ElNotification,
  } from "element-plus";
import { defineProps, ref} from 'vue';
import { onMounted } from 'vue';
import type { Option } from "#/api/core/list";
import { CreateMenuApi, GetMenuListApi, UpdateMenuApi } from "#/api/education";
const props = defineProps(["data","actionType","closeDrawer"]);

const parentIdIsDisabled = ref(false);
interface option {
  label: string;
  value: number;
}

const menuSelectOption = ref();
const GetMenuSelectOption =async ()=>{
  let option: Option[] = [];
  // option.push({name:6 , value: "0"});
  const resp = await GetMenuListApi({
    list_option: {
      options: option,
      limit: 100,
      offset: 0,
      offset_token: "",
    },
  });
  let result: option[] = [];
  console.log(resp.list);
  resp.list.forEach((item: any) => {
    result.push({label: item.name+`(${item.meta.title})`, value: item.id});
  });


  menuSelectOption.value = result;

  console.log(menuSelectOption.value);
}

onMounted(() => {
  console.log(props.actionType);
  if (props.actionType==="create"){
    parentIdIsDisabled.value = true;
  }
  if (props.actionType==="update"){
    parentIdIsDisabled.value = false;
  }
  GetMenuSelectOption();

})

const CreateMenu =  ()=>{
  CreateMenuApi({
    name: props.data.name,
    path: props.data.path,
    parent_id: props.data.parent_id,
    component: props.data.component,
    redirect: props.data.redirect,
    meta: {
      title: props.data.meta.title,
      icon: props.data.meta.icon,
      activeIcon: props.data.meta.activeIcon,
      keepAlive: props.data.meta.keepAlive,
      hideInMenu: props.data.meta.hideInMenu,
      hideInTab: props.data.meta.hideInTab,
      hideInBreadcrumb: props.data.meta.hideInBreadcrumb,
      hideChildrenInMenu: props.data.meta.hideChildrenInMenu,
      badge: props.data.meta.badge,
      badgeType: props.data.meta.badgeType,
      badgeVariants: props.data.meta.badgeVariants,
      activePath: props.data.meta.activePath,
      affixTab: props.data.meta.affixTab,
      iframeSrc: props.data.meta.iframeSrc,
      ignoreAccess: props.data.meta.ignoreAccess,
      link: props.data.meta.link,
      maxNumOfOpenTab: props.data.meta.maxNumOfOpenTab,
      order: props.data.meta.order,
      openInNewWindow: props.data.meta.openInNewWindow,
      badgeText: props.data.meta.badgeText,
    }
  }).then( (resp) => {
    console.log(resp);
    props.closeDrawer();
    ElNotification({
    title: 'Success',
    message: '创建成功',
    type: 'success',
  });
  }).catch((error) => {
    console.log(error);
  });
}


const UpdateMenu = () => {
  console.log("updateMenu");
  UpdateMenuApi({
    id: props.data.id,
    name: props.data.name,
    path: props.data.path,
    parent_id: props.data.parent_id,
    component: props.data.component,
    redirect: props.data.redirect,
    meta: {
      title: props.data.meta.title,
      icon: props.data.meta.icon,
      activeIcon: props.data.meta.activeIcon,
      keepAlive: props.data.meta.keepAlive,
      hideInMenu: props.data.meta.hideInMenu,
      hideInTab: props.data.meta.hideInTab,
      hideInBreadcrumb: props.data.meta.hideInBreadcrumb,
      hideChildrenInMenu: props.data.meta.hideChildrenInMenu,
      badge: props.data.meta.badge,
      badgeType: props.data.meta.badgeType,
      badgeVariants: props.data.meta.badgeVariants,
      activePath: props.data.meta.activePath,
      affixTab: props.data.meta.affixTab,
      iframeSrc: props.data.meta.iframeSrc,
      ignoreAccess: props.data.meta.ignoreAccess,
      link: props.data.meta.link,
      maxNumOfOpenTab: props.data.meta.maxNumOfOpenTab,
      order: props.data.meta.order,
      openInNewWindow: props.data.meta.openInNewWindow,
      badgeText: props.data.meta.badgeText,
    }
  }).then( (resp) => {
    console.log(resp);
    props.closeDrawer();
    ElNotification({
    title: 'Success',
    message: '修改成功',
    type: 'success',
  });
  }).catch((error) => {
    console.log(error);
  });

}
// 公开方法
defineExpose({
  CreateMenu,
  UpdateMenu,
});

</script>
<template>
  <ElForm class="demo-form-inline" :inline="true" label-position="right" label-width="auto">
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem  label="展示名称" label-position="right">
          <ElInput v-model="data.meta.title" placeholder="请输入展示名称" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem   label="路由Name" label-position="right">
          <ElInput   v-model="data.name" placeholder="请输入路由Name" />
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem  label="路由Path" label-position="right">
          <ElInput   v-model="data.path" placeholder="请输入路由Path" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="父节点">
          <ElSelect v-model="data.parent_id" placeholder="请选择父节点" size="large" style="width: 180px" :disabled="parentIdIsDisabled">
            <ElOption :label="'根路径'" :value="0"  />
            <ElOption v-for="item in menuSelectOption" :label="item.label" :value="item.value"  />
          </ElSelect>
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="页面组件">
          <ElInput v-model="data.component"  placeholder="请输入页面组件"  />
        </ElFormItem>
      </ElCol>

      <ElCol :span="12">
        <ElFormItem label="重定向路由">
          <ElInput   v-model="data.redirect" placeholder="请输入重定向路由"  />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElDivider content-position="left">路由Meta配置类型</ElDivider>

    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem   label="图标" label-position="right">
          <ElInput v-model="data.meta.icon" placeholder="请输入图标" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="激活图标">
          <ElInput v-model="data.meta.activeIcon" placeholder="请输入图标" />
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="开启缓存">
          <ElSwitch v-model="data.meta.keepAlive" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="菜单中隐藏">
          <ElSwitch v-model="data.meta.hideInMenu" />
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="标签页中隐藏">
          <ElSwitch v-model="data.meta.hideInTab" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="面包屑中隐藏">
          <ElSwitch v-model="data.meta.hideInBreadcrumb" />
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="隐藏子页面">
          <ElSwitch v-model="data.meta.hideChildrenInMenu" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="页面权限">
          <ElSelect  multiple placeholder="请选择权限" size="large" style="width: 180px" disabled>
            <ElOption label="权限一" value="permission1" />
            <ElOption label="权限二" value="permission2" />
          </ElSelect>
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="徽标">
          <ElInput placeholder="请输入徽标" v-model="data.meta.badge" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="徽标类型" >
          <ElSelect v-model="data.meta.badgeType" placeholder="请选择徽标类型" size="large" style="width: 180px">
            <ElOption label="dot" value="dot" />
            <ElOption label="normal" value="normal" />
          </ElSelect>
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="徽标颜色">
          <ElSelect v-model="data.meta.badgeVariants" placeholder="请选择徽标颜色" size="large" style="width: 180px">
            <ElOption label="default" value="default" />
            <ElOption label="destructive" value="destructive" />
            <ElOption label="primary" value="primary" />
            <ElOption label="success" value="success" />
            <ElOption label="warning" value="warning" />
          </ElSelect>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="激活路径">
          <ElInput placeholder="请输入激活路径" v-model="data.meta.activePath" />
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="固定标签页">
          <ElSwitch v-model="data.meta.affixTab" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="固定标签页排序">
          <ElInput   disabled/>
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="iframe地址">
          <ElInput placeholder="请输入 iframe 地址" v-model="data.meta.iframeSrc" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="忽略权限">
          <ElSwitch v-model="data.meta.ignoreAccess"  />
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="外链跳转路径">
          <ElInput placeholder="请输入外链跳转路径" v-model="data.meta.link" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="最大打开标签页数量">
          <ElInput v-model="data.meta.maxNumOfOpenTab" />
        </ElFormItem>
      </ElCol>
    </ElRow>
    <ElRow :gutter="25">
      <ElCol :span="12">
        <ElFormItem label="排序">
          <ElInput v-model="data.meta.order" />
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <ElFormItem label="新窗口打开">
          <ElSwitch v-model="data.meta.openInNewWindow" />
        </ElFormItem>
      </ElCol>
    </ElRow>

  </ElForm>
</template>
