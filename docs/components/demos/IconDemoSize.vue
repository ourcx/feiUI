<template>
  <div class="demo-block">
    <div class="icon-grid">
      <div class="icon-item">
        <FeiIcon icon="bell" size="xs" />
        <span>xs</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="bell" size="sm" />
        <span>sm</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="bell" />
        <span>default</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="bell" size="lg" />
        <span>lg</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="bell" size="xl" />
        <span>xl</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="bell" size="2xl" />
        <span>2xl</span>
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
