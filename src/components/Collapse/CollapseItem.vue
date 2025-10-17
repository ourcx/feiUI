<template>
  <div
    class="fei-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="fei-collapse-item__header"
      :class="{
        'is-active': isActive,
        'is-disabled': disabled,
      }"
      :id="`item-header-${name}`"
      @click="handleClick()"
    >
      <slot name="title" class="fei-collapse-item__title"> {{ title }}</slot>
      <div
        :class="{ 'fei-collapse-item__arrow': arrow&&!disabled, 'fei-change-arrow': ArrowActive&& !disabled }"
      ></div>
    </div>
    <!-- 在transation上面添加相关的js事件 -->
    <transition name="fade" v-on="transitionEvents" >
      <div class="fei-collapse-item__wrapper" v-show="isActive">
        <!-- 在这个组件之内的意思，就是这个组件的子组件，使用双下划线 -->
        <div class="fei-collapse-item__content" :id="`item-header-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, watch, ref } from "vue";
//父子通信
import type { CollapseItemProps } from "./types";
import { collapseContextKey } from "./types";

defineOptions({
  name: "FeiCollapseItem",
});

const ArrowActive = ref<boolean>(false);
const props = defineProps<CollapseItemProps>();
const CollapseContext = inject(collapseContextKey);
const isActive = computed(() => CollapseContext?.activeNames?.value?.includes(props.name));
watch(
  () => isActive.value,
  (val) => {
    if (val) {
      ArrowActive.value = true;
    } else {
      ArrowActive.value = false;
    }
  },
  {
    immediate: true,
  }
);
const handleClick = () => {
  if (props.disabled) {
    return;
  }
  CollapseContext?.handleItemClick(props.name);
};

const transitionEvents: Record<string, (el: Element) => void> = {
  beforeEnter(el) {
    if (el instanceof HTMLElement) {
      el.style.height = "0px";
      el.style.overflow = "hidden";
    }
  },
  enter(el) {
    if (el instanceof HTMLElement) {
      el.style.height = `${el.scrollHeight}px`;
    }
  },
  afterEnter(el) {
    if (el instanceof HTMLElement) {
      el.style.height = "";
      el.style.overflow = "";
    }
  },
  beforeLeave(el) {
    if (el instanceof HTMLElement) {
      el.style.height = `${el.scrollHeight}px`;
      el.style.overflow = "hidden";
    }
  },
  leave(el) {
    if (el instanceof HTMLElement) {
      el.style.height = "0px";
    }
  },
  afterLeave(el) {
    if (el instanceof HTMLElement) {
      el.style.height = "";
      el.style.overflow = "";
    }
  },
};
</script>
