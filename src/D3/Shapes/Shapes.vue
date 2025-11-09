<template>
  <div class="fei-shapes">
    <div class="fei-shapes-container">
      <div
        class="fei-shapes-title"
        v-if="text"
        :style="{
          textAlign: textAlign,
          color: textColor,
          fontSize: textSize + 'px',
          fontWeight: textWeight,
        }"
      >
        {{ text }}
      </div>
      <div class="fei-shapes-content">
        <div ref="shapeContainer" class="shape-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { select } from "d3-selection";
import { arc, pie } from "d3-shape";
import { curveBasis } from "d3-shape";
import { line } from "d3-shape";
import type { ShapesProps } from "./type";
import { getColors } from "@/utils/map";
const props = withDefaults(defineProps<ShapesProps>(), {
  width: 200,
  height: 200,
  shape: "circle",
  margin: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  data: () => [
    { x: 10, y: 10 },
    { x: 50, y: 80 },
    { x: 100, y: 40 },
    { x: 150, y: 100 },
    { x: 190, y: 30 },
  ],
  type: "primary",
  text: "",
  textAlign: "center",
  textColor: "#333",
  textSize: 16,
  textWeight: 600,
  cy: 100,
  cx: 100,
  r: 50,
  y: 50,
  x: 50,
  color: getColors()["primary"],
  size: 20,
});

const shapeContainer = ref<HTMLElement | null>(null);

const init = () => {
  if (!shapeContainer.value) return;

  // 清除容器内容
  shapeContainer.value.innerHTML = "";

  const svg = select(shapeContainer.value)
    .append("svg")
    .attr("width", props.width)
    .attr("height", props.height);

  console.log("绘制图形:", props.shape, props);

  switch (props.shape) {
    case "circle":
      svg
        .append("circle")
        .attr("cx", props.cx)
        .attr("cy", props.cy)
        .attr("r", props.r)
        .attr("stroke", "black")
        .attr("fill", props.color);
      break;
    case "Rect":
      svg
        .append("rect")
        .attr("x", props.x)
        .attr("y", props.y)
        .attr("width", props.width * 0.8)
        .attr("height", props.height * 0.8)
        .attr("stroke", "black")
        .attr("fill", props.color);
      break;
    case "Line":
      svg
        .append("line")
        .attr("x1", props.x)
        .attr("y1", props.y)
        .attr("x2", props.x + props.width * 0.8)
        .attr("y2", props.y + props.height * 0.8)
        .attr("stroke", props.color || "black")
        .attr("stroke-width", 2);
      break;
    case "Text":
      svg
        .append("text")
        .attr("x", props.x)
        .attr("y", props.y)
        .attr("fill", props.color || "black")
        .style("font-size", props.size + "px")
        .text("示例文本");
      break;
    case "Curve": {
      const curveFunc = line<{ x: number; y: number }>()
        .curve(curveBasis)
        .x((d) => d.x)
        .y((d) => d.y);

      svg
        .append("path")
        .datum(props.data)
        .attr("d", curveFunc)
        .attr("stroke", props.color || "black")
        .attr("fill", "none")
        .attr("stroke-width", 2);
      break;
    }
    case "Area": {
      const curveFunc = line<{ x: number; y: number }>()
        .curve(curveBasis)
        .x((d) => d.x)
        .y((d) => d.y);

      svg
        .append("path")
        .datum(props.data)
        .attr("d", curveFunc)
        .attr("stroke", "black")
        .attr("fill", props.color)
        .attr("stroke-width", 2);
      break;
    }
    case "Arc": {
      const arcGenerator = arc()
        .innerRadius(30)
        .outerRadius(60)
        .startAngle(0)
        .endAngle(Math.PI * 1.5);

      svg
        .append("path")
        .attr("transform", `translate(${props.width / 2},${props.height / 2})`)
        .attr(
          "d",
          arcGenerator({
            innerRadius: 100,
            outerRadius: 150,
            startAngle: 3.14,
            endAngle: 6.28,
          }) as string
        )
        .attr("fill", props.color);
      break;
    }
    default:
      console.warn("未知图形类型:", props.shape);
  }
};

// 当props变化时重新绘制
watch(
  () => [props.shape, props.width, props.height, props.color],
  () => {
    init();
  }
);

onMounted(() => {
  init();
});
</script>

<style scoped>
.fei-shapes {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: inline-block;
  margin: 10px;
}

.fei-shapes-container {
  border-radius: 8px;
  padding: 15px;
}

.fei-shapes-title {
  margin-bottom: 15px;
  padding-bottom: 8px;
}

.fei-shapes-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shape-container {
  display: inline-block;
}
</style>
