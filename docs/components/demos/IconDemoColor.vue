<template>
  <div class="demo-block">
    <div class="icon-grid">
      <div class="icon-item">
        <FeiIcon icon="star" color="#ffd700" />
        <span>#ffd700</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="heart" color="#ff4757" />
        <span>#ff4757</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="gem" color="#2ed573" />
        <span>#2ed573</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="cloud" color="#3742fa" />
        <span>#3742fa</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="sun" color="#ffa502" />
        <span>#ffa502</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="moon" color="#a4b0be" />
        <span>#a4b0be</span>
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
