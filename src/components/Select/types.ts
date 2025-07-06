// Define SelectionOption type if not imported from elsewhere
import type { VNode } from "vue";


export interface SelectionOption {
  label: string;
  value: any;
  disabled?:boolean;
  [key: string]: any;
}

export interface SelectProps {
  modelValue?: string
  options?:SelectionOption[];
  disabled?:boolean;
  clearable?:boolean;
  placeholder?:string;
  renderLabel?: (option:SelectionOption) => VNode;
  filterable?:boolean;
  remoteMethod?: CustomFilterRemoteFunc;
  filterMethod?: CustomFilterFunc;
  remote?:boolean;
}

export type RenderLabelFunc = (option:SelectionOption) => string;
export type CustomFilterFunc = (value: string) => SelectionOption[];
export type CustomFilterRemoteFunc = (query:string) => Promise<SelectionOption[]>;

export interface SelectEmits {
  (e:'update:modelValue', value:any):void;
  (e:'change', value:any):void;
  (e:'visible-change', visible:boolean):void;
  (e:'clear'):void;
  (e:'remove-tag', value:any):void;
  (e:'select', value:any):void;
}

export interface SelectStates{
  inputValue: string;
  selectedOption:null| SelectionOption;
  mouseHover: boolean ;
  loading:boolean;
}

