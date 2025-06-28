export interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error' | 'primary'
  title?: string
  description?: string
  effect?: 'light' | 'dark'
  closeText?: string
  disIcon?: boolean
  icon?: string
  center?: boolean
  duration?: number
  animation?: boolean
  width?: string | number
  // 垂直展示
  vertical?: boolean
  // 点击动画
  clickAnimation?: boolean
}

export interface AlertEmits {
  (event: 'close', content: string): void
}


export interface AlertEvents {
  close: () => void
  click: () => void
}

type TransitionHook = (el: Element) => void
export interface TransitionEvents {
  beforeEnter: TransitionHook
  enter: TransitionHook
  afterEnter: TransitionHook
  beforeLeave: TransitionHook
  leave: TransitionHook
  afterLeave: TransitionHook
}
