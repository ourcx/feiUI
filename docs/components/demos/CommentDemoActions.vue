<template>
  <div class="demo-block">
    <FeiComment
      author="自定义用户"
      datetime="2024-01-15 18:00:00"
      content="这个评论展示了如何自定义操作按钮，可以根据实际需求添加不同的交互功能。"
    >
      <template #actions>
        <div class="custom-actions">
          <span class="action-item" @click="handleLike">👍 点赞 (12)</span>
          <span class="action-item" @click="handleReply">💬 回复</span>
          <span class="action-item" @click="handleShare">🔗 分享</span>
          <span class="action-item" @click="handleBookmark">⭐ 收藏</span>
        </div>
      </template>
    </FeiComment>
  </div>
</template>

<script setup>
import FeiComment from "../../../src/components/Comment/Comment.vue";

const handleLike = () => {
  console.log("点赞操作");
};

const handleReply = () => {
  console.log("回复操作");
};

const handleShare = () => {
  console.log("分享操作");
};

const handleBookmark = () => {
  console.log("收藏操作");
};
</script>

<style scoped>
.custom-actions {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.action-item {
  cursor: pointer;
  color: var(--fei-text-color-regular);
  transition: color 0.3s;
  font-size: 14px;
}

.action-item:hover {
  color: var(--fei-color-primary);
}
</style>
