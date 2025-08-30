export interface SwiperProps {
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  autoplay?: boolean
  vertical?: boolean
  width?: number
  height?: number
  loop?: boolean
  loopTime?: number
  speed?: number
  indicator?: boolean
  indicatorPosition?: 'top' | 'bottom'
}


export interface SwiperItemProps {
  activeClass?: string
  color?: string
}

export interface SwiperEmits {
  (e: 'change', index: number): void
  (e: 'click', index?: number): void
}
export interface SwiperInstance {
  update: () => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  clear: () => void
  start: () => void
}
