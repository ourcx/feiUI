import type { VNode } from 'vue'
import type { TooltipProps } from '../Tooltip/types'

export interface DropdownProps extends TooltipProps {
  menuOptions?: MenuOption[]; // 允许 MenuOption 数组
  hideAfterClick?: boolean;
}

export interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}


export interface DropdownEmits{
  (e: 'visible-change', visible: boolean): void
  (e: 'select', key: MenuOption): void
}

export interface DropdownInstance {
  show:()=>void
  hide:()=>void
}
