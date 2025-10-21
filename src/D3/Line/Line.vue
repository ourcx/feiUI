<template>
  <div ref="chartContainer" class="line-chart-container">
    <svg ref="chartSvg" :width="width" :height="height">
      <g
        ref="chartG"
        :transform="`translate(${margin.left},${margin.top})`"
        :class="{ [`fei-D3-${type}`]: type }"
      ></g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { select } from "d3-selection";
import { scaleLinear, type NumberValue } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { line } from "d3-shape";
import { min as d3Min, max as d3Max } from "d3-array";
import { ref, onMounted, watch, nextTick } from "vue";
import type { LineProps } from "./types";
import "d3-transition";
import type { info } from "console";
import { getColors } from "@/utils/map";

defineOptions({
  name: "FeiLineChart",
});

const props = withDefaults(defineProps<LineProps>(), {
  width: 600,
  height: 400,
  margin: () => ({
    top: 20,
    right: 30,
    bottom: 50,
    left: 40,
  }),
  xData: () => [],
  yData: () => [],
  data: () => [
    { x: 0, y: 28 },
    { x: 1, y: 55 },
    { x: 2, y: 43 },
    { x: 3, y: 91 },
    { x: 4, y: 81 },
    { x: 5, y: 53 },
    { x: 6, y: 19 },
    { x: 7, y: 87 },
    { x: 8, y: 52 },
    { x: 9, y: 48 },
  ],
  isShowPoint: true,
  pointRadius: 3,
  isShowGrid: true,
  isShowAxis: true,
  isShowTooltip: true,
  isShowLegend: true,
  isShowXAxisLabel: true,
  isShowYAxisLabel: true,
  isShowXAxisLine: true,
  isShowYAxisLine: true,
  tooltipFormatter: (d: any) => `x: ${d.x}, y: ${d.y}`,
  type: 'primary',
  title: 'FeiUI 直线图',
});



const chartContainer = ref<HTMLElement>();
const chartSvg = ref<SVGSVGElement>();
const chartG = ref<SVGGElement>();

const innerWidth = props.width - props.margin.left - props.margin.right;
const innerHeight = props.height - props.margin.top - props.margin.bottom;

const xScale = scaleLinear().range([0, innerWidth]);
const yScale = scaleLinear().range([innerHeight, 0]);
const lineGenerator = line<{ x: number; y: number }>()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y));


const initChart = () => {
  if (!chartG.value) return;

  const g = select(chartG.value);
  g.selectAll("*").remove();
  updateScales();

  if (props.isShowAxis) {
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis);

    g.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
  }

  if (props.isShowGrid) {
    addGrid(g);
  }
    if (props.isShowLegend) {
    g.append("text")
      .attr("x", innerWidth - 60)
      .attr("y", -10)
      .attr("text-anchor", "start")
      .text(props.type);
      g.append("rect")
      .attr("x", innerWidth - 80)
      .attr("y", -20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", getColors()[props.type] || getColors()['primary']);
  }

  drawLine(g);
  g.append("text")
  .attr("x", innerWidth / 2)
  .attr("y", innerHeight + props.margin.bottom - 15)
  .attr("text-anchor", "middle")
  .text(props.title);

  if (props.isShowPoint) {
    addPoints(g);
  }
};

const updateScales = () => {
  const xValues = props.data.map(d => d.x);
  const yValues = props.data.map(d => d.y);

  xScale.domain([(d3Min(xValues) ?? 0), (d3Max(xValues) ?? 1)]);
  yScale.domain([(d3Min(yValues) ?? 0), (d3Max(yValues) ?? 1)]);
};

const addGrid = (g:any) => {
  const xAxisGrid = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickFormat(() => "");

  const yAxisGrid = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickFormat(() => "");

  g.append("g")
    .attr("class", "x-grid")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xAxisGrid)
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.3);

  g.append("g")
    .attr("class", "y-grid")
    .call(yAxisGrid)
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.3);
};

//加一个文本标签


const drawLine = (g: any) => {
  g.append("path")
    .datum(props.data)
    .attr("class", "line")
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke-width", 2);
};

const addPoints = (g: any) => {
  g.selectAll(".point")
    .data(props.data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", (d: { x: NumberValue; }) => xScale(d.x))
    .attr("cy", (d: { y: NumberValue; }) => yScale(d.y))
    .attr("r", props.pointRadius)
    .attr("fill",getColors()[props.type] || getColors()['primary']);
};

const updateChart = () => {
  if (!chartG.value) return;

  const g = select(chartG.value);

  updateScales();

  if (props.isShowAxis) {
    g.select(".x-axis")
    // @ts-ignore
      .transition()
      .duration(1000)
      .call(axisBottom(xScale));

    g.select(".y-axis")
    // @ts-ignore
      .transition()
      .duration(1000)
      .call(axisLeft(yScale));
  }

  // Update grid
  if (props.isShowGrid) {
    g.select(".x-grid")
    // @ts-ignore
      .transition()
      .duration(1000)
      .call(axisBottom(xScale).tickSize(-innerHeight).tickFormat(() => ""));

    g.select(".y-grid")
    // @ts-ignore
      .duration(1000)
      .call(axisLeft(yScale).tickSize(-innerWidth).tickFormat(() => ""));
  }

  g.select(".line")
    .datum(props.data)
    .attr("d", lineGenerator);
  if (props.isShowPoint) {
    const points = g.selectAll(".point")
      .data(props.data);

    points.enter()
      .append("circle")
      .attr("class", "point")
      .merge(points as any)
      .attr("cx", (d: { x: NumberValue; }) => xScale(d.x))
      .attr("cy", (d: { y: NumberValue; }) => yScale(d.y))
      .attr("r", props.pointRadius)

    points.exit().remove();
  }
};

onMounted(() => {
  nextTick(() => {
    initChart();
  });
});

watch(
  () => props.data,
  () => {
    updateChart();
  },
  { deep: true }
);

watch(
  () => props.width,
  () => {
    updateChart();
  }
);

watch(
  () => props.height,
  () => {
    updateChart();
  }
);
</script>
