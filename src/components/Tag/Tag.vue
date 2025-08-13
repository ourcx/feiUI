<template>
  <div
    class="fei-tag"
    v-if="visible"
    :class="{
      [`fei-tag--${type}`]: type,
      [`fei-tag--${size}`]: size,
      'fei-tag--disabled': disabled,
      'fei-tag--round': round,
      'fei-tag--bordered': bordered,
      'fei-tag--strong': strong,
      'fei-tag--checked': tagClass,
      'fei-tag--closable': closable
    }"
    :style="{
      '--tag-bg-color': color || `var(--fei-color-${type})`,
      '--tag-hover-bg': color ? `color-mix(in srgb, ${color} 90%, white)` : `var(--fei-color-${type}-light-3)`,
      '--tag-active-bg': color ? `color-mix(in srgb, ${color} 80%, white)` : `var(--fei-color-${type}-dark-3)`,
      '--tag-border-color': color ? `color-mix(in srgb, ${color} 30%, transparent)` : `var(--fei-color-${type}-dark-2)`
    }"
  >
    <slot name="avatar">
      <Image v-if="src" :src="src" class="fei-tag__avatar" />
    </slot>

    <div class="fei-tag__content">
      <slot name="body">
        <span class="fei-tag__text">{{ body }}</span>
      </slot>

      <slot name="icon" v-if="closeIcon">
        <Icon
          icon="close"
          class="fei-tag__close"
          @click.stop="handleClose"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TagProps, TagEmints } from "./type";
import Icon from "../Icon/Icon.vue";
import Image from "../Image/Image.vue";
import { ref, computed } from "vue";
const props = withDefaults(defineProps<TagProps>(), {
  type: "primary",
  size: "medium",
  body: "这是一个标签",
  strong: false,
  bordered: true,
  checkable: false,
  checked: false,
  disabled: false,
  round: false,
  closable: true,
});
const closeIcon = computed(() => {
  return props.closable&&!props.disabled
})
const tagClass = computed(() => {
  emit("click", props.checked);
  return props.checkable && props.checked;
});

const emit = defineEmits<TagEmints>();
function handleClose(event: MouseEvent) {
  if (props.disabled) return;
  emit('close', event);
}
</script>
