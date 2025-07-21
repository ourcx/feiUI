<template>
  <a class="fei-link" target="_blank" rel="nofollow noopener" :href="href">
    <span class="fei-link__image-wrapper">
      <span class="fei-link__image-aspect"></span>
      <Image
        :src="src"
        mode="aspectFill"
        shape="circle"
        :screen="false"
        width="50px"
        height="50px"
      />
    </span>
    <span class="fei-link__text">
      <span class="fei-link__title">{{ name }}</span>
      <span class="fei-link__description" v-if="description">{{ description }}</span>
      <span class="fei-link__separator" v-if="description">-</span>
    </span>
  </a>
</template>

<script setup lang="ts">
import type { LinksProps } from "./types";
import Image from "../Image/Image.vue";
defineOptions({
  name: "FeiLinks",
});

const props = withDefaults(defineProps<LinksProps>(), {
  name: "空白",
  description: "无描述",
  src: "https://picsum.photos/200/300",
});


</script>
