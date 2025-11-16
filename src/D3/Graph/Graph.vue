<template>
  <div class="d-Graph">
    <svg ref="svgContainer" class="histogram-svg"></svg>
  </div>
</template>

<script setup lang="ts">
import type { GraphProps, SimLink, SimNode, GraphEmits } from "./type";
import { getColors } from "@/utils/map";
import { ref, onMounted, watch, nextTick } from "vue";
import { select } from "d3-selection";
import { forceSimulation, forceLink, forceManyBody, forceCenter } from "d3-force";

const props = withDefaults(defineProps<GraphProps>(), {
  width: 500,
  height: 500,
  nodes: (): SimNode[] => [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
  ],
  links: (): SimLink[] => [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
    { source: 4, target: 1 },
  ],
  nodeSize: 20,
  linkWidth: 2,
  linkColor: "black",
  nodeColor: getColors().primary,
  type: "primary",
  margin: () => ({ top: 20, right: 20, bottom: 20, left: 20 }),
  linkDistance: 100,
  textColor: "white",
});
const emits = defineEmits<GraphEmits>();
const svgContainer = ref<SVGSVGElement | null>(null);

const init = () => {
  if (!svgContainer.value) return;

  const svg = select(svgContainer.value)
    .attr("width", props.width)
    .attr("height", props.height);

  svg.selectAll("*").remove();

  // 创建连线
  const linkSel = svg
    .append("g")
    .selectAll("line")
    .data(props.links)
    .enter()
    .append("line")
    .style("stroke", props.linkColor)
    .style("stroke-width", props.linkWidth);

  // 创建节点
  const nodeSel = svg
    .append("g")
    .selectAll("circle")
    .data(props.nodes)
    .enter()
    .append("circle")
    .attr("r", props.nodeSize)
    .style("fill", props.nodeColor)
    .style("cursor", "pointer");

  // 创建文本标签 - 单独创建，不是 circle 的子元素
  const textSel = svg
    .append("g")
    .selectAll("text")
    .data(props.nodes)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central") // 垂直居中
    .attr("fill", props.textColor)
    .style("font-size", "12px")
    .style("pointer-events", "none") // 防止文本干扰节点点击
    .text((d: any) => d.name);

  forceSimulation(props.nodes as SimNode[])
    .force(
      "link",
      forceLink(props.links as SimLink[])
        .id((d: any) => d.id)
        .distance(props.linkDistance)
    )
    .force("charge", forceManyBody().strength(-400))
    .force("center", forceCenter(props.width / 2, props.height / 2))
    .on("tick", () => {
      // 更新连线位置
      linkSel
        .attr("x1", (d: any) => (d.source as SimNode).x!)
        .attr("y1", (d: any) => (d.source as SimNode).y!)
        .attr("x2", (d: any) => (d.target as SimNode).x!)
        .attr("y2", (d: any) => (d.target as SimNode).y!);

      // 更新节点位置
      nodeSel
        .attr("cx", (d: any) => d.x!)
        .attr("cy", (d: any) => d.y!);

      // 更新文本位置 - 与节点中心对齐
      textSel
        .attr("x", (d: any) => d.x!)
        .attr("y", (d: any) => d.y!);
    });

  // 节点点击事件
  nodeSel.on("click", (e: any, d: any) => {
    emits("nodeClick", d);
  });
};

watch(
  () => [props.nodes, props.links],
  () => {
    nextTick(() => {
      init();
    });
  }
);

onMounted(() => {
  nextTick(() => {
    init();
  });
});
</script>

<style scoped>
.d-Graph {
  width: auto;
  height: auto;
}
</style>
