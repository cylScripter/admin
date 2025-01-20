<script setup lang="ts">

import { Page } from "@vben/common-ui";
import { Icon } from "@iconify/vue";
import {
  ElButton, ElCard,
  ElIcon, ElNotification,
  ElOption,
  ElSelect
} from "element-plus";
import { useRouter } from "vue-router";

import { onMounted, ref, watch } from "vue";
import {
  GetAppListApi,
  GetEduRoleListApi,
  GetEduRoleMenuApi,
  GetMenuListApi, SetAppRoleMenu
} from "#/api/education";
import type { ListOption, Option } from "#/api/core/list";


const router = useRouter();



interface ListItem {
  value: number
  label: string |undefined
}

const options = ref<ListItem[]>([])
const value = ref<number>()
const loading = ref(false)

onMounted(() => {
})
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true

    let option: Option[] = [{
      name: 4,
      value: query
    }];

    const listOption: ListOption = {
      options: option,
      limit: 1000,
      offset: 0,
      offset_token: "",
    };
    GetAppListApi({
      list_option: listOption,
    }).then((res) => {
      for (let i = 0; i < res.list.length; i++) {
        let item = res.list[i];
        if (item === undefined) {
          continue;
        }
        options.value.push({
          value: item.id,
          label: item.college_name +"("+ item.id +")"
        });

      }
      loading.value = false
    });

  } else {
    options.value = []
  }
}



const roleOptions = ref<ListItem[]>([])
const roleValue = ref<number>()




import { ElTree ,ElRow,ElCol} from 'element-plus';


const defaultProps = {
  children: 'children',
  label: 'label',
}



interface TreeNode {
  id: number
  label: string
  children?: TreeNode[]
}

// 将 JSON 数据转换为 TreeNode 结构
function convertToTreeNode(data: Array<any>): TreeNode[] {
  // 创建一个以 id 为 key 的映射表
  const map = new Map<number, TreeNode>();
  data.forEach(item => {
    map.set(item.id, { id: item.id, label: item.meta.title, children: [] });
  });

  const rootNodes: TreeNode[] = [];

  // 处理父子关系
  data.forEach(item => {
    const node = map.get(item.id);
    if (item.parent_id === 0) {
      // 如果没有父节点，作为根节点
      rootNodes.push(node!);
    } else {
      // 否则，找到父节点并添加到其子节点数组中
      const parentNode = map.get(item.parent_id);
      parentNode?.children?.push(node!);
    }
  });

  return rootNodes;
}

const data = ref<TreeNode[]>([])
const checkedKey = ref<number[]>([])
const expandedKeys = ref<number[]>([])

watch(roleValue, async (newQuestion, oldQuestion) => {
   console.log(newQuestion,oldQuestion)
    let option: Option[] = [];
    const listOption: ListOption = {
      options: option,
      limit: 1000,
      offset: 0,
      offset_token: "",
    };
    GetMenuListApi({
      list_option: listOption,
    }).then((res) => {
      const treeNodes = convertToTreeNode(res.list);
      console.log(treeNodes)
      data.value = treeNodes;
      expandedKeys.value = treeNodes.map((item) => item.id);
      console.log(expandedKeys.value)
    })

  GetEduRoleMenuApi({
    role_id: Number(newQuestion),
    app_id: Number(value.value)
  }).then((res) => {
    checkedKey.value = res.list.map((item) => Number(item))
  })

})

watch(value , async (newValue, oldValue) => {
  console.log(newValue,oldValue)
  let option: Option[] = [];
  const listOption: ListOption = {
    options: option,
    limit: 1000,
    offset: 0,
    offset_token: "",
  };
  GetEduRoleListApi({
    list_option: listOption,
    app_id: Number(newValue)
  }).then((res) => {
    roleOptions.value = []
    for (let i = 0; i < res.list.length; i++) {
      let item = res.list[i];
      if (item === undefined) {
        continue;
      }
      roleOptions.value.push({
        value: item.id,
        label: item.name +"("+ item.str_role_id +")"
      });
    }
  });
})


const  setAppRoleMenu = () => {
  SetAppRoleMenu({
    role_id: Number(roleValue.value),
    app_id: Number(value.value),
    menu_ids: checkedKeys.value.getCheckedKeys()
  }).then((res) => {
    console.log(res)
    ElNotification({
      title: 'Success',
      message: '设置成功',
      type: 'success',
    });
  })
}

const checkedKeys = ref()
// 处理节点选中变化
const handleCheckChange= async (c :any, cn:any )=> {
  // checkedKeys 是当前选中的节点的 id 数组
  console.log('选中的节点 ID:', c);
  // checkedNodes 是当前选中的节点的完整数据
  console.log('选中的节点数据:', cn);
  console.log(checkedKeys.value.getCheckedKeys())
}
</script>

<template>

  <Page>
    <template #title>
      <div>
        <ElButton link type="success" @click="router.back()">
          <Icon icon="icon-park-outline:left" width="24" height="24" style="color: #4cff50" />返回
        </ElButton>
      </div>
    </template>

    <ElCard class="mt-5" >
      <template #header>
        <div class="card-header">
          <span>设置菜单权限</span>
        </div>

      </template>

      <el-row :gutter="20">
        <el-col :span="6">

      <div class="m-4">
        <p>主体</p>
        <el-select
          v-model="value"
          filterable
          remote
          reserve-keyword
          placeholder="请输入学院名称"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <template #loading>
            <el-icon class="is-loading">
              <svg class="circular" viewBox="0 0 20 20">
                <g
                  class="path2 loading-path"
                  stroke-width="0"
                  style="animation: none; stroke: none"
                >
                  <circle r="3.375" class="dot1" rx="0" ry="0" />
                  <circle r="3.375" class="dot2" rx="0" ry="0" />
                  <circle r="3.375" class="dot4" rx="0" ry="0" />
                  <circle r="3.375" class="dot3" rx="0" ry="0" />
                </g>
              </svg>
            </el-icon>
          </template>
        </el-select>
      </div>

      <div class="m-4">
        <p>角色</p>

        <el-select
          v-model="roleValue"
          placeholder="请选择角色"
        >
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
        </el-col>
        <el-col :span="14">
      <ElCard class="w-[600px] min-h-[500px] max-h-[500px]">
        <template #header>
          <ElButton type="primary" @click="setAppRoleMenu">保存</ElButton>
        </template>


        <div style="height: 400px; overflow-y: auto;">
          <el-tree      style="max-width: 600px"
                        :data="data"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="expandedKeys"
                        :default-checked-keys="checkedKey"
                        :props="defaultProps"
                        @check-change="handleCheckChange"
                        ref="checkedKeys"
          />
        </div>
      </ElCard>
          </el-col>
      </el-row>
    </ElCard>


  </Page>

</template>

<style scoped>
.el-select-dropdown__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 20px;
}

.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-color-primary);
  stroke-linecap: round;
}
.loading-path .dot1 {
  transform: translate(3.75px, 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
}
.loading-path .dot2 {
  transform: translate(calc(100% - 3.75px), 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.4s;
}
.loading-path .dot3 {
  transform: translate(3.75px, calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 1.2s;
}
.loading-path .dot4 {
  transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.8s;
}
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes custom-spin-move {
  to {
    opacity: 1;
  }
}


</style>
