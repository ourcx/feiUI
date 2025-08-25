<template>
  <div
    class="fei-space"
    :class="{
      [`fei-space-align-${align}`]: align,
      [`fei-space-dirction-${dirction}`]: dirction,
      [`fei-space-wrap`]: wrap,
      [className as string]: className,
    }"
    :style="{
      gap:
        typeof size === 'number'
          ? `${size}px`
          : size === 'small'
          ? '8px'
          : size === 'middle'
          ? '16px'
          : size === 'large'
          ? '24px'
          : '',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { SpaceProps } from './type'

const props = withDefaults(defineProps<SpaceProps>(), {
  align: 'center',
  dirction: 'horizontal',
  size: 'middle',
  wrap: false,
  children: null,
})
</script>
