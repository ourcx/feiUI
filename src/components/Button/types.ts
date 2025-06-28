import type { PropType } from "vue";
import { ref } from 'vue';
export type ButtonType  = 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type ButtonSize = 'large' | 'small' | 'mini' | ''; // 添加空字符串选项
export type NativeType  = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  nativeType?: NativeType;
  autofoucs?: boolean;
  icon?: string;
  width?: string | number;
}

export interface ButtonInstance {
  ref: HTMLButtonElement;
}


//两种props定义
export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
  },
  //标注数据类型，把type的类型标注为一定的数据类型
  size: {
    type: String as PropType<ButtonSize>,
  },
  plain: {
    type: Boolean,
  },
  round:{
    type: Boolean,
  },
  circle:{
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  loading:{
    type: Boolean,
  }
}
