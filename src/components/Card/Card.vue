<template>
  <div class="fei-card" :class="[`fei-card--${type}`]">
    <img :src="image" alt="Card Image" class="fei-card-image" v-if="image">
    <div class="fei-card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="fei-card-content">
      <slot></slot>
    </div>
    <div class="fei-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Cardprops } from './type';

const props = withDefaults(defineProps<Cardprops>(), {
  title: '',
  image: '',
  type: 'primary'
})
</script>
<style lang="scss" scoped>
.fei-card {
  --card-bg-color: var(--fei-bg-color, #ffffff);
  --card-border-color: var(--fei-border-color, #dddfe6);
  --card-text-color: var(--fei-text-color-primary, #303133);
  --card-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  background: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: 8px;
  color: var(--card-text-color);
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: var(--card-shadow);

  // 图片样式
  .fei-card-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    border-bottom: 1px solid var(--fei-border-color-light, #e4e7ed);
  }

  // 头部样式
  .fei-card-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--fei-border-color-light, #e4e7ed);

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.4;
      color: inherit;
    }
  }

  // 内容区域样式
  .fei-card-content {
    padding: 20px;
    line-height: 1.6;
    color: var(--fei-text-color-regular, #606266);

    &:not(:first-child) {
      padding-top: 0;
    }
  }

  // 底部样式
  .fei-card-footer {
    padding: 16px 20px;
    border-top: 1px solid var(--fei-border-color-light, #e4e7ed);
    background-color: var(--fei-fill-color-light, #f5f7fa);

    &:empty {
      display: none;
    }
  }

  // 不同类型卡片样式
  &.fei-card--primary {
    --card-border-color: var(--fei-color-primary-light-7, #d57e7e);

    .fei-card-header {
      background-color: var(--fei-color-primary-light-13, #f4dfdf);
      border-bottom-color: var(--fei-color-primary-light-7, #d57e7e);

      h2 {
        color: var(--fei-color-primary-dark-3, #7a3030);
      }
    }
  }

  &.fei-card--success {
    --card-border-color: var(--fei-color-success-light-7, #c3dc9a);

    .fei-card-header {
      background-color: var(--fei-color-success-light-13, #f0f6e6);
      border-bottom-color: var(--fei-color-success-light-7, #c3dc9a);

      h2 {
        color: var(--fei-color-success-dark-3, #6d7c3a);
      }
    }
  }

  &.fei-card--warning {
    --card-border-color: var(--fei-color-warning-light-7, #fee87c);

    .fei-card-header {
      background-color: var(--fei-color-warning-light-13, #fff9de);
      border-bottom-color: var(--fei-color-warning-light-7, #fee87c);

      h2 {
        color: var(--fei-color-warning-dark-3, #a87d15);
      }
    }
  }

  &.fei-card--danger {
    --card-border-color: var(--fei-color-danger-light-7, #f6d1d0);

    .fei-card-header {
      background-color: var(--fei-color-danger-light-13, #fdf4f3);
      border-bottom-color: var(--fei-color-danger-light-7, #f6d1d0);

      h2 {
        color: var(--fei-color-danger-dark-3, #a64848);
      }
    }
  }

  &.fei-card--info {
    --card-border-color: var(--fei-color-info-light-7, #d8d5d0);

    .fei-card-header {
      background-color: var(--fei-color-info-light-13, #f5f4f3);
      border-bottom-color: var(--fei-color-info-light-7, #d8d5d0);

      h2 {
        color: var(--fei-color-info-dark-3, #806f62);
      }
    }
  }

  // 无图片时的样式调整
  &:not(:has(.fei-card-image)) {
    .fei-card-header {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }

  // 只有图片和内容，没有头部时的样式
  &:not(:has(.fei-card-header)) {
    .fei-card-content:first-child {
      padding-top: 20px;
    }
  }

  // 禁用状态
  &.fei-card--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  // 无边框变体
  &.fei-card--borderless {
    border: none;
    box-shadow: none;

    .fei-card-header,
    .fei-card-footer {
      border: none;
    }
  }

  // 阴影变体
  &.fei-card--shadow-always {
    --card-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>

