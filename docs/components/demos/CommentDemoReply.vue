<template>
  <div class="demo-block">
    <FeiComment
      author="赵六"
      datetime="2024-01-15 17:05:00"
      content="感谢您的宝贵建议，我们会在下一个版本中考虑加入这个功能。"
      :reply="{
        content: '希望可以增加夜间模式，这样在晚上使用会更舒适。',
        author: '张三',
        datetime: '2024-01-15 16:45:00',
      }"
    />
  </div>
</template>

<script setup>
import FeiComment from "../../../src/components/Comment/Comment.vue";
</script>
