import type { Margin } from "@/utils/type";

export interface HexbinProps {
  width?: number;
  height?: number;
  data?: Array<[number, number]>;
  radius?: number;
  color?: string;
  opacity?: number;
  stroke?: string;
  margin?: Margin;
  isShowLegend?: boolean;
  isShowGrid?: boolean;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  onClick?: (event:any,d: any) => void;
  onMouseOver?: (event:any,d: any)=> void;
  onMouseOut?: (event:any,d: any) => void;
  onMouseMove?: (event:any,d: any) => void;
  onMouseDown?:(event:any,d: any) => void;
}
