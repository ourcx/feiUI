<template>
  <div
    :style="{
      height: typeof height === 'number' ? height + 'px' : height,
      background,
      color,
      border,
      padding: typeof padding === 'number' ? padding + 'px' : padding,
      textAlign,
    }"
    class="fei-footer"
  >
    <slot name="main">
      <div class="fei-footer-main__out">
        <div class="fei-footer-main">
          <div class="main-top">
            <div class="fei-footer-main__content" v-for="value in main" :key="value" :class="`fei-footer_type-${type}`">
              {{ value }}
            </div>
          </div>
          <div class="main-bottom">
            <div class="fei-footer-main__social" v-for="value in social" :key="value" :class="`fei-footer_type-${type}`">
              {{ value }}
            </div>
          </div>
        </div>
        <div class="fei-footer-main__right">{{ right }}</div>
      </div>
    </slot>

    <slot name="bottom">
      <div class="fei-footer-bottom">
        <div class="fei-footer-bottom__content">
          {{ bottom }}
        </div>
        <div class="fei-footer-bottom__copyright" v-for="value in copyright" :key="value">
          {{ value }}
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { FooterProps } from "./types";
import { computed } from "vue";

const props = withDefaults(defineProps<FooterProps>(), {
  height: "auto",
  color: "#333",
  border: "1px solid #e8e8e8",
  padding: "0 20px",
  textAlign: "center",
  main: () => ["技术支持", "备案信息", "联系方式", "免责声明", "隐私政策"],
  bottom: "Copyright © 2024 FeiUI. All Rights Reserved.",
  copyright: () => ["备案号：粤ICP备2024012345号-1", "技术支持：FeiUI", "联系邮箱："],
  social: () => ["微信", "微博", "QQ", "GitHub", "知乎", "抖音", "小红书", "B站", "头条"],
  right: "欢迎使用",
  type: 'success',
});
</script>
