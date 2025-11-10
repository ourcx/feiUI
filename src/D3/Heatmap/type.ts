import type { Margin } from "@/utils/type";

export interface HeatMapProps {
  data?: DataItem[];
  Groups?: string[];
  Vars?: string[];
  colors?: string[];
  width?: number;
  height?: number;
  tooltip?: boolean;
  tooltipFormatter?: (item: DataItem) => string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  tooltipOffset?: {
    x: number;
    y: number;
  };
  tooltipColor?: string;
  tooltipBackgroundColor?: string;
  margin?: Margin;
}

interface DataItem {
  group: string;
  variable: string;
  value: number;
}
