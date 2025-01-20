<script setup lang="ts">
import {
  ElInput,
  ElFormItem, ElSelect, ElOption, ElNotification

} from "element-plus";
import { defineProps, reactive } from "vue";
import {CreateEduUserApi} from "#/api/education"



interface user {
  user_name:string;
  nick_name:string;
  app_id : number ;
  password : string;
  email : string;
  mobile : string;
  avatar: string;
}

const props = defineProps(["item","closeDrawer"]);
const data = reactive<user>({
  user_name:"",
  nick_name:"",
  app_id : props.item.id,
  password : "",
  email : "",
  mobile : "",
  avatar: ""
})

const CreateUser = () => {
  CreateEduUserApi({
    app_id: data.app_id,
    username: data.user_name,
    password: data.password,
    nick_name: data.nick_name,
    email: data.email,
    mobile: data.mobile,
    avatar: data.avatar,
    }
  ).then((res) => {
    props.closeDrawer();
    ElNotification({
      title: 'Success',
      message: '创建成功',
      type: 'success',
    });
  });
};

defineExpose({
  CreateUser
});

</script>

<template>

  <ElForm  :inline="true"   label-position="right"  label-width="auo">

    <ElFormItem label="主体" required label-position="right">
      <ElSelect v-model="data.app_id"  placeholder="请选择学院"  >
        <ElOption :label="item.college_name" :value="item.id" >
          {{item.college_name}}
        </ElOption>
      </ElSelect>
    </ElFormItem>

    <ElFormItem label="学号" required label-position="right">
      <ElInput v-model="data.user_name" clearable   placeholder="请输入学号"></ElInput>
    </ElFormItem>

    <ElFormItem label="姓名" required label-position="right">
      <ElInput v-model="data.nick_name"  clearable  placeholder="请输入姓名"></ElInput>
    </ElFormItem>

    <ElFormItem label="密码" required label-position="right">
      <ElInput v-model="data.password"  type="password"  clearable placeholder="请输入密码"></ElInput>
    </ElFormItem>

    <ElFormItem label="邮箱" label-position="right">
      <ElInput v-model="data.email"    clearable placeholder="请输入邮箱"></ElInput>
    </ElFormItem>

    <ElFormItem label="电话" label-position="right">
      <ElInput v-model="data.mobile"    clearable placeholder="请输入电话"></ElInput>
    </ElFormItem>
  </ElForm>
</template>

<style scoped>

</style>
