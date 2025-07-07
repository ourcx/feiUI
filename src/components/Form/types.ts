import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import type { promises } from 'dns'

export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'

export type FormModel = {
  [key: string]: any
}

export interface FormItemProps {
  label: string
  prop?: string
  required?: boolean
  rules?: object | object[]
  labelWidth?: string
  showMessage?: boolean
  status?: 'success' | 'error' | 'warning'
}

export type FormRules = Record<string, RuleItem[]>

export interface FormProps {
  model?: Record<string, any>
  rules?: FormRules
}
export interface ValidateStatusProp {
  status: string
  errorMsg: string
  loading: boolean
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}

export interface FormItemContext {
  prop: string
  validate: (trigger?: string) => Promise<any>
  resetField: () => void
  clearValidate: () => void
}

export interface FormValidateFailure {
  error: ValidateError[] | null
  fields: ValidateFieldsError
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
// 对应类型的
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
export interface FormInstance {
  validate: () => Promise<any>
  resetFields: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
}

export interface FormItemInstance {
  validate: (trigger?: string) => Promise<any>
  resetField: () => void
  clearValidate: () => void
  validatorStatus:ValidateStatusProp
}

export interface FormItemRule extends RuleItem {
  trigger?: string
}
//比主规则多一个字段
