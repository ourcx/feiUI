<template>
  <div class="Dot-container">
    <div id="my_dataviz"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import type { DotProps } from "./type";
import { getColors } from "@/utils/map";
import { select } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";

const props = withDefaults(defineProps<DotProps>(), {
  data: () => [
    ['I', 4.338079853, 5.148005459],
    ['A', 3.917400709, 4.76762393],
    ['K', 3.202934338, 5.20516469],
    ['C', 3.277281389, 4.686839945],
    ['S', 2.55703927, 4.964612925],
    ['L', 2.336271788, 4.625445238],
    ['M', 3.531596614, 3.107319425],
    ['G', 2.402883438, 4.145381702],
    ['V', 2.663524013, 3.829839528],
    ['R', 2.428916588, 3.892309233],
    ['X', 2.455895257, 3.83030506],
    ['H', 2.246281326, 3.976511404],
    ['T', 1.94788842, 4.229931315],
    ['N', 2.399279269, 3.386369412],
    ['Z', 1.977072126, 3.316360129],
    ['E', 1.378294374, 3.670299094],
    ['U', 2.342657877, 2.617235344],
    ['Y', 0.668982338, 2.838572384],
    ['Q', 1.025401427, 2.046075335],
    ['J', 1.073910213, 1.593017741],
    ['F', 0.164631644, 2.500422052],
    ['W', 0.768703736, 1.772698002],
    ['O', 0.746941617, 1.577514178],
    ['P', 0.522905846, 1.673005896],
    ['D', 0.343685896, 0.737782247],
    ['B', 0.125385583, -0.019154415]
  ],
  type: "primary",
  width: 800,
  height: 600,
  margin: () => ({ top: 40, right: 40, bottom: 60, left: 100 }),
  nodeSize: 5,
  dotColor: getColors().primary,
  linkColor: '#999',
  dotSize: 6,
  textColor: getColors().info,
  textSize: 12,
  textOffset: 5,
  linkWidth: 1
});

const init = () => {
  // 清除之前的SVG
  select("#my_dataviz").selectAll("*").remove();

  const { width, height, margin } = props;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // 创建SVG
  const svg = select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 准备数据 - 转换为对象格式
  const formattedData = props.data.map((d: any) => ({
    group: d[0],
    value1: d[1],
    value2: d[2]
  }));

  // X轴比例尺
  const xScale = scaleLinear()
    .domain([-1, 6]) // 根据数据范围调整
    .range([0, innerWidth]);

  // Y轴比例尺 - 使用分组名称
  const yScale = scaleBand()
    .domain(formattedData.map(d => d.group))
    .range([0, innerHeight])
    .padding(0.1);

  // 添加X轴
  svg.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(axisBottom(xScale))
    .append("text")
    .attr("x", innerWidth / 2)
    .attr("y", 35)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Values");

  // 添加Y轴
  svg.append("g")
    .call(axisLeft(yScale))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -60)
    .attr("x", -innerHeight / 2)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Groups");

  // 绘制连接线
  svg.selectAll(".dot-line")
    .data(formattedData)
    .enter()
    .append("line")
    .attr("class", "dot-line")
    .attr("x1", d => xScale(d.value1))
    .attr("x2", d => xScale(d.value2))
    .attr("y1", d => {
      const yPos = yScale(d.group);
      return yPos !== undefined ? yPos + yScale.bandwidth() / 2 : 0;
    })
    .attr("y2", d => {
      const yPos = yScale(d.group);
      return yPos !== undefined ? yPos + yScale.bandwidth() / 2 : 0;
    })
    .attr("stroke", props.linkColor)
    .attr("stroke-width", props.linkWidth);

  // 绘制第一个值的圆点
  svg.selectAll(".dot-value1")
    .data(formattedData)
    .enter()
    .append("circle")
    .attr("class", "dot-value1")
    .attr("cx", d => xScale(d.value1))
    .attr("cy", d => {
      const yPos = yScale(d.group);
      return yPos !== undefined ? yPos + yScale.bandwidth() / 2 : 0;
    })
    .attr("r", props.dotSize)
    .style("fill", props.dotColor)
    .style("opacity", 0.8);

  // 绘制第二个值的圆点 - 使用不同颜色区分
  svg.selectAll(".dot-value2")
    .data(formattedData)
    .enter()
    .append("circle")
    .attr("class", "dot-value2")
    .attr("cx", d => xScale(d.value2))
    .attr("cy", d => {
      const yPos = yScale(d.group);
      return yPos !== undefined ? yPos + yScale.bandwidth() / 2 : 0;
    })
    .attr("r", props.dotSize)
    .style("fill",  props.dotColor) // 使用不同颜色区分第二个值
    .style("opacity", 0.8);

  // 添加分组标签
  svg.selectAll(".group-label")
    .data(formattedData)
    .enter()
    .append("text")
    .attr("class", "group-label")
    .attr("x", -10)
    .attr("y", d => {
      const yPos = yScale(d.group);
      return yPos !== undefined ? yPos + yScale.bandwidth() / 2 : 0;
    })
    .attr("dy", "0.35em")
    .style("text-anchor", "end")
    .style("font-size", `${props.textSize}px`)
    .style("fill", props.textColor)
    .text(d => d.group);
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.Dot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

#my_dataviz {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 可选：添加一些基础样式 */
:deep(.domain) {
  stroke: #ccc;
}

:deep(.tick line) {
  stroke: #eee;
}

:deep(.tick text) {
  fill: #666;
  font-size: 12px;
}
</style>
