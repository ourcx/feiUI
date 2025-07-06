import type { InjectionKey } from "vue";
import type { RuleItem,ValidateError,ValidateFieldsError } from "async-validator";
import type { an } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";



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
  | 'email';


export type FormModel = {
  [key: string]: any;
};


export interface FormItemProps {
  label: string;
  prop?: string;
  required?: boolean;
  rules?: object | object[];
  labelWidth?: string;
  showMessage?: boolean;
  status?: 'success' | 'error' | 'warning';
}

export type FormRules = Record<string,RuleItem[]>;


export interface FormProps {
  model?: Record<string,any>;
  rules?: FormRules;
}

export interface FormContext extends FormProps {

}

export interface FormItemContext {
  validate:()=>any;
}

export interface FormValidateFailure {
  error:ValidateError[]|null;
  fields:ValidateFieldsError
}


export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
// 对应类型的
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey');
