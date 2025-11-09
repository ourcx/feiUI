<template>
  <div ref="chartContainer" class="fei-chart-container fei-d3">
    <svg
      ref="chartSvg"
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        ref="chartG"
        :transform="`translate(${centerX},${centerY})`"
        :class="['fei-d3-pie-chart', `fei-d3-${type}`]"
      ></g>
    </svg>

    <!-- 图例 -->
    <div v-if="legend" class="fei-pie-legend">
      <div v-for="(item, index) in data" :key="item.name" class="legend-item">
        <span class="legend-color" :style="{ backgroundColor: getColor(index) }"></span>
        <span class="legend-label">{{ item.name }}</span>
        <span class="legend-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { select } from "d3-selection";
import { pie, arc } from "d3-shape";
import { ref, onMounted, watch, computed } from "vue";
import type { PieProps } from "./type";
import { getColors } from "../../utils/map";

// Props定义
const props = withDefaults(defineProps<PieProps>(), {
  data: () => [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 30 },
    { name: "D", value: 40 },
    { name: "E", value: 50 },
  ],
  radius: 100,
  innerRadius: 0, // 改为数字类型
  type: "primary",
  tooltip: true,
  legend: true,
  label: true,
  labelColor: "#000",
  labelPosition: "inside",
  labelFontSize: "12px",
  labelFontWeight: "normal",
  labelFontFamily: "Arial",
  ColorArray: () => [
    getColors()["primary"],
    getColors()["success"],
    getColors()["warning"],
    getColors()["danger"],
    getColors()["info"],
  ],
  width: 500,
  height: 500,
  margin: () => ({
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  }),
  dasharray: 0,
});

// Refs
const chartContainer = ref<HTMLElement>();
const chartSvg = ref<SVGSVGElement>();
const chartG = ref<SVGGElement>();

// Computed properties
const centerX = computed(() => props.width / 2);
const centerY = computed(() => props.height / 2);
const actualInnerRadius = computed(() => {
  const innerRadius = props.innerRadius;
  return typeof innerRadius === "string" ? parseInt(innerRadius) || 0 : innerRadius;
});

// 颜色获取函数
const getColor = (index: number): string => {
  return props.ColorArray[index % props.ColorArray.length];
};

// 饼图配置
const pieGenerator = computed(() => {
  return pie<typeof props.data[0]>()
    .value((d) => d.value)
    .sort(null); // 保持数据顺序
});

const arcGenerator = computed(() => {
  return arc().innerRadius(actualInnerRadius.value).outerRadius(props.radius);
});

const labelArcGenerator = computed(() => {
  return arc()
    .innerRadius(props.radius * 0.8) // 标签位置
    .outerRadius(props.radius * 0.8);
});

// 初始化图表
const initChart = () => {
  if (!chartG.value) return;

  const g = select(chartG.value);
  g.selectAll("*").remove();

  const pieData = pieGenerator.value(props.data);

  // 创建扇形
  const slices = g
    .selectAll(".pie-slice")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "pie-slice");

  // 绘制扇形路径
  slices
    .append("path")
    .attr("d", arcGenerator.value as any)
    .attr("fill", (d, i) => getColor(i))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .style("cursor", "pointer")
    .on("mouseover", function (event, d) {
      if (props.tooltip) {
        select(this).attr("opacity", 0.8);
        select(this).attr("stroke", "none");
      }
    })
    .on("mouseout", function (event, d) {
      if (props.tooltip) {
        select(this).attr("opacity", 1);
        select(this).attr("stroke", "#fff");
      }
    });

  if (props.dasharray) {
    slices
      .attr("fill-opacity", 0.8)
      .attr("stroke-dasharray", "2,2")
      .attr("fill-rule", "evenodd");
    //虚线样式
  }

  // 添加标签
  if (props.label) {
    slices
      .append("text")
      .attr(
        "transform",
        (d) => `translate(${labelArcGenerator.value.centroid(d as any)})`
      )
      .attr("text-anchor", "middle")
      .style("font-size", props.labelFontSize)
      .style("font-weight", props.labelFontWeight)
      .style("font-family", props.labelFontFamily)
      .style("fill", props.labelColor)
      .text((d) => {
        const percentage = (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(
          1
        );
        return `${percentage}%`;
      });
  }

  // 添加数据标签
  slices
    .append("text")
    .attr("transform", (d) => `translate(${arcGenerator.value.centroid(d as any)})`)
    .attr("text-anchor", "middle")
    .style("font-size", "11px")
    .style("fill", "#fff")
    .style("pointer-events", "none")
    .text((d) => d.data.name);
};

// 响应式更新
watch(
  () => props.data,
  () => {
    initChart();
  },
  { deep: true, immediate: true }
);

watch([() => props.radius, () => props.innerRadius, () => props.label], () => {
  initChart();
});

// 生命周期
onMounted(() => {
  initChart();
});
</script>

<style scoped>
.fei-chart-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fei-pie-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  padding: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  display: inline-block;
}

.legend-label {
  font-weight: 500;
}

.legend-value {
  color: #666;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .fei-pie-legend {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
