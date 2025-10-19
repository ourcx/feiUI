<template>
  <div class="demo-block">
    <div class="icon-grid">
      <div class="icon-item">
        <FeiIcon icon="spinner" spin />
        <span>旋转 (spin)</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="sync" pulse />
        <span>脉冲 (pulse)</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="cog" spin />
        <span>设置 (spin)</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="refresh" spin />
        <span>刷新 (spin)</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="compass" pulse />
        <span>指南针 (pulse)</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="life-ring" spin />
        <span>救生圈 (spin)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import FeiIcon from "../../../src/components/Icon/Icon.vue";
</script>

<style scoped>
.icon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--fei-border-color-light);
  border-radius: 8px;
}
</style>
