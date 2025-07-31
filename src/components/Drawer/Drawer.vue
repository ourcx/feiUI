<template>
  <Teleport to="body">
    <div class="fei-drawer-root" v-if="visible">
      <transition name="drawer-fade">
        <div
          class="fei-drawer-mask"
          v-if="mask"
          @click="handleMaskClick"
        ></div>
      </transition>

      <transition :name="slideTransitionName" @after-leave="handleAfterLeave">
        <div class="fei-drawer-wrapper" :style="wrapperStyle">
          <header class="fei-drawer-header" v-if="showClose || title">
            <slot name="header">
              <span class="fei-drawer-title">{{ title }}</span>
            </slot>
            <button v-if="showClose" @click="handleClose" class="fei-drawer-close-btn" :class="{ 'fei-drawer-close-btn--disabled': !maskClosable, ['fei-drawer-close-btn-' + type]: type }">
              &times;
            </button>
          </header>

          <main class="fei-drawer-body">
            <slot></slot> </main>

          <footer class="fei-drawer-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </transition>
    </div>
  </Teleport>
</template>


<script setup lang="ts">
import { computed, watch, onMounted, onBeforeUnmount } from 'vue';
import type { DrawerProps,DrawerEmits } from './type';

// 1. 定义 Props 并设置默认值
const props = withDefaults(defineProps<DrawerProps>(), {
  visible: false,
  mask: true,
  maskClosable: true,
  showClose: true,
  direction: 'right',
  size: '30%',
  type: 'primary',
});

// 2. 定义 Emits
const emit = defineEmits<DrawerEmits>();

// 3. 处理关闭逻辑
const handleClose = () => {
  if (props.beforeClose) {
    props.beforeClose(() => {
      emit('update:visible', false);
    });
  } else {
    emit('update:visible', false);
  }
};

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose();
  }
};

// 监听动画结束，触发 close 事件
const handleAfterLeave = () => {
  emit('close');
};

// 4. 计算属性，用于动态样式和动画
const wrapperStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.direction === 'left' || props.direction === 'right') {
    style.width = typeof props.size === 'number' ? `${props.size}px` : props.size;
  } else {
    style.height = typeof props.size === 'number' ? `${props.size}px` : props.size;
  }
  style[props.direction] = '0'; // 定位
  return style;
});

const slideTransitionName = computed(() => `fei-drawer-slide-${props.direction}`);

// 5. 监听 Escape 键
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    handleClose();
  }
};

// 6. 监听 visible 变化，处理副作用
watch(() => props.visible, (val) => {
  if (val) {
    emit('open');
    document.body.style.overflow = 'hidden'; // 禁止滚动
    window.addEventListener('keydown', handleKeydown);
  } else {
    document.body.style.overflow = ''; // 恢复滚动
    window.removeEventListener('keydown', handleKeydown);
  }
});

// 组件卸载时清理副作用
onBeforeUnmount(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleKeydown);
});
</script>
