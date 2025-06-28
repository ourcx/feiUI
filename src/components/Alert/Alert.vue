<template>
  <transition
    :name="animation ? 'expand-width' : ''"
    @before-enter="transitionEvents.beforeEnter"
    @enter="transitionEvents.enter"
    @after-enter="transitionEvents.afterEnter"
    @before-leave="transitionEvents.beforeLeave"
    @leave="transitionEvents.leave"
    @after-leave="transitionEvents.afterLeave"
  >
    <div
      class="fei-alert"
      v-if="show"
      :class="{
        [`fei-alert--${type}`]: type,
        [`fei-alert-effect--${effect}-${type}`]: effect,
        'fei-alert--center': center,
        'fei-alert-duration': duration ? duration > 0 : false,
        'fei-alert--disIcon': disIcon,
      }"
      @click="click"
      :style="width ? { width: width } : {}"
      ref="alertElement"
    >
      <div class="fei-alert__header">
        <span class="fei-alert__title">{{ title }}</span>
        <span class="fei-alert__description">{{ description }}</span>
        <slot />
      </div>
      <div class="fei-alert__actions">
        <div class="fei-alert__close" @click.stop="close()">
          <Icon v-if="disIcon ? false : true" :icon="icon ? icon : 'times'" />
          <span v-if="closeText" class="close-text">{{ closeText }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Icon from "../Icon/Icon.vue";
import { ref, watch, computed, onMounted } from "vue";
import type { AlertProps, AlertEmits, AlertEvents, TransitionEvents } from "./types";

defineOptions({
  name: "FeiAlert",
});

const alertElement = ref<HTMLElement | null>(null); // 添加元素引用
const emitClose = defineEmits<AlertEmits>();

const show = ref(false);
// 暴露给用户的方法
const close = () => {
  emitClose("close", "Alert 已关闭");
  // 执行关闭逻辑...
  show.value = false;
};

const click = () => {
  // 执行点击逻辑...
};

const props = defineProps<AlertProps>();
defineExpose<AlertEvents>({
  close,
  click,
});

const createTransitionEvents = (duration: number = 300): TransitionEvents => {
  if (duration <= 0||!props.animation) {
    return {
      beforeEnter: () => {},
      enter: () => {},
      afterEnter: () => {},
      beforeLeave: () => {},
      leave: () => {},
      afterLeave: () => {},
    };
  }
  return {
    beforeEnter(el: Element) {
      if (el instanceof HTMLElement) {
        // 保存原始显示方式
        const originalDisplay = window.getComputedStyle(el).display;
        el.dataset.originalDisplay = originalDisplay;

        // 设置为内联块级元素，确保有内容宽度
        el.style.display = "inline-block";
        el.style.width = "0px";
        el.style.overflow = "hidden";
        el.style.opacity = "0";

        // 设置过渡效果（注意：必须在初始状态设置）
        el.style.transition = `
          width ${duration}ms ease-in-out,
          opacity ${duration}ms ease-in-out
        `;
      }
    },

    enter(el: Element) {
      if (el instanceof HTMLElement) {
        // 强制重绘以触发动画
        void el.offsetHeight;
        // 设置目标状态
        el.style.width = `100%`;
        el.style.opacity = "1";
      }
    },

    afterEnter(el: Element) {
      if (el instanceof HTMLElement) {
        // 恢复原始显示方式
        el.style.display = el.dataset.originalDisplay || "";

        // 清除内联样式（保留实际宽度）
        el.style.overflow = "";
        el.style.transition = "";
        el.style.opacity = "";
      }
    },

    beforeLeave(el: Element) {
      if (el instanceof HTMLElement) {
        // 保存当前宽度
        const currentWidth = window.getComputedStyle(el).width;
        el.dataset.originalWidth = currentWidth;

        // 设置过渡效果
        el.style.transition = `
          width ${duration}ms ease-in-out,
          opacity ${duration}ms ease-in-out
        `;
        el.style.overflow = "hidden";
      }
    },

    leave(el: Element) {
      if (el instanceof HTMLElement) {
        // 强制重绘以触发动画
        void el.offsetHeight;

        // 设置目标状态
        el.style.width = "0px";
        el.style.opacity = "0";
      }
    },

    afterLeave(el: Element) {
      if (el instanceof HTMLElement) {
        // 恢复原始宽度
        if (el.dataset.originalWidth) {
          el.style.width = el.dataset.originalWidth;
        }

        // 清除其他样式
        el.style.overflow = "";
        el.style.transition = "";
        el.style.opacity = "";
      }
    },
  };
};

// 创建过渡事件
const transitionEvents = ref(createTransitionEvents(props.duration));

// 监听 duration 变化
watch(
  () => props.duration,
  (newDuration) => {
    transitionEvents.value = createTransitionEvents(newDuration);
  }
);

// 组件挂载后初始化宽度
onMounted(() => {
  show.value = true; // 显示 Alert
  if (alertElement.value) {
    // 确保元素有初始宽度
    alertElement.value.style.width = "auto";
  }
});
</script>
