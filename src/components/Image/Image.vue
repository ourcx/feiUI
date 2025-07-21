<template>
  <div class="fei-image" :style="`width:${imgS.width}; height:${imgS.height}`">
    <div class="fei-image__placeholder">
      <RenderVnode :vNode="title ?? ''" v-if="ImgDescribeTitle" />
    </div>
    <div class="fei-image__img">
      <div :class="{ loading: visible }">
        <div :class="{ 'fei-image__loading': visible }"></div>
        <RenderVnode :vNode="placeholder ?? ''" v-if="visible" />
        <RenderVnode :vNode="fallback ?? ''" v-if="!visible" />
      </div>
      <img :src="src" :alt="alt" @click="openImg" v-lazy="lazyLoad" :class="{ [`fei-image--${shape}`]: shape,[`fei-image--${mode}`]: mode }" />
    </div>
    <div class="fei-image__fallback">
      <RenderVnode :vNode="footer ?? ''" v-if="ImgDescribeFooter" />
    </div>
  </div>

  <Teleport to="body" v-if="ScreenImg"
    ><transition-group name="fei-image-spin">
      <div
        class="fei-image-Teleport"
        @wheel="handleWheel"
        @mousedown="dragStart = !dragStart"
        @mousemove="drag"
      >
        <div class="fei-image__header">
          <div class="fei-image__title">{{ title }}</div>
          <div class="fei-image__close" @click="close()">
            <Icon icon="close"></Icon>
          </div>
        </div>
        <div class="fei-image__body" @mousedown="drag">
          <img :src="src" :alt="alt" ref="img" v-lazy="lazyLoad" />
        </div>
        <div class="fei-image__footer">
          <slot name="footer">
            {{ footer }}
          </slot>
        </div>
      </div>
      <div class="is-screen" @wheel="handleWheel"></div>
    </transition-group>
  </Teleport>
</template>

<script setup lang="ts">
import type { ImageProps, ImageEmits } from "./types";
import RenderVnode from "@/hook/RenderVnode";
import Icon from "../Icon/Icon.vue";
import {
  computed,
  defineComponent,
  toRefs,
  watch,
  ref,
  onMounted,
  onUnmounted,
} from "vue";
import imgStyle from "@/hook/WidthOrHeight";

defineOptions({
  name: "FeiImage",
});
const emits = defineEmits<ImageEmits>();
const props = withDefaults(defineProps<ImageProps>(), {
  mode: "aspectFill",
  shape: "square",
  radius: 0,
  lazy: false,
  src: "",
  alt: "",
  width: "200px",
  height: "400px",
  descriation: false,
  screen: false,
  visible: false,
  placeholder: "正在加载...",
  fallback: "",
  lazyLoad: false
});

const ImgDescribeTitle = computed(() => {
  return props.descriation || props.title;
});
const ImgDescribeFooter = computed(() => {
  return props.descriation || props.footer;
});

const imgS = computed(() => {
  return imgStyle(props.width, props.height);
});
const img = ref<HTMLImageElement | null>(null);

//全屏显示
const ScreenImg = ref(false);
const openImg = () => {
  if (!props.screen) return;
  ScreenImg.value = true;
  emits("onClick");
};

//滚轮滑动，并放大缩小

const handleWheel = (event: WheelEvent) => {
  const image = img.value;
  if (!image) return;
  // 获取当前 transform 的 scale 值
  const style = window.getComputedStyle(image);
  const transform = style.transform;
  let scale =
    transform && transform !== "none"
      ? parseFloat(transform.split("(")[1].split(",")[0])
      : 1;

  if (event.deltaY > 0) {
    scale *= 1.1;
  } else {
    scale /= 1.1;
  }
  image.style.transform = `scale(${scale})`;
  event.preventDefault();
};
//拖拽
//持续监听鼠标的点击和松开？，可以持续记录鼠标的移动，让图片随着鼠标去运动
const X = ref<Number>(0);
const Y = ref<Number>(0);
const dragStart = ref<boolean>(false);
const drag = (e: MouseEvent) => {
  if (!dragStart.value) return;
  e.preventDefault();
  const image = img.value;
  if (!image) return;
  X.value = e.clientX - image.width / 2;
  Y.value = e.clientY - image.height / 2;
  image.style.cursor = "move";
  image.style.position = "absolute";
  image.style.transition = "left 0.1s ease-in-out, top 0.1s ease-in-out";
  image.style.left = X.value + "px";
  image.style.top = Y.value + "px";
};

//关闭
const close = () => {
  ScreenImg.value = false;
  dragStart.value = false;

  emits("onClose", ScreenImg.value);
};

//监听加载状态
watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      emits("onLoad");
    }
  }
);

//懒加载
const lazyLoad = () => {
  if (props.lazyLoad) {
    return props.src
  }else{
    return ''
  }
}
</script>
