export interface SwitchProps {
  modelValue?: boolean
  disabled?: boolean
  activeText?: string
  inactiveText?: string
  activeValue?: SwitchValueType
  name?: string
  id?: string
  size?: 'large' | 'small'
}


export interface SwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}


export type SwitchValueType = boolean | string | number

