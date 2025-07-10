import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps {
  content?: string|number
  trigger?: 'hover' | 'click' | 'focus'
  placement?: Placement
  manual?: boolean
  //是否启动手动模式
  popperOptions?: Partial<Options>
  transition?: string
  openDelay?: number
  closeDelay?: number
  ColorType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export interface TooltipEmits {
  (e: 'visible-change', visible: boolean): void
  (e: 'click-outside', value: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
