// 类型定义
export interface WordData {
  text: string
  value: number
  [key: string]: any
}

export interface WordLayout extends WordData {
  x: number
  y: number
  rotate: number
  size: number
}

export interface Tooltip {
  visible: boolean
  x: number
  y: number
  content: string
}

// Props
export interface Props {
  data: WordData[]
  width?: number
  height?: number
  padding?: number | ((word: WordData) => number)
  fontFamily?: string
  fontWeight?: string | number
  fontSizeRange?: [number, number]
  rotations?: number[]
  colors?: string[]
  autoFit?: boolean
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
}
