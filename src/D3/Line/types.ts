import type { Margin } from "@/utils/type";

//折现图的props
export interface LineProps {
  title?: string;
  //数据
  data?: any[]
  //宽度
  width?: number
  //高度
  height?: number
  //x轴数据
  xData?: string[]
  //y轴数据
  yData?: string[]
  //颜色
  //是否显示点
  isShowPoint?: boolean
  //是否显示网格线
  isShowGrid?: boolean
  //是否显示坐标轴
  isShowAxis?: boolean
  //是否显示tooltip
  isShowTooltip?: boolean
  //是否显示图例
  isShowLegend?: boolean
  //是否显示x轴标签
  isShowXAxisLabel?: boolean
  //是否显示y轴标签
  isShowYAxisLabel?: boolean
  //是否显示x轴线
  isShowXAxisLine?: boolean
  //是否显示y轴线
  isShowYAxisLine?: boolean
  //平滑曲线
  tooltipFormatter?: (data: any) => string
  //边距
  margin?: Margin
  //点的半径
  pointRadius?: number
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

