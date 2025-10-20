<template>
  <div class="fei-split" :class="{ [`fei-Split-${type}`]: type }">
    <div :style="{ width: asideWidth + 'px' }" id="fei-left-tree">
      <slot name="left"></slot>
    </div>
    <div id="fei-resize" class="fei-resize" :title="title" @mousedown="startDrag">
      <slot name="icon">
        <div class="fei-resize-handle">⋮</div>
      </slot>
    </div>
    <div id="fei-right-content">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { SplitProps } from "./types";

const props = withDefaults(defineProps<SplitProps>(), {
  title: "拖拽调整宽度",
  width: 250,
  minWidth: 100,
  maxWidth: 600,
  type: "info",
});
const BREAKPOINT_MOBILE = 768;

const asideWidth = ref((props.width as number) || 250);
const minAsideWidth = (props.minWidth as number) || 100;
const maxAsideWidth = (props.maxWidth as number) || 600;
const isDragging = ref(false);
const startX = ref(0);
const startWidth = ref(0);

const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.clientX;
  startWidth.value = asideWidth.value;
  document.body.classList.add("dragging");
  document.body.style.userSelect = "none";
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;

  e.preventDefault();

  const deltaX = (e.clientX - startX.value) * 3;
  let newWidth = startWidth.value + deltaX;
  newWidth = Math.max(minAsideWidth, Math.min(maxAsideWidth, newWidth));

  asideWidth.value = newWidth;
};

const stopDrag = () => {
  if (!isDragging.value) return;

  isDragging.value = false;
  document.body.classList.remove("dragging");
  document.body.style.userSelect = "";

  removeDragEvents();
};

const removeDragEvents = () => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

const handleResize = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth < BREAKPOINT_MOBILE) {
    asideWidth.value = Math.min(asideWidth.value, 300);
  }
  if (asideWidth.value > windowWidth * 0.6) {
    asideWidth.value = Math.floor(windowWidth * 0.6);
  }
};

const toggleSidebar = () => {
  if (asideWidth.value > minAsideWidth) {
    asideWidth.value = minAsideWidth;
  } else {
    asideWidth.value = 250;
  }
};

const resetSidebarWidth = () => {
  asideWidth.value = 250;
};

// 生命周期
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  // 确保组件卸载时移除事件监听
  if (isDragging.value) {
    removeDragEvents();
  }
});
</script>
