<template>
  <div class="fei-comment">
    <div class="fei-avart">
      <Image
        :src="props.avatar"
        shape="circle"
        mode="aspectFill"
        width="50px"
        height="10%"
      />
    </div>
    <div class="fei-content">
      <div class="fei-content__title" :class="{ [`fei-content__title--${type}`]: type }">
        <div class="fei-author">{{ author }}</div>
        <div class="fei-datetime">{{ datetime }}</div>
      </div>

      <slot name="text"
        ><div class="fei-text">{{ content }}</div></slot
      >
      <slot name="actions">
        <div class="fei-actions">
          <span class="fei-action__replay">回复</span>
          <span class="fei-action__editer">编辑</span>
          <span class="fei-action__delete">删除</span>
        </div>
      </slot>

      <div
        class="fei-quote"
        v-if="quoterOrReply"
        :class="{ [`fei-quote--${type}`]: type }"
      >
        <div class="fei-quote__content">{{ quote.content }}</div>
      </div>
      <div class="fei-reply" v-else :class="{ [`fei-reply--${type}`]: type }">
        <div class="fei-reply__content">{{ reply.content }}</div>
        <div class="fei-reply__author">
          <span class="fei-reply__author-name">{{ reply.author }}</span>
          <span class="fei-reply__datetime">{{ reply.datetime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentProps } from "./type";
import Image from "../Image/Image.vue";
import { computed } from "vue";

const props = withDefaults(defineProps<CommentProps>(), {
  avatar: "https://s2.loli.net/2025/05/29/HSaD38fFVYmiWIo.png",
  content: "内容",
  author: "作者",
  datetime: "2021-01-01",
  type: "primary",
  quote: () => ({}),
  reply: () => ({}),
});

defineOptions({
  name: "FeiComment",
});

const quoterOrReply = computed(() => {
  return props.quote.content;
});
</script>
