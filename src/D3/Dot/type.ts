import type { Margin } from "@/utils/type";

type GroupTuple = [string, number, number];


export interface DotProps {
  data?: Array<GroupTuple>;
  type?: string;
  width?: number;
  height?: number;
  margin?: Margin;
  nodeSize?: number;
  dotColor?: string;
  linkColor?: string;
  dotSize?: number;
  textColor?: string;
  textSize?: number;
  textOffset?: number;
  linkWidth?: number;
}
