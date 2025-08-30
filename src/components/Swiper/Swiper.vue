<template>
  <div
    class="fei-swiper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
  >
    <div
      ref="mainRef"
      class="fei-swiper__main"
      :class="{ 'fwi-swiper': props.vertical, [`fei-swiper-${props.type}`]: props.type }"
      @mousedown.prevent="handleMouseDown"
    >
      <div
        ref="wrapperRef"
        class="swiper-wrapper"
        :style="wrapperStyle"
        @click="emit('click', currentIndex)"
      >
        <slot></slot>
      </div>
    </div>
    <div
      v-if="props.indicator && itemCount > 0"
      class="fei-swiper__indicator"
      :class="[`is-${props.indicatorPosition}`]"
    >
      <span
        v-for="index in itemCount"
        :key="index"
        class="indicator-dot"
        :class="{ 'is-active': index - 1 === currentIndex }"
        @click="handleIndicatorClick(index - 1)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SwiperProps, SwiperInstance, SwiperEmits } from "./type";
import { ref, onMounted, onUnmounted, computed, nextTick, type Ref } from 'vue'


const props = withDefaults(defineProps<SwiperProps>(), {
  autoplay: true,
  vertical: false,
  width: 600,
  height: 100,
  loop: true,
  speed: 300,
  indicator: true,
  indicatorPosition: "bottom",
  loopTime: 3000,
  type: 'primary'
});

// 模板引用：用于获取 DOM 元素
const mainRef: Ref<HTMLDivElement | null> = ref(null)
const wrapperRef: Ref<HTMLDivElement | null> = ref(null)

// 响应式状态
const currentIndex = ref(0) // 当前轮播项的索引
const itemCount = ref(0)    // 轮播项的总数
let timer: any = null
const emit = defineEmits<SwiperEmits>()

// 计算属性：根据 currentIndex 动态计算 wrapper 的样式
const wrapperStyle = computed(() => {
  const offset = -currentIndex.value * 100
  const transform = props.vertical ? `translateY(${offset}%)` : `translateX(${offset}%)`
  return {
    transform: transform,
    transition: `transform ${props.speed}ms ease`,
  }
})

const handleMouseDown = (e: MouseEvent) => {
  console.log(e)
  if (props.autoplay) {

  }else{

  }
}


// 切换到指定索引
const goTo = (index: number) => {
  if (!props.loop) {
    // 非循环模式下，限制索引范围
    if (index < 0) index = 0
    if (index >= itemCount.value) index = itemCount.value - 1
  } else {
    // 循环模式
    if (index < 0) {
      index = itemCount.value - 1
    } else if (index >= itemCount.value) {
      index = 0
    }
  }
  currentIndex.value = index
  emit('change', index)
}


const next = () => {
  goTo(currentIndex.value + 1)
}

const prev = () => {
  goTo(currentIndex.value - 1)
}

const update = () => {
  goTo(0)
}

const clear = () => {
  stopAutoplay()
}
const start = () => {
  startAutoplay()
}

const startAutoplay = () => {
  if (props.autoplay) {
    timer = setInterval(() => {
      next()
    },props.loopTime)
  }
}

const stopAutoplay = () => {
  clearInterval(timer)
}

const handleIndicatorClick = (index: number) => {
  stopAutoplay()
  goTo(index)
  startAutoplay()
}

// 鼠标移入停止，移出开始
const handleMouseEnter = () => {
  stopAutoplay()
}
const handleMouseLeave = () => {
  startAutoplay()
}



onMounted(() => {
  // nextTick 确保 slot 内容已经渲染
  nextTick(() => {
    if (mainRef.value) {
      itemCount.value = mainRef.value.children[0]?.children.length || 0
      if (itemCount.value > 0) {
        startAutoplay()
      }
    }
  })
})

// onUnmounted 生命周期钩子，在组件卸载时清除定时器，防止内存泄漏
onUnmounted(() => {
  stopAutoplay()
})

// 暴露给父组件的实例方法
defineExpose<SwiperInstance>({
  update,
  clear,
  next,
  prev,
  goTo,
  start,
})
</script>
