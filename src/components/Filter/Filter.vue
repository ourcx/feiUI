<template>
  <div class="fei-filter" :class="{ [`fei-${type}`]: type }">
    <div class="fei-filter-content" v-html="filterXss"></div>
  </div>
</template>

<script setup lang="ts">
import type { FilterProps } from "./type";
import { toRefs, withDefaults, computed } from "vue";
import xss from "xss";

const props = withDefaults(defineProps<FilterProps>(), {
  valitor: () => ["a+"],
  data: "as dad acdfdvs sdcff g",
  type: "primary",
  opthions: () => ({
    whiteList: {
      a: ["href", "title"],
    },
  }),
});

const { valitor, data, opthions, type } = toRefs(props);

// 通过正则匹配
const filter = (valitor: Array<string>, data: string) => {
  return valitor.some((item) => new RegExp(item).test(data));
};

// 修正后的 filterHtml 计算属性
const filterHtml = computed(() => {
  return data.value
    .split(" ")
    .map((item) => {
      if (filter(valitor.value, item)) {
        // 如果匹配，用 span 包裹
        return `<div class="fei-filter-highlight">${item}</div>`;
      } else {
        // 如果不匹配，返回原文本
        return item;
      }
    })
    .join(" "); // 用空格重新连接
});

// 使用 xss 过滤
const filterXss = computed(() => {
  const str = xss(filterHtml.value, opthions.value);

  return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  //字符替换
});
console.log(filterXss.value, "结果");
</script>

<style scoped>
.fei-filter {
  display: inline-block;
}

.fei-filter-content {
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 4px;
}

/* 使用深度选择器来影响动态插入的 HTML */
:deep(.fei-filter-highlight) {
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: bold;
}

/* 不同类型的高亮颜色 */
.fei-primary :deep(.fei-filter-highlight) {
  background-color: var(--fei-color-primary-light-13);
  color: var(--fei-color-primary-dark-3);
}

.fei-success :deep(.fei-filter-highlight) {
  background-color: var(--fei-color-success-light-13);
  color: var(--fei-color-success-dark-3);
}

.fei-warning :deep(.fei-filter-highlight) {
  background-color: var(--fei-color-warning-light-13);
  color: var(--fei-color-warning-dark-3);
}

.fei-danger :deep(.fei-filter-highlight) {
  background-color: var(--fei-color-danger-light-13);
  color: var(--fei-color-danger-dark-3);
}

.fei-info :deep(.fei-filter-highlight) {
  background-color: var(--fei-color-info-light-13);
  color: var(--fei-color-info-dark-3);
}
</style>
