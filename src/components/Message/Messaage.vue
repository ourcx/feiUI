<template>
  <Transition
    :name="props.transitionName"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div
      class="fei-message"
      v-show="visible"
      role="alert"
      :class="{ ['fei-message--' + type]: type, 'is-close': showClose }"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="fei-message__content">
        <slot>
          <RenderVnode v-if="message" :vNode="message"></RenderVnode>
        </slot>
      </div>
      <div class="fei-message__close" v-if="showClose" @click.stop="closeMessage">
        <Icon icon="xmark"></Icon>
      </div>
    </div>
  </Transition>
  <!-- transition控制在销毁组件之前进行 -->
</template>

<script setup lang="ts">
import type { MessageProps } from "./type";
import RenderVnode from "../../hook/RenderVnode";
import Icon from "../Icon/Icon.vue";
import { ref, onMounted, watch, nextTick, computed, Transition } from "vue";
import useEventListener from "../../hook/useEventListener";

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 20,
  showClose: true,
  transitionName: "fade-up",
});

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
const height = ref(0);
const topOffset = ref(0); // 顶部位置

// 计算底部偏移量
const bottomOffset = computed(() => {
  return topOffset.value + height.value;
});

const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex,
}));

const closeMessage = () => {
  visible.value = false;
};

let timer: any;
function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

onMounted(async () => {
  visible.value = true;
  startTimer();
  await updateHeight();
});

// 暴露必要属性
defineExpose({
  bottomOffset,
  visible,
  height,
  topOffset,
  updateHeight,
});

// 更新高度的方法
// 在 @enter 钩子中调用的方法
async function updateHeight() {
  await nextTick(); // 等待 DOM 更新
  if (messageRef.value) {
    height.value = messageRef.value.getBoundingClientRect().height;
  }
}

// 监听可见性变化
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestory?.();
//   }
// });
function destroyComponent() {
  props.onDestory?.();
}

function keydown(e: Event) {
  const event = e as KeyboardEvent;
  if (event.key === "Escape") {
    visible.value = false;
  }
}

useEventListener(document, "keydown", keydown);
</script>
