<template>
  <div class="demo-block">
    <FeiComment
      author="主题作者"
      datetime="2024-01-15 10:00:00"
      content="欢迎大家对这个新功能提出宝贵意见！"
    >
      <template #actions>
        <div class="custom-actions">
          <span class="action-item" @click="showReply = !showReply">💬 回复</span>
        </div>
      </template>
    </FeiComment>

    <!-- 嵌套回复 -->
    <div class="nested-comments" style="margin-left: 60px; border-left: 2px solid var(--fei-border-color-light); padding-left: 20px;">
      <FeiComment
        author="用户A"
        datetime="2024-01-15 11:30:00"
        content="我觉得这个功能很棒，特别是界面设计很直观。"
      />

      <FeiComment
        author="用户B"
        datetime="2024-01-15 12:15:00"
        content="同意用户A的看法，建议再增加一些快捷键支持。"
      />

      <FeiComment
        author="用户C"
        datetime="2024-01-15 13:20:00"
        content="已经试用过了，体验很好，期待正式版本！"
      />
    </div>

    <!-- 回复框示例 -->
    <div v-if="showReply" class="reply-box" style="margin-top: 16px; padding: 16px; background: var(--fei-fill-color-light); border-radius: 8px;">
      <h4 style="margin: 0 0 12px 0;">回复主题</h4>
      <textarea
        v-model="replyContent"
        placeholder="输入回复内容..."
        style="width: 100%; min-height: 80px; padding: 8px; border: 1px solid var(--fei-border-color); border-radius: 4px; resize: vertical;"
      ></textarea>
      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px;">
        <button
          @click="showReply = false"
          style="padding: 6px 12px; border: 1px solid var(--fei-border-color); border-radius: 4px; background: white;"
        >
          取消
        </button>
        <button
          @click="submitReply"
          style="padding: 6px 12px; border: none; border-radius: 4px; background: var(--fei-color-primary); color: white;"
        >
          提交回复
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeiComment from "../../../src/components/Comment/Comment.vue";

const showReply = ref(false)
const replyContent = ref('')

const submitReply = () => {
  if (replyContent.value.trim()) {
    console.log('提交回复:', replyContent.value)
    replyContent.value = ''
    showReply.value = false
  }
}
</script>

<style scoped>
.custom-actions {
  display: flex;
  gap: 16px;
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
