import type { Margin } from "@/utils/type";

export interface DendrogramProps {
  width?: number;
  height?: number;
  margin?: Margin;
  data?: TreeNode[];
  tyep?: "primary" | "success" | "warning" | "danger" | "info";
  color?: string;
  r?: number;
  strokeWidth?: number;
}

interface TreeNode {
  name: string;
  colname?: string; // 可选的列名
  children?: TreeNode[]; // 可选的子节点数组
}
