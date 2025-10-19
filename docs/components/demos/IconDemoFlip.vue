<template>
  <div class="demo-block">
    <div class="icon-grid">
      <div class="icon-item">
        <FeiIcon icon="arrow-right" />
        <span>原始方向</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="arrow-right" flip="horizontal" />
        <span>水平翻转</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="arrow-down" />
        <span>原始方向</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="arrow-down" flip="vertical" />
        <span>垂直翻转</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="arrow-right" flip="both" />
        <span>双向翻转</span>
      </div>
    </div>

    <h4>旋转角度</h4>
    <div class="rotation-grid">
      <div class="icon-item">
        <FeiIcon icon="arrow-up" />
        <span>0°</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="arrow-up" :rotation="90" />
        <span>90°</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="arrow-up" :rotation="180" />
        <span>180°</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="arrow-up" :rotation="270" />
        <span>270°</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import FeiIcon from "../../../src/components/Icon/Icon.vue";
</script>

<style scoped>
.icon-grid, .rotation-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.rotation-grid {
  grid-template-columns: repeat(4, 1fr);
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
