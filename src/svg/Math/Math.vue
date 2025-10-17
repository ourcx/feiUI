<template>
  <div class="fei-math" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="fei-math-title">{{ props.name }}</div>
    <div class="fei-math-content" v-html="html" :style="{ color: color }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";
import katex from "katex";
import type { MathProps } from "./type";
const props = withDefaults(defineProps<MathProps>(), {
  name: "质能转化",
  format: "E = mc^2",
  width: 200,
  height: 200,
  displayMod: true,
  errorColor: "#f00",
  throwOnError: true,
});

const html = computed(() => {
  return katex.renderToString(props.format, {
    throwOnError: props.throwOnError,
    errorColor: props.errorColor,
    displayMode: props.displayMod,
  });
});
</script>
