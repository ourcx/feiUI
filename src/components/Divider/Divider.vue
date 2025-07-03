<template>
  <div class="fei-divider">
    <div class="fei-divider-line" v-if="!vertical" :class="{'fei-divider-line--dashed': dashed}">
      <div :class="{ [`fei-divider-line--${orientation}`]: orientation,  }">
        <slot></slot>
      </div>
    </div>
    <div class="fei-divider-vertical" v-if="vertical"></div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import type { DividerProps, DividerEmits } from "./types";

defineExpose({
  name: "FeiDivider",
});

const props = withDefaults(defineProps<DividerProps>(), {
  dashed: false,
  orientation: "center",
  vertical: false,
});
</script>
