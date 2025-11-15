import type { Margin } from "@/utils/type";
import type { SimulationLinkDatum, SimulationNodeDatum } from "d3-force";

export interface GraphProps {
  nodes?: Node[];
  links?: Link[];
  margin?: Margin;
  linkDistance?: number;
  width?: number;
  height?: number;
  nodeSize?: number;
  nodeColor?: string;
  type?: "primary" | "success" | "warning" | "danger" | "info";
  linkColor?: string;
  linkWidth?: number;
  textColor?: string;
}

interface Node {
  id: number;
  name: string;
}

// 链接类型
interface Link {
  source: number;
  target: number;
}

export interface SimNode extends SimulationNodeDatum {
  id: number;
  name: string;
}

export interface SimLink extends SimulationLinkDatum<SimNode> {
  source: number;
  target: number;
}


export interface GraphEmits {
  (e: "nodeClick", node: Node): void;
}
