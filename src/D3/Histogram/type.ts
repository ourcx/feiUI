import type { Margin } from "@/utils/type";

export interface HistogramProps {
  title?:string;
  data?:any[];
   //宽度
  width?: number
  //高度
  height?: number
  //x轴数据
  xData?: string[]
  //y轴数据
  yData?: string[]
  //类型
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  //边距
  margin?: Margin
  //是否显示tooltip
  isShowTooltip?: boolean
  //是否显示图例
  isShowLegend?: boolean
  //是否显示x轴标签
  isShowXAxisLabel?: boolean
  //x轴标签
  xAxisLabel?: string
  //是否显示y轴标签
  isShowYAxisLabel?: boolean
  //y轴标签
  yAxisLabel?: string
  //是否显示x轴线
  isShowXAxisLine?: boolean
  //是否显示y轴线
  isShowYAxisLine?: boolean
  //是否显示网格线
  isShowGridLine?: boolean
  //tooltip格式化
  tooltipFormatter?: (data: any) => string
  //是否显示数据标签
  isShowDataLabel?: boolean
  //数据标签格式化
  dataLabelFormatter?: (data: any) => string
}
