import type { Margin } from "../../utils/type";
export interface PieProps {
  data?: PieData[];
  radius?: number;
  innerRadius?: number;
  type?: string;
  tooltip?: boolean;
  legend?: boolean;
  label?: boolean;
  labelColor?: string;
  labelPosition?: string;
  labelFontSize?: string;
  labelFontWeight?: string;
  labelFontFamily?: string;
  ColorArray?: string[];
  width?: number;
  height?: number;
  margin?: Margin;
  dasharray?: number;
}

export interface PieData {
  name: string;
  value: number;
}
