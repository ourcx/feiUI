import type { Margin } from '@/utils/type'

export interface TreemapProps {
  width?: number
  height?: number
  data?: TreemapNode[]
  borderWidth?: number
  margin?: Margin
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  tooltip?: boolean
  tooltipFormatter?: (data: any) => string
  onClick?: (data: any) => void
  onMouseOver?: (data: any) => void
  onMouseOut?: (data: any) => void
  onMouseMove?: (data: any) => void
  onMouseDown?: (data: any) => void
}

interface TreemapNode {
  name: string
  parent: string
  value: number | null
}
//传进来的数据类型
