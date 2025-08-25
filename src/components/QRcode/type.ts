export interface QRcodeProps {
  value: string
  type?: 'canvas' | 'img'
  size?: number
  level?: 'L' | 'M' | 'Q' | 'H'
  bgColor?: string
  fgColor?: string
  status?: 'success' | 'error' | 'loading'
  icon?: string
  iconSize?: number
}

export interface QRcodeEmits {
  (e: 'click'): void
  (e: 'error',err:Error): void
  (e: 'success', success :string|null): void
}
