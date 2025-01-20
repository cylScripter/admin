<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ElButton,ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElTable,
  ElTableColumn,
  ElTag,
} from "element-plus";
import { Page } from "@vben/common-ui";
import { Icon } from '@iconify/vue';
import { GetAppApi, GetPasswordApi } from "#/api/education";
import type { ModelApp, ModelRole, ModelUser } from "#/types/education";
import { copy } from "#/utils/utils";



// 获取当前路由对象
const route = useRoute();
const router = useRouter();
// 获取动态参数
const queryParam = route.query;


const appInfo = ref<ModelApp>({
  id: 0,
  school_name: "",
  college_name: "",
  created_at: 0,
  updated_at: 0,
  deleted_at: 0,
  app_key: "",
  app_secret: "",
  status: false,
})
const user = ref<ModelUser>({
  id: 0,
  created_at: 0,
  updated_at: 0,
  deleted_at: 0,
  user_name: "",
  nick_name: "",
  email: "",
  mobile: "",
  avatar: "",
  status: false,
  app_id: 0,
})
const role = ref<ModelRole[]>()


onMounted(() => {
  GetAppApi({id: Number(queryParam.id)}).then((res) => {
    appInfo.value = res.app
    user.value = res.user
    console.log(res)
    role.value = res.roles
  })
})

const  GetPassword = () => {
  GetPasswordApi({
    user_id: user.value.user_name,
    app_id: appInfo.value.id
  }).then((res) => {
    copy(res.password)
  })
 }


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

    <ElCard >
      <template #header>
        <div class="card-header">
          <span>主体详情</span>
        </div>

      </template>
      <ElDescriptions title="" border>
        <el-descriptions-item label="学校名称">{{appInfo.school_name}}</el-descriptions-item>
        <el-descriptions-item label="学院名称">{{appInfo.college_name}}</el-descriptions-item>
        <el-descriptions-item label="AppId">{{appInfo.id}}</el-descriptions-item>
        <el-descriptions-item label="是否启用">
          <el-tag size="small">{{appInfo.status  ? '启用' : '禁用'}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="AppKey">
          <ElButton link type="primary"  @click="copy(appInfo.app_key)">{{appInfo.app_key}} </ElButton>
        </el-descriptions-item>
        <el-descriptions-item label="AppSecret">
          <ElButton link type="primary"  @click="copy(appInfo.app_secret)">{{appInfo.app_secret}} </ElButton>
        </el-descriptions-item>
      </ElDescriptions>

    </ElCard>

    <ElCard class="mt-5" >
      <template #header>
        <div class="card-header">
          <span>管理员账号</span>
        </div>

      </template>
      <ElDescriptions title="" border>
        <el-descriptions-item label="用户名">{{user.user_name}}
          <ElButton link type="primary"  @click="copy(user.user_name)"> <Icon icon="tabler:copy" width="14" height="14"  style="color: #838383" /> 复制 </ElButton>
        </el-descriptions-item>
        <el-descriptions-item label="姓名">{{user.nick_name}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{user.email}}</el-descriptions-item>
        <el-descriptions-item label="电话">
         {{user.mobile}}
        </el-descriptions-item>
        <el-descriptions-item label="密码">
          <ElButton link type="primary"  @click="GetPassword"> <Icon icon="tabler:copy" width="14" height="14"  style="color: #838383" /> 复制密码 </ElButton>
        </el-descriptions-item>
        <el-descriptions-item label="角色">
          <el-tag size="small" class="m-1" v-for="item in role">{{item.name}}</el-tag>
        </el-descriptions-item>
      </ElDescriptions>

    </ElCard>


    <ElCard class="mt-5" >
      <template #header>
        <div class="card-header">
          <span>角色</span>
        </div>

      </template>


      <el-table
        :data="role"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column prop="str_role_id" label="角色Id" />
      </el-table>

    </ElCard>
  </Page>
</template>
