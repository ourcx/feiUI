<template>
  <div class="fei-tooltip" v-on="outerEvent" ref="poppperContainerNode">
    <div class="fei-tooltip__trigger" ref="triggerNode" v-on="event">
      <slot />
    </div>
    <transition :name="transition">
      <div
        class="fei-tooltip__popper"
        ref="popperNode"
        v-show="isOpen"
        :class="{ ['fei-tooltip--' + ColorType]: ColorType }"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { watch, ref, reactive, onMounted, onUnmounted, computed, nextTick } from "vue";
import type { Instance } from "@popperjs/core";
import { createPopper } from "@popperjs/core";
import { debounce } from "lodash-es";
import useClickOutside from "@/hook/useClickOutside";
defineOptions({
  name: "FeiTooltip",
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "right",
  trigger: "hover",
  transition: "fade",
  closeDelay: 0,
  openDelay: 0,
  //默认hover
});
const emit = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const popperNode = ref<HTMLElement | null>(null);
const triggerNode = ref<HTMLElement | null>(null);
const poppperContainerNode = ref<HTMLElement>();
let popperInstance: Instance | null = null;
let event: Record<string, any> = reactive({});
let outerEvent: Record<string, any> = reactive({});


const open = () => {
  //延时
  isOpen.value = true;
  emit("visible-change", true);
};
const close = () => {
  isOpen.value = false;
  emit("visible-change", false);
};
const openDebounce = debounce(open, props.openDelay);
const closeDebounce = debounce(close, props.closeDelay);
const openFinal = () => {
  closeDebounce.cancel();
  openDebounce();
};

const closeFinal = () => {
  openDebounce.cancel();
  closeDebounce();
};
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: "offset",
        options: {  // 修正为小写 options
          offset: [0, 9],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
      {
        name: 'computeStyles',
        options: {
          adaptive: false,
          gpuAcceleration: false,
        },
      }
    ],
    ...props.popperOptions,
  };
});
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal();
  } else {
    openFinal();
  }
  emit("visible-change", isOpen.value);
};
useClickOutside(poppperContainerNode, () => {
  if (props.trigger === "click" && isOpen.value && !props.manual) {
    closeFinal();
  }
  if(isOpen.value){
    emit("click-outside", true);
  }
});

const attachEvent = () => {
  if (props.trigger === "hover") {
    event["mouseenter"] = openFinal;
    outerEvent["mouseleave"] = closeFinal;
  } else if (props.trigger === "click") {
    event["click"] = togglePopper;
  }
};
if (!props.manual) {
  attachEvent();
}
watch(
  () => props.manual,
  (newVal) => {
    if (newVal) {
      event = {};
      outerEvent = {};
    } else {
      attachEvent();
    }
  }
);

watch(
  () => props.trigger,
  (newVal, oldVal) => {
    if (oldVal !== newVal) {
      event = {};
      outerEvent = {};
      attachEvent();
    }
  }
);
// 修改 watch 和新增监听
watch(isOpen, (val) => {
  if (val) {
    // 确保 DOM 已渲染
    nextTick(() => {
      if (triggerNode.value && popperNode.value) {
        // 销毁旧实例
        popperInstance?.destroy();
        // 创建新实例
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        );
      }
    });
  } else {
    // 关闭时销毁实例
    popperInstance?.destroy();
    popperInstance = null;
  }
});

// 新增 popperOptions 监听
watch(
  popperOptions,
  (newOptions) => {
    if (popperInstance && isOpen.value) {
      // 更新现有实例的配置
      popperInstance.setOptions(newOptions);
    }
  },
  { deep: true }
);



// 初始化 Popper 实例
onMounted(() => {
  nextTick(() => {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );

      // 初始隐藏
      popperInstance.update().then(() => {
        if (popperNode.value) {
          popperNode.value.style.visibility = 'hidden';
          //还有隐藏::before
        }
      });

    }
  });
});

// 监听打开状态
watch(isOpen, (val) => {
  if (val) {
    nextTick(() => {
      if (popperInstance && popperNode.value) {
        popperNode.value.style.visibility = 'visible';
        popperInstance.update();
      }
    });
  } else {
    if (popperNode.value) {
      popperNode.value.style.visibility = 'hidden';
    }
  }
});

// 监听配置变化
watch(
  popperOptions,
  (newOptions) => {
    if (popperInstance) {
      popperInstance.setOptions(newOptions);
    }
  },
  { deep: true }
);

onUnmounted(() => {
  popperInstance?.destroy();
});


defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
});
</script>
