<script setup lang="ts">
import { getColors } from "@/utils/map";
import type { DhistogramProps } from "./type";
import { ref, onMounted, watch, nextTick } from "vue";
import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { interpolateRgb } from "d3-interpolate";
import { axisBottom, axisLeft } from "d3-axis";
import { max, bin, thresholdSturges } from "d3-array";

const props = withDefaults(defineProps<DhistogramProps>(), {
  data: () => [
    { x: 0, y: 0, group: 0 },
    { x: 1, y: 1, group: 1 },
    { x: 2, y: 2, group: 2 },
  ],
  colors: () => [getColors()["primary"], getColors()["success"]],
  size: 5,
  width: 500,
  height: 500,
  margin: () => ({
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  }),
  tooltip: true,
  xLim: () => [0, 10],
  yLim: () => [0, 10],
  type: "primary", // 修正拼写错误
});

const svgContainer = ref<SVGSVGElement>();

const init = () => {
  if (!svgContainer.value) return;

  // 清空现有内容
  select(svgContainer.value).selectAll("*").remove();

  const svg = select(svgContainer.value)
    .attr("width", props.width + props.margin.left + props.margin.right)
    .attr("height", props.height + props.margin.top + props.margin.bottom)
    .append("g")
    .attr("transform", `translate(${props.margin.left},${props.margin.top})`);

  // 创建比例尺
  const xScale = scaleLinear().domain(props.xLim).range([0, props.width]);
  const yScale = scaleLinear().domain(props.yLim).range([props.height, 0]);

  // 创建二维分箱数据
  const xBins = bin()
    .value((d: any) => d.x)
    .domain(props.xLim as [number, number])
    .thresholds(xScale.ticks(props.width / props.size));

  const yBins = bin()
    .value((d: any) => d.y)
    .domain(props.yLim as [number, number])
    .thresholds(yScale.ticks(props.height / props.size));

  // 计算每个矩形区域的数据点数量
  const binsData: any[] = [];
  const xBinsResult = xBins(props.data as any[]);
  const yBinsResult = yBins(props.data as any[]);

  // 创建二维直方图数据
  for (let i = 0; i < xBinsResult.length - 1; i++) {
    for (let j = 0; j < yBinsResult.length - 1; j++) {
      const xBin = xBinsResult[i];
      const yBin = yBinsResult[j];

      const count = props.data.filter(
        (d) =>
          d.x >= (xBin.x0 as number) &&
          d.x < (xBin.x1 as number) &&
          d.y >= (yBin.x0 as number) &&
          d.y < (yBin.x1 as number)
      ).length;

      if (count > 0) {
        binsData.push({
          x0: xBin.x0,
          x1: xBin.x1,
          y0: yBin.x0,
          y1: yBin.x1,
          count: count,
        });
      }
    }
  }

  // 创建颜色比例尺
  const maxCount = max(binsData, (d) => d.count) || 1;
  const colorScale = scaleLinear()
    .domain([0, maxCount])
    .range([props.colors[0] as any, props.colors[1]]);

  // 添加剪裁路径
  svg
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", props.width)
    .attr("height", props.height);

  // 绘制矩形
  const rectGroup = svg.append("g").attr("clip-path", "url(#clip)");

  rectGroup
    .selectAll("rect")
    .data(binsData)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.x0 as number))
    .attr("y", (d) => yScale(d.y1 as number)) // y1 是上边界
    .attr("width", (d) => Math.max(0, xScale(d.x1 as number) - xScale(d.x0 as number)))
    .attr("height", (d) => Math.max(0, yScale(d.y0 as number) - yScale(d.y1 as number)))
    .attr("fill", (d) => colorScale(d.count))
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .attr("opacity", 0.8);

  // 添加 tooltip

  if (props.tooltip) {
  }

  // 添加坐标轴（可选）
};
// 监听数据变化
watch(
  () => props.data,
  () => {
    nextTick(() => {
      init();
    });
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => {
    init();
  });
});
</script>

<template>
  <div class="d-histogram">
    <svg ref="svgContainer" class="histogram-svg"></svg>
  </div>
</template>

<style scoped>
.d-histogram {
  display: inline-block;
}

.histogram-svg {
  display: block;
}
</style>
