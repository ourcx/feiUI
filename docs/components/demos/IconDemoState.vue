<template>
  <div class="demo-block">
    <div class="icon-grid">
      <div class="icon-item">
        <FeiIcon icon="bookmark" />
        <span>默认</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="bookmark" :active="true" />
        <span>激活状态</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="bookmark" :disabled="true" />
        <span>禁用状态</span>
      </div>
    </div>

    <h4>实际应用示例</h4>
    <div class="application-examples">
      <div class="app-item">
        <FeiIcon icon="thumbs-up" :active="isLiked" @click="toggleLike" />
        <span>点赞 {{ isLiked ? '已点赞' : '未点赞' }}</span>
      </div>
      <div class="app-item">
        <FeiIcon icon="bookmark" :active="isBookmarked" @click="toggleBookmark" />
        <span>收藏 {{ isBookmarked ? '已收藏' : '未收藏' }}</span>
      </div>
      <div class="app-item">
        <FeiIcon icon="bell" :active="isNotified" :disabled="true" />
        <span>通知 (禁用)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FeiIcon from "../../../src/components/Icon/Icon.vue";

const isLiked = ref(false);
const isBookmarked = ref(false);
const isNotified = ref(true);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
};
</script>

<style scoped>
.icon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.icon-item, .app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--fei-border-color-light);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.app-item:hover {
  background-color: var(--fei-fill-color-light);
}

.application-examples {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>
