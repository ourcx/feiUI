<template>
  <i
    class="fei-icon"
    :class="{ [`fei-icon--${type}`]: type, 'is-active': active, 'is-disabled': disabled }"
  :style="customStyle" >
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { omit } from "lodash-es";
import type { FontAwesomeIconProps } from "@fortawesome/vue-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IconProps } from "./types";
defineOptions({
  name: "FeiIcon",
  inheritAttrs: false,
  //取消组件的继承属性
  // 这样可以避免将所有的属性传递给 FontAwesomeIcon
});
const props = defineProps<IconProps>();
const filteredProps = computed(() => {
  return {
    ...omit(props, ["type", "color", "active", "disabled"]),
    icon: props.icon as string | object | string[], // Ensure icon is always defined and not undefined
  };
});
// 计算属性 customStyle 用于动态设置样式
// 如果 color 属性存在，则返回一个包含 color 的样式对象，否则返回空对象
// 过滤掉 type 和 color 属性
const customStyle = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>
