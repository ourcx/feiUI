<template>
  <button
    ref="_ref"
    class="fei-button"
    :class="{
      [`fei-button--${type}`]: type,
      [`fei-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofoucs="autofoucs"
    :type="nativeType"
    :style="computedWidthStyle"
  >
    <!-- 按钮图标 -->
    <Icon v-if="icon" :icon="icon" />
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from "./types";
import { ref, computed } from "vue";
import Icon from "../Icon/Icon.vue";
import "./style.css";
//导入的是对应的类型，而不是代码
defineOptions({
  name: "FeiButton",
});
//定义一个组件的名字，防止出现混淆,vue3.3将一个插件的功能集成到里面去了
const props = withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});
//默认值

//setup组件默认关闭了整个组件，无法获取dom
//通过defineExpose暴露出去的属性
const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref,
});

const computedWidthStyle = computed(() => {
  if (props.width === undefined) return {};
  return {
    width: typeof props.width === "number" ? `${props.width}px` : props.width,
  };
});
//暴露dom
</script>
