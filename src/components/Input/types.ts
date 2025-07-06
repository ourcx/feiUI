import { ref } from 'vue';
export interface InputProps {
  type: string
  size?: 'large' | 'samll'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  modelValue?: string
  placeholder?: string
  readonly?: boolean
  autocomplete?: string
  autofocus?: boolean
  form?: string
}


export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  //input是在输入框输入时触发
  (e: 'change', value: string): void
  //是指修改了指，并且离开聚焦
  (e: 'blur', value: FocusEvent): void
  (e: 'focus', value: FocusEvent): void
  (e: 'clear'): void
}

export interface InputInstance {
  ref: HTMLAnchorElement | HTMLTextAreaElement
}

