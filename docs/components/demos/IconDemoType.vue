<template>
  <div class="demo-block">
    <div class="icon-grid">
      <div class="icon-item">
        <FeiIcon icon="check-circle" type="primary" />
        <span>primary</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="check-circle" type="success" />
        <span>success</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="exclamation-circle" type="warning" />
        <span>warning</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="times-circle" type="danger" />
        <span>danger</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="info-circle" type="info" />
        <span>info</span>
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
  grid-template-columns: repeat(5, 1fr);
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
