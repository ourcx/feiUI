<template>
  <div class="demo-block">
    <FeiComment
      type="primary"
      author="主要评论"
      datetime="2024-01-15 14:30"
      content="这是主要类型的评论"
    />

    <FeiComment
      type="success"
      author="成功评论"
      datetime="2024-01-15 15:20"
      content="这是成功类型的评论"
    />

    <FeiComment
      type="warning"
      author="警告评论"
      datetime="2024-01-15 16:10"
      content="这是警告类型的评论"
    />

    <FeiComment
      type="danger"
      author="危险评论"
      datetime="2024-01-15 17:05"
      content="这是危险类型的评论"
    />

    <FeiComment
      type="info"
      author="信息评论"
      datetime="2024-01-15 18:00"
      content="这是信息类型的评论"
    />
  </div>
</template>

<script setup>
import FeiComment from "../../../src/components/Comment/Comment.vue";
</script>
