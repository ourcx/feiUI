<template>
  <Tooltip v-if="showStops" :ColorType="type">
    <template #content>
      <div class="content-Slider">
        {{ Value }}
      </div>
    </template>
    <div
      class="fei-Slider"
      :class="{
        [`fei-Slider--${type}`]: type,
        'is-Progress': progress,
        'is-vertical': vertical,
      }"
    >
      <input
        type="range"
        :min="min"
        :max="max"
        v-model="Value"
        :step="step"
        @input="updateSliderFill"
        ref="input"
        :disabled="progress"
      />
    </div>
  </Tooltip>
  <div
    class="fei-Slider"
    :class="{
      [`fei-Slider--${type}`]: type,
      'is-Progress': progress,
      'is-vertical': vertical,
    }"
    v-else
  >
    <input
      type="range"
      :min="min"
      :max="max"
      v-model="Value"
      :step="step"
      @input="updateSliderFill"
      ref="input"
      :disabled="progress"
    />
  </div>
  <div v-if="ShowValue" class="slider-value">{{ Value }}</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { nextTick } from "vue";
import type { SliderProps, SliderEmits } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";

defineOptions({
  name: "FeiSlider",
});
const input = ref<HTMLInputElement>();
const props = withDefaults(defineProps<SliderProps>(), {
  max: 100,
  min: 0,
  step: 1,
  value: 0,
  showStops: false,
  type: "primary",
  progress: false,
});
let SliderValue = 0;
const Value = ref(0);

const updateSliderFill = (event: any) => {
  if (props.progress) return;
  const slider = event.target;
  const min = slider.min || 0;
  const max = slider.max || 100;
  SliderValue = slider.value;
  // 计算填充百分比
  const percent = ((SliderValue - min) / (max - min)) * 100;
  // 设置 CSS 变量
  slider.style.setProperty("--fei-slider-fill-percent", `${percent}%`);
  Value.value = SliderValue;
  emit("input", SliderValue);
};

watch(
  () => props.value,
  (newValue) => {
    if (typeof newValue === "number") {
      // 等待 nextTick 确保 DOM 已更新
      nextTick(() => {
        Value.value = newValue;
        input.value!.style.setProperty("--fei-slider-fill-percent", `${Value.value}%`);
      });
    }
  },
  { immediate: true }
);

const emit = defineEmits<SliderEmits>();
</script>
