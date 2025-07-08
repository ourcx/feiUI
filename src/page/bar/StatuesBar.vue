<template>
  <div
    class="fei-bar-status"
    :class="{ [`is-bar-${status}`]: status, 'is-fixed': fixed, 'is-pinch': Pinch }"
    :style="{ height: Barheight + 'px', backgroundColor: backgroundColor }"
    ref="Bar"
  >
    <div class="fei-bar-status__icon" @click="goBack()">
      <slot name="icon"></slot>
      <Icon :icon="icon" type="info" v-if="back" />
    </div>
    <div class="fei-bar-status__content">
      <div class="content-title">
        <slot name="title"></slot>
        {{ title }}
      </div>
      <div class="content-description">
        <slot name="description"></slot>
        {{ description }}
      </div>
    </div>
    <div class="fei-bar-status__slot">
      <slot name="befor"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon/Icon.vue";
import type { StatuesBarProps, StatuesBarInstance } from "./types";
import { ref, onMounted } from "vue";

const props = withDefaults(defineProps<StatuesBarProps>(), {
  status: "info",
  title: "",
  description: "",
  back: true,
  icon: "arrow-left",
  height: 60,
  backgroundColor: "#fff",
  fixed: true,
});
const Barheight = ref(props.height);
const Bar = ref<HTMLElement>();
const Pinch = ref(false);
// 定义组件可触发的事件
const emit = defineEmits<StatuesBarInstance>();

// 示例：正确调用 close 事件
const goBack = () => {
  emit("close");
};

const hiddenBar = () => {
  if (Bar.value) {
    Bar.value.style.transition = "transform 1s ease, opacity 1s ease"; // 添加动画过渡效果
    Bar.value.style.transform = `translateY(-${props.height}px)`; // 向上移动 height 的距离
    Bar.value.style.opacity = "0"; // 设置透明度为 0
  }
  emit("hidden", { top: -props.height });
};

const showBar = () => {
  if (Bar.value) {
    Bar.value.style.transition = "transform 1s ease, opacity 1s ease";
    Bar.value.style.transform = "translateY(0)";
    Bar.value.style.opacity = "1";
  }
  emit("show", { top: 0 });
};

const BarOpacity = () => {
  if (Bar.value) {
    Bar.value.style.transition = "background-color 1s ease";
    Bar.value.style.backgroundColor = "rgba(0, 0, 0, 0)";
    Bar.value.style.borderBottom = "none";
  }
};

const BarOpacityClose = () => {
  if (Bar.value) {
    Bar.value.style.transition = "background-color 1s ease";
    Bar.value.style.backgroundColor = props.backgroundColor!;
    Bar.value.style.borderBottom = "1px solid rgba(0, 0, 0, 0.1)";
  }
};
//操作了一些简单的动画和tar的显示和隐藏

const scrollPinch = () => {
  if (props.fixed && Bar.value && !Pinch.value) {
    if (window.scrollY > props.height) {
      Bar.value!.style.height = Barheight.value / 1.5 + "px";
      Barheight.value = Barheight.value / 1.5;
      Bar.value.style.transition = "height 1s ease";
      Pinch.value = true;
      //一半的高度
      emit("scroll");
      return;
    }
  }else{
    console.log("取消");
    Pinch.value = false;
    Bar.value!.style.height = Barheight.value + "px";
    Bar.value!.style.transition = "height 1s ease";
    Barheight.value =props.height;
    emit("scroll");
  }
};

defineExpose({
  hiddenBar,
  showBar,
  BarOpacity,
  BarOpacityClose,
  scrollPinch,
});
</script>
