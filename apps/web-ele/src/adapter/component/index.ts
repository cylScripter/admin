/**
 * 通用组件共同的使用的基础组件，原先放在 adapter/form 内部，限制了使用范围，这里提取出来，方便其他地方使用
 * 可用于 vben-form、vben-modal、vben-drawer 等组件使用,
 */

import type { BaseFormComponentType } from '@vben/common-ui';

import type { Component, SetupContext } from 'vue';
import { h } from 'vue';

import { globalShareState } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  ElOption,
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElDivider,
  ElInput,
  ElInputNumber,
  ElNotification,
  ElRadioGroup,
  ElSelect,
  ElSpace,
  ElSwitch,
  ElTimePicker,
  ElTreeSelect,
  ElUpload,
} from 'element-plus';

const withDefaultPlaceholder = <T extends Component>(
  component: T,
  type: 'input' | 'select',
) => {
  return (props: any, { attrs, slots }: Omit<SetupContext, 'expose'>) => {
    const placeholder = props?.placeholder || $t(`ui.placeholder.${type}`);
    return h(component, { ...props, ...attrs, placeholder }, slots);
  };
};

// 定义 Option 接口
interface Option {
  value: string | number;
  label: string;
}

// 这里需要自行根据业务组件库进行适配，需要用到的组件都需要在这里类型说明
export type ComponentType =
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'Divider'
  | 'Input'
  | 'InputNumber'
  | 'InputPassword'
  | 'RadioGroup'
  | 'Select'
  | 'Space'
  | 'Switch'
  | 'TimePicker'
  | 'TreeSelect'
  | 'Upload'
  | 'SelectWithOptions'
  | BaseFormComponentType;

async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    // 如果你的组件体积比较大，可以使用异步加载
    // Button: () =>
    // import('xxx').then((res) => res.Button),

    Checkbox: ElCheckbox,
    CheckboxGroup: ElCheckboxGroup,
    // 自定义默认按钮
    DefaultButton: (props, { attrs, slots }) => {
      return h(ElButton, { ...props, attrs, type: 'info' }, slots);
    },
    // 自定义主要按钮
    PrimaryButton: (props, { attrs, slots }) => {
      return h(ElButton, { ...props, attrs, type: 'primary' }, slots);
    },
    Divider: ElDivider,
    Input: withDefaultPlaceholder(ElInput, 'input'),
    InputNumber: withDefaultPlaceholder(ElInputNumber, 'input'),
    RadioGroup: ElRadioGroup,
    Select: (props, { attrs, slots }) => {
      return h(
        ElSelect,
        { ...props, ...attrs},
        {
          default: () =>
            props.options.map((item: { value: string; label: string }) =>
              h(ElOption, { key: item.value, label: item.label, value: item.value },slots)
            ),
        },
      );
    },
    Space: ElSpace,
    Switch: ElSwitch,
    TimePicker: ElTimePicker,
    DatePicker: ElDatePicker,
    TreeSelect: withDefaultPlaceholder(ElTreeSelect, 'select'),
    Upload: ElUpload,
    InputPassword: (props, { attrs, slots }) => {
      return h(ElInput, { ...props, attrs, type: 'password', showPassword: true }, slots);
    },
    SelectWithOptions: (props, { attrs, slots })=>{
      return h(ElSelect, { ...props, ...attrs, filterable: true, multiple: true ,allowCreate:true,reserveKeyword:false},
        {
          default: ()=> (props.options || []).map((item:Option) => h(ElOption, { value: item.value, label: item.label }))
        ,...slots}
        );
    }

  };

  // 将组件注册到全局共享状态中
  globalShareState.setComponents(components);

  // 定义全局共享状态中的消息提示
  globalShareState.defineMessage({
    // 复制成功消息提示
    copyPreferencesSuccess: (title, content) => {
      ElNotification({
        title,
        message: content,
        position: 'bottom-right',
        duration: 0,
        type: 'success',
      });
    },
  });
}

export { initComponentAdapter };
