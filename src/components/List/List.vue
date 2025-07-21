<template>
  <div class="fei-container__title" v-if="title" >
    <div class="fei-container__title-text" :class="{[`fei-title--${type}`]: type}">{{ title }}</div>
  </div>
  <div class="fei-container" :style="{ height: containerHeight }" @scroll="handleScroll" :class="{[`fei-list-${type}`]: type}">
    <!-- 数据列表 -->
    <div class="fei-list" :style="{ top: listTop }">
      <!-- 列表项 -->
      <div
        v-for="item in showData"
        :key="item.id"
        :style="{ height: itemSize + 'px' }"
        class="fei-list-item"
        @click="$emit('onClick', item)"
      >
        {{ item.content }}
      </div>

      <!-- 用于撑开高度的元素 -->
      <div class="fei-bar" :style="{ height: barHeight }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ListProps, ListEmits } from "./types";

const props = withDefaults(defineProps<ListProps>(), {
  items: () => [],
  itemSize: 60, // 默认项高度60px
  visibleCount: 10, // 默认可见项数量
});

const startIndex = ref(0);
const endIndex = ref(props.visibleCount);
const emit = defineEmits<ListEmits>();
// 显示的数据
const showData = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value);
});

// 容器高度 = 可见项数量 * 项高度
const containerHeight = computed(() => {
  return `${props.itemSize * props.visibleCount}px`;
});

// 占位条高度 = 总项数 * 项高度
const barHeight = computed(() => {
  return `${props.itemSize * props.items.length}px`;
});

// 列表顶部偏移量 = 起始索引 * 项高度
const listTop = computed(() => {
  return `${props.itemSize * startIndex.value}px`;
});

// 滚动处理
const handleScroll = (event: Event) => {
  const scrollTop = (event.target as HTMLElement).scrollTop;
  // 计算新的起始索引
  startIndex.value = Math.floor(scrollTop / props.itemSize);
  // 计算结束索引
  endIndex.value = startIndex.value + props.visibleCount;
  emit("onScroll", scrollTop);
};
</script>
