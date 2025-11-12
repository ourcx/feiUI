import type { Margin } from "@/utils/type";
import { unref } from "vue";

export interface DhistogramProps {
  data?: DataPoint[];
  tyep?: "primary" | "success" | "warning" | "danger" | "info";
  width?: number;
  height?: number;
  margin?: Margin;
  xLim?: [number, number];
  yLim?: [number, number];
  colors?: [string, string];
  tooltip?: boolean;
  size?: number;
}

interface DataPoint {
  x: number;
  y: number;
  group: number;
}
