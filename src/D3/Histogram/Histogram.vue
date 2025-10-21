<template>
  <div ref="chartContainer" class="histogram-chart-container">
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
import { min as d3Min, max as d3Max } from "d3-array";
import { ref, onMounted, watch, nextTick } from "vue";
import "d3-transition";
import type { HistogramProps } from "./type";
import { colors } from "@/utils/map";


const props = withDefaults(
  defineProps<HistogramProps>(),
  {
    data: ()=> [
      {
        name: "A",
        value: 30,
      },
      {
        name: "B",
        value: 80,
      },
      {
        name: "C",
        value: 45,
      },
      {
        name: "D",
        value: 60,
      },
      {
        name: "E",
        value: 20,
      },
      {
        name: "F",
        value: 90,
      },
      {
        name: "G",
        value: 55,
      }
    ],
    width: 600,
    height: 400,
   margin: () => ({
    top: 20,
    right: 30,
    bottom: 50,
    left: 50,
  }),
    isShowTooltip: true,
    isShowLegend: true,
    isShowXAxisLabel: true,
    isShowYAxisLabel: true,
    xAxisLabel: "X Axis",
    yAxisLabel: "Y Axis",
    type: "primary",
    isShowXAxisLine: true,
    isShowYAxisLine: true,
    isShowGridLine: true,
    tooltipFormatter: (d: any) => `x: ${d.x}, y: ${d.y}`,
    dataLabelFormatter: (d: any) => `${d.x}: ${d.y}`,
    isShowDataLabel: true
  }
);


const chartContainer = ref<HTMLElement>();
const chartSvg = ref<SVGSVGElement>();
const chartG = ref<SVGGElement>();

const innerWidth = props.width - props.margin.left - props.margin.right;
const innerHeight = props.height - props.margin.top - props.margin.bottom;

const xScale = scaleLinear().range([0, innerWidth]);
const yScale = scaleLinear().range([innerHeight, 0]);


  //柱状图初始函数

const initChart = () => {
  if (!chartG.value) return;
  const g = select(chartG.value);
  //设置x轴比例尺
  xScale.domain([0, props.data.length]);
  //设置y轴比例尺
  const yMax = d3Max(props.data, d => d.value) || 0
  yScale.domain([0, yMax]);
  //添加x轴
  const xAxis = axisBottom(xScale)
    .ticks(props.data.length)
    .tickFormat((d, i) => props.data[i] ? props.data[i].name : "");
  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xAxis);
  //添加y轴
  const yAxis = axisLeft(yScale);
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxis);
  //添加柱子
  g.selectAll(".bar")
    .data(props.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => yScale(d.value))
    .attr("width", innerWidth / props.data.length - 5)
    .attr("height", d => innerHeight - yScale(d.value))
    .attr("fill", colors[props.type] || colors['primary']);
  //添加标题
  g.append("text")

    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + props.margin.bottom - 5)
    .attr("text-anchor", "middle")
    .text(props.title||'');
    //添加图例
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
      .attr("fill", colors[props.type] || colors['primary']);
  }
  if (props.isShowXAxisLabel) {
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + props.margin.bottom - 5)
      .attr("text-anchor", "middle")
      .text(props.xAxisLabel);
      g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -props.margin.left + 15)
      .attr("text-anchor", "middle")
      .text(props.yAxisLabel);
  }
  if (props.isShowYAxisLabel) {
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -props.margin.left + 15)
      .attr("text-anchor", "middle")
      .text(props.yAxisLabel);
  }
  if (props.isShowXAxisLine) {
    g.selectAll(".x-axis path")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);
      g.selectAll(".x-axis line")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);
  }
  if(props.isShowYAxisLine){
    g.selectAll(".y-axis path")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);
      g.selectAll(".y-axis line")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);
  }
  if(props.isShowGridLine){
    //添加网格线
    const xAxisGrid = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickFormat(() => "");
    const yAxisGrid = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat(() => "");
    g.append("g")
    .attr("class", "x-axis-grid")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xAxisGrid)
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.3);
    g.append("g")
    .attr("class", "y-axis-grid")
    .call(yAxisGrid)
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.3);
  }
  //添加数据标签
  if(props.isShowDataLabel){
    g.selectAll(".bar-label")
      .data(props.data)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d, i) => xScale(i) + (innerWidth / props.data.length - 5) / 2)
      .attr("y", d => yScale(d.value) - 5)
      .attr("text-anchor", "middle")
      .text(d => props.dataLabelFormatter ? props.dataLabelFormatter({x: d.name, y: d.value}) : `${d.name}: ${d.value}`);
  }
}
  watch(() => props.data, () => {
    initChart();
  })
onMounted(() => {
  nextTick(() => {
    initChart();
  });
});
</script>
