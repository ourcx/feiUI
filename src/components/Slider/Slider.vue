<template>
  <Tooltip v-if="showStops">
    <template #content>
      <div class="content-Slider">
        {{ Value }}
      </div>
    </template>
    <div class="fei-Slider" :class="{ [`fei-Slider--${type}`]: type }">
      <input
        type="range"
        :min="min"
        :max="max"
        :value="value"
        :step="step"
        @input="updateSliderFill"
      />
    </div>
  </Tooltip>
  <div class="fei-Slider" :class="{ [`fei-Slider--${type}`]: type }" v-else>
    <input
      type="range"
      :min="min"
      :max="max"
      :value="value"
      :step="step"
      @input="updateSliderFill"
    />
  </div>
  <div v-if="ShowValue" class="slider-value">{{ Value }}</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import type { SliderProps, SliderEmits } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";

defineOptions({
  name: "FeiSlider",
});

const props = withDefaults(defineProps<SliderProps>(), {
  max: 100,
  min: 0,
  step: 1,
  value: 0,
  showStops: false,
  type: "primary",
});
let SliderValue = 0;
const Value = ref(0);

const updateSliderFill = (event: any) => {
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

const emit = defineEmits<SliderEmits>();
</script>
