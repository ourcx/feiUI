import type {Ref,InjectionKey} from 'vue';
export type NameTYpe  = string | number;

export interface CollapseProps {
  modelValue: NameTYpe[];
  accordion?: boolean;
}
//规范行为模式

export interface CollapseItemProps {
  name: NameTYpe;
  title?: string;
  disabled?: boolean;
  arrow?: boolean;
}
//规范样式

export interface CollapseContext {
  activeNames: Ref<NameTYpe[]>;
  handleItemClick: (name: NameTYpe) => void;
}
//描述要传递的数据

export interface CollapseEmits {
  (event: 'update:modelValue', value: NameTYpe[]): void;
  (event: 'change', value: NameTYpe[]): void;
}
//规范数据行为


export const collapseContextKey :InjectionKey<CollapseContext>= Symbol('collapseContextKey')

