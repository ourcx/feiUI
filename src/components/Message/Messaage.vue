<template>
  <div
    class="fei-message"
    v-show="visible"
    role="alert"
    :class="{ ['fei-message--' + type]: type, 'is-close': showClose }"
    ref="messageRef"
    :style="cssStyle"
  >
    <div class="fei-message__content">
      <slot>
      {{ offset }}--{{ topOffset }}--{{ height }}--{{ bottomOffset }}
        <RenderVnode v-if="message" :vNode="message"></RenderVnode>
      </slot>
    </div>
    <div class="fei-message__close" v-if="showClose">
    <Icon icon="xmark"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from "./type";
import RenderVnode from "@/hook/RenderVnode";
import Icon from "../Icon/Icon.vue";
import { ref,onMounted,watch, computed,nextTick,getCurrentInstance } from "vue";
import { getLastBottomOffset, getLastInstance} from './method'
import useEventListener from "@/hook/useEventListener";

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset:20,
});

const visible =ref(false);
const messageRef = ref<HTMLDivElement>();
// const instance = getCurrentInstance()

//计算偏移高度
//这个div'的偏移高度
const height = ref(0)
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + height.value + lastOffset.value!)
//给下一个元素预留
const bottomOffset = computed(() => height.value+topOffset.value)
//导出bottomOffset
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex,
}))
//通过一个数组进行对实例的标记
function startTimer() {
  if(props.duration===0)return
  //禁止自动消失

  setTimeout(() => {
    visible.value = false;
  },props.duration)
}

onMounted(async()=>{
  visible.value = true;
  startTimer();
  await nextTick();
  height.value = messageRef.value!.getBoundingClientRect().height;
})
function keydown(e:Event){
  const event = e as KeyboardEvent
  if(event.key==="Escape"){
    visible.value = false;
  }
}

useEventListener(document,"keydown",keydown)
watch(visible,(newValue)=>{
  if(!newValue){
    props.onDestory?.();
  }
})


defineExpose({
  bottomOffset,
  visible,
})
</script>

<style></style>
