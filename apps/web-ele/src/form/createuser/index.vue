<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';

const [Form] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入用户Id',
      },
      // 字段名
      fieldName: 'user_id',
      // 界面显示的label
      label: '用户ID',
      rules: 'required',
    },
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'InputPassword',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入密码',
      },
      // 字段名
      fieldName: 'password',
      // 界面显示的label
      label: '密码',
      rules: 'required',
    },
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入电话',
      },
      // 字段名
      fieldName: 'mobile',
      // 界面显示的label
      label: '电话',
      rules: 'required',
    },
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入邮箱',
      },
      // 字段名
      fieldName: 'email',
      // 界面显示的label
      label: '邮箱',
    },
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入昵称',
      },
      // 字段名
      fieldName: 'nickname',
      // 界面显示的label
      label: '昵称',
    },
    {
      component: 'SelectWithOptions',
      componentProps: {
        allowClear: true,
        filterOption: true,
        name: 'roles',
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
        placeholder: '请选择角色',
        showSearch: true,
      },
      fieldName: 'roles',
      label: '角色',
    },
  ],
  wrapperClass: 'grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  console.log(values);
}
</script>

<template>
  <Form />
</template>
