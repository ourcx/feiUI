<template>
  <div ref="chartContainer" class="histogram-chart-container fei-d3">
    <svg ref="chartSvg" :width="width" :height="height">
      <g ref="chartG" :transform="`translate(${margin.left},${margin.top})`"></g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { TreemapProps } from "./type";
import { select } from "d3-selection";
import { scaleLinear, type NumberValue } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { min as d3Min, max as d3Max } from "d3-array";
import { ref, onMounted, watch, nextTick } from "vue";
import "d3-transition";
import { stratify, treemap } from "d3-hierarchy";
import { getColors } from "../../utils/map";

const props = withDefaults(defineProps<TreemapProps>(), {
  width: 500,
  height: 500,
  margin: () => ({
    top: 20,
    right: 30,
    bottom: 50,
    left: 50,
  }),
  type: "primary",
  tooltip: true,
  tooltipFormatter: (data: any) => {
    return `<div>
      <strong>${data.name}</strong><br/>
      Value: ${data.value}
    </div>`;
  },
  onClick: (data: any) => {},
  onMouseOver: (data: any) => {},
  onMouseOut: (data: any) => {},
  onMouseMove: (data: any) => {},
  onMouseDown: (data: any) => {},
  data: () => [
    {
      name: "A",
      value: 100,
      parent: "root",
    },
    {
      name: "B",
      value: 300,
      parent: "root",
    },
    {
      name: "C",
      value: 200,
      parent: "root",
    },
    {
      name:"root",
      value:0,
      parent:"",
    }
  ],
  borderWidth: 4,
});

const chartContainer = ref<HTMLElement>();
const chartSvg = ref<SVGSVGElement>();
const chartG = ref<SVGGElement>();

const innerWidth = props.width - props.margin.left - props.margin.right;
const innerHeight = props.height - props.margin.top - props.margin.bottom;
const initChart = () => {
  // 数据验证
  const data = props.data;
  if (!data || !Array.isArray(data) || data.length === 0) return;

  if (!chartG.value) return;
    const svg = select(chartG.value);
    svg.selectAll("*").remove();

    const root = stratify()
      .id(function(d: any) { return d.name; })
      .parentId(function(d: any) { return d.parent; })
      (data as any);
    root.sum(function(d: any) { return +d.value; });
    const PADDING = props.borderWidth || 4;
    treemap()
      .size([innerWidth, innerHeight])
      .padding(PADDING)
      .round(true)
      (root);
    const colorScale = getColors()[props.type || 'primary'];

    console.log(root.leaves());
    svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    //@ts-ignore
      .attr('x', function (d) { return d.x0; })
       //@ts-ignore
      .attr('y', function (d) { return d.y0; })
       //@ts-ignore
      .attr('width', function (d) { return d.x1 - d.x0; })
       //@ts-ignore
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", colorScale );
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
     //@ts-ignore
      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
       //@ts-ignore
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
       //@ts-ignore
      .text(function(d){ return d.data.name})
      .attr("font-size", "25px")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("fill", "white")

  if (props.tooltip) {
    // Tooltip 逻辑待补充
    //显示文字提示
    svg
    .selectAll("rect")
    .on("mouseover", function (event: any, d: any) {
      select(this)
        .style("opacity", 0.7);
      const tooltipDiv = select(chartContainer.value!)
        .append("div")
        .attr("class", "fei-d3-tooltip")
        .style("position", "absolute")
        .style("background", "rgba(0,0,0,0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "5px")
      tooltipDiv
        .html(props.tooltipFormatter(d.data))
        .style("left", (event.pageX + 20) + "px")
        .style("top", (event.pageY + 20) + "px");
        props.onMouseOver?.(d.data);
        props.onMouseMove?.(d.data);
        props.onMouseDown?.(d.data);
        props.onMouseOut?.(d.data);
        props.onClick?.(d.data);
    })
    .on("mouseout", function (event: any, d: any) {
      select(this)
        .style("opacity", 1);
      select(chartContainer.value!)
        .selectAll(".fei-d3-tooltip")
        .remove();
      props.onMouseOut?.(d.data);
    });
    svg
    .selectAll("rect")
    .on("mousemove", function (event: any, d: any) {
      const tooltipDiv = select(chartContainer.value!)
        .selectAll(".fei-d3-tooltip");
      tooltipDiv
        .style("left", (event.pageX + 20) + "px")
        .style("top", (event.pageY + 20) + "px");
      props.onMouseMove?.(d.data);
    });
  }


};




watch(
  () => props.data,
  async () => {
    await nextTick();
    initChart();
  }
)

onMounted(() => {
  initChart();
})
</script>
