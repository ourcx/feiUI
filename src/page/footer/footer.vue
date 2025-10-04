<template>
  <footer
    :style="{
      height: typeof height === 'number' ? height + 'px' : height,
      background,
      color,
      border,
      padding: typeof padding === 'number' ? padding + 'px' : padding,
      textAlign,
    }"
  >
    <slot name="main">
      <div class="fei-footer-main">
        <div class="fei-footer-main__content" v-for="value in main" :key="value">
          {{ value }}
        </div>
        <div class="fei-footer-main__copyright" v-for="value in social" :key="value">
          {{ value }}
        </div>
      </div>
    </slot>

    <slot name="bottom">
      <div class="fei-footer-bottom">
        <div class="fei-footer-bottom__content" v-for="value in bottom" :key="value">
          {{ value }}
        </div>
        <div class="fei-footer-bottom__copyright" v-for="value in copyright" :key="value">
          {{ value }}
        </div>
      </div>
    </slot>
  </footer>
</template>

<script setup lang="ts">
import type { FooterProps } from "./types";
import { computed } from "vue";

const props = withDefaults(defineProps<FooterProps>(), {
  height: "60px",
  background: "#f5f5f5",
  color: "#333",
  border: "1px solid #e8e8e8",
  padding: "0 20px",
  textAlign: "center",
  main: () => ["技术支持", "备案信息", "联系方式", "免责声明", "隐私政策"],
  bottom: "Copyright © 2024 FeiUI. All Rights Reserved.",
  copyright: () => ["备案号：粤ICP备2024012345号-1", "技术支持：FeiUI", "联系邮箱："],
  social: () => ["微信", "微博", "QQ", "GitHub", "知乎", "抖音"],
});
</script>
