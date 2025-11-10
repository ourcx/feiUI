<template>
  <div class="fei-heatmap">
    <div class="fei-heatmap-container">
      <div class="fei-heatmap-content">
        <div ref="shapeContainer" class="shape-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleSequential } from "d3-scale";
import { interpolateRgb } from "d3-interpolate";
import type { HeatMapProps } from "./type";

const props = withDefaults(defineProps<HeatMapProps>(), {
  data: () => [
    { group: "A", variable: "v1", value: 30 },
    { group: "A", variable: "v2", value: 95 },
    {
      group: "B",
      variable: "v1",
      value: 20,
    },
    {
      group: "B",
      variable: "v2",
      value: 80,
    },
    {
      group: "C",
      variable: "v1",
      value: 10,
    },
    {
      group: "C",
      variable: "v3",
      value: 20,
    },
  ],
  Groups: () => ["A", "B", "C"],
  Vars: () => ["v1", "v2", "v3"],
  colors: () => ["#ffffff", "#ff0000"],
  width: 600,
  height: 600,
  tooltip: true,
  tooltipFormatter: (item: any) => `${item.group} - ${item.variable}: ${item.value}`,
  tooltipPosition: "top",
  tooltipOffset: () => ({ x: 0, y: 0 }),
  tooltipColor: "white",
  tooltipBackgroundColor: "black",
  margin: () => ({ top: 50, right: 50, bottom: 50, left: 50 }),
});

const shapeContainer = ref<HTMLElement | null>(null);

const init = () => {
  if (!shapeContainer.value) return;

  // 清空容器
  shapeContainer.value.innerHTML = "";

  // 计算实际绘图区域
  const innerWidth = props.width - props.margin.left - props.margin.right;
  const innerHeight = props.height - props.margin.top - props.margin.bottom;

  const svg = select(shapeContainer.value)
    .append("svg")
    .attr("width", props.width)
    .attr("height", props.height)
    .append("g")
    .attr("transform", `translate(${props.margin.left},${props.margin.top})`);

  // X轴 - Groups
  const x = scaleBand().range([0, innerWidth]).domain(props.Groups).padding(0.05);

  svg.append("g").attr("transform", `translate(0,${innerHeight})`).call(axisBottom(x));

  // Y轴 - Variables
  const y = scaleBand().range([innerHeight, 0]).domain(props.Vars).padding(0.05);

  svg.append("g").call(axisLeft(y));

  // 颜色比例尺
  const myColor = scaleSequential(
    interpolateRgb(props.colors[0], props.colors[1])
  ).domain([0, 100]);

  // 创建tooltip
  const tooltip = select(shapeContainer.value)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", props.tooltipBackgroundColor)
    .style("color", props.tooltipColor)
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("font-size", "12px");

  // 鼠标事件处理函数
  const mouseover = function (this: any, event: MouseEvent, d: any) {
    tooltip.style("opacity", 1);
    select(this).style("stroke", "black").style("stroke-width", 2);
  };

  const mousemove = function (event: MouseEvent, d: any) {
    const tooltipText = props.tooltipFormatter(d);
    tooltip
      .html(tooltipText)
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 10 + "px");
  };

  const mouseleave = function (this: any, event: MouseEvent, d: any) {
    tooltip.style("opacity", 0);
    select(this).style("stroke", "none");
  };

  // 绘制热力方块
  const rects = svg
    .selectAll("rect")
    .data(props.data, function (d: any) {
      return d.group + ":" + d.variable;
    })
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.group) || 0)
    .attr("y", (d) => y(d.variable) || 0)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", (d) => myColor(d.value))
    .style("stroke-width", 0)
    .style("stroke", "none")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  // 添加文字标签
  svg
    .selectAll(".cell-text")
    .data(props.data, function (d: any) {
      return d.group + ":" + d.variable + ":" + d.value;
    })
    .enter()
    .append("text")
    .attr("class", "cell-text")
    .attr("x", (d) => (x(d.group) || 0) + x.bandwidth() / 2)
    .attr("y", (d) => (y(d.variable) || 0) + y.bandwidth() / 2)
    .attr("dy", "0.35em") // 垂直居中
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("pointer-events", "none") // 防止文字干扰鼠标事件
    .text((d) => d.value)
    .style("fill", (d) => {
      // 根据背景色亮度动态调整文字颜色，确保可读性
      const color = myColor(d.value);
      // 简单的亮度计算，如果背景较亮就用黑色文字，否则用白色
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? "black" : "white";
    });
};

onMounted(() => {
  init();
});

watch(
  () => props.data,
  () => {
    init();
  },
  { deep: true }
);
</script>

<style scoped>
.fei-heatmap {
  width: 100%;
  height: 100%;
}

.fei-heatmap-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.fei-heatmap-content {
  width: 100%;
  height: 100%;
}

.shape-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Tooltip 样式 */
.tooltip {
  z-index: 1000;
}
</style>
