<template>
  <div
    :class="[
      'fei-divider',
      `fei-divider--${orientation}`,
      { 'is-dashed': dashed },
      { 'is-vertical': vertical }
    ]"
    @click="handleClick"
  >
    <span v-if="!vertical && $slots.default" class="fei-divider__text">
      <slot></slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import type { DividerProps, DividerEmits } from "./types";

defineExpose({
  name: "FeiDivider",
});

const props = withDefaults(defineProps<DividerProps>(), {
  dashed: false,
  orientation: "center",
  vertical: false,
});

const emit = defineEmits<DividerEmits>();

const handleClick = (event: MouseEvent) => {
  emit("click", event);
}
</script>
