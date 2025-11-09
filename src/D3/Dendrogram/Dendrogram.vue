<template>
  <div class="dendrogram-container">
    <div id="my_dataviz"></div>
  </div>
</template>

<script setup lang="ts">
import { getColors } from "@/utils/map";
import type { DendrogramProps } from "./type";
import { ref, onMounted, watch } from "vue";
import { select } from "d3-selection";
import { cluster, hierarchy } from "d3-hierarchy";

// 定义 TreeNode 接口
interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}

const props = withDefaults(defineProps<DendrogramProps>(), {
  width: 500,
  height: 500,
  margin: () => ({ top: 20, right: 20, bottom: 20, left: 20 }),
  data: (): TreeNode[] => [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 30 },
    { name: "D", value: 40 },
    { name: "E", value: 50 },
    {
      name: "F",
      value: 60,
      children: [
        { name: "F1", value: 70 },
        { name: "F2", value: 80 },
        { name: "F3", value: 90 },
      ],
    },
    { name: "G", value: 100, children: [{ name: "G1", value: 110 }] },
  ],
  type: "primary",
  color: getColors()["primary"],
  r: 10,
  strokeWidth: 2,
});

const init = () => {
  // 清除容器内容
  select("#my_dataviz").html("");

  const svg = select("#my_dataviz")
    .append("svg")
    .attr("width", props.width)
    .attr("height", props.height)
    .append("g")
    .attr("transform", `translate(${props.margin.left},0)`);

  // 创建簇布局
  const clusters = cluster<TreeNode>().size([
    props.height - props.margin.top - props.margin.bottom,
    props.width - props.margin.left - props.margin.right - 100,
  ]);

  // 构造根节点
  const root = hierarchy<TreeNode>({
    name: "root",
    children: props.data,
  });

  clusters(root);

  // 添加连接线
  svg
    .selectAll("path")
    .data(root.descendants().slice(1))
    .enter()
    .append("path")
    .attr("d", function (d) {
      return (
        "M" +
        d.y +
        "," +
        d.x +
        "C" +
        (d.parent!.y! + 50) +
        "," +
        d.x +
        " " +
        (d.parent!.y! + 150) +
        "," +
        d.parent!.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
        " " +
        d.parent!.y! +
        "," +
        d.parent!.x
      );
    })
    .style("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1);

  // 添加节点组
  const nodeGroups = svg
    .selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  // 在每个节点组中添加圆形
  nodeGroups
    .append("circle")
    .attr("r", props.r)
    .style("fill", props.color)
    .attr("stroke", "black")
    .style("stroke-width", props.strokeWidth);

  // 在每个节点组中添加文字
  nodeGroups
    .append("text")
    .attr("dx", props.r + 5) // 文字距离圆心的水平偏移
    .attr("dy", 4) // 文字垂直居中调整
    .text(function (d) {
      return d.data.name;
    })
    .style("font-size", "12px")
    .style("fill", "black")
    .style("font-family", "Arial, sans-serif");
};

// 当props变化时重新绘制
watch(
  () => [props.data, props.width, props.height, props.color],
  () => {
    init();
  }
);

onMounted(() => {
  init();
});
</script>

<style scoped>
.dendrogram-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

#my_dataviz {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
