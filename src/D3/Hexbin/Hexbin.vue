<template>
  <div ref="chartContainer" class="hexbin-chart-container fei-d3" >
    <svg ref="chartSvg" :width="width" :height="height">
      <g
        ref="chartG"
        :transform="`translate(${margin.left},${margin.top})`"
        class="fei-D3-hexbin"
        :class="{ [`fei-D3-${type}`]: type }"
      ></g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { select } from "d3-selection";
import { hexbin as createHexbin } from "d3-hexbin";
import { ref, onMounted, watch, nextTick,computed } from "vue";
import { axisBottom, axisLeft } from "d3-axis";
import { min as d3Min, max as d3Max, extent } from "d3-array";
import "d3-transition";
import type { HexbinProps } from "./type";
import { scaleLinear } from "d3-scale";
import { getColors } from "@/utils/map";

const props = withDefaults(defineProps<HexbinProps>(), {
  width: 600,
  height: 500,
  data: () => [
    [0, 0],
    [10, 10],
    [20, 20],
    [30, 30],
    [40, 40],
    [50, 50],
    [60, 60],
    [70, 70],
    [80, 80],
    [90, 90],
    [100, 100],
  ],
  radius: 10,
  type: 'primary',
  opacity: 0.5,
  stroke: "none",
  margin: () => ({
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
  }),
  isShowLegend: true,
  isShowGrid: true,
  onClick: () => {},
  onMouseOut: () => {},
  onMouseOver: () => {},
  onMouseMove: () => {},
  onMouseDown: () => {},
});






//基本的绘制流程
// 1. 创建图表容器
// 2. 创建refs，内部尺寸，比例尺
// 3. 初始化图表函数initChart，这里还要有一些小功能的绘制
// 4. 绘制坐标轴函数drawAxes
// 5. 绘制图像主要内容
// 6. 响应式更新函数updateChart
// 7. 生命周期钩子onMounted
// 8. 监听数据和属性变化watch


// Refs
const chartContainer = ref<HTMLElement>();
const chartSvg = ref<SVGSVGElement>();
const chartG = ref<SVGGElement>();

// 计算内部尺寸
const innerWidth = computed(() => props.width - props.margin.left - props.margin.right);
const innerHeight = computed(() => props.height - props.margin.top - props.margin.bottom);

// 比例尺
const xScale = computed(() =>
  scaleLinear()
    .range([0, innerWidth.value])
    .domain(extent(props.data, d => d[0]) as [number, number])
);

const yScale = computed(() =>
  scaleLinear()
    .range([innerHeight.value, 0])
    .domain(extent(props.data, d => d[1]) as [number, number])
);

// 初始化图表
const initChart = () => {
  if (!chartG.value || !chartSvg.value) return;

  const g = select<SVGGElement, unknown>(chartG.value!);
  g.selectAll("*").remove(); // 清除现有内容

  if (props.isShowLegend) {
    g.append("text")
      .attr("x", innerWidth.value - 60)
      .attr("y", -10)
      .attr("text-anchor", "start")
      .text(props.type);
      g.append("rect")
      .attr("x", innerWidth.value - 80)
      .attr("y", -20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", getColors()[props.type])
  }

    if(props.isShowGrid){
    //添加网格线
    const xAxisGrid = axisBottom(xScale.value)
      .tickSize(-innerHeight.value)
      .tickFormat(() => "");
    const yAxisGrid = axisLeft(yScale.value)
      .tickSize(-innerWidth.value)
      .tickFormat(() => "");
    g.append("g")
    .attr("class", "x-axis-grid")
    .attr("transform", `translate(0,${innerHeight.value})`)
    .call(xAxisGrid)
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.3);
    g.append("g")
    .attr("class", "y-axis-grid")
    .call(yAxisGrid)
    .style("stroke-dasharray", "3,3")
    .style("opacity", 0.3);
  }

  drawAxes(g);
  drawHexbins(g);
};

// 绘制坐标轴
const drawAxes = (g: any) => {
  // X轴
  const xAxis = axisBottom(xScale.value);
  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight.value})`)
    .call(xAxis);

  // Y轴
  const yAxis = axisLeft(yScale.value);
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxis);
};

// 绘制六边形
const drawHexbins = (g: any) => {
  const hexbin = createHexbin()
    .radius(props.radius)
    .x(d => xScale.value(d[0]))
    .y(d => yScale.value(d[1]));

  const hexbinData = hexbin(props.data);

  g.selectAll("path.hexagon")
    .data(hexbinData)
    .enter()
    .append("path")
    .attr("class", "hexagon")
    .attr("fill", getColors()[props.type])
    .attr("d", hexbin.hexagon())
    .attr("transform", (d:any) => `translate(${d.x},${d.y})`)
    .attr("opacity", props.opacity)
    .attr("stroke", props.stroke)
    .attr("stroke-width", 1)
    .on("click", (event: MouseEvent, d: any) => {
      props.onClick(event, d);
    })
    .on("mouseover", (event: MouseEvent, d: any) => {
      props.onMouseOver(event, d);
    })
    .on("mouseout", (event: MouseEvent, d: any) => {
      props.onMouseOut(event, d);
    })
    .on("mousemove", (event: MouseEvent, d: any) => {
      props.onMouseMove(event, d);
    })
    .on("mousedown", (event: MouseEvent, d: any) => {
      props.onMouseDown(event, d);
    });
};

// 响应式更新
const updateChart = () => {
  if (!chartG.value) return;

  const g = select<SVGGElement, unknown>(chartG.value!);

  // 更新坐标轴
  // g.select(".x-axis")
  //   .call(axisBottom(xScale.value));

  // g.select(".y-axis")
  //   .call(axisLeft(yScale.value));

  // 更新六边形
  const hexbin = createHexbin()
    .radius(props.radius)
    .x(d => xScale.value(d[0]))
    .y(d => yScale.value(d[1]));

  const hexbinData = hexbin(props.data);

  const hexagons = g.selectAll("path.hexagon")
    .data(hexbinData);

  // 移除多余的元素
  hexagons.exit().remove();

  // 更新现有元素
  hexagons
    .attr("d", hexbin.hexagon())
    .attr("transform", (d:any) => `translate(${d.x},${d.y})`)
    .attr("fill", getColors()[props.type])
    .attr("opacity", props.opacity)
    .attr("stroke", props.stroke);

  // 添加新元素
  hexagons.enter()
    .append("path")
    .attr("class", "hexagon")
    .attr("d", hexbin.hexagon())
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .attr("fill",  getColors()[props.type])
    .attr("opacity", props.opacity)
    .attr("stroke", props.stroke)
    .on("click", (event: MouseEvent, d: any) => {
      props.onClick(event, d);
    })
    .on("mouseover", (event: MouseEvent, d: any) => {
      props.onMouseOver(event, d);
    })
    .on("mouseout", (event: MouseEvent, d: any) => {
      props.onMouseOut(event, d);
    })
    .on("mousemove", (event: MouseEvent, d: any) => {
      props.onMouseMove(event, d);
    })
    .on("mousedown", (event: MouseEvent, d: any) => {
      props.onMouseDown(event, d);
    });
};

// 生命周期
onMounted(() => {
  nextTick(() => {
    initChart();
  });
});

// 监听数据变化
watch(
  () => props.data,
  () => {
    if (chartG.value && chartSvg.value) {
      updateChart();
    }
  },
  { deep: true }
);

// 监听其他属性变化
watch(
  [() => props.width, () => props.height, () => props.margin],
  () => {
    if (chartSvg.value) {
      select<SVGSVGElement, unknown>(chartSvg.value!)
        .attr("width", props.width)
        .attr("height", props.height);
    }
    if (chartG.value) {
      initChart(); // 重新初始化，因为尺寸变化需要重新计算布局
    }
  },
  { deep: true }
);
</script>

<style scoped>
.hexbin-chart-container {
  display: inline-block;
}
</style>


