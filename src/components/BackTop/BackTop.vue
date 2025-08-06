<template>
  <teleport :to="target">
    <transition name="back-top-fade">
      <div
        class="fei-backtop"
        v-if="showBackTop"
        :style="{
          right: right,
          bottom: bottom,
          transform: `all ${duration}ms ${easing}`,
        }"
      >
        <Button :type="type" @click="scrollToTop()"><slot>↑</slot></Button>
      </div>
    </transition>
  </teleport>
  <!--还没有开始写的 -->
</template>

<script setup lang="ts">
import Button from "../Button/Button.vue";
import type { BackTopProps, BackTopEmits } from "./type";
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<BackTopProps>(), {
  type: "primary",
  visibilityHeight: 400,
  target: "body",
  duration: 500,
  visible: true,
  easing: "ease",
  ScrollBehavior: "smooth",
  distance: 0,
});

const showButton = ref(false);
const showBackTop = computed(() => showButton.value && props.visible);
const handleScroll = () => {
  showButton.value = window.scrollY > props.visibilityHeight;
};

const scrollToTop = () => {
  window.scrollTo({
    top: props.distance,
    behavior: props.ScrollBehavior,
  });
};

// 添加滚动事件监听器
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 移除滚动事件监听器
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
