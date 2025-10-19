<template>
  <div class="demo-block">
    <div class="icon-grid">
      <div class="icon-item">
        <FeiIcon icon="user" />
        <span>user</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="home" />
        <span>home</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="cog" />
        <span>cog</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="search" />
        <span>search</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="star" />
        <span>star</span>
      </div>
      <div class="icon-item">
        <FeiIcon icon="heart" />
        <span>heart</span>
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
  transition: all 0.3s ease;
}

.icon-item:hover {
  background-color: var(--fei-fill-color-light);
  transform: translateY(-2px);
}

.icon-item span {
  font-size: 12px;
  color: var(--fei-text-color-secondary);
}
</style>
