export interface BackTopProps {
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  visibilityHeight?: number
  target?: string | HTMLElement
  duration?: number
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end'
  right?: string | number
  bottom?: string | number
  visible?: boolean
  ScrollBehavior?: 'auto' | 'smooth'
  // 回到顶部多少
  distance?: number
}

export interface BackTopEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'scroll', scrollTop: number): void
  (e: 'scroll-end', scrollTop: number): void
  (e: 'scroll-start', scrollTop: number): void
}
