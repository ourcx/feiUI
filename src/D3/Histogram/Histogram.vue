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
import { line } from "d3-shape";
import { min as d3Min, max as d3Max } from "d3-array";
import { ref, onMounted, watch, nextTick } from "vue";
import "d3-transition";
import type { HistogramProps } from "./type";
import type { Margin } from "@/utils/type";


const props = withDefaults(
  defineProps<HistogramProps>(),
  {
    title: "Histogram Chart",
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
    margin: ()=>({ top: 20, right: 30, bottom: 30, left: 40 }),
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






</script>
