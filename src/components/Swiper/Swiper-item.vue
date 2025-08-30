<template>
  <div class="fei-swiper-item" @click="emit('click')" :style="{backgroundColor: props.color}">

  </div>
</template>

<script setup lang="ts">
import type { SwiperItemProps,SwiperEmits } from './type';

const props = withDefaults(defineProps<SwiperItemProps>(), {
})
const emit = defineEmits<SwiperEmits>();

</script>
