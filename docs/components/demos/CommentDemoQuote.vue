<template>
  <div class="demo-block">
    <FeiComment
      author="王五"
      datetime="2024-01-15 16:10:00"
      content="我完全同意这个观点，这个功能确实解决了我们团队协作中的很多问题。"
      :quote="{
        content: '这个新功能极大地提升了我们的工作效率，特别是团队协作方面有了明显改善。',
        author: '李四',
        datetime: '2024-01-14 10:20:00',
      }"
    />
  </div>
</template>

<script setup>
import FeiComment from "../../../src/components/Comment/Comment.vue";
</script>
